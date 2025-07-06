import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-all duration-500">
      <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-indigo-200 dark:border-indigo-800 backdrop-blur-xl">
        <SignUp fallbackRedirectUrl="/" />
      </div>
    </div>
  )
}
