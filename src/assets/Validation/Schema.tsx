import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(12, { message: "Password must be not more than 12 characters" }),
});

export const SignupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be at most 20 characters" })
    .nonempty({ message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
  mobile: z
    .string()
    .min(1, { message: "Mobile number is required" })
    .regex(/^\d+$/, { message: "Mobile number must contain only digits" })
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(10, { message: "Mobile number must be at most 10 digits" }),
});

export const ForgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim(),
});
export const OffersDescriptionSchema = z.object({
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(20, "Description must be at most 20 characters long"),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters" })
      .max(20, { message: "New password must be at most 20 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
          message:
            "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const CourseSchema = z.object({
  courseName: z
    .string()
    .min(3, "Course Name must be at least 3 characters long")
    .max(20, "Course Name must be at most 20 characters long")
    .regex(
      /^[A-Za-z\s]+$/,
      "Course Name must contain only alphabets and spaces"
    ),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(100, "Description must be at most 100 characters long"),
  prize: z.string().min(1, "Prize is required"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .max(20, "Course Name must be at most 10 characters long")
    .regex(
      /^[A-Za-z0-9\s]+$/,
      "Duration must contain only alphabets, numbers, and spaces"
    ),
  discount: z
    .string()
    .optional()
    .refine((value) => !value || (Number(value) >= 1 && Number(value) <= 100), {
      message: "Discount must be between 1 and 100 if provided",
    }),
  thumbnail: z
    .any()
    .refine((files) => files?.length >= 1, "Thumbnail is required")
    .refine(
      (files) => files?.[0]?.size <= 20480, // 20KB in bytes
      "Thumbnail size must be less than 20KB"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type
        ),
      "Only JPEG, JPG, PNG, and WebP formats are supported"
    ),
});
