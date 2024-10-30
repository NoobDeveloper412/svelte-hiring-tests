import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// The types inferred from the Zod schema:
export type UserFormData = z.infer<typeof userFormSchema>;
export type FormErrors = Partial<Record<keyof UserFormData, string>>;
