import { createCanvas } from "@napi-rs/canvas";
import fs from "fs";
import path from "path";
import microCors from "micro-cors";

const cors = microCors({
  allowMethods: ["GET", "HEAD"],
});

export default cors(async (req, res) => {
  // Create a canvas element
  if (req.method === "GET") {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");
    console.log(req.query);

    const { name, email, website, id } = req.query;
    // Set the background color
    ctx.fillStyle = "#d62828";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color and font
    ctx.fillStyle = "#eae2b7";
    ctx.font = "bold 64px Arial";

    // Draw the text
    // ctx.fillText("Hello", 100, 200);
    ctx.rect(0, 0, 100, 100);
    ctx.fillText(`${name}`, 100, 100);
    ctx.fillText(`${email}`, 100, 300);
    ctx.fillText(`${website}`, 100, 500);

    // Export the canvas as a PNG image buffer
    const buffer = canvas.toBuffer("image/png");
    const publicPath = path.join(process.cwd(), "public");

    fs.writeFileSync(`${publicPath}/${id}.png`, buffer);
    if (fs.existsSync(`${publicPath}/undefined.png`)) {
      fs.unlink(`${publicPath}/undefined.png`);
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ data: "Hello World" });
    res.status(200);
    return;
  }
  res.status(400).json({ message: "Invalid method" });
  return;
});
