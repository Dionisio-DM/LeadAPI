import { z } from "zod";

const LeadStatusSchema = z.enum([
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Archived",
]);

const GetLeadsRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: LeadStatusSchema.optional(),
  sortBy: z.enum(["name", "status"]).optional(),
  order: z.enum(["desc", "asc"]).optional(),
});

const CreateLeadRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  status: LeadStatusSchema.optional(),
});

const UpdateLeadRequestSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    status: LeadStatusSchema.optional(),
  })
  .transform((data) => ({
    ...data,
    updatedAt: new Date(),
  }));

export {
  CreateLeadRequestSchema,
  UpdateLeadRequestSchema,
  GetLeadsRequestSchema,
};
