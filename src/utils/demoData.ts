// Demo data for testing the review page
export const demoFormData = {
  claimType: {
    claimType: 'Medical Expenses',
    subType: 'Emergency Treatment',
    description:
      'I was walking down the stairs at my hotel when I slipped and fell. I hurt my ankle and had to seek immediate medical attention at the local hospital.',
  },
  policyDetails: {
    policyNumber: 'AW-SG-123456789',
    policyHolderName: 'John Tan',
    productType: 'Travel Insurance',
    policyStartDate: '01/01/2024',
    policyEndDate: '31/12/2024',
    coverageAmount: 'SGD 100,000',
  },
  claimantDetails: {
    isPolicyHolder: 'Yes',
    firstName: 'John',
    lastName: 'Tan',
    email: 'john.tan@example.com',
    phoneNumber: '+65 6785 6438',
    dateOfBirth: '15/03/1998',
    gender: 'Male',
    relationship: 'Self',
    address: {
      line1: '123 Orchard Road',
      line2: '#12-34 Orchard Towers',
      city: 'Singapore',
      postalCode: '238874',
      country: 'Singapore',
    },
  },
  incidentDetails: {
    incidentDate: '15/08/2024',
    incidentTime: '14:30',
    incidentLocation: 'Bangkok, Thailand',
    incidentDescription:
      'I was walking down the stairs at my hotel when I slipped and fell due to wet floors. I hurt my ankle badly and had to seek immediate medical attention at the local hospital. The medical bills included X-rays, consultation fees, and medication.',
    estimatedLoss: 'SGD 2,500',
    policeReportNumber: 'PR-2024-08-001',
    witnesses: [
      {
        name: 'Jane Smith',
        contact: '+66 123 456 789',
      },
      {
        name: 'Hotel Staff - Maria',
        contact: 'maria@hotel.com',
      },
    ],
    attachments: [
      {
        name: 'medical_receipt_001.pdf',
        type: 'application/pdf',
        size: 2048576, // 2MB
      },
      {
        name: 'xray_results.jpg',
        type: 'image/jpeg',
        size: 1536000, // 1.5MB
      },
      {
        name: 'police_report.pdf',
        type: 'application/pdf',
        size: 512000, // 0.5MB
      },
    ],
  },
};
