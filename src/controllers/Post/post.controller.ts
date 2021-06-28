import  Post  from "../../models/post.model";
import { NextFunction, Response, Request } from "express";
import { IResponse } from "../../types/response.types";
import HttpStatusCode from "../../constants/HTTPStatusCode";
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
        
        let tagList : any= [];
        let categoryList : any = [];
        let userList : any = [];
        
        if (tag) {
            for (let index = 0; index < tag.length ; index+= 1) { 
                let object = mongoose.Types.ObjectId(tag[index]);
                let item = await Tag.findOne({
                    _id : object
                })
                tagList.push(item);
            }
        }
        
        if (category) {
            for (let index = 0; index < category.length ; index+= 1) { 
                let object = mongoose.Types.ObjectId(category[index]);
                let item = await Category.findOne({
                    _id : object
                })
                categoryList.push(item);
            }
        }
        
        if (user) {
             for (let index = 0; index < user.length ; index+= 1) { 
                let object = mongoose.Types.ObjectId(user[index]);
                let item = await User.findOne({
                    _id : object
                })
                userList.push(item);
            }
        }
        const newPost = new Post({
            title,
            sapo,
            content,
            summary,
            avatar,
            tag: tagList,
            category: categoryList,
            user: userList
        })

        console.log(newPost)

        await newPost.save();
        res.status(HttpStatusCode.OK).send({
            data:true,
            message: 'Create success',
            code: HttpStatusCode.OK
        })
    } catch (error) {
        console.log("Function: postOnePost");
        next(error);
    }
}

const updateOnePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, sapo, avatar,summary,content,tag, category, user} = req.body;
        const { id } = req.params;
        const _id = mongoose.Types.ObjectId(id);

        const post = await Post.findOne({
            _id
        });

        let tagList : any = post?.tag;;
        let categoryList : any = post?.category;
        let userList : any = post?.user;
        
        if (tag) {
            tagList = [];
            for (let index = 0; index < tag.length ; index+= 1) { 
                let object = mongoose.Types.ObjectId(tag[index]);
                let item = await Tag.findOne({
                    _id : object
                })
                tagList.push(item);
            }
        }
        
        if (category) {
            categoryList = [];
            for (let index = 0; index < category.length ; index+= 1) { 
                let object = mongoose.Types.ObjectId(category[index]);
                let item = await Category.findOne({
                    _id : object
                })
                categoryList.push(item);
            }
        }
        
        if (user) {
            userList = [];
             for (let index = 0; index < user.length ; index+= 1) { 
                let object = mongoose.Types.ObjectId(user[index]);
                let item = await User.findOne({
                    _id : object
                })
                userList.push(item);
            }
        }
       
        await Post.findOneAndUpdate({ _id },{
            title,
            sapo,
            content,
            summary,
            avatar,
            tag: tagList,
            category: categoryList,
            user: userList
        })

        res.status(HttpStatusCode.OK).send({
                data:true,
                message: 'Update success',
                code: HttpStatusCode.OK
            })
    } catch (error) {
        console.log("Function: updateOnePost");
        next(error);
    }
}



const deleteOnePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const _id = mongoose.Types.ObjectId(id);

        await Post.deleteOne({
            _id
        })
        res.status(HttpStatusCode.OK).send({
            data:true,
            message: 'Delete success',
            code: HttpStatusCode.OK
        })
    } catch (error) {
        console.log("Function: deleteOnePost");
        next(error);
    }
}


export {getAllPost, getOnePost, postOnePost, updateOnePost, deleteOnePost}