import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { title, subtitle } from "@/components/primitives";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className={title({ size: "lg", class: "mb-6" })}>
          Welcome to Claims App
        </h1>
        <p className={subtitle({ class: "mb-8 max-w-2xl mx-auto" })}>
          Manage your insurance claims efficiently and securely. Get started by
          signing up for an account or sign in to your existing account.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            as={Link}
            className="px-8"
            color="primary"
            href="/signup"
            radius="full"
            size="lg"
          >
            Get Started
          </Button>
          <Button
            as={Link}
            className="px-8"
            href="/signin"
            radius="full"
            size="lg"
            variant="bordered"
          >
            Sign In
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Easy Claims</h3>
            <p className="text-gray-600">
              Submit and track your insurance claims with our intuitive
              interface.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
            <p className="text-gray-600">
              Get instant notifications about your claim status and updates.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
            <p className="text-gray-600">
              Your data is protected with industry-standard security measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
