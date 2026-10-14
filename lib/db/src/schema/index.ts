import { decimal, integer, pgTable, text, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const recoveryCases = pgTable("recovery_cases", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  amountInvolved: decimal("amount_involved", { precision: 14, scale: 2 }).notNull().default("0"),
  currency: text("currency").notNull().default("USD"),
  incidentDate: date("incident_date"),
  institution: text("institution").notNull(),
  status: text("status").notNull().default("Submitted"),
  assignedReviewer: text("assigned_reviewer"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const caseStatusHistory = pgTable("case_status_history", {
  id: text("id").primaryKey(),
  caseId: text("case_id").notNull(),
  status: text("status").notNull(),
  note: text("note"),
  changedBy: text("changed_by").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const caseEvidence = pgTable("case_evidence", {
  id: text("id").primaryKey(),
  caseId: text("case_id").notNull(),
  userId: text("user_id").notNull(),
  originalName: text("original_name").notNull(),
  storageKey: text("storage_key").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  sha256: text("sha256"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertRecoveryCaseSchema = createInsertSchema(recoveryCases).omit({ id: true, createdAt: true, updatedAt: true });
export type RecoveryCase = typeof recoveryCases.$inferSelect;
export type InsertRecoveryCase = z.infer<typeof insertRecoveryCaseSchema>;
export type CaseStatusHistory = typeof caseStatusHistory.$inferSelect;
export type CaseEvidence = typeof caseEvidence.$inferSelect;

