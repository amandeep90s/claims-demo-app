import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import React from 'react';

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} placement='top-center' size='md' onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className='flex flex-col items-center gap-2'>
          <span className='text-3xl text-red-500'>
            {/* Exclamation icon (Heroicons outline) */}
            <svg
              className='h-10 w-10'
              fill='none'
              stroke='currentColor'
              strokeWidth={1.5}
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 9v3.75m0 3.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
          <span className='text-center text-xl font-semibold'>Are you sure you want to leave?</span>
        </ModalHeader>
        <ModalBody>
          <p className='text-center text-gray-600'>You will lose all your progress in this claim submission.</p>
        </ModalBody>
        <ModalFooter className='flex justify-center gap-4'>
          <Button className='w-32' variant='bordered' onClick={onClose}>
            No
          </Button>
          <Button className='w-32' color='primary' variant='solid' onClick={onConfirm}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExitModal;
