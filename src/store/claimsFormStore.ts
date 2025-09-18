import { create } from 'zustand';

export type ClaimStep =
  | 'claim-type'
  | 'policy-details'
  | 'claimant-details'
  | 'incident-type'
  | 'incident-details'
  | 'review-details';

interface ClaimsFormState {
  currentStep: ClaimStep;
  completedSteps: ClaimStep[];

  // Unified form data object with screen IDs as keys
  formData: {
    'claim-type': Record<string, any>;
    'policy-details': Record<string, any>;
    'claimant-details': Record<string, any>;
    'incident-type': Record<string, any>;
    'incident-details': Record<string, any>;
    'review-details': Record<string, any>;
  };

  // Actions
  setCurrentStep: (step: ClaimStep) => void;
  markStepAsCompleted: (step: ClaimStep) => void;
  setFormData: (screenId: ClaimStep, data: Record<string, any>) => void;
  getStepData: (step: ClaimStep) => Record<string, any>;
  clearIncidentDetailsDynamicFields: () => void;

  // Navigation helpers
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  canGoNext: () => boolean;
  canGoPrevious: () => boolean;

  // Reset
  resetForm: () => void;

  // Get all form data
  getAllFormData: () => {
    claimType: Record<string, any>;
    policyDetails: Record<string, any>;
    claimantDetails: Record<string, any>;
    incidentType: Record<string, any>;
    incidentDetails: Record<string, any>;
    reviewDetails: Record<string, any>;
  };
}

const stepOrder: ClaimStep[] = [
  'claim-type',
  'policy-details',
  'claimant-details',
  'incident-type',
  'incident-details',
  'review-details',
];

export const useClaimsFormStore = create<ClaimsFormState>((set, get) => ({
  currentStep: 'claim-type',
  completedSteps: [],

  formData: {
    'claim-type': {},
    'policy-details': {},
    'claimant-details': {},
    'incident-type': {},
    'incident-details': {},
    'review-details': {},
  },

  setCurrentStep: (step) => set({ currentStep: step }),

  markStepAsCompleted: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step) ? state.completedSteps : [...state.completedSteps, step],
    })),

  setFormData: (screenId, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [screenId]: { ...state.formData[screenId], ...data },
      },
    })),

  getStepData: (step) => {
    const state = get();

    return state.formData[step] || {};
  },

  clearIncidentDetailsDynamicFields: () =>
    set((state) => {
      const currentIncidentDetails = state.formData['incident-details'];

      // Define all dynamic field keys that should be cleared
      const dynamicFieldKeys = [
        'flightNumber',
        'departureDate',
        'arrivalDate',
        'delayDuration',
        'cancellationReason',
        'medicalFacility',
        'diagnosisCode',
        'treatmentDate',
        'baggageClaimNumber',
        'itemsLost',
        'purchaseReceipts',
      ];

      // Create new incident details object without dynamic fields
      const clearedIncidentDetails = Object.keys(currentIncidentDetails).reduce(
        (acc, key) => {
          if (!dynamicFieldKeys.includes(key)) {
            acc[key] = currentIncidentDetails[key];
          }

          return acc;
        },
        {} as Record<string, any>
      );

      return {
        formData: {
          ...state.formData,
          'incident-details': clearedIncidentDetails,
        },
      };
    }),

  goToNextStep: () => {
    const { currentStep } = get();
    const currentIndex = stepOrder.indexOf(currentStep);

    if (currentIndex < stepOrder.length - 1) {
      set({ currentStep: stepOrder[currentIndex + 1] });
    }
  },

  goToPreviousStep: () => {
    const { currentStep } = get();
    const currentIndex = stepOrder.indexOf(currentStep);

    if (currentIndex > 0) {
      set({ currentStep: stepOrder[currentIndex - 1] });
    }
  },

  canGoNext: () => {
    const { currentStep } = get();
    const currentIndex = stepOrder.indexOf(currentStep);

    return currentIndex < stepOrder.length - 1;
  },

  canGoPrevious: () => {
    const { currentStep } = get();
    const currentIndex = stepOrder.indexOf(currentStep);

    return currentIndex > 0;
  },

  resetForm: () =>
    set({
      currentStep: 'claim-type',
      completedSteps: [],
      formData: {
        'claim-type': {},
        'policy-details': {},
        'claimant-details': {},
        'incident-type': {},
        'incident-details': {},
        'review-details': {},
      },
    }),

  getAllFormData: () => {
    const state = get();

    return {
      claimType: state.formData['claim-type'],
      policyDetails: state.formData['policy-details'],
      claimantDetails: state.formData['claimant-details'],
      incidentType: state.formData['incident-type'],
      incidentDetails: state.formData['incident-details'],
      reviewDetails: state.formData['review-details'],
    };
  },
}));
