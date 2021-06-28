import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
  @prop({ required: true, minlength: 6, maxlength: 30 })
  public username: string;

  @prop({ required: false })
  public email: string;

  @prop({ required: false, minlength: 6, maxlength: 100 })
  public password: string;

  @prop({
    default:
      'https://i0.wp.com/dev.slack.com/img/avatars/ava_0010-512.v1443724322.png?ssl=1',
    required: true,
  })
  public avatar: string;

  @prop({
    required: false
  })
  public accessToken: string
}

const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});

export default UserModel;
