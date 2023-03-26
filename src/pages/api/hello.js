// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";

export default function handler(req, res) {
  console.log(req.query);
  res.status(200).json(JSON.stringify(fs));
}
