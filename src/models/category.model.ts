import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

export class Category {
    @prop({required: true})
    public categoryName: string

    @prop({required: true})
    public categoryDescription: string
    
    @prop({ref: Category, default: [], required: false})
    public category : Ref<Category>[];
}

const CategoryModel = getModelForClass(Category, {
    schemaOptions: {
        timestamps: true
    }
})

export default CategoryModel