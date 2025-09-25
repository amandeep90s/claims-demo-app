import { useMutation } from '@tanstack/react-query';

import {
  getSignedUrl,
  submitClaimWithDocument,
  uploadToSignedUrl,
  type ClaimSubmissionResponse,
  type FinalSubmitRequest,
  type GetSignedUrlRequest,
  type GetSignedUrlResponse,
} from '@/utils/mockAPI';

// Hook for getting signed URL
export const useGetSignedUrl = () => {
  return useMutation<GetSignedUrlResponse, Error, GetSignedUrlRequest>({
    mutationFn: getSignedUrl,
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('✅ Signed URL obtained:', data.signedPutUrl);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('❌ Failed to get signed URL:', error.message);
    },
  });
};

// Hook for uploading file to signed URL
export const useUploadToSignedUrl = () => {
  return useMutation<void, Error, { signedUrl: string; file: Blob }>({
    mutationFn: ({ signedUrl, file }) => uploadToSignedUrl(signedUrl, file),
    onSuccess: () => {
      // eslint-disable-next-line no-console
      console.log('✅ File uploaded to signed URL successfully');
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('❌ Failed to upload file to signed URL:', error.message);
    },
  });
};

// Hook for final claim submission with document
export const useSubmitClaimWithDocument = () => {
  return useMutation<ClaimSubmissionResponse, Error, FinalSubmitRequest>({
    mutationFn: submitClaimWithDocument,
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('✅ Claim submitted successfully:', data.claimNumber);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('❌ Failed to submit claim:', error.message);
    },
  });
};

// Custom hook that orchestrates the entire upload flow
export const useDocumentUploadFlow = () => {
  const getSignedUrlMutation = useGetSignedUrl();
  const uploadToSignedUrlMutation = useUploadToSignedUrl();
  const submitClaimMutation = useSubmitClaimWithDocument();

  const isLoading =
    getSignedUrlMutation.isPending || uploadToSignedUrlMutation.isPending || submitClaimMutation.isPending;

  const uploadAndSubmit = async (pdfBlob: Blob, filename: string, claimData: any): Promise<ClaimSubmissionResponse> => {
    try {
      // Step 1: Get signed URL
      // eslint-disable-next-line no-console
      console.log('📤 Step 1: Getting signed URL for', filename);
      const signedUrlResponse = await getSignedUrlMutation.mutateAsync({
        filename,
        contentType: 'application/pdf',
      });

      // Step 2: Upload file to signed URL
      // eslint-disable-next-line no-console
      console.log('📤 Step 2: Uploading file to signed URL');
      await uploadToSignedUrlMutation.mutateAsync({
        signedUrl: signedUrlResponse.signedPutUrl,
        file: pdfBlob,
      });

      // Step 3: Submit claim with document reference
      // eslint-disable-next-line no-console
      console.log('📤 Step 3: Submitting claim with document reference');
      const claimResponse = await submitClaimMutation.mutateAsync({
        claimData,
        documentId: signedUrlResponse.id,
        filename: signedUrlResponse.filename,
      });

      return claimResponse;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('❌ Upload flow failed:', error);
      throw error;
    }
  };

  return {
    uploadAndSubmit,
    isLoading,
    error: getSignedUrlMutation.error || uploadToSignedUrlMutation.error || submitClaimMutation.error,
    reset: () => {
      getSignedUrlMutation.reset();
      uploadToSignedUrlMutation.reset();
      submitClaimMutation.reset();
    },
    // Individual mutation states for detailed tracking
    steps: {
      getSignedUrl: {
        isPending: getSignedUrlMutation.isPending,
        isSuccess: getSignedUrlMutation.isSuccess,
        error: getSignedUrlMutation.error,
      },
      uploadFile: {
        isPending: uploadToSignedUrlMutation.isPending,
        isSuccess: uploadToSignedUrlMutation.isSuccess,
        error: uploadToSignedUrlMutation.error,
      },
      submitClaim: {
        isPending: submitClaimMutation.isPending,
        isSuccess: submitClaimMutation.isSuccess,
        error: submitClaimMutation.error,
      },
    },
  };
};
