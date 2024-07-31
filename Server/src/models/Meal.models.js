import mongoose, { Schema } from "mongoose";

const MealplanSchema = new Schema({
  Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  Days: {
    type: [String],
    enum: ["1", "2", "3", "4", "5", "6", "7"],
  },
  Breakfast: {
    type: [mongoose.Types.ObjectId],
    ref: "recipes",
  },
  Lunch: {
    type: [mongoose.Types.ObjectId],
    ref: "recipes",
  },
  Dinner: {
    type: [mongoose.Types.ObjectId],
    ref: "recipes",
  },
  Creator: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  Mealimage: {
    type: String,
  },
});

export const Meal = mongoose.model("Mealplan", MealplanSchema);
