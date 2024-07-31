import { v2 } from "cloudinary";
import fs from "fs";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CloudinaryName,
  api_key: process.env.Apikey,
  api_secret: process.env.ApiSecret,
});

const Uploader = async (file) => {
  try {
    if (!file) return null;
    const response = await v2.uploader.upload(file);
    fs.unlinkSync(file);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(file);
    process.exit(1);
  }
};

const Deleter = async (url) => {
  try {
    if (!url) return null;
    const id = url.split("/");
    const pngid = id[id.length - 1].split(".");
    const publicId = pngid[0];
    const response = await v2.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { Uploader, Deleter };
