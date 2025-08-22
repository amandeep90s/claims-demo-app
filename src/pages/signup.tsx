import { useState } from 'react';
import { Link } from '@heroui/link';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';

import { title } from '@/components/primitives';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);

      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Handle sign up logic here
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className={title({ size: 'sm' })}>Sign Up</h1>
          <p className="text-small text-default-500 mt-2">Create your account to get started</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input
              isRequired
              label="First Name"
              placeholder="Enter your first name"
              type="text"
              value={formData.firstName}
              variant="bordered"
              onChange={handleChange('firstName')}
            />
            <Input
              isRequired
              label="Last Name"
              placeholder="Enter your last name"
              type="text"
              value={formData.lastName}
              variant="bordered"
              onChange={handleChange('lastName')}
            />
          </div>

          <Input
            isRequired
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            variant="bordered"
            onChange={handleChange('email')}
          />

          <Input
            isRequired
            label="Password"
            placeholder="Create a password"
            type="password"
            value={formData.password}
            variant="bordered"
            onChange={handleChange('password')}
          />

          <Input
            isRequired
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            value={formData.confirmPassword}
            variant="bordered"
            onChange={handleChange('confirmPassword')}
          />

          <Button className="w-full" color="primary" isLoading={isLoading} type="submit">
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>

          <div className="text-small text-center">
            <span className="text-default-500">Already have an account? </span>
            <Link className="text-primary" href="/signin">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
