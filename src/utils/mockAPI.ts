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

// New interfaces for the signed URL upload flow
export interface GetSignedUrlRequest {
  filename: string;
  contentType: string;
}

export interface GetSignedUrlResponse {
  filename: string;
  id: string;
  signedPutUrl: string;
}

export interface FinalSubmitRequest {
  claimData: any;
  documentId: string;
  filename: string;
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

// New API functions for signed URL upload flow

// Step 1: Get signed URL for file upload
export const getSignedUrl = async (request: GetSignedUrlRequest): Promise<GetSignedUrlResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate success/failure randomly (99% success rate)
  if (Math.random() < 0.01) {
    throw new Error('Failed to get signed URL: Server error');
  }

  const mockResponse: GetSignedUrlResponse = {
    filename: request.filename,
    id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    signedPutUrl: `https://mock-storage.example.com/upload/${request.filename}?signature=mock_signature_${Date.now()}`,
  };

  // Log the response for development
  // eslint-disable-next-line no-console
  console.log('Signed URL generated:', mockResponse);

  return mockResponse;
};

// Step 2: Upload file to signed URL (PUT request)
export const uploadToSignedUrl = async (signedUrl: string, file: Blob): Promise<void> => {
  // Simulate network delay for file upload
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate success/failure randomly (98% success rate)
  if (Math.random() < 0.02) {
    throw new Error('File upload to signed URL failed');
  }

  // Log the upload for development
  // eslint-disable-next-line no-console
  console.log('File uploaded to signed URL:', signedUrl, 'Size:', file.size);
};

// Step 3: Final claim submission with document reference
export const submitClaimWithDocument = async (request: FinalSubmitRequest): Promise<ClaimSubmissionResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate success/failure randomly (99% success rate)
  if (Math.random() < 0.01) {
    throw new Error('Final claim submission failed: Invalid data');
  }

  const mockResponse: ClaimSubmissionResponse = {
    claimId: `claim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    claimNumber: `CL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    estimatedProcessingDays: Math.floor(Math.random() * 10) + 5, // 5-14 days
  };

  // Log the final submission for development
  // eslint-disable-next-line no-console
  console.log('Claim submitted with document:', {
    claimId: mockResponse.claimId,
    documentId: request.documentId,
    filename: request.filename,
  });

  return mockResponse;
};

// Mock API endpoints that can be used in development
export const mockAPI = {
  uploadFile,
  submitClaim,
  getSignedUrl,
  uploadToSignedUrl,
  submitClaimWithDocument,
};
