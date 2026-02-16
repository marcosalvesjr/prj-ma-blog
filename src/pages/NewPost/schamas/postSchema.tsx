import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  content: z.string().min(10, "O conteúdo deve ser mais detalhado"),
  slug: z.string().min(3, "O slug é obrigatório"),
});

export type PostFormValues = z.infer<typeof postSchema>;