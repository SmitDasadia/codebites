import * as z from "zod";

export const BitesValidation = z.object({
  Bites: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  Bites: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});