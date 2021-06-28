
import { refreshToken } from "src/controllers/Auth/auth.controller";
import  User from "../../models/user.model";
import UserToken from '../../models/userToken.model'

const findUserByUsername = async (username: string) => {
    const userInDB = await User.findOne({
        username
    })

    return userInDB;
}

const findUserByToken = async (refreshToken : string) => {
    const userInDb = await UserToken.findOne({
        refreshToken
    })
    return userInDb;
}

const insertToken = async (username: string, refreshToken : string) => {
    const userInsert = await UserToken.create({
        username,
        refreshToken
    })
    await userInsert.save();
}

const destroyToken = async (username: string) => {
    await UserToken.deleteOne({
        username,
    })
}


export default {
    findUserByUsername: findUserByUsername,
    findUserByToken: findUserByToken,
    insertToken: insertToken,
    destroyToken: destroyToken
}