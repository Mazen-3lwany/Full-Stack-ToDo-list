"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { register } from "@/app/actions/register"; 

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const values = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const result = await register(values);

      if (result.error) {
        setError(result.error);
      } else {
        
        const res=await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl: "/",
        });

        if (res?.error) {
            setError("Failed to sign in after registration");
        } else  {
          router.push("/");
        }
      }
    } catch (err) {
      setError("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md w-full p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-2">{error}</p>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="At least 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Sign up with Email"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* GitHub Auth */}
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Continue with GitHub
          </button>

          {/* Login Link */}
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
