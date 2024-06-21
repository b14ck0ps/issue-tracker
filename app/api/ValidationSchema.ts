import { Status } from "@prisma/client";
import { z } from "zod";

const StatusEnum = z.enum([Status.OPEN, Status.IN_PROGRESS, Status.CLOSED]);

export const issueSchema = z.object({
  title: z.string().min(1, "Title is Required").max(255),
  description: z.string().min(1, "Description is Required").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is Required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is Required")
    .max(65535)
    .optional(),
  assigenedToUserId: z
    .string()
    .min(1, "Assigned To is Required")
    .max(255)
    .optional()
    .nullable(),
  status: StatusEnum.optional(),
});
