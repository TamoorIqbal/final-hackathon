import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URI)
    // .connect("mongodb+srv://Tamoor:moontmk123@cluster0.vs7d7eb.mongodb.net/fashionApp?retryWrites=true&w=majority")

    .then((c) => {
      console.log(`Mongodb connect to: ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};

export default connectDatabase;
