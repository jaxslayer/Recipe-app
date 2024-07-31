import { User } from "../models/users.models.js";

import { Apiresponse } from "../utils/ApiResponse.js";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Uploader, Deleter } from "../utils/Cloudinary.js";
import fs from "fs";

const CreateUser = asyncHandler(async (req, res) => {
  const file = req.file.path;
  if (!file) throw Apierror(400, "Image not entered");
  const { Username, Mail, Fullname, Role, Password } = req.body;
  if (
    [Username, Mail, Fullname, Role, Password].some(
      (field) => field == "" || field == undefined
    )
  ) {
    fs.unlinkSync(file);
    throw new Apierror(400, "All field are not filled");
  }
  const existUser = await User.findOne({ $or: [{ Username }, { Mail }] });
  if (existUser) {
    fs.unlinkSync(file);
    throw new Apierror(400, "Username or Mail already exist");
  }
  const response = await Uploader(file);
  if (!response) {
    throw new Apierror(400, "Error occured while uploading the avatar");
  }
  const Avatar = response.url;
  const user = new User({ Username, Mail, Fullname, Role, Password, Avatar });
  if (!user) {
    await Deleter(Avatar);
    throw new Apierror(500, "Creating user failed");
  }
  const Accesstoken = await user.generateAccessToken();
  const Refreashtoken = await user.generateRefreashToken();
  user.RefreashToken = Refreashtoken;
  await user.save();
  const createdUser = await User.findById(user._id).select(
    "-Password -RefreashToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("Accesstoken", Accesstoken, options)
    .cookie("Refreshtoken", Refreashtoken, options)
    .json(new Apiresponse(200, [createdUser], "User created successfully"));
});

const LoginUser = asyncHandler(async (req, res) => {
  const { Username, Password } = req.body;
  if ([Username, Password].some((field) => field == "" || field == undefined)) {
    throw new Apierror(400, "All field are not filled");
  }
  const user = await User.findOne({ Username });
  if (!user) throw new Apierror(400, "Username is incorrect");
  if (!(await user.comparePassword(Password)))
    throw new Apierror(400, "Password is incorrect");
  const Accesstoken = await user.generateAccessToken();
  const Refreashtoken = await user.generateRefreashToken();
  user.RefreashToken = Refreashtoken;
  await user.save();
  const LoggedUser = await User.findById(user._id).select(
    "-Password -RefreashToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("Accesstoken", Accesstoken, options)
    .cookie("Refreshtoken", Refreashtoken, options)
    .json(new Apiresponse(200, [LoggedUser], "User Logged in successfully"));
});

const GetUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-Password -RefreashToken"
  );
  res.status(200).json(new Apiresponse(200, [user], "User info"));
});

const UpdateUser = asyncHandler(async (req, res) => {
  const file = req.file.path;
  if (!file) throw new Apierror(400, "Avatar not entered");
  const { Username, Fullname, Mail, Password, NPassword } = req.body;
  if (
    [Username, Fullname, Mail].some(
      (field) => field == "" || field == undefined
    )
  ) {
    fs.unlinkSync(file);
    throw new Apierror(400, "Username or Fullname or Mail is not filled ");
  }
  const user = await User.findById(req.user._id);
  if (Password != "" && NPassword != "") {
    if (!(await user.comparePassword(Password))) {
      fs.unlinkSync(file);
      throw new Apierror(400, "Incorrect password");
    }
    if (Password == NPassword) {
      fs.unlinkSync(file);
      throw new Apierror(400, "Password and new password match");
    }
    user.Password = NPassword;
  }
  const response = await Uploader(file);
  if (!response)
    throw new Apierror(500, "Error occured while uploading the avatar");
  const response2 = Deleter(req.user.Avatar);
  if (!response2) {
    Deleter(response.url);
    throw new Apierror(500, "Something went wrong");
  }
  user.Avatar = response.url;
  user.Username = Username;
  user.Fullname = Fullname;
  user.Mail = Mail;
  await user.save();
  const Updateduser = await User.findById(user._id).select(
    "-Password -RefreashToken"
  );
  res
    .status(200)
    .json(new Apiresponse(200, [Updateduser], "User updated successfully"));
});

const LogoutUser = asyncHandler(async (req, res) => {
  const logoutuser = await User.findById(req.user._id);
  logoutuser.RefreashToken = "";
  await logoutuser.save();
  res
    .status(200)
    .clearCookie("Accesstoken")
    .clearCookie("Refreshtoken")
    .json(new Apiresponse(200, [req.user], "User Logged out successfully"));
});

const RefreshAccessToken = asyncHandler(async (req, res) => {
  const refreshtoken = req.cookies.Refreshtoken;
  if (!refreshtoken) throw new Apierror(400, "No refresh token found");
  const user = await User.findOne({ RefreashToken: refreshtoken }).select(
    "-Password -RefreashToken"
  );
  if (!user) throw new Apierror(400, "Invalid Refresh token");
  const Accesstoken = await user.generateAccessToken();
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("Accesstoken", Accesstoken, options)
    .json(new Apiresponse(200, "Access token refreashed"));
});

const SaveRecipe = asyncHandler(async (req, res) => {
  const { id } = req.body; // Assuming `id` is the recipe ID
  console.log(id);
  if (!id) throw new Apierror(400, "No specific recipe selected");

  const user = await User.findById(req.user._id);
  if (!user) throw new Apierror(404, "User not found");
  // Check if the recipe is already saved
  if (user.Savedrecipe.includes(id)) {
    user.Savedrecipe.pop(id);
    await user.save();
    res
      .status(200)
      .json(new Apiresponse(200, [user], "Removed recipe from saved"));
  }

  // Add the recipe ID to the Savedrecipe array
  user.Savedrecipe.push(_id);

  await user.save();

  res.status(200).json(new Apiresponse(200, [user], "Recipe saved"));
});

const SaveMeal = asyncHandler(async (req, res) => {
  const { id } = req.body; // Assuming `id` is the recipe ID
  console.log(id);
  if (!id) throw new Apierror(400, "No specific recipe selected");

  const user = await User.findById(req.user._id);
  if (!user) throw new Apierror(404, "User not found");
  // Check if the recipe is already saved
  if (user.Savedmeal.includes(id)) {
    user.Savedmeal.pop(id);
    await user.save();
    res
      .status(200)
      .json(new Apiresponse(200, [user], "Removed recipe from saved"));
  }

  // Add the recipe ID to the Savedrecipe array
  user.Savedmeal.push(id);

  await user.save();

  res.status(200).json(new Apiresponse(200, [user], "Recipe saved"));
});

const Saved = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("Savedmeal Savedrecipe")
    .populate({
      path: "Savedmeal",
      model: "Mealplan", // This should match the model name defined in your schema
    })
    .populate({
      path: "Savedrecipe",
      model: "Recipe", // This should match the model name defined in your schema
    });
  res
    .status(200)
    .json(new Apiresponse(200, [user], "All saved meals and recipe"));
});

export {
  CreateUser,
  LoginUser,
  LogoutUser,
  GetUser,
  UpdateUser,
  RefreshAccessToken,
  SaveRecipe,
  SaveMeal,
  Saved,
};
