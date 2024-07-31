import { Meal } from "../models/Meal.models.js";
import { Apiresponse } from "../utils/ApiResponse.js";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Uploader, Deleter } from "../utils/Cloudinary.js";
import { Capitalize } from "../utils/Capitalize.js";
import { Regex } from "../utils/regex.js";
import fs from "fs";
const CreateMeal = asyncHandler(async (req, res) => {
  const file = req.file.path;
  if (!file) throw new Apierror(400, "image not entered");
  const { Title, Description, Days, Breakfast, Lunch, Dinner } = req.body;
  if (
    [Title, Description, Days].some(
      (field) => field == "" || field == undefined
    )
  ) {
    fs.unlinkSync(file);
    throw new Apierror(400, "All fields are not entered");
  }
  const response = await Uploader(file);
  if (!response) throw new Apierror(500, "Failed to upload image");
  const Mealimage = response.url;
  const meal = new Meal({
    Title: Capitalize(Title),
    Description,
    Days,
    Breakfast,
    Lunch,
    Dinner,
    Creator: req.user._id,
    Mealimage,
  });
  await meal.save();
  if (!meal) {
    Deleter(Mealimage);
    throw new Apierror(500, "Something went wrong while creating Meal");
  }
  res
    .status(200)
    .json(new Apiresponse(200, [meal], "Meal plan created successfully"));
});

const EditMeal = asyncHandler(async (req, res) => {
  const file = req.file.path;
  if (!file) throw new Apierror(400, "image not entered");
  const { id, Title, Description, Days, Breakfast, Lunch, Dinner } = req.body;
  if (
    [Title, Description, Days].some(
      (field) => field == "" || field == undefined || field == undefined
    )
  ) {
    fs.unlinkSync(file);
    throw new Apierror(400, "All fields are not entered");
  }
  const existmeal = await Meal.findById({ _id: id });
  if (!existmeal) throw new Apierror(400, "Meal doesnot exist");
  if (!req.user._id.toString() == existmeal.Creator.toString()) {
    fs.unlinkSync(file);
    throw new Apierror(400, "No access to meal");
  }
  const response = await Uploader(file);
  if (!response) throw new Apierror(500, "Failed to upload image");
  const Mealimage = response.url;
  const response2 = Deleter(existmeal.Mealimage);
  if (!response2) {
    Deleter(Mealimage);
    throw new Apierror(500, "Failed to upload image");
  }
  const meal = await Meal.findByIdAndUpdate(id, {
    Title: Capitalize(Title),
    Description,
    Days,
    Breakfast,
    Lunch,
    Dinner,
    Mealimage,
  });
  await meal.save();
  if (!meal) throw new Apierror(500, "Unable to Edit the mealplan");
  res
    .status(200)
    .json(new Apiresponse(200, [meal], "Meal plan created successfully"));
});

const DeleteMeal = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) throw new Apierror(400, "Not specified which meal to delete");
  const meal = await Meal.findByIdAndDelete(id);
  if (!meal) throw new Apierror(400, "Meal doesnot exist");
  res
    .status(200)
    .json(new Apiresponse(200, [meal], "Meal deleted successfully"));
});

const GetMeal = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) throw new Apierror(400, "Not specified which meal to get");
  const meal = await Meal.findById(id);
  if (!meal) throw new Apierror(400, "Meal doesnot exist");
  res
    .status(200)
    .json(new Apiresponse(200, [meal], "Meal retrieved successfully"));
});

const GetMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find().sort({ _id: -1 }).limit(10);
  res.status(200).json(new Apiresponse(200, [meals], "Meals retrieved"));
});

const SearchMeal = asyncHandler(async (req, res) => {
  const { search } = req.body;
  if (!search) throw new Apierror(400, "No search query entered");
  const regex = Regex(search);
  const meals = await Meal.find({ Title: { $regex: regex } });
  if (!meals) throw new Apierror(400, "No meal plan found");
  res.status(200).json(new Apiresponse(200, [meals], "meals searched"));
});

export { CreateMeal, EditMeal, DeleteMeal, GetMeal, GetMeals, SearchMeal };
