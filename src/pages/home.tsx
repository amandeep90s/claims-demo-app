import { Link } from '@heroui/link';
import { Button } from '@heroui/button';

import { title, subtitle } from '@/components/primitives';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className={title({ size: 'lg', class: 'mb-6' })}>Welcome to Claims App</h1>
        <p className={subtitle({ class: 'mx-auto mb-8 max-w-2xl' })}>
          Manage your insurance claims efficiently and securely. Get started by signing up for an account or sign in to
          your existing account.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button as={Link} className="px-8" color="primary" href="/signup" radius="full" size="lg">
            Get Started
          </Button>
          <Button as={Link} className="px-8" href="/signin" radius="full" size="lg" variant="bordered">
            Sign In
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Easy Claims</h3>
            <p className="text-gray-600">Submit and track your insurance claims with our intuitive interface.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Real-time Updates</h3>
            <p className="text-gray-600">Get instant notifications about your claim status and updates.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold">Secure & Private</h3>
            <p className="text-gray-600">Your data is protected with industry-standard security measures.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
