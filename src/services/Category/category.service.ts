import { IResponse } from "src/types/response.types";
import Category from "../../models/category.model";
import mongoose from "mongoose";

const getAllCategory = async () => {
  const listCategory = await Category.find();
  const data: IResponse<typeof listCategory> = {
    data: listCategory,
  };

  return data;
};

const getOneCategory = async (id : string) => {
  const _id = mongoose.Types.ObjectId(id);
  const category = await Category.findOne({
    _id,
  });

  const data: IResponse<typeof category> = {
    data: category,
  };

  return data;
};

const deleteOneCategory = async (id : string) => {
  const _id = mongoose.Types.ObjectId(id);
  await Category.deleteOne({
      _id
  })
}

const createOneCategory = async (newCategory : any) => {

  newCategory = new Category(newCategory)

  await newCategory.save();
}

const updateOneCategory = async (id: string, newCategory: any) => {
  const _id = mongoose.Types.ObjectId(id);
  const categoryInDB = await Category.findOne({
      _id
  });

  const { categoryName, categoryDescription, category,  } = newCategory;


  if (categoryInDB) {
      await categoryInDB.update({
          categoryName,
          categoryDescription,
          category
      })
  }
}

export default {
   getAllCategory: getAllCategory,
  getOneCategory: getOneCategory,
deleteOneCategory:deleteOneCategory,
createOneCategory: createOneCategory,
updateOneCategory: updateOneCategory
};
