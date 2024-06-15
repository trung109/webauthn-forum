import User from "../models/user.js";
import ActivateToken from "../models/activate.js";
import { hashPassword } from "../helpers/helper.js";
import { compare } from "bcrypt";
import * as s from "../helpers/secure.js"

export const getSelfProfile = async (req, res) => {
  try {
    const { decodedToken, ...rest } = JSON.parse(req.body);
    const username = decodedToken.username;
    const { id, email, photoUrl, role, status, bio } = await User.findOne({
      username: s.filterInput(username, s.printableRegex),
    });
    res.status(302).json({ username, id, email, photoUrl, role, status, bio });
  } catch (err) {
    // res.status(404).send("Something went wrong.");
  }
};

export const getFullUserInfoByUserId = async (req, res) => {
  const id = req.query.userId;
  try {
    const info = await User.findOne({ id: s.filterInput(id, s.hexRegex) }).select("-password -_id -__v");
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
  console.log(req.body)
  const { token } = req.body;
  console.log(token)
  try {
    const activateToken = await ActivateToken.findOne({ token: s.filterInput(token, s.hexRegex) });
    const username = activateToken.username;
    console.log(username)

    if (token === activateToken.token) {
      const current_time = Date.now();
      if (
        activateToken.issueat < current_time &&
        current_time < activateToken.expire
      ) {

        await User.updateOne({ username: s.filterInput(username, s.printableRegex) }, { status: "verified" });
        await ActivateToken.deleteOne({ username });

        res.status(200).send("User verified");
      } else {
        res.status(400).send("Token expired");
      }
    }
  } catch {
    res.status(404).send("Something went wrong");
  }
};

export const changeUserInfo = async (req, res) => {
  const { decodedToken, username, bio } = JSON.parse(req.body);
  try {
    await User.updateOne(
      { username: s.filterInput(decodedToken.username, s.printableRegex) },
      { username: s.filterInput(username, s.printableRegex), bio: s.filterInput(bio, s.printableRegex) }
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

  const user = await User.findOne({ username: s.filterInput(decodedToken.username, s.printableRegex) });

  if (compare(currentPassword, user.password)) {
    await User.updateOne(
      { username: s.filterInput(decodedToken.username, s.printableRegex) },
      { password: hashed }
    );

    res.status(200).send("Password updated");
  }
};

export const updateRole = async (req, res) => {
  const { role, username, ...rest } = JSON.parse(req.body);
  console.log(`Role ${role} username: ${username}`);
  try {
    await User.updateOne({ username: s.filterInput(username, s.printableRegex) }, { role: s.filterInput(role, s.stringRegex) });
    res.send("User status updated");
  } catch {
    res.status(404).send("Something went wrong");
  }
};
