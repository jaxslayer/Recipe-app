import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cookieparser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import of routes
import UserRoute from "./routes/User.routes.js";
import RecipeRoute from "./routes/Recipe.routes.js";
import MealRouter from "./routes/Mealplan.routes.js";
import ReviewRouter from "./routes/Review.routes.js";

//use of routes
app.use("/v1/user", UserRoute);
app.use("/v1/recipe", RecipeRoute);
app.use("/v1/meal", MealRouter);
app.use("/v1/review", ReviewRouter);

export { app };
