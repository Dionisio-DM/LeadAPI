import { start } from "repl";
import { z } from "zod";

const GetCampaignRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  sortBy: z.enum(["name", "startDate", "endDate"]).optional(),
  order: z.enum(["desc", "asc"]).optional(),
});

const CreateCampaignRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
});

const UpdateCampaignRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

const LeadCampaignStatusSchema = z.enum([
  "New",
  "Engaged",
  "Fllowup_schedule",
  "Contacted",
  "Qualified",
  "Disqualified",
  "Converted",
  "Unresponsive",
  "Re_Engaged",
  "Opted_out",
]);

export const GetCampaignLeadsRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: LeadCampaignStatusSchema.optional(),
  sortBy: z.enum(["name", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const AddLeadRequestSchema = z.object({
  leadId: z.number(),
  status: LeadCampaignStatusSchema.optional(),
});

export const UpdateLeadStatusRequestSchema = z.object({
  status: LeadCampaignStatusSchema,
});

export {
  GetCampaignRequestSchema,
  CreateCampaignRequestSchema,
  UpdateCampaignRequestSchema,
};
