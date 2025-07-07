'use client';

import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Hammer, HardHat, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Hammer className="h-8 w-8 text-blue-600" />
            <span className="text-lg font-bold text-blue-600">Nixerly</span>
          </div>
        </div>

        {/* Main 404 Content */}
        <div className="mb-12">
          {/* Construction Scene Illustration */}
          <div className="flex justify-center items-end mb-8 relative">
            <div className="flex justify-center items-end mb-8 relative">
              <div className="relative">
                <div className="absolute -left-16 top-20">
                  <Wrench className="h-8 w-8 text-gray-600 rotate-45" />
                </div>
                {/* Construction crane */}
                <div className="w-2 h-32 bg-yellow-500 mx-auto mb-4"></div>
                <div className="w-16 h-2 bg-yellow-500 absolute top-8 left-1/2 transform -translate-x-1/2"></div>

                {/* Tools scattered around */}

                <div className="absolute -right-12 top-24">
                  <HardHat className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Oops! This page is under construction
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Looks like our crew couldn't find the page you're looking for. Don't
            worry - we'll help you get back on track and find the perfect job or
            worker!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              className="bg-primary hover:bg-primary/80 text-white px-8"
              onClick={() => router.push(ROUTES.FEED)}
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{' '}
            <a
              href="mailto:support@nixerly.com"
              className="text-blue-600 hover:underline"
            >
              support@nixerly.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
