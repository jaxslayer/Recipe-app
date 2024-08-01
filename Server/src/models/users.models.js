import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    Username: {
      type: String,
    },
    Mail: {
      type: String,
      required: true,
    },
    Fullname: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      enum: ["Cook", "Planner", "Food Enthusiat"],
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Avatar: {
      type: String,
      required: true,
    },
    Savedrecipe: {
      type: [mongoose.Types.ObjectId],
      ref: "recipes",
    },
    Savedmeal: {
      type: [mongoose.Types.ObjectId],
      ref: "mealplans",
    },
    RefreashToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  this.Password = await bcrypt.hash(this.Password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.Password);
};

UserSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      Username: this.Username,
      Mail: this.Mail,
      Fullname: this.Fullname,
      Role: this.Role,
    },
    process.env.ACCESS_SECRETKEY,
    {
      expiresIn: process.env.ACCESS_EXPIRE,
    }
  );
};
UserSchema.methods.generateRefreashToken = async function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFREASH_SECRETKEY,
    {
      expiresIn: process.env.REFREASH_EXPIRE,
    }
  );
};

export const User = mongoose.model("User", UserSchema);
