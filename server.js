import dotenv from "dotenv";
import app from "./app.js";


import connectDatabase from "./config/database.js";

dotenv.config({ path: "./config/config.env" });

connectDatabase();


app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port: ${process.env.PORT} `);
});
