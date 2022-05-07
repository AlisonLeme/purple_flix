import dbConnect from '../utils/dbConnect'
import UserModel from '../models/users'

const post = async (req, res) => {
    const {
        name,
        email,
        userName,
        password
    } = req.body

    await dbConnect()

    const user = UserModel({
        name,
        email,
        userName,
        password
    })
    user.save()

    res.status(201).json({
        success: true
    })
}

export {
    post
}