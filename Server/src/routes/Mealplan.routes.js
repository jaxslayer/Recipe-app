import { Router } from "express";
import { Auth } from "../middlewares/Auth.middleware.js";
import { upload } from "../middlewares/Multer.middlerware.js";
import {
  CreateMeal,
  DeleteMeal,
  EditMeal,
  GetMeal,
  GetMeals,
  SearchMeal,
} from "../controllers/Mealplan.controller.js";
const router = Router();

router.route("/create").post(Auth, upload.single("Mealimg"), CreateMeal);
router.route("/delete").delete(DeleteMeal);
router.route("/edit").patch(Auth, upload.single("Mealimg"), EditMeal);
router.route("/getbyid").get(GetMeal);
router.route("/get").get(GetMeals);
router.route("/search").get(SearchMeal);

export default router;
