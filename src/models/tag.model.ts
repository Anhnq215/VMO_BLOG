import { getModelForClass, prop } from "@typegoose/typegoose";

export class Tag {
    @prop({required: true})
    public tagName : string;

    @prop({required: true})
    public tagDescription: string;
}

const TagModel = getModelForClass(Tag, {
    schemaOptions: {
        timestamps: true
    }
})

export default TagModel;


