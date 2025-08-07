"use client"
import Link from 'next/link';
import createUser from './action';
import { useRouter } from 'next/navigation';
export default function SignUpPage() {
    const router = useRouter();
  async function  handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const formData=new FormData(e.currentTarget)
    const user=await createUser(formData)
    localStorage.setItem(`${user.id}`,JSON.stringify(user))
    localStorage.setItem('currentUserId', user.id); 
    router.push('/')
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
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
        <div>
    <label
      htmlFor="profileImage"
      className="block text-sm font-medium text-gray-700"
    >
      Profile Image (optional)
    </label>
    <input
      name="profileImage"
      type="file"
      accept="image/*"
      className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>

        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
        >
          Create Account
        </button>
      </form>

      <Link
          href="/login"
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          If have an account? Sign In
        </Link>
    </div>
    </div>
  );
}
