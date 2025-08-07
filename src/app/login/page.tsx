'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Finduser from './action';

export default function SignInPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await Finduser(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      
      localStorage.setItem(`${result.user?.id}`, JSON.stringify(result.user));
      localStorage.setItem('currentUserId', result.user?.id as string); 
      router.push('/'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Sign In</h2>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
          >
            Sign In
          </button>
        </form>

        <Link
          href="/register"
          className="mt-4 text-sm text-blue-600 hover:underline text-center"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}
