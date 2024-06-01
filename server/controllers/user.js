import User from "../models/user.js";
import ActivateToken from "../models/activate.js";

export const getSelfProfile = async (req, res) => {
    try {
        const { username } = JSON.parse(req.body)
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
    const { username, bio, password } = JSON(req.body);
    const hashed = await h.hashPassword(password);
    try {
        const user = await User.findOne({ username });
        if (hashed === user.password) {
            await User.updateOne({ username }, { username: username, bio: bio });
        } else {
            res.status(400).send("");
        }

        res.status(302).send("User updated");
    } catch {
        res.status(404).send("Something went wrong");
    }

}

export const updatePassword = async (req, res) => {

}
