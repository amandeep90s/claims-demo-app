import { Button, useDisclosure } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  ClaimantFormModal,
  ClaimantHeader,
  ClaimantList,
  ClaimantSidebar,
  ExitClaimButton,
  PolicyHolderDetails,
  type ClaimantData,
} from '@/components/claimantDetails';
import { ExitModal } from '@/components/common';
import {
  claimantDetailsPageSchema,
  claimantSchema,
  type ClaimantDetailsPageFormData,
  type ClaimantFormData,
} from '@/schemas/claimant';

const ClaimantDetailsPage: React.FC = () => {
  const [editingClaimant, setEditingClaimant] = useState<ClaimantData | null>(null);
  const [claimants, setClaimants] = useState<ClaimantData[]>([
    {
      id: 1,
      name: 'Albert Flores',
      completed: true,
      selected: false,
      email: 'albert.flores@email.com',
      phone: '+1234567890',
      relationship: 'Self',
      gender: 'male',
      dateOfBirth: '1990-01-01',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      city: 'Singapore',
      postalCode: '123456',
      country: 'singapore',
      isClaimant: 'yes',
      isPolicyHolder: 'no',
    },
  ]);

  // Utility function to generate next unique ID
  const generateNextId = (existingClaimants: ClaimantData[]): number => {
    if (existingClaimants.length === 0) return 1;

    return Math.max(...existingClaimants.map((c) => c.id)) + 1;
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Exit modal state
  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const handleExitOpen = () => setExitModalOpen(true);
  const handleExitClose = () => setExitModalOpen(false);
  const handleExitConfirm = () => {
    // Navigate to dashboard (replace with your router logic)
    window.location.href = '/';
  };

  // Main page form setup
  const {
    register: pageRegister,
    handleSubmit: handlePageSubmit,
    setValue: pageSetValue,
    watch: pageWatch,
    formState: { errors: pageErrors },
  } = useForm<ClaimantDetailsPageFormData>({
    resolver: zodResolver(claimantDetailsPageSchema),
    defaultValues: {
      policyHolder: '',
      isClaimantSameAsPolicyHolder: '',
      selectedClaimants: [],
    },
  });

  // Modal form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    clearErrors,
    control,
  } = useForm<ClaimantFormData>({
    resolver: zodResolver(claimantSchema),
    defaultValues: {
      name: '',
      isClaimant: '',
      gender: '',
      dateOfBirth: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
      country: '',
      isPolicyHolder: '',
    },
  });

  const onPageSubmit = (data: ClaimantDetailsPageFormData) => {
    // Handle form submission - navigate to next step
    // eslint-disable-next-line no-console
    console.log('Page form data:', data);
  };

  const onSubmit = (data: ClaimantFormData) => {
    if (editingClaimant) {
      // Update existing claimant
      const updatedClaimant = {
        ...editingClaimant,
        name: data.name,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || '',
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        isClaimant: data.isClaimant,
        isPolicyHolder: data.isPolicyHolder,
        relationship: data.isPolicyHolder === 'yes' ? 'Self' : 'Other',
      };

      setClaimants(claimants.map((claimant) => (claimant.id === editingClaimant.id ? updatedClaimant : claimant)));
      setEditingClaimant(null);
    } else {
      // Add new claimant - generate ID based on the highest existing ID
      const newClaimant = {
        id: generateNextId(claimants),
        name: data.name,
        completed: false,
        selected: false,
        email: '', // We'll need to add this to the form if needed
        phone: '', // We'll need to add this to the form if needed
        relationship: data.isPolicyHolder === 'yes' ? 'Self' : 'Other',
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 || '',
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        isClaimant: data.isClaimant,
        isPolicyHolder: data.isPolicyHolder,
      };

      setClaimants([...claimants, newClaimant]);

      // Automatically select the newly added claimant
      const currentSelectedClaimants = pageWatch('selectedClaimants') || [];

      pageSetValue('selectedClaimants', [...currentSelectedClaimants, newClaimant.id]);
    }

    reset();
    clearErrors(); // Clear any validation errors
    handleModalClose();
  };

  const handleDeleteClaimant = (id: number) => {
    setClaimants(claimants.filter((claimant) => claimant.id !== id));

    // Remove the deleted claimant from selected claimants if it was selected
    const currentSelectedClaimants = pageWatch('selectedClaimants') || [];
    const updatedSelectedClaimants = currentSelectedClaimants.filter((claimantId: number) => claimantId !== id);

    pageSetValue('selectedClaimants', updatedSelectedClaimants);
  };

  const handleAddClaimant = () => {
    setEditingClaimant(null);
    reset();
    clearErrors(); // Clear any existing validation errors
    onOpen();
  };

  const handleEditClaimant = (claimant: ClaimantData) => {
    setEditingClaimant(claimant);
    reset(); // Reset form first
    clearErrors(); // Clear any existing validation errors
    // Pre-populate form with existing data
    setValue('name', claimant.name);
    setValue('gender', claimant.gender);
    setValue('dateOfBirth', claimant.dateOfBirth);
    setValue('addressLine1', claimant.addressLine1);
    setValue('addressLine2', claimant.addressLine2);
    setValue('city', claimant.city);
    setValue('postalCode', claimant.postalCode);
    setValue('country', claimant.country);
    setValue('isClaimant', claimant.isClaimant);
    setValue('isPolicyHolder', claimant.isPolicyHolder);
    onOpen();
  };

  const handleModalClose = () => {
    setEditingClaimant(null);
    reset();
    clearErrors(); // Clear any existing validation errors
    onOpenChange();
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <ClaimantHeader />

      <div className='flex'>
        <ClaimantSidebar />

        {/* Main Content */}
        <main className='flex-1 p-6'>
          <form className='w-full' onSubmit={handlePageSubmit(onPageSubmit)}>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-gray-900'>Claimant Details</h2>
              <ExitClaimButton onClick={handleExitOpen} />
            </div>

            <PolicyHolderDetails errors={pageErrors} register={pageRegister} />

            <ClaimantList
              claimants={claimants}
              errors={pageErrors}
              register={pageRegister}
              setValue={pageSetValue}
              watch={pageWatch}
              onAddClaimant={handleAddClaimant}
              onDeleteClaimant={handleDeleteClaimant}
              onEditClaimant={handleEditClaimant}
            />

            <ClaimantFormModal
              control={control}
              editingClaimant={editingClaimant}
              errors={errors}
              handleSubmit={handleSubmit}
              isOpen={isOpen}
              isSubmitting={isSubmitting}
              register={register}
              onClose={handleModalClose}
              onSubmit={onSubmit}
            />

            {/* Exit Modal */}
            <ExitModal isOpen={isExitModalOpen} onClose={handleExitClose} onConfirm={handleExitConfirm} />

            {/* Next Button */}
            <div className='mt-8 flex justify-end'>
              <Button className='px-8' color='primary' size='lg' type='submit'>
                Next: Incident Type
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ClaimantDetailsPage;
