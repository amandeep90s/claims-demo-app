import { Button, useDisclosure } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  ClaimantFormModal,
  ClaimantHeader,
  ClaimantList,
  ClaimantSidebar,
  PolicyHolderDetails,
  type ClaimantData,
} from '@/components/claimantDetails';
import { claimantSchema, type ClaimantFormData } from '@/schemas/claimant';

const ClaimantDetailsPage: React.FC = () => {
  const [selectedClaimant, setSelectedClaimant] = useState('no');
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ClaimantFormData>({
    resolver: zodResolver(claimantSchema),
  });

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
      // Add new claimant
      const newClaimant = {
        id: claimants.length + 1,
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
    }

    reset();
    handleModalClose();
  };

  const handleDeleteClaimant = (id: number) => {
    setClaimants(claimants.filter((claimant) => claimant.id !== id));
  };

  const handleClaimantSelection = (id: number, selected: boolean) => {
    setClaimants(claimants.map((claimant) => (claimant.id === id ? { ...claimant, selected } : claimant)));
  };

  const handleAddClaimant = () => {
    setEditingClaimant(null);
    reset();
    onOpen();
  };

  const handleEditClaimant = (claimant: ClaimantData) => {
    setEditingClaimant(claimant);
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
    onOpenChange();
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <ClaimantHeader />

      <div className='flex'>
        <ClaimantSidebar />

        {/* Main Content */}
        <main className='flex-1 p-6'>
          <div className='w-full'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-gray-900'>Claimant Details</h2>
            </div>

            <PolicyHolderDetails selectedClaimant={selectedClaimant} onSelectedClaimantChange={setSelectedClaimant} />

            <ClaimantList
              claimants={claimants}
              onAddClaimant={handleAddClaimant}
              onClaimantSelection={handleClaimantSelection}
              onDeleteClaimant={handleDeleteClaimant}
              onEditClaimant={handleEditClaimant}
            />

            <ClaimantFormModal
              editingClaimant={editingClaimant}
              errors={errors}
              handleSubmit={handleSubmit}
              isOpen={isOpen}
              isSubmitting={isSubmitting}
              register={register}
              onClose={handleModalClose}
              onSubmit={onSubmit}
            />

            {/* Next Button */}
            <div className='mt-8 flex justify-end'>
              <Button className='px-8' color='primary' size='lg'>
                Next: Incident Type
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClaimantDetailsPage;
