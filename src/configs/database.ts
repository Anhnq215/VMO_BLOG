import mongoose from "mongoose";

const db = {
  prefix: process.env.DB_CONNECT_STRING_PREFIX,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: "",
};

const connect = async () => {
  try {
    const auth = db.username ? `${db.username}:${db.password}@` : "";
    const MONGO_URI = `mongodb${db.prefix}://${auth}${db.host}${db.port}/${process.env.DB_NAME}?${process.env.DB_CONNECT_OPTIONS}`;
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    console.log("Mongodb is connected");
  } catch (error) {
      console.log('Unable to connect');
      console.log(error);
  }
};

export const disconect = async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
};

export default connect;
