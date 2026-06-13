import { z } from 'zod'
import { maxNameLength, maxMessageLength } from '../config'

export const createEntrySchema = z
  .object({
    name: z.string().trim().min(1).max(maxNameLength),
    message: z.string().trim().min(1).max(maxMessageLength),
    website: z.string().max(0).optional(),
  })
  .strict()

export type CreateEntryInput = z.infer<typeof createEntrySchema>
