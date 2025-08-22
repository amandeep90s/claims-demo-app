import { useState } from "react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { title } from "@/components/primitives";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Handle sign in logic here
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className={title({ size: "sm" })}>Sign In</h1>
          <p className="text-small text-default-500 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            variant="bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            variant="bordered"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between text-small">
            <Link className="text-primary" href="/forgot-password" size="sm">
              Forgot password?
            </Link>
          </div>

          <Button
            className="w-full"
            color="primary"
            isLoading={isLoading}
            type="submit"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-small">
            <span className="text-default-500">
              Don&apos;t have an account?{" "}
            </span>
            <Link className="text-primary" href="/signup">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
