import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../constants/HTTPStatusCode";
import { IResponse } from "src/types/response.types";
import Category from "../../models/category.model";
import mongoose from 'mongoose';
import categoryService from "../../services/Category/category.service";

const getAllCategory = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await categoryService.getAllCategory();
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
    const data = await categoryService.getOneCategory(id);
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
        const newCategory = {
            categoryName,
            categoryDescription,
            category
        }
        await categoryService.createOneCategory(newCategory);
        res.status(HttpStatusCode.OK).send({
          data:true,
          message: 'Create success',
          code: HttpStatusCode.OK
      })
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
        const { categoryName, categoryDescription, category,  } = req.body;
        
        const newCategory = {
          categoryName : categoryName,
          categoryDescription: categoryDescription,
          category: category
        }

        await categoryService.updateOneCategory(id,newCategory );

        res.status(HttpStatusCode.OK).send({
          data:true,
          message: 'Update success',
          code: HttpStatusCode.OK
      })
    } catch (error) {
        console.log("Function: Update One Category");
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

        await categoryService.deleteOneCategory(id);

        res.status(HttpStatusCode.OK).send({
          data:true,
          message: 'Delete success',
          code: HttpStatusCode.OK
      })
    } catch (error) {
        console.log("Function: Delete One Category");
        next(error);
    }
}

export { getAllCategory, getOneCategory, postOneCategory, updateOneCategory, deleteOneCategory }