"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user is already signed in, redirect them away from login page
    if (isLoaded && isSignedIn) {
      router.push("/"); // or wherever you want signed-in users to go
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading while checking authentication status
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-all duration-500">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-400 dark:border-indigo-700"></div>
      </div>
    );
  }

  // If user is already signed in, show loading while redirecting
  if (isSignedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-all duration-500">
        <div className="text-indigo-700 dark:text-indigo-300 text-xl">
          Redirecting...
        </div>
      </div>
    );
  }

  // Show login form for users who aren't signed in
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-all duration-500">
      <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-indigo-200 dark:border-indigo-800 backdrop-blur-xl">
        <SignIn fallbackRedirectUrl="/" />
      </div>
    </div>
  );
}