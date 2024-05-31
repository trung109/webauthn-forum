import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const signUpFormSchema = z
  .object({
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
    confirmPassword: z.string().trim(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signInFormSchema = z.object({
  username: z
    .string()
    .regex(/^(?!.*@).*/, { message: "Username cannot contain the @ symbol." })
    .min(2, { message: "Username must be at least 2 characters long." })
    .trim(),
  password: z.string().trim(),
});

export const webAuthnSignInFormSchema = z.object({
  username: z
    .string()
    .regex(/^(?!.*@).*/, { message: "Username cannot contain the @ symbol." })
    .min(2, { message: "Username must be at least 2 characters long." })
    .trim(),
});

export const profileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5),
  bio: z.string().min(10).max(150),
});

export const settingsSchema = z
.object({
  currentPassword: z
  .string()
  .min(8, { message: "Be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  .regex(/[0-9]/, { message: "Contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Contain at least one special character.",
  })
  .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  confirmPassword: z.string().trim(),
})
.superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
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

export type WebAuthnSignInFormState =
  | {
      errors?: {
        email?: string[];
      };
      message?: string;
    }
  | undefined;
