import User from "../models/user.js";
import ActivateToken from "../models/activate.js";
import { hashPassword } from "../helpers/helper.js";

export const getSelfProfile = async (req, res) => {
    try {
        const { decodedToken, ...rest } = JSON.parse(req.body);
        const username = decodedToken.username;
        const { id, email, photoUrl, role, status } = await User.findOne({ username })
        res.status(302).json({ username, id, email, photoUrl, role, status })
    } catch (err) {
        res.status(404).send('Something went wrong.')
    }
}

export const getFullUserInfoByUserId = async (req, res) => {
    const id = req.query.userId
    try {
        const info = await User.findOne({ id }).select('-password -_id -__v')
        res.status(302).json(info)
    } catch (err) {
        res.status(404).send('Something went wrong.')
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password -_id -__v').limit(20)
        res.status(302).json({ users })
    } catch (err) {
        res.status(404).send('Something went wrong.')
    }

}

export const verifyActivation = async (req, res) => {
    const { username, token } = JSON.parse(req.body);
    const activateToken = await ActivateToken.findOne({ username: username });
    if (token === activateToken.token) {
        const current_time = Date.now();
        if (activateToken.issueat < current_time && current_time < activateToken.expire) {
            ActivateToken.deleteOne({ username: username });
            res.status(302).send("User verified");
        } else {
            res.status(404).send("Something went wrong");
        }
    }
}

export const changeUserInfo = async (req, res) => {
    const { decodedToken, username, bio } = JSON(req.body);
    try {
        await User.updateOne({ username: decodedToken.username }, { username: username, bio: bio });
        res.status(302).send("User updated");
    }
    catch {
        res.status(404).send("Something went wrong");
    }

} 

export const updatePassword = async (req, res) => {
    const { decodedToken, currentpassword, newpassword, ...rest } = JSON.parse(req.body);

    const user = await User.findOne({ username: decodedToken.username });

    if (hashPassword(currentpassword) === user.password) {
        await User.updateOne({ username }, { password: hashPassword(newpassword) });
    }
}
