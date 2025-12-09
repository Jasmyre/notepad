import z from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(64, {
      message: "Can not exceed max 64 characters.",
    }),

  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." })
    .max(2500, { message: "Can not exceed max 2500 characters." }),
});
