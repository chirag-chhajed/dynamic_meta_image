import { createCanvas } from "@napi-rs/canvas";
import { promisify } from "util";
import { join } from "path";
import fs from "fs";
import process from "process";

export default async function handler(req, res) {
  // Create a canvas element
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // Set the background color
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set the text color and font
  ctx.fillStyle = "#000";
  ctx.font = "bold 64px Arial";

  // Draw the text
  ctx.fillText("Hello", 100, 200);

  // Export the canvas as a PNG image buffer
  const buffer = canvas.toBuffer("image/png");

  // Write the buffer to a temporary file
  const writeFile = promisify(fs.writeFile);
  const filePath = join(process.cwd());
  await writeFile(filePath, buffer);

  // Set the response headers
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=86400, immutable");

  // Stream the image file to the response
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);

  // Delete the temporary file
  fs.unlinkSync(filePath);
}
