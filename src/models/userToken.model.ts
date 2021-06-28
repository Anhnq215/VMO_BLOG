import { getModelForClass, prop } from "@typegoose/typegoose";

export class UserToken {
    @prop({
        required: true
    })
    username: string

    @prop({
        required: true
    })
    refreshToken: string
}

const UserTokenModel = getModelForClass(UserToken, {
    schemaOptions: {
        timestamps: true
    }
})

export default UserTokenModel;