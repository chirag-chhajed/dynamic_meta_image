import fs from "fs";
import { join } from "path";
import microCors from "micro-cors";

const cors = microCors({
  allowMethods: ["GET", "HEAD"],
  origin: '*'
});

export default cors(async (req, res) => {
  if (req.query.slug && req.query.slug.length) {
    console.log(req.query.slug);
    const publicDir = join(process.cwd(), "uploads");
    const fileUrl = req.query.slug.join("/");
    console.log(join(publicDir, fileUrl));
    fs.readFileSync(publicDir + fileUrl, (error, data) => {
      if (error) {
        return res.status(404).send(null);
      }
      // res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).send(data);
    });
  } else {
    res.status(404).send(null);
  }
});
