import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';

import { AutocompleteField, AutocompleteOption } from '@/components/ui';

interface ExampleFormData {
  country: string;
}

// Example options with key, label, and description
const countryOptions: AutocompleteOption[] = [
  {
    key: 'us',
    label: 'United States',
    description: 'North American country',
  },
  {
    key: 'ca',
    label: 'Canada',
    description: 'North American country',
  },
  {
    key: 'uk',
    label: 'United Kingdom',
    description: 'European country',
  },
  {
    key: 'fr',
    label: 'France',
    description: 'European country',
  },
  {
    key: 'de',
    label: 'Germany',
    description: 'European country',
  },
];

export function AutocompleteFieldExample() {
  const { control, handleSubmit, watch } = useForm<ExampleFormData>({
    defaultValues: {
      country: '',
    },
  });

  const watchedCountry = watch('country');

  const onSubmit = (data: ExampleFormData) => {
    // eslint-disable-next-line no-console
    console.log('Form data:', data);
    alert(`Selected country: ${data.country}`);
  };

  const handleSelectionChange = (key: string | number | null) => {
    // eslint-disable-next-line no-console
    console.log('Selected key:', key);
  };

  return (
    <div className='mx-auto max-w-md space-y-4 p-6'>
      <h2 className='mb-6 text-2xl font-bold'>AutocompleteField Example</h2>

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <AutocompleteField
          isRequired
          control={control}
          description='Choose your country from the list'
          label='Select Country'
          name='country'
          options={countryOptions}
          placeholder='Type to search countries...'
          onSelectionChange={handleSelectionChange}
        />

        <div className='text-sm text-gray-600'>Current selection: {watchedCountry || 'None'}</div>

        <Button className='w-full' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}
