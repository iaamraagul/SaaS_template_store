import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/token.js";
const safeUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
});
const validate = (name, email, password) => {
  if (name !== undefined && (!name || name.trim().length < 2))
    return "Name must be at least 2 characters.";
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    return "Enter a valid email address.";
  if (!password || password.length < 8)
    return "Password must be at least 8 characters.";
};
export async function register(req, res) {
  const { name, email, password } = req.body || {};
  const error = validate(name, email, password);
  if (error) return res.status(400).json({ success: false, message: error });
  const normalized = email.trim().toLowerCase();
  if (await User.exists({ email: normalized }))
    return res.status(409).json({
      success: false,
      message: "An account with that email already exists.",
    });
  const user = await User.create({
    name: name.trim(),
    email: normalized,
    passwordHash: await bcrypt.hash(password, 12),
  });
  res.status(201).json({
    success: true,
    data: { user: safeUser(user), token: signToken(user) },
  });
}
export async function login(req, res) {
  const { email, password } = req.body || {};
  const error = validate(undefined, email, password);
  if (error) return res.status(400).json({ success: false, message: error });
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select(
    "+passwordHash",
  );
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res
      .status(401)
      .json({ success: false, message: "Email or password is incorrect." });
  res.json({
    success: true,
    data: { user: safeUser(user), token: signToken(user) },
  });
}
