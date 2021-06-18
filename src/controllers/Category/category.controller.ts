import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../constants/HTTPStatusCode";
import { IResponse } from "src/types/response.types";
import Category from "../../models/category.model";
import mongoose from 'mongoose';

const getAllCategory = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listCategory = await Category.find();
    const data: IResponse<typeof listCategory> = {
      data: listCategory,
    };
    res.status(HttpStatusCode.OK).send(data);
  } catch (error) {
    console.log("Function: Get List Category");
    next(error);
  }
};

const getOneCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let {id} = req.params;
    const _id = mongoose.Types.ObjectId(id);
    const category = await Category.findOne({
      _id,
    });

    const data: IResponse<typeof category> = {
      data: category,
    };

    res.status(HttpStatusCode.OK).send(data);
  } catch (error) {
    console.log("Function: Get One Category");
    next(error);
  }
};

const postOneCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { categoryName, categoryDescription, category,  } = req.body

        const categories = await Category.find();


        const newCategory = new Category({
            categoryName,
            categoryDescription,
            category
        })

        await newCategory.save();
        res.status(HttpStatusCode.OK).send({data:true})
    } catch (error) {
        console.log("Function: Post One Category");
        next(error);
    }
}

const updateOneCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let {id} = req.params;
        const _id = mongoose.Types.ObjectId(id);
        const { categoryName, categoryDescription, category,  } = req.body;
        const categoryInDB = await Category.findOne({
            _id
        });

        if (categoryInDB) {
            await categoryInDB.update({
                categoryName,
                categoryDescription,
                category
            })
        }
        res.status(HttpStatusCode.OK).send({data: true})
    } catch (error) {
        console.log("Function: Post One Category");
        next(error);
    }
}


const deleteOneCategory = async (
    req : Request,
    res : Response,
    next : NextFunction
) => {
    try {
        let {id} = req.params;
        const _id = mongoose.Types.ObjectId(id);
        await Category.deleteOne({
            _id
        })

        res.status(HttpStatusCode.OK).send({data:true})
    } catch (error) {
        console.log("Function: Delete One Category");
        next(error);
    }
}

export { getAllCategory, getOneCategory, postOneCategory, updateOneCategory, deleteOneCategory }