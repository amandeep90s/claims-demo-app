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

// Incident Type Schema
export const incidentTypeSchema = z
  .object({
    incidentType: z.enum(
      ['travel-delay', 'travel-misconnection', 'trip-cancellation', 'medical-accident', 'lost-baggage', 'others'],
      {
        message: 'Please select an incident type',
      }
    ),
    otherDescription: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.incidentType === 'others' && (!data.otherDescription || data.otherDescription.trim() === '')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['otherDescription'],
        message: 'Please describe the other incident type',
      });
    }
  });

// Base Incident Details Schema (common fields)
export const baseIncidentDetailsSchema = z.object({
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

// Travel Delay Dynamic Fields Schema
export const travelDelayFieldsSchema = z.object({
  flightNumber: z.string().min(1, 'Flight/Transport number is required'),
  departureDate: z.string().min(1, 'Scheduled departure date is required'),
  arrivalDate: z.string().min(1, 'Actual arrival date is required'),
  delayDuration: z.string().min(1, 'Delay duration is required'),
});

// Travel Misconnection Dynamic Fields Schema
export const travelMisconnectionFieldsSchema = z.object({
  flightNumber: z.string().min(1, 'Initial flight number is required'),
  delayDuration: z.string().min(1, 'Connection time missed is required'),
});

// Trip Cancellation Dynamic Fields Schema
export const tripCancellationFieldsSchema = z.object({
  cancellationReason: z.string().min(1, 'Cancellation reason is required'),
  departureDate: z.string().min(1, 'Original departure date is required'),
});

// Medical/Accident Dynamic Fields Schema
export const medicalAccidentFieldsSchema = z.object({
  medicalFacility: z.string().min(1, 'Medical facility name is required'),
  treatmentDate: z.string().min(1, 'Treatment date is required'),
  diagnosisCode: z.string().optional(),
});

// Lost Baggage Dynamic Fields Schema
export const lostBaggageFieldsSchema = z.object({
  baggageClaimNumber: z.string().min(1, 'Baggage claim number is required'),
  flightNumber: z.string().min(1, 'Flight number is required'),
  itemsLost: z.string().min(10, 'Please provide details about lost items (minimum 10 characters)'),
  purchaseReceipts: z.boolean().optional(),
});

/**
 * IMPORTANT: Dynamic Field Keys
 *
 * These field names are considered "dynamic" and will be cleared from the
 * incident-details store when the incident type changes. If you add new
 * dynamic fields to any of the schemas above, make sure to also update
 * the `dynamicFieldKeys` array in `claimsFormStore.ts`.
 *
 * Current dynamic fields:
 * - flightNumber, departureDate, arrivalDate, delayDuration
 * - cancellationReason, medicalFacility, diagnosisCode, treatmentDate
 * - baggageClaimNumber, itemsLost, purchaseReceipts
 */

// Function to get incident details schema based on incident type
export const getIncidentDetailsSchema = (incidentType?: string) => {
  switch (incidentType) {
    case 'travel-delay':
      return baseIncidentDetailsSchema.and(travelDelayFieldsSchema);
    case 'travel-misconnection':
      return baseIncidentDetailsSchema.and(travelMisconnectionFieldsSchema);
    case 'trip-cancellation':
      return baseIncidentDetailsSchema.and(tripCancellationFieldsSchema);
    case 'medical-accident':
      return baseIncidentDetailsSchema.and(medicalAccidentFieldsSchema);
    case 'lost-baggage':
      return baseIncidentDetailsSchema.and(lostBaggageFieldsSchema);
    default:
      // For 'others' or no selection, return only base schema
      return baseIncidentDetailsSchema;
  }
};

// Legacy schema for backward compatibility
export const incidentDetailsSchema = baseIncidentDetailsSchema.and(
  z.object({
    // All optional dynamic fields for TypeScript types
    flightNumber: z.string().optional(),
    departureDate: z.string().optional(),
    arrivalDate: z.string().optional(),
    delayDuration: z.string().optional(),
    cancellationReason: z.string().optional(),
    medicalFacility: z.string().optional(),
    diagnosisCode: z.string().optional(),
    treatmentDate: z.string().optional(),
    baggageClaimNumber: z.string().optional(),
    itemsLost: z.string().optional(),
    purchaseReceipts: z.boolean().optional(),
  })
);

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
export type IncidentTypeFormData = z.infer<typeof incidentTypeSchema>;
export type ClaimTypeFormData = z.infer<typeof claimTypeSchema>;
export type PolicyDetailsFormData = z.infer<typeof policyDetailsSchema>;
export type ClaimantDetailsFormData = z.infer<typeof claimantDetailsFormSchema>;
export type IncidentDetailsFormData = z.infer<typeof incidentDetailsSchema>;
export type ReviewDetailsFormData = z.infer<typeof reviewDetailsSchema>;

// Dynamic field type exports
export type TravelDelayFieldsData = z.infer<typeof travelDelayFieldsSchema>;
export type TravelMisconnectionFieldsData = z.infer<typeof travelMisconnectionFieldsSchema>;
export type TripCancellationFieldsData = z.infer<typeof tripCancellationFieldsSchema>;
export type MedicalAccidentFieldsData = z.infer<typeof medicalAccidentFieldsSchema>;
export type LostBaggageFieldsData = z.infer<typeof lostBaggageFieldsSchema>;
