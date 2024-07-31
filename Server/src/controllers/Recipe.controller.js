import { Recipe } from "../models/recipes.models.js";
import { Apiresponse } from "../utils/ApiResponse.js";
import { Apierror } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Uploader, Deleter } from "../utils/Cloudinary.js";
import fs from "fs";
import { Capitalize } from "../utils/Capitalize.js";
import { Regex } from "../utils/regex.js";

const CreateRecipe = asyncHandler(async (req, res) => {
  const file = req.file.path;
  if (!file) throw new Apierror(400, "Image not entered");
  const { name, Description, Category, ingredient, quantity } = req.body;
  if (
    [name, Description, Category, ingredient, quantity].some(
      (field) => field == "" || field == undefined
    )
  ) {
    fs.unlinkSync(file);
    throw new Apierror(400, "All fields are not entered");
  }
  const Name = Capitalize(name);
  let ingredients;
  if (Array.isArray(ingredient) && Array.isArray(quantity)) {
    if (ingredient.length !== quantity.length) {
      fs.unlinkSync(file);
      throw new Apierror(
        400,
        "Mismatched lengths of ingredients and quantities"
      );
    }
    ingredients = ingredient.map((item, index) => ({
      ingredient: item,
      quantity: quantity[index],
    }));
  } else ingredients = [{ ingredient, quantity }];
  const response = await Uploader(file);
  if (!response)
    throw new Apierror(400, "Something went wrong while uploading the file");
  const Recipeimg = response.url;
  const recipe = new Recipe({
    Name,
    Description,
    Category,
    ingredients,
    Recipeimg,
    Creator: req.user._id,
  });
  await recipe.save();
  if (!recipe) {
    await Deleter(Recipeimg);
    throw Apierror(500, "Unable to create recipe");
  }
  res
    .status(200)
    .json(new Apiresponse(200, [recipe], "Recipe created successfully"));
});

const EditRecipe = asyncHandler(async (req, res) => {
  const file = req.file.path;
  if (!file) throw new Apierror(400, "Image not entered");
  const { id, name, Description, Category, ingredient, quantity } = req.body;
  if (
    [name, Description, Category, ingredient, quantity].some(
      (field) => field == "" || field == undefined
    )
  ) {
    fs.unlinkSync(file);
    throw new Apierror(400, "All fields are not entered");
  }
  const existrecipe = await Recipe.findById(id);
  console.log(req.user._id, existrecipe.Creator);
  if (!existrecipe) throw new Apierror(400, "Recipe doesnot exist");
  if (!(req.user._id.toString() == existrecipe.Creator.toString())) {
    fs.unlinkSync(file);
    throw new Apierror(400, "No access to Recipe");
  }
  const Name = Capitalize(name);
  let ingredients;
  if (Array.isArray(ingredient) && Array.isArray(quantity)) {
    if (ingredient.length !== quantity.length) {
      fs.unlinkSync(file);
      throw new Apierror(
        400,
        "Mismatched lengths of ingredients and quantities"
      );
    }
    ingredients = ingredient.map((item, index) => ({
      ingredient: item,
      quantity: quantity[index],
    }));
  } else ingredients = [{ ingredient, quantity }];
  const response = await Uploader(file);
  if (!response)
    throw new Apierror(400, "Something went wrong while uploading the file");
  const Recipeimg = response.url;
  const response2 = Deleter(existrecipe.Recipeimg);
  if (!response2) {
    Deleter(Recipeimg);
    throw new Apierror(400, "Failed to deleted recipe");
  }
  const recipe = await Recipe.findByIdAndUpdate(
    id,
    {
      Name,
      Description,
      Category,
      ingredients,
      Recipeimg,
    },
    { new: true, runValidators: true }
  );
  if (!recipe) {
    Deleter(Recipeimg);
    throw new Apierror(500, "Something went wrong while changing the details");
  }
  res
    .status(200)
    .json(new Apiresponse(200, [recipe], "Details changed successfully"));
});

const GetRecipe = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) throw new Apierror(400, "id not specified");
  const recipe = await Recipe.findById(id);
  if (!recipe) throw new Apierror(400, "Recipe not found");
  res
    .status(200)
    .json(new Apiresponse(200, [recipe], "Recipe recieved successfully"));
});

const GetRecipes = asyncHandler(async (req, res) => {
  const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(20);
  res
    .status(200)
    .json(new Apiresponse(200, [recipe], "Recipe recieved successfully"));
});

const SearchRecipe = asyncHandler(async (req, res) => {
  const { Search } = req.body;
  if (!Search) throw new Apierror("Search field not filled");
  const search = Capitalize(Search);
  const regex = Regex(search);
  const recipe = await Recipe.find({ Name: { $regex: regex } });
  if (!recipe) throw new Apierror(400, "No recipes found");
  res
    .status(200)
    .json(new Apiresponse(200, [recipe], "Recipe recieved successfully"));
});

const DeleteRecipe = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const recipe = await Recipe.findByIdAndDelete(id);
  if (!recipe) throw new Apierror(400, "no recipe found");
  res
    .status(200)
    .json(new Apiresponse(200, [recipe], "Recipe deleted successfully"));
});

const FilterRecipe = asyncHandler(async (req, res) => {
  const { Category } = req.body;
  const recipe = await Recipe.find({ Category });
  if (!recipe) throw new Apierror(400, "No Recipes Found");
  res
    .status(200)
    .json(new Apiresponse(200, [recipe], "Filter Recipe Completed"));
});

const GetName = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const recipe = await Recipe.find({ _id: id }).select("Name");
  if (!recipe) throw new Apierror(400, "No recipe found");
  res.status(200).json(new Apiresponse(200, [recipe], "Recipe found"));
});

export {
  CreateRecipe,
  EditRecipe,
  GetRecipe,
  DeleteRecipe,
  FilterRecipe,
  GetName,
  GetRecipes,
  SearchRecipe,
};
