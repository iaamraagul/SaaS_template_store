import mongoose from "mongoose";
const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    thumbnail_url: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, default: 49 },
    technology: { type: String, default: "REACT", trim: true },
    added: { type: String, default: "AVAILABLE NOW", trim: true },
  },
  { timestamps: true, versionKey: false },
);
templateSchema.virtual("id").get(function () {
  return this._id.toString();
});
templateSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  },
});
export default mongoose.model("Template", templateSchema);
