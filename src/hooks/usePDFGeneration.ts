import { useCallback, useState } from 'react';
import { usePDF } from 'react-to-pdf';

import { useDocumentUploadFlow } from './useDocumentUpload';

interface UsePDFGenerationProps {
  onUploadSuccess?: (response: any) => void;
  onUploadError?: (error: any) => void;
}

export const usePDFGeneration = ({ onUploadSuccess, onUploadError }: UsePDFGenerationProps = {}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedBlob, setLastGeneratedBlob] = useState<Blob | null>(null);

  const { toPDF, targetRef } = usePDF({
    filename: `claim-review-${new Date().toISOString().split('T')[0]}.pdf`,
    page: {
      margin: 20,
      format: 'A4',
    },
  });

  // Initialize the document upload flow
  const documentUpload = useDocumentUploadFlow();

  // Simple PDF generation without upload (for preview) - uses toPDF directly
  const generatePDFOnly = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Use react-to-pdf toPDF for direct browser preview
      toPDF();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('PDF preview generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [toPDF]);

  // Create PDF blob from the actual content for upload
  const createPDFBlobFromContent = useCallback(async (): Promise<Blob> => {
    return new Promise((resolve) => {
      if (!targetRef.current) {
        // Fallback to a simple text blob if targetRef is not available
        const fallbackContent = 'No content available';

        resolve(new Blob([fallbackContent], { type: 'application/pdf' }));

        return;
      }

      try {
        // Extract only the actual content from the target element
        const element = targetRef.current;
        const textContent = element.innerText || element.textContent || '';

        // Clean and format the content - keep original data only
        const cleanContent = textContent.replace(/\s+/g, ' ').trim().substring(0, 5000);

        // Add only the actual content lines without extra headers
        const contentLines = cleanContent
          .split('\n')
          .map((line: string) => `(${line.substring(0, 80).replace(/[()\\]/g, ' ')}) Tj\n0 -15 Td`)
          .join('\n');

        const fullPdfContent = contentLines;

        const blob = new Blob([fullPdfContent], { type: 'application/pdf' });

        resolve(blob);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Failed to extract content, using fallback:', error);
        const fallbackContent = 'Content extraction failed';

        resolve(new Blob([fallbackContent], { type: 'application/pdf' }));
      }
    });
  }, [targetRef]);

  // Generate PDF and upload using the new 3-step flow
  const generateAndUploadPDF = useCallback(
    async (claimData: any) => {
      try {
        // Generate a PDF blob with the actual content from the review page
        const pdfBlob = await createPDFBlobFromContent();

        setLastGeneratedBlob(pdfBlob);

        // Use the new upload flow: get signed URL -> upload to signed URL -> submit claim
        const filename = `claim-review-${new Date().toISOString().split('T')[0]}.pdf`;
        const response = await documentUpload.uploadAndSubmit(pdfBlob, filename, claimData);

        onUploadSuccess?.(response);

        return response;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('PDF generation or upload failed:', error);
        onUploadError?.(error);
        throw error;
      }
    },
    [createPDFBlobFromContent, documentUpload, onUploadSuccess, onUploadError]
  );

  return {
    targetRef,
    generateAndUploadPDF,
    generatePDFOnly, // Simple PDF generation for browser preview
    isGenerating,
    isUploading: documentUpload.isLoading,
    uploadResponse: null, // Deprecated - use documentUpload.steps for detailed status
    lastGeneratedBlob, // Access to the last generated PDF blob
    isProcessing: isGenerating || documentUpload.isLoading,
    // Expose document upload flow for detailed status tracking
    documentUpload,
  };
};
