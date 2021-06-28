import { mongoose } from "@typegoose/typegoose";
import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../constants/HTTPStatusCode";
import  Tag  from "../../models/tag.model";
import { IResponse } from "../../types/response.types";
import tagService from '../../services/Tag/tag.service'

const getAllTag = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = tagService.getAllTag();
        res.status(HttpStatusCode.OK).send(data);

    } catch (error) {
        console.log("Function: get All Tag Function");
        next(error);
    }
}

const getOneTag = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;  
        const data = tagService.getOneTag(id);
        res.status(HttpStatusCode.OK).send(data);
    } catch (error) {
        console.log("Function: getOneTag");
        next(error);
    }
}

const postOneTag = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { tagName , tagDescription } = req.body;
        const newTag = {
            tagName,
            tagDescription
        }
        await tagService.createOneTag(newTag);
        res.status(HttpStatusCode.OK).send({data:true})

    } catch (error) {
        console.log("Function: postOneTag");
        next(error);
    }
}

const updateOneTag = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;        
        const { tagName, tagDescription } = req.body;
        const newTag = {
            tagName,
            tagDescription
        }
        await tagService.updateOneTag(id,newTag);
        res.status(HttpStatusCode.OK).send({data: true})

    } catch (error) {
        console.log("Function: updateOneTag");
        next(error);
    }
}

const deleteOneTag = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        await tagService.deleteOneTag(id);
        res.status(HttpStatusCode.OK).send({data: true})
    } catch (error) {
        console.log("Function: deleteOneTag");
        next(error);
    }
}

export { getAllTag, getOneTag, postOneTag , updateOneTag, deleteOneTag}