// app/lib/validation.ts
import { z } from "zod";

export const CreateListSchema = z.object({
  userId: z.string(),
  name: z.string().trim()
    .min(1, 'List name must be at least 1 character')
    .max(140, 'List name can be max 140 characters'),
});

export const CreateTaskSchema = z.object({
  listId: z.string(),
  title: z.string().trim()
    .min(1, 'Title must be at least 1 character')
    .max(140, 'Title can be max 140 characters'),
  tags: z.array(z.string()).default([]),
});

export const UpdateTaskSchema = z.object({
  title: z.string().trim()
    .min(1, 'Title must be at least 1 character')
    .max(140, 'Title can be max 140 characters')
    .optional(),
  completed: z.boolean().optional(),
});

export const UpdateListSchema = z.object({
  name: z.string().trim()
    .min(1, 'List name must be at least 1 character')
    .max(140, 'List name can be max 140 characters'),
});
