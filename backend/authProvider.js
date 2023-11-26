import jwt from "jsonwebtoken";
import user from "./models/user.js";
import { createToken } from "./app.js";

export default async function requireAuth(req, res) {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const verifiedUser = await user.findOne({ _id }).select("_id startup");
    res.json({token:createToken(verifiedUser._id),startup:verifiedUser.startup});
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};
