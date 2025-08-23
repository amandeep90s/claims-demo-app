import { z } from 'zod';

// Common validation patterns
const email = z.string().email('Please enter a valid email address');
const password = z.string().min(1, 'Password is required');
const strongPassword = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character (!@#$%^&*)')
  .refine((val) => !/\s/.test(val), {
    message: 'Password must not contain spaces',
  })
  .refine((val) => !/(.)\1{2,}/.test(val), {
    message: 'Password must not contain repeated characters (e.g., aaa)',
  });

const securityQuestion = z
  .string()
  .min(2, 'Answer must be at least 2 characters')
  .max(100, 'Answer must not exceed 100 characters');

// Sign In Schema
export const signInSchema = z.object({
  userId: email,
  password,
});

// Sign Up Schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email,
  personalId: z.string().min(1, 'Personal ID is required'),
  mobileNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?\d{10,15}$/.test(val), {
      message: 'Please enter a valid mobile number',
    }),
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email,
});

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: strongPassword,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Change Password Schema
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: strongPassword,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Set Password Schema (with security questions)
export const setPasswordSchema = z
  .object({
    password: strongPassword,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    securityQuestion1: securityQuestion,
    securityQuestion2: securityQuestion,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.securityQuestion1.toLowerCase() !== data.securityQuestion2.toLowerCase(), {
    message: 'Security question answers must be different',
    path: ['securityQuestion2'],
  });

// Complete Signup Schema (OTP verification)
export const completeSignupSchema = z.object({
  otp: z
    .string()
    .min(1, 'OTP is required')
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only numbers'),
});

// Type exports
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type SetPasswordFormData = z.infer<typeof setPasswordSchema>;
export type CompleteSignupFormData = z.infer<typeof completeSignupSchema>;
