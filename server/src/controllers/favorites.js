import mongoose from "mongoose";
import Favorite from "../models/Favorite.js";
import Template from "../models/Template.js";
export async function listFavorites(req, res) {
  const rows = await Favorite.find({ user: req.user._id })
    .populate("template")
    .sort({ createdAt: -1 });
  res.json({
    success: true,
    data: rows.map((row) => row.template).filter(Boolean),
  });
}
export async function addFavorite(req, res) {
  if (!mongoose.isValidObjectId(req.params.templateId))
    return res
      .status(400)
      .json({ success: false, message: "Invalid template id." });
  const template = await Template.findById(req.params.templateId);
  if (!template)
    return res
      .status(404)
      .json({ success: false, message: "Template not found." });
  await Favorite.findOneAndUpdate(
    { user: req.user._id, template: template._id },
    { user: req.user._id, template: template._id },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  res.status(201).json({
    success: true,
    data: template,
    message: "Template added to favorites.",
  });
}
export async function removeFavorite(req, res) {
  if (!mongoose.isValidObjectId(req.params.templateId))
    return res
      .status(400)
      .json({ success: false, message: "Invalid template id." });
  await Favorite.deleteOne({
    user: req.user._id,
    template: req.params.templateId,
  });
  res.json({ success: true, message: "Template removed from favorites." });
}
