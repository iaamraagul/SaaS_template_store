import { Router } from "express";
import { getTemplate, listTemplates } from "../controllers/templates.js";
const router = Router();
router.get("/", listTemplates);
router.get("/:id", getTemplate);
export default router;
