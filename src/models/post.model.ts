import { getModelForClass, prop , Ref} from "@typegoose/typegoose";
import { Category } from "./category.model";
import { Tag } from "./tag.model";
import {User} from "./user.model";

export class Post {
    @prop({required: true})
    public title : string;

    @prop({required: true})
    public sapo : string;

    @prop({required: true})
    public summary : string;

    @prop({required: true})
    public content: string;

    @prop({ref: Tag, required: true})
    public tag: Ref<Tag>[];

    @prop({ref: User, required: true})
    public user: Ref<User>[];

    @prop({ref: Category, required: true})
    public category: Ref<Category>[];
}

const PostModel = getModelForClass(Post, {
    schemaOptions: {
        timestamps: true
    }
})
        
export default PostModel;