import { Router } from "express";
import {
  GetReview,
  TotalLikes,
  WriteReviewForMeal,
  UpdateReview,
  WriteReviewForRecipe,
} from "../controllers/Review.controller.js";
import { Auth } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/createmeal").post(Auth, WriteReviewForMeal);
router.route("/createrecipe").post(Auth, WriteReviewForRecipe);
router.route("/get").get(Auth, GetReview);
router.route("/total").get(TotalLikes);
router.route("/update").patch(Auth, UpdateReview);

export default router;
