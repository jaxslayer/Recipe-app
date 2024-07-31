import mongoose from "mongoose";
import { dbName } from "../constants.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODBURL}/${dbName}`
    );
    console.log("Mongodb connected to", connectionInstance.connection.host);
  } catch (error) {
    console.log("Mongodb connection failed", error);
    process.exit(1);
  }
};

export { connectDb };
