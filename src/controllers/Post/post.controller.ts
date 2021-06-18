import  Post  from "../../models/post.model";
import { NextFunction, Response, Request } from "express";
import { IResponse } from "src/types/response.types";
import HttpStatusCode from "src/constants/HTTPStatusCode";
import { mongoose } from "@typegoose/typegoose";
import  Category  from "../../models/category.model";
import User from '../../models/user.model';
import Tag from '../../models/tag.model';


const getAllPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const listPost = await Post.find();
        const data : IResponse<typeof listPost> = {
            data: listPost
        }
        res.status(HttpStatusCode.OK).send(data)
    } catch (error) {
        console.log('Function: Get All Post')
        next(error)
    }
}   


const getOnePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const _id = mongoose.Types.ObjectId(id)

        const post = await Post.findOne({
            _id
        })

        const data: IResponse<typeof post> = {
            data : post
        }

        res.status(HttpStatusCode.OK).send(data);

    } catch (error) {
        console.log('Function: Get One Post');
        next(error);
    }
}

const postOnePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, sapo, avatar,summary,content,tag, category, user} = req.body;
        
        let tagList = [];
        let categoryList = [];
        let userList = [];
        
        let tagsInDB = await Tag.find();
        let categoriesInDB = await Category.find();
        let userInDB = await User.find();

        await tag.map( (element : any) => { 
            let object = mongoose.Types.ObjectId(element);
            let item = tagsInDB.find( (e) => {
                e._id === object
            })
            tagList.push(item);
        })

        await category.map( (element : any) => { 
            let object = mongoose.Types.ObjectId(element);
            let item = categoriesInDB .find( (e) => {
                e._id === object
            })
            categoryList.push(tag);
        })

        await user.map( (element : any) => { 
            let object = mongoose.Types.ObjectId(element);
            let item = tagsInDB.find( (e) => {
                e._id === object
            })
            tagList.push(tag);
        })

        await Post.create({
            title,
            sapo,
            content,
            summary,
            tag: tagList,
            category: categoryList,

        })


    } catch (error) {

    }
}
