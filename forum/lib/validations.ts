import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const signupFormSchema = z.object({
  username: z
    .string()
    .regex(/^(?!.*@).*/, { message: "Username cannot contain the @ symbol." })
    .min(2, { message: "Username must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const signinFormSchema = z.object({
  username: z
    .string()
    .regex(/^(?!.*@).*/, { message: "Username cannot contain the @ symbol." })
    .min(2, { message: "Username must be at least 2 characters long." })
    .trim(),
  password: z
    .string()
    .trim(),
});

export type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SignUpFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
