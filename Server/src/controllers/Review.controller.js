import { Review } from "../models/Review.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Apierror } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/ApiResponse.js";

const WriteReviewForMeal = asyncHandler(async (req, res) => {
  const { id, Title, Description, Likes } = req.body;
  if (
    [id, Title, Description, Likes].some(
      (field) => field == "" || field == undefined
    )
  )
    throw new Apierror(400, "Not all field are field");
  const review = new Review({
    Title,
    Description,
    Reviewer: req.user._id,
    Likes,
    Meal: id,
  });
  await review.save();
  if (!review) throw new Apierror(500, "Review creation failed");
  res.status(200).json(new Apiresponse(200, [review], "Review created"));
});
const WriteReviewForRecipe = asyncHandler(async (req, res) => {
  const { id, Title, Description, Likes } = req.body;
  if (
    [id, Title, Description, Likes].some(
      (field) => field == "" || field == undefined
    )
  )
    throw new Apierror(400, "Not all field are field");
  const review = new Review({
    Title,
    Description,
    Reviewer: req.user._id,
    Likes,
    Recipe: id,
  });
  await review.save();
  if (!review) throw new Apierror(500, "Review creation failed");
  res.status(200).json(new Apiresponse(200, [review], "Review created"));
});

const GetReview = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const reviewer = req.user._id;
  const review = await Review.findOne({
    $and: [
      {
        $or: [{ Recipe: id }, { Meal: id }],
      },
      { Reviewer: reviewer },
    ],
  });
  res.status(200).json(new Apiresponse(200, [review], "Review retrived"));
});

const UpdateReview = asyncHandler(async (req, res) => {
  const { id, Title, Description, Likes } = req.body;
  console.log(Title);
  if (
    [id, Title, Description, Likes].some(
      (field) => field == "" || field == undefined
    )
  )
    throw new Apierror(400, "Not all field are field");
  const review = await Review.findOneAndUpdate(
    {
      $and: [
        { $or: [{ Meal: id }, { Recipe: id }] },
        { Reviewer: req.user._id },
      ],
    },
    { Title, Description, Likes }
  );
  if (!review) throw new Apierror("Failed to update review");
  const newReview = await Review.findById(review._id);
  res
    .status(200)
    .json(new Apiresponse(200, [newReview], "Review updated successfully"));
});

const TotalLikes = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const review = await Review.find({
    $or: [{ Meal: id }, { Recipe: id }],
  }).select("Likes");
  if (!review) {
    res.status(200).json(new Apierror(200, [{ Likes: 1 }], "only one star"));
  }
  let totallikes = 0;
  let count = 0;
  review.forEach((field, index) => {
    totallikes += field.Likes;
    count = index + 1;
  });
  res.json(
    new Apiresponse(200, [Math.round(totallikes / count)], "Toral likes")
  );
});

export {
  WriteReviewForMeal,
  WriteReviewForRecipe,
  GetReview,
  UpdateReview,
  TotalLikes,
};
