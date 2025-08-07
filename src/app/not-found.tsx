import Link from "next/link";

export default function NotFound() {
  return (
    <div>
        <h1> You are not Signed </h1>
        <Link
        href="/register"
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        Don&#39t have an account? Sign Up
      </Link>
      <Link
        href="/login"
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        If have an account? Sign In
      </Link>
    </div>
  );
}
