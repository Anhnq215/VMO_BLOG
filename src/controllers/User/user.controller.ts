import { mongoose } from "@typegoose/typegoose";
import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "../../constants/HTTPStatusCode";
import  User  from "../../models/user.model";
import { IResponse } from "../../types/response.types";
import bcrypt from 'bcrypt'

const getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const listUser = await User.find();

        const data: IResponse<typeof listUser> = {
            data: listUser
        }
        res.status(HttpStatusCode.OK).send(data);
    } catch (error) {
        console.log("Function: getAllUser");
        next(error);
    }
}


const getOneUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const _id = mongoose.Types.ObjectId(id);

        const user = await User.find({
            _id
        })
        const data: IResponse<typeof user> = {
            data: user
        }
        
        res.status(HttpStatusCode.OK).send(data);
    } catch (error) {
        console.log("Function: getOneUser");
        next(error);
    }
}


const postOneUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const  filename  = req.file?.filename;
        const {email,username,password} = req.body;

        let salt = bcrypt.genSaltSync(7);
        let hashPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            email,
            username,
            password : hashPassword,
            avatar: filename
        })
        await newUser.save();
        res.status(HttpStatusCode.OK).send({
            data:true,
            message: 'Create success',
            code: HttpStatusCode.OK
        });
    } catch (error) {
        console.log("Function: postOneUser");
        next(error);
    }
}


const updateOneUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const _id = mongoose.Types.ObjectId(id);
        const  filename  = req.file?.filename;
        const {email,username,password} = req.body;

        let hashPassword = '';

        bcrypt.hash(password, 30, function(err, hash) {
           hashPassword = hash
        });

        await User.findOneAndUpdate( { _id }, {
            avatar: filename,
            email,
            username,
            password
        })
        res.status(HttpStatusCode.OK).send({
            data:true,
            message: 'Update success',
            code: HttpStatusCode.OK
        });
    } catch (error) {
        console.log("Function: updateOneUser");
        next(error);
    }
}


const deleteOneUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const _id = mongoose.Types.ObjectId(id);

        await User.deleteOne({
            _id
        });

        res.status(HttpStatusCode.OK).send({
            data:true,
            message: 'Delete success',
            code: HttpStatusCode.OK
        });
    } catch (error) {
        console.log("Function: deleteOneUser");
        next(error);
    }
}

export { getAllUser,getOneUser,postOneUser,updateOneUser,deleteOneUser}