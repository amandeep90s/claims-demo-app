// Mock API service for file upload and claim submission
// This simulates the API endpoints that would exist in a real application

export interface UploadFileResponse {
  fileId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  size: number;
  mimeType: string;
}

export interface ClaimSubmissionResponse {
  claimId: string;
  claimNumber: string;
  status: 'submitted' | 'processing' | 'approved' | 'rejected';
  submittedAt: string;
  estimatedProcessingDays: number;
}

// Mock file upload API
export const uploadFile = async (
  file: Blob,
  _metadata: {
    type: string;
    category: string;
  }
): Promise<UploadFileResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate success/failure randomly (98% success rate)
  if (Math.random() < 0.02) {
    throw new Error('Upload failed: Server error');
  }

  const mockResponse: UploadFileResponse = {
    fileId: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    fileName: `claim-review-${new Date().toISOString().split('T')[0]}.pdf`,
    fileUrl: `https://api.yourapp.com/files/claim-pdfs/file_${Date.now()}.pdf`, // This URL path will be used in final submission
    uploadedAt: new Date().toISOString(),
    size: file.size,
    mimeType: file.type,
  };

  // Log the upload response for development
  // eslint-disable-next-line no-console
  console.log('File uploaded successfully:', mockResponse);

  return mockResponse;
};

// Mock claim submission API
export const submitClaim = async (_claimData: any): Promise<ClaimSubmissionResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Simulate success/failure randomly (99% success rate)
  if (Math.random() < 0.01) {
    throw new Error('Claim submission failed: Invalid data');
  }

  const mockResponse: ClaimSubmissionResponse = {
    claimId: `claim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    claimNumber: `CL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    estimatedProcessingDays: Math.floor(Math.random() * 10) + 5, // 5-14 days
  };

  return mockResponse;
};

// Mock API endpoints that can be used in development
export const mockAPI = {
  uploadFile,
  submitClaim,
};
