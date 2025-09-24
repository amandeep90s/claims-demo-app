import { useCallback, useState } from 'react';
import { usePDF } from 'react-to-pdf';

import { uploadFile, type UploadFileResponse } from '@/utils/mockAPI';

interface UsePDFGenerationProps {
  onUploadSuccess?: (response: UploadFileResponse) => void;
  onUploadError?: (error: any) => void;
}

export const usePDFGeneration = ({ onUploadSuccess, onUploadError }: UsePDFGenerationProps = {}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<UploadFileResponse | null>(null);
  const [lastGeneratedBlob, setLastGeneratedBlob] = useState<Blob | null>(null);

  const { toPDF, targetRef } = usePDF({
    filename: `claim-review-${new Date().toISOString().split('T')[0]}.pdf`,
    page: {
      margin: 20,
      format: 'A4',
    },
  });

  // Upload PDF blob to server
  const uploadPDFFile = useCallback(async (pdfBlob: Blob): Promise<UploadFileResponse> => {
    // Use the mock API for now - replace with real API endpoint in production
    return uploadFile(pdfBlob, {
      type: 'claim-review',
      category: 'supporting-document',
    });
  }, []);

  // Simple PDF generation without upload (for preview) - uses toPDF directly
  const generatePDFOnly = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Use react-to-pdf toPDF for direct browser preview
      await toPDF();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('PDF preview generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [toPDF]);

  // Generate PDF and upload for final submission
  const generateAndUploadPDF = useCallback(async (): Promise<UploadFileResponse> => {
    setIsUploading(true);

    try {
      // For upload, we need to create a blob - using a simple approach for now
      // In a real app, you'd want to use the same PDF generation as preview
      const pdfContent = 'Mock PDF content for upload simulation';
      const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });

      setLastGeneratedBlob(pdfBlob);

      // Upload the PDF and get the URL
      const response = await uploadPDFFile(pdfBlob);

      setUploadResponse(response);
      onUploadSuccess?.(response);

      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('PDF generation or upload failed:', error);
      onUploadError?.(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, [uploadPDFFile, onUploadSuccess, onUploadError]);

  return {
    targetRef,
    generateAndUploadPDF,
    generatePDFOnly, // Simple PDF generation for browser preview
    isGenerating,
    isUploading,
    uploadResponse, // Contains fileUrl for final submission
    lastGeneratedBlob, // Access to the last generated PDF blob
    isProcessing: isGenerating || isUploading,
  };
};
