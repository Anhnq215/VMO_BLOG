import { NextFunction, Request, Response } from "express";
import authService from '../../services/Auth/auth.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import HttpStatusCode from '../../constants/HTTPStatusCode';
import { ERRORS } from "../../constants/MsgResponse";

const tokenSecret = process.env.TOKEN_SECRET_KEY || '';
const refreshTokenSecret = process.env.REFRESH_SECRET_KEY || '';;
const tokenExpired = process.env.TOKEN_EXPIRED_IN || '';;
const refreshExpired = process.env.REFRESH_EXPIRED_IN || '';;

const loginIn = async (
    req : Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password } = req.body;
        const userInDB = await authService.findUserByUsername(username);

        console.log('password', password)
        if (userInDB) {
            let passwordHash = userInDB.password;
            let userData = {
                id: userInDB.id,
                username: userInDB.username,
                email: userInDB.email
            }

            if (bcrypt.compareSync(password,passwordHash)) {
                const getTimeNow = new Date();
                
                let token = jwt.sign(userData ,tokenSecret, {
                    expiresIn: getTimeNow.getSeconds() + +tokenExpired
                })

                let refreshToken = jwt.sign(userData, refreshTokenSecret, {
                    expiresIn: getTimeNow.getSeconds() + +refreshExpired
                })

                req.headers.authorization = token

                const checkTokenExist = await authService.findUserByUsername(username);

                if (checkTokenExist) {
                    await authService.destroyToken(username)
                }

                await authService.insertToken(username, refreshToken);

                res.status(HttpStatusCode.OK).send({
                    token : token,
                    refreshToken : refreshToken
                })

            }
        } else {
            res.status(HttpStatusCode.UNAUTHORIZED).send({data:false})
        }
    } catch (error) {
        console.log("Function: Login")
        next(error);
    }
}

const refreshToken = async (
    req : Request,
    res : Response,
    next: NextFunction
) => {
    const {username , refreshToken} = req.body;
    const token = req.headers.authorization || '';
    try {
        const user = await authService.findUserByUsername(username);
        const currentTime = new Date();

        if (!user) {
            res.status(HttpStatusCode.NOT_FOUND).send({
                message: ERRORS.Notfound.message,
                code: ERRORS.Notfound.code
            })
        }

        let checkTokenExist = await authService.findUserByToken(refreshToken);


        if (!checkTokenExist) {
            res.status(HttpStatusCode.NOT_FOUND).send({
                message: ERRORS.Notfound.message,
                code: ERRORS.Notfound.code
            })
        }
        const userData = {
            id: user!.id ,
            username: user!.username ,
            email: user!.email 
        }

        const token = jwt.sign(userData, tokenSecret, {
            expiresIn: currentTime.getSeconds() + +tokenExpired
        })

        req.headers.authorization = token;

        res.status(HttpStatusCode.OK).send({
            token : token,
            refreshToken : refreshToken,
            message: 'Get new token success'
        })

    } catch (error) {
        console.log("Function: Refresh Token");
        next(error);
    }
}


export { loginIn , refreshToken }