import mongoose from "mongoose";

export const connection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("db connected");
    });
    connection.on("error", (error) => {
      console.log(error, "Error on Connection");
      process.exit();
    });
  } catch (err) {
    console.log(err, "Something went wrong in connection to db");
  }
};
