import { Router, type IRouter } from "express";
import { prisma } from "@workspace/db";

const router: IRouter = Router();

router.get("/cases", async (req, res, next) => {
  try {
    const userId = String(req.header("x-user-id") ?? "").trim();
    if (!userId) { res.status(401).json({ error: "Authentication required" }); return; }
    const rows = await prisma.recoveryCase.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(rows.map((row) => ({ ...row, amountInvolved: row.amountInvolved.toFixed(2) })));
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
    const category = String(body.category ?? "Other financial matter").trim();
    const amount = Number(body.amountInvolved ?? 0);
    const incidentDate = body.incidentDate ? String(body.incidentDate) : null;
    if (title.length < 3 || title.length > 160 || description.length < 10 || description.length > 10000 || institution.length < 2 || institution.length > 160 || !category || !Number.isFinite(amount) || amount < 0 || amount > 1000000000 || (incidentDate !== null && !/^\\d{4}-\\d{2}-\\d{2}$/.test(incidentDate))) {
      res.status(400).json({ error: "Check the case details and try again." });
      return;
    }
    const id = `CW-${Date.now().toString(36).toUpperCase()}`;
    const created = await prisma.$transaction(async (tx) => {
      const row = await tx.recoveryCase.create({
        data: {
          id,
          userId,
          title,
          description,
          institution,
          category,
          amountInvolved: amount.toFixed(2),
          incidentDate: incidentDate ? new Date(`${incidentDate}T00:00:00.000Z`) : null,
          status: "Submitted",
        },
      });
      await tx.caseStatusHistory.create({
        data: {
          id: `${id}-submitted`,
          caseId: id,
          status: "Submitted",
          note: "Case submitted by client",
          changedBy: userId,
        },
      });
      return row;
    });
    res.status(201).json({ ...created, amountInvolved: created.amountInvolved.toFixed(2) });
  } catch (error) { next(error); }
});

export default router;
