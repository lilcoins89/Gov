import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, recoveryCases } from "@workspace/db";

const router: IRouter = Router();

router.get("/cases", async (req, res, next) => {
  try {
    const userId = String(req.header("x-user-id") ?? "").trim();
    if (!userId) { res.status(401).json({ error: "Authentication required" }); return; }
    const rows = await db.select().from(recoveryCases).where(eq(recoveryCases.userId, userId)).orderBy(desc(recoveryCases.createdAt));
    res.json(rows);
  } catch (error) { next(error); }
});

router.post("/cases", async (req, res, next) => {
  try {
    const userId = String(req.header("x-user-id") ?? "").trim();
    if (!userId) { res.status(401).json({ error: "Authentication required" }); return; }
    const body = req.body as Record<string, unknown>;
    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const institution = String(body.institution ?? "").trim();
    const amount = Number(body.amountInvolved ?? 0);
    if (!title || !description || !institution || !Number.isFinite(amount) || amount < 0) { res.status(400).json({ error: "Invalid case details" }); return; }
    const id = `CW-${Date.now().toString(36).toUpperCase()}`;
    const [created] = await db.insert(recoveryCases).values({ id, userId, title, description, institution, category: String(body.category ?? "Other financial matter"), amountInvolved: amount.toFixed(2), incidentDate: body.incidentDate ? String(body.incidentDate) : null, status: "Submitted" }).returning();
    res.status(201).json(created);
  } catch (error) { next(error); }
});

export default router;
