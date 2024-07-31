import { connectDb } from "./db/index.js";
import "dotenv/config";
import { app } from "./app.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server started at", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("mongodb connection failed due to", err);
  });
