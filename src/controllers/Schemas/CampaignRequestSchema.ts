import { start } from "repl";
import { z } from "zod";

const GetCampaignRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  sortBy: z.enum(["name", "startDate", "updatedAt"]).optional(),
  order: z.enum(["desc", "asc"]).optional(),
});

const CreateCampaignRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.date(),
});

const UpdateCampaignRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export {
  GetCampaignRequestSchema,
  CreateCampaignRequestSchema,
  UpdateCampaignRequestSchema,
};
