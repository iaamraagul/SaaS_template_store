import mongoose from "mongoose";
import Template from "../models/Template.js";
export async function listTemplates(req, res) {
  const query = {};
  if (req.query.search)
    query.$or = [
      { name: new RegExp(req.query.search, "i") },
      { description: new RegExp(req.query.search, "i") },
    ];
  if (req.query.category && req.query.category !== "All Categories")
    query.category = req.query.category;
  const templates = await Template.find(query).sort({ createdAt: -1 });
  res.json({ success: true, data: templates });
}
export async function getTemplate(req, res) {
  if (!mongoose.isValidObjectId(req.params.id))
    return res
      .status(400)
      .json({ success: false, message: "Invalid template id." });
  const template = await Template.findById(req.params.id);
  if (!template)
    return res
      .status(404)
      .json({ success: false, message: "Template not found." });
  res.json({ success: true, data: template });
}
