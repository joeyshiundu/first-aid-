import { z } from 'zod';

// Define the Zod schema for runtime validation
export const CreateVideoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    url: z.string().url("Invalid video URL"),
    thumbnail_url: z.string().url("Invalid thumbnail URL"),
    duration: z.number().int().positive("Duration must be a positive integer"),
    category: z.string(),
    is_public: z.boolean(),
    tags: z.array(z.string()),
    module_id: z.number().int(),
});

// Automatically infer the TypeScript type from the schema
export type CreateVideoDto = z.infer<typeof CreateVideoSchema>;
