import { Router } from "express";
import {
  CreateUser,
  GetUser,
  LoginUser,
  LogoutUser,
  RefreshAccessToken,
  SaveRecipe,
  SaveMeal,
  Saved,
  UpdateUser,
} from "../controllers/User.controller.js";
import { upload } from "../middlewares/Multer.middlerware.js";
import { Auth } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/create").post(upload.single("Avatar"), CreateUser);
router.route("/login").get(LoginUser);
router.route("/logout").post(Auth, LogoutUser);
router.route("/getuser").get(Auth, GetUser);
router.route("/updateuser").patch(Auth, upload.single("Avatar"), UpdateUser);
router.route("/refresh").patch(RefreshAccessToken);
router.route("/savedrecipe").post(Auth, SaveRecipe);
router.route("/savedmeal").post(Auth, SaveMeal);
router.route("/getsaved").get(Auth, Saved);
export default router;
