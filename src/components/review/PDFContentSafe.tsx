import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

interface PDFContentProps {
  allFormData: {
    claimType: Record<string, any>;
    policyDetails: Record<string, any>;
    claimantDetails: Record<string, any>;
    incidentType: Record<string, any>;
    incidentDetails: Record<string, any>;
    reviewDetails: Record<string, any>;
  };
}

const PDFContentSafe: React.FC<PDFContentProps> = ({ allFormData }) => {
  // Extract form data - same logic as review page
  const claimTypeData = allFormData.claimType;
  const policyData = allFormData.policyDetails;
  const claimantData = allFormData.claimantDetails;
  const incidentData = allFormData.incidentDetails;

  // Build data arrays exactly like review page
  const claimTypeInfo = [
    { label: 'Claim Type', value: claimTypeData?.claimType || 'Medical Expenses', isHighlighted: true },
    { label: 'Sub Type', value: claimTypeData?.subType || 'Emergency Treatment' },
    {
      label: 'Description',
      value: claimTypeData?.description || 'Medical treatment required due to accident during travel',
    },
  ];

  const policyInfo = [
    { label: 'Policy Number', value: policyData?.policyNumber || 'AW-SG-123456789', isHighlighted: true },
    { label: 'Policy Holder Name', value: policyData?.policyHolderName || 'John Tan' },
    { label: 'Product Type', value: policyData?.productType || 'Travel Insurance' },
    { label: 'Policy Start Date', value: policyData?.policyStartDate || '01/01/2024' },
    { label: 'Policy End Date', value: policyData?.policyEndDate || '31/12/2024' },
    { label: 'Coverage Amount', value: policyData?.coverageAmount || 'SGD 100,000' },
    { label: 'Status', value: 'ACTIVE' },
  ];

  const claimantInfo = [
    { label: 'Are you the policy holder?', value: claimantData?.isPolicyHolder || 'Yes' },
    { label: 'First Name', value: claimantData?.firstName || 'John' },
    { label: 'Last Name', value: claimantData?.lastName || 'Tan' },
    { label: 'Email', value: claimantData?.email || 'john.tan@example.com' },
    { label: 'Phone Number', value: claimantData?.phoneNumber || '+65 6785 6438' },
    { label: 'Date of Birth', value: claimantData?.dateOfBirth || '15/03/1998' },
    { label: 'Gender', value: claimantData?.gender || 'Male' },
    { label: 'Relationship', value: claimantData?.relationship || 'Self' },
  ];

  const addressInfo = [
    { label: 'Address Line 1', value: claimantData?.address?.line1 || '123 Orchard Road' },
    { label: 'Address Line 2', value: claimantData?.address?.line2 || '#12-34 Orchard Towers' },
    { label: 'City', value: claimantData?.address?.city || 'Singapore' },
    { label: 'Postal Code', value: claimantData?.address?.postalCode || '238874' },
    { label: 'Country / Location', value: claimantData?.address?.country || 'Singapore' },
  ];

  const incidentInfo = [
    { label: 'Incident Date', value: incidentData?.incidentDate || '15/08/2024' },
    { label: 'Incident Time', value: incidentData?.incidentTime || '14:30' },
    { label: 'Incident Location', value: incidentData?.incidentLocation || 'Bangkok, Thailand' },
    { label: 'Estimated Loss', value: incidentData?.estimatedLoss || 'SGD 2,500', isHighlighted: true },
    { label: 'Police Report Number', value: incidentData?.policeReportNumber || 'PR-2024-08-001' },
  ];

  // Inline styles to avoid OKLCH color issues
  const styles = {
    container: {
      padding: '32px',
      backgroundColor: '#ffffff',
      color: '#000000',
      fontFamily: 'Arial, sans-serif',
      minHeight: '297mm',
      width: '210mm',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '32px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '14px',
      color: '#6B7280',
    },
    section: {
      marginBottom: '24px',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
    },
    sectionHeader: {
      padding: '16px',
      borderBottom: '1px solid #E5E7EB',
      backgroundColor: '#F9FAFB',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#111827',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    sectionContent: {
      padding: '16px',
    },
    gridItem: {
      display: 'flex',
      flexDirection: 'column' as const,
    },
    label: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#374151',
      marginBottom: '4px',
    },
    value: {
      fontSize: '14px',
      color: '#111827',
    },
    highlight: {
      backgroundColor: '#FEF3C7',
      padding: '2px 4px',
      borderRadius: '4px',
    },
    description: {
      backgroundColor: '#F9FAFB',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #E5E7EB',
    },
    financialSummary: {
      backgroundColor: '#EBF8FF',
      padding: '24px',
      borderRadius: '8px',
      border: '1px solid #BFDBFE',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    amount: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1E40AF',
    },
  };

  // Helper function to render data grid exactly like review page
  const renderDataGrid = (data: typeof claimTypeInfo, columns: number = 3) => {
    const gridCols = columns === 2 ? 'repeat(2, 1fr)' : columns === 3 ? 'repeat(3, 1fr)' : '1fr';

    return (
      <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: '16px' }}>
        {data.map((item, index) => (
          <div key={index} style={styles.gridItem}>
            <dt style={styles.label}>{item.label}</dt>
            <dd style={{ ...styles.value, ...(item.isHighlighted ? styles.highlight : {}) }}>
              {typeof item.value === 'string' ? item.value : item.value}
            </dd>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Claim Review Document</h1>
        <p style={styles.subtitle}>Generated on {new Date().toLocaleDateString('en-SG')}</p>
      </div>

      {/* Claim Type Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            <ClipboardDocumentListIcon style={{ width: '20px', height: '20px' }} />
            Claim Type Information
          </h3>
        </div>
        <div style={styles.sectionContent}>{renderDataGrid(claimTypeInfo, 2)}</div>
      </div>

      {/* Policy Details Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            <ShieldCheckIcon style={{ width: '20px', height: '20px' }} />
            Policy Details
          </h3>
        </div>
        <div style={styles.sectionContent}>{renderDataGrid(policyInfo, 3)}</div>
      </div>

      {/* Claimant Information Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            <UserIcon style={{ width: '20px', height: '20px' }} />
            Claimant Information
          </h3>
        </div>
        <div style={styles.sectionContent}>
          {renderDataGrid(claimantInfo, 3)}

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
            <h4 style={{ ...styles.label, fontSize: '16px', marginBottom: '16px' }}>
              <MapPinIcon style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px' }} />
              Address Information
            </h4>
            {renderDataGrid(addressInfo, 3)}
          </div>
        </div>
      </div>

      {/* Incident Details Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            <ExclamationTriangleIcon style={{ width: '20px', height: '20px' }} />
            Incident Details
          </h3>
        </div>
        <div style={styles.sectionContent}>
          {renderDataGrid(incidentInfo, 3)}

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
            <h4 style={{ ...styles.label, fontSize: '16px', marginBottom: '12px' }}>
              <DocumentTextIcon style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px' }} />
              Incident Description
            </h4>
            <div style={styles.description}>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                {incidentData?.incidentDescription ||
                  'I was walking down the stairs at my hotel when I slipped and fell due to wet floors. I hurt my ankle badly and had to seek immediate medical attention at the local hospital.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            <BanknotesIcon style={{ width: '20px', height: '20px' }} />
            Financial Summary
          </h3>
        </div>
        <div style={styles.sectionContent}>
          <div style={styles.financialSummary}>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E40AF', marginBottom: '4px' }}>
                Total Claim Amount
              </h4>
              <p style={{ fontSize: '14px', color: '#1E40AF' }}>Estimated loss amount requested</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={styles.amount}>{incidentData?.estimatedLoss || 'SGD 2,500'}</p>
              <p style={{ fontSize: '14px', color: '#1E40AF' }}>Singapore Dollars</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid #E5E7EB',
          textAlign: 'center',
          fontSize: '12px',
          color: '#6B7280',
        }}
      >
        <p>This document was generated automatically from the online claim submission system.</p>
        <p>For questions or concerns, please contact our claims department.</p>
      </div>
    </div>
  );
};

export default PDFContentSafe;
