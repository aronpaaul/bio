import { z } from 'zod'

export const proofSchema = z
  .object({
    challengeId: z.string().uuid(),
    iv: z.string().regex(/^[0-9a-f]{24}$/),
    data: z.string().regex(/^[0-9a-f]{32,8192}$/),
  })
  .strict()
