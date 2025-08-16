'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: '/'
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.ok) {
      router.push(res.url || "/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 w-full space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Sign In</h2>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4 w-80">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>

          <button
            onClick={() => signIn("github",{callbackUrl:'/'} )}
            className="w-96 bg-gray-800 text-white py-2 rounded hover:bg-gray-900 mb-3"
          >
            Continue with GitHub
          </button>
        </div>

        <Link
          href="/auth/register"
          className="mt-4 text-sm text-blue-600 hover:underline text-center"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}
