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
  const [useTextMode, setUseTextMode] = useState(false); // Toggle between image and text mode

  // Create our own target ref since we no longer use react-to-pdf
  const targetRef = useRef<HTMLDivElement>(null);

  // Initialize the document upload flow
  const documentUpload = useDocumentUploadFlow();

  // Text-based PDF generation for much smaller file sizes
  const generateTextPDFFromContent = useCallback(async (): Promise<jsPDF> => {
    if (!targetRef.current) {
      throw new Error('Target reference not available for PDF generation');
    }

    // Create jsPDF instance
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Extract text content from the DOM element
    const element = targetRef.current;
    const textContent = element.innerText || element.textContent || '';

    // Split text into lines that fit the page width
    const lines = pdf.splitTextToSize(textContent, 180); // 180mm for text width

    // Add text to PDF with proper formatting
    let y = 20; // Start 20mm from top
    const lineHeight = 6; // 6mm line height
    const pageHeight = 280; // Usable page height

    pdf.setFontSize(10);

    lines.forEach((line: string) => {
      // Check if we need a new page
      if (y > pageHeight) {
        pdf.addPage();
        y = 20;
      }

      pdf.text(line, 15, y); // 15mm margin from left
      y += lineHeight;
    });

    return pdf;
  }, [targetRef]);

  // Shared PDF generation logic with mode selection
  const generatePDFFromContent = useCallback(async (): Promise<jsPDF> => {
    if (useTextMode) {
      return generateTextPDFFromContent();
    }

    if (!targetRef.current) {
      throw new Error('Target reference not available for PDF generation');
    }

    // Use html2canvas to capture the element as an image
    const canvas = await html2canvas(targetRef.current, {
      scale: 1, // Reduced from 2 to 1 for smaller file size
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false, // Disable logging for performance
      removeContainer: true,
    });

    // Create jsPDF instance
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true, // Enable compression
    });

    // Calculate dimensions to fit the content on the PDF page
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Convert canvas to image data with compression
    const imgData = canvas.toDataURL('image/jpeg', 0.8); // Use JPEG with 80% quality instead of PNG

    // Add the image to PDF with compression
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'MEDIUM'); // Add compression level
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'MEDIUM');
      heightLeft -= pageHeight;
    }

    return pdf;
  }, [targetRef, useTextMode, generateTextPDFFromContent]);

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
    // PDF generation mode controls
    useTextMode,
    setUseTextMode, // Toggle between image-based (false) and text-based (true) PDF generation
    // Expose document upload flow for detailed status tracking
    documentUpload,
  };
};
