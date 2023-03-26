import { createCanvas } from "@napi-rs/canvas";

export default async function handler(req, res) {
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
    // ctx.fillText("Hello", 100, 200);
    ctx.rect(0, 0, 100, 100);
    ctx.fillText(`${name}`, 100, 100);
    ctx.fillText(`${email}`, 100, 300);
    ctx.fillText(`${website}`, 100, 500);

    // Export the canvas as a PNG image buffer
    const buffer = canvas.toBuffer("image/png");

    // Set the response headers
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    );
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", "attachment; filename=myimage.png");
    res.send(buffer);
    res.status(200);
    return;
  }
  res.status(400).json({ message: "Invalid method" });
  return;
}
