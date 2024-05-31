import User from "../models/user.js"


export const getSelfProfile = async (req, res) => {
    try {
        const { username } = JSON.parse(req.body)         
        const { id, email, photoUrl, role, status } = await User.findOne({ username })
        res.status(302).json({username, id, email, photoUrl, role, status})
    } catch (err) {
        res.status(404).send('Something went wrong.')
    }
}