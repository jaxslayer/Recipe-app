import mongoose, { Schema } from "mongoose";

const RecipeSchema = new Schema({
  Name: {
    type: String,
  },
  Description: {
    type: String,
  },
  Category: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"],
  },
  ingredients: [
    {
      _id: false,
      ingredient: {
        type: String,
      },
      quantity: {
        type: String,
      },
    },
  ],
  Recipeimg: {
    type: String,
  },
  Creator: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
});

export const Recipe = mongoose.model("Recipe", RecipeSchema);
