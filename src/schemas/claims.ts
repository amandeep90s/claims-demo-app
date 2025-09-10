import { z } from 'zod';

// Claim Type Schema
export const claimTypeSchema = z.object({
  claimType: z.string().min(1, 'Please select a claim type'),
  subType: z.string().optional(),
  description: z.string().min(10, 'Please provide a detailed description (minimum 10 characters)'),
});

// Policy Details Schema
export const policyDetailsSchema = z.object({
  policyNumber: z.string().min(1, 'Policy number is required'),
  policyHolderName: z.string().min(1, 'Policy holder name is required'),
  productType: z.string().min(1, 'Please select a product type'),
  policyStartDate: z.string().min(1, 'Policy start date is required'),
  policyEndDate: z.string().min(1, 'Policy end date is required'),
  coverageAmount: z.string().min(1, 'Coverage amount is required'),
});

// Claimant Details Schema (reusing existing but simplified)
export const claimantDetailsFormSchema = z.object({
  isPolicyHolder: z.string().min(1, 'Please specify if you are the policy holder'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Please enter a valid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Please select gender'),
  relationship: z.string().optional(),
  address: z.object({
    line1: z.string().min(1, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
});

// Incident Details Schema
export const incidentDetailsSchema = z.object({
  incidentDate: z.string().min(1, 'Incident date is required'),
  incidentTime: z.string().min(1, 'Incident time is required'),
  incidentLocation: z.string().min(1, 'Incident location is required'),
  incidentDescription: z.string().min(20, 'Please provide a detailed description (minimum 20 characters)'),
  witnesses: z
    .array(
      z.object({
        name: z.string().min(1, 'Witness name is required'),
        contact: z.string().min(1, 'Witness contact is required'),
      })
    )
    .optional(),
  policeReportNumber: z.string().optional(),
  estimatedLoss: z.string().min(1, 'Estimated loss amount is required'),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .optional(),
});

// Review Details Schema (final submission)
export const reviewDetailsSchema = z.object({
  confirmAccuracy: z.boolean().refine((val) => val === true, {
    message: 'You must confirm that all information is accurate',
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  additionalComments: z.string().optional(),
});

// Type exports
export type ClaimTypeFormData = z.infer<typeof claimTypeSchema>;
export type PolicyDetailsFormData = z.infer<typeof policyDetailsSchema>;
export type ClaimantDetailsFormData = z.infer<typeof claimantDetailsFormSchema>;
export type IncidentDetailsFormData = z.infer<typeof incidentDetailsSchema>;
export type ReviewDetailsFormData = z.infer<typeof reviewDetailsSchema>;
