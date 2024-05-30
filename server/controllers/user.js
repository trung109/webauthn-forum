import User from "../models/user.js"



export const getUserInfo = async (req, res) => {
    const { username } = req.auth
    const { id, email, photoUrl, role, status } = await User.findOne({ username })
    res.json({username, id, email, photoUrl, role, status})
}