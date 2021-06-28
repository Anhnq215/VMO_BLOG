import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ERRORS } from "../constants/MsgResponse";
import HttpStatusCode from "../constants/HTTPStatusCode";



const tokenSecret = process.env.TOKEN_SECRET_KEY || '';
const refreshTokenSecret = process.env.REFRESH_SECRET_KEY || '';;
const tokenExpired = process.env.TOKEN_EXPIRED_IN || '';;
const refreshExpired = process.env.REFRESH_EXPIRED_IN || '';;

export function authenticate() {
    return (
        req: any,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const getTimeNow = new Date();
            const currentTime = getTimeNow.getSeconds();

            const token = req.headers.authorization || '';

            if (!token) {
                res.status(HttpStatusCode.UNAUTHORIZED).send({
                    message: ERRORS.Unauthorized.message,
                    code: ERRORS.Unauthorized.code
                })
            }
            // const refreshToken = 
            try { 
                let user : any = jwt.verify(token,tokenSecret);
                console.log(user);   
                return next();
            } catch (error) {
                res.status(HttpStatusCode.UNAUTHORIZED).send({data:false})
            }
        } catch (error) {
            console.log("Middleware Auth");
            next(error);
        }
    }
}