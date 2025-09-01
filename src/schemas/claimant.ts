import { z } from 'zod';

// Claimant Schema
export const claimantSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must not exceed 100 characters'),
  isClaimant: z.string().min(1, 'Please select if you are a claimant'),
  gender: z.string().min(1, 'Please select your gender'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      (val) => {
        const date = new Date(val);
        const now = new Date();

        // Only compare if date is valid
        return !isNaN(date.getTime()) && date <= now;
      },
      { message: 'Date of birth cannot be in the future' }
    ),
  addressLine1: z.string().min(1, 'Address Line 1 is required').max(255, 'Address Line 1 is too long'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required').max(100, 'City name is too long'),
  postalCode: z.string().min(1, 'Postal code is required').max(20, 'Postal code is too long'),
  country: z.string().min(1, 'Please select a country'),
  isPolicyHolder: z.string().min(1, 'Please select if you are a policy holder'),
});

// Type export
export type ClaimantFormData = z.infer<typeof claimantSchema>;
