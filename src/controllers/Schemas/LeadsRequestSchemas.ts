import { z } from "zod";

const CreateLeadRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  status: z
    .enum([
      "New",
      "Contacted",
      "Qualified",
      "Converted",
      "Unresponsive",
      "Disqualified",
      "Archived",
    ])
    .optional(),
});

const UpdateLeadRequestSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    status: z
      .enum([
        "New",
        "Contacted",
        "Qualified",
        "Converted",
        "Unresponsive",
        "Disqualified",
        "Archived",
      ])
      .optional(),
  })
  .transform((data) => ({
    ...data,
    updatedAt: new Date(),
  }));

export { CreateLeadRequestSchema, UpdateLeadRequestSchema };
