import dbConnect from '../utils/dbConnect'
import UserModel from '../models/users'
import { crypto } from '../utils/password'

const post = async (req, res) => {
    const {
        name,
        email,
        userName,
        password
    } = req.body

    await dbConnect()

    const passwordCrypto = await crypto(password)

    const user = new UserModel({
        name,
        email,
        userName,
        password: passwordCrypto
    })
    user.save()

    res.status(201).json({
        success: true
    })
}

export {
    post
}