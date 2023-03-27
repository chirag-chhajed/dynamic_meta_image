import fs from "fs";
import { join } from "path";
import microCors from "micro-cors";

const cors = microCors({
  allowMethods: ["GET", "HEAD"],
});

export default cors(async (req, res) => {
  if (req.query.slug && req.query.slug.length) {
    console.log(req.query.slug);
    const publicDir = __dirname.split(".next")[0] + "public/";
    const fileUrl = req.query.slug.join("/");
    console.log(join(publicDir, fileUrl));
    fs.readFile(publicDir + fileUrl, (error, data) => {
      if (error) {
        return res.status(404).send(null);
      }
      return res.status(200).send(data);
    });
  } else {
    res.status(404).send(null);
  }
});
