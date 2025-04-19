import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Nixerly
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Your new application is ready!
          </p>
        </div>

        <div className="mt-10 flex justify-center space-x-6">
          <Link 
            href="/login" 
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            tabIndex={0}
            aria-label="Go to login page"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            tabIndex={0}
            aria-label="Go to registration page"
          >
            Register
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="pt-6">
            <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
              <div className="-mt-6">
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Features</h3>
                <p className="mt-5 text-base text-gray-500">
                  Explore what your application can do with our comprehensive feature set.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
              <div className="-mt-6">
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Dashboard</h3>
                <p className="mt-5 text-base text-gray-500">
                  Manage your account and all your settings from a user-friendly dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 