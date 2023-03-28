import { createCanvas } from "@napi-rs/canvas";
import cloudinary from "cloudinary";
import microCors from "micro-cors";
import dotenv from "dotenv";
dotenv.config();

const cors = microCors({
  allowMethods: true,
  allowOrigins: true,
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.YOUR_CLOUD_NAME,
  api_key: process.env.YOUR_API_KEY,
  api_secret: process.env.YOUR_API_SECRET,
});


export default cors(async (req, res) => {
  // Create a canvas element
  if (req.method === "GET") {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");
    console.log(req.query);

    const { name, email, website } = req.query;

    // Set the background color
    ctx.fillStyle = "#d62828";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color and font
    ctx.fillStyle = "#eae2b7";
    ctx.font = "bold 64px Arial";

    // Draw the text
    ctx.fillText(`${name}`, 100, 100);
    ctx.fillText(`${email}`, 100, 300);
    ctx.fillText(`${website}`, 100, 500);

    // Export the canvas as a PNG image buffer
    const buffer = canvas.toDataURL("image/png");

    try {
      // Upload image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(buffer);
      // Return Cloudinary secure URL
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    res.status(400).json({ message: "Invalid method" });
  }
});