import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useCallback, useRef, useState } from 'react';

import { useDocumentUploadFlow } from './useDocumentUpload';

interface UsePDFGenerationProps {
  onUploadSuccess?: (response: any) => void;
  onUploadError?: (error: any) => void;
}

export const usePDFGeneration = ({ onUploadSuccess, onUploadError }: UsePDFGenerationProps = {}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedBlob, setLastGeneratedBlob] = useState<Blob | null>(null);

  // Create our own target ref since we no longer use react-to-pdf
  const targetRef = useRef<HTMLDivElement>(null);

  // Initialize the document upload flow
  const documentUpload = useDocumentUploadFlow();

  // Shared PDF generation logic
  const generatePDFFromContent = useCallback(async (): Promise<jsPDF> => {
    if (!targetRef.current) {
      throw new Error('Target reference not available for PDF generation');
    }

    // Use html2canvas to capture the element as an image
    const canvas = await html2canvas(targetRef.current, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
    });

    // Create jsPDF instance
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Calculate dimensions to fit the content on the PDF page
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png');

    // Add the image to PDF
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf;
  }, [targetRef]);

  // Generate PDF for browser preview/download
  const generatePDFOnly = useCallback(async () => {
    setIsGenerating(true);
    try {
      const pdf = await generatePDFFromContent();

      // Download the PDF
      const filename = `claim-review-${new Date().toISOString().split('T')[0]}.pdf`;

      pdf.save(filename);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('PDF preview generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [generatePDFFromContent]);

  // Create PDF blob for upload
  const createPDFBlobFromContent = useCallback(async (): Promise<Blob> => {
    try {
      const pdf = await generatePDFFromContent();

      // Convert PDF to blob
      const pdfBlob = pdf.output('blob');

      return pdfBlob;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('PDF generation failed:', error);
      throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [generatePDFFromContent]);

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
