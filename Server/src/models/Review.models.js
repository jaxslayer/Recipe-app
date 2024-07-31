import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
  Title: {
    type: String,
    default: "",
  },
  Description: {
    type: String,
    default: "",
  },
  Reviewer: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  Likes: {
    type: Number,
    default: 1,
    enum: [1, 2, 3, 4, 5],
  },
  Recipe: {
    type: Schema.Types.ObjectId,
    ref: "recipes",
  },
  Meal: {
    type: Schema.Types.ObjectId,
    ref: "mealplans",
  },
});

export const Review = mongoose.model("Review", ReviewSchema);
