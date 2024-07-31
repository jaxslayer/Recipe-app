import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";

export const Auth = asyncHandler(async (req, res, next) => {
  const Accesstoken = req.cookies.Accesstoken;
  if (!Accesstoken) throw new Apierror(400, "No Access token");
  const decode = jwt.decode(Accesstoken, process.env.ACCESS_SECRETKEY);
  if (!decode) throw new Apierror(400, "Invalid accesstoken");
  const user = await User.findById(decode.id).select(
    "-Password -RefreashToken"
  );
  if (!user) throw new Apierror(400, "Invalid Access token");
  req.user = user;
  next();
});
