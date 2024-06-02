import User from "../models/user.js";
import ActivateToken from "../models/activate.js";
import { hashPassword } from "../helpers/helper.js";
import { compare } from "bcrypt";

export const getSelfProfile = async (req, res) => {
  try {
    const { decodedToken, ...rest } = JSON.parse(req.body);
    const username = decodedToken.username;
    const { id, email, photoUrl, role, status, bio } = await User.findOne({
      username,
    });
    res.status(302).json({ username, id, email, photoUrl, role, status, bio });
  } catch (err) {
    res.status(404).send("Something went wrong.");
  }
};

export const getFullUserInfoByUserId = async (req, res) => {
  const id = req.query.userId;
  try {
    const info = await User.findOne({ id }).select("-password -_id -__v");
    res.status(302).json(info);
  } catch (err) {
    res.status(404).send("Something went wrong.");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ status: { $eq: "verified" } })
      .select("-password -_id -__v")
      .limit(20);
    res.status(302).json({ users });
  } catch (err) {
    res.status(404).send("Something went wrong.");
  }
};

export const verifyActivation = async (req, res) => {
  const { token } = JSON.parse(req.body);
  const activateToken = await ActivateToken.findOne({ token: token });
  const username = activateToken.username;
  if (token === activateToken.token) {
    const current_time = Date.now();
    if (
      activateToken.issueat < current_time &&
      current_time < activateToken.expire
    ) {
      try {
        await User.updateOne({ username }, { verified: "verified" });
        await ActivateToken.deleteOne({ username });
      } catch {
        res.status(404).send("Something went wrong");
      }
      res.status(200).send("User verified");
    } else {
      res.status(400).send("Token expired");
    }
  }
};

export const changeUserInfo = async (req, res) => {
  const { decodedToken, username, bio } = JSON.parse(req.body);
  try {
    await User.updateOne(
      { username: decodedToken.username },
      { username: username, bio: bio }
    );
    res.status(302).send("User updated");
  } catch {
    res.status(404).send("Something went wrong");
  }
};

export const updatePassword = async (req, res) => {
  const { decodedToken, currentPassword, password, ...rest } = JSON.parse(
    req.body
  );
  const hashed = await hashPassword(password);

  const user = await User.findOne({ username: decodedToken.username });

  if (compare(currentPassword, user.password)) {
    await User.updateOne(
      { username: decodedToken.username },
      { password: hashed }
    );

    res.status(200).send("Password updated");
  }
};

export const updateRole = async (req, res) => {
  const { role, username, ...rest } = JSON.parse(req.body);
  console.log(`Role ${role} username: ${username}`);
  try {
    await User.updateOne({ username }, { role });
    res.send("User status updated");
  } catch {
    res.status(404).send("Something went wrong");
  }
};
