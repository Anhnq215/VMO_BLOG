import { mongoose } from "@typegoose/typegoose";
import { IResponse } from "src/types/response.types";
import Tag  from "../../models/tag.model"


const getAllTag = async () => {
    const listTag = await Tag.find();
    const data : IResponse<typeof listTag> = {
        data: listTag
    }
    return data;
}

const getOneTag = async (id : string) => {
        const _id = mongoose.Types.ObjectId(id);
        const tag = await Tag.find({
            _id
        });
        const data: IResponse<typeof tag> = {
            data: tag
        }
} 

const deleteOneTag = async (id: string) => {
        const _id = mongoose.Types.ObjectId(id);

        await Tag.deleteOne({
            _id
        });
}

const createOneTag = async (newTag : any) => {
    newTag = new Tag( newTag);
    await newTag.save();
}

const updateOneTag = async (id: string, newTag: any) => {
    const _id = mongoose.Types.ObjectId(id);
    const tagInDB = await Tag.findOne({
        _id
    })

    if (tagInDB) {
        await tagInDB.update({
            ...newTag
        })
    }
}

export default {
    getAllTag: getAllTag,
   getOneTag: getOneTag,
 deleteOneTag:deleteOneTag,
 createOneTag: createOneTag,
 updateOneTag: updateOneTag
 };
 