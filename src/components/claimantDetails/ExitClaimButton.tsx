import { Button } from '@heroui/react';
import React from 'react';

interface ExitClaimButtonProps {
  onClick: () => void;
}

const ExitClaimButton: React.FC<ExitClaimButtonProps> = ({ onClick }) => (
  <Button className='ml-4' color='danger' variant='bordered' onPress={onClick}>
    Exit Claim
  </Button>
);

export default ExitClaimButton;
