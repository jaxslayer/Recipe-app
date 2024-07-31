import { Router } from "express";
import { Auth } from "../middlewares/Auth.middleware.js";
import { upload } from "../middlewares/Multer.middlerware.js";
import {
  CreateRecipe,
  DeleteRecipe,
  EditRecipe,
  FilterRecipe,
  GetName,
  GetRecipe,
  GetRecipes,
  SearchRecipe,
} from "../controllers/Recipe.controller.js";

const router = Router();

router.route("/create").post(Auth, upload.single("Recipeimg"), CreateRecipe);
router.route("/Getname").get(GetName);
router.route("/Get").get(GetRecipes);
router.route("/Getrecipe").get(GetRecipe);
router.route("/Search").get(SearchRecipe);
router.route("/Filter").get(FilterRecipe);
router.route("/Edit").patch(Auth, upload.single("Recipeimg"), EditRecipe);
router.route("/Delete").delete(Auth, DeleteRecipe);

export default router;
