import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { StartNowCTA } from '@/components/monetization/CTAButton';

export default function Custom404() {
  return (
    <Layout
      title="Page Not Found - Revenue Blog"
      description="The page you're looking for doesn't exist. Discover our money-making guides and start earning today!"
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Oops! Page Not Found
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist, but don't worry! 
            We have plenty of money-making content to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Go Home
            </Link>
            <Link 
              href="/category/affiliate-marketing"
              className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Browse Articles
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              💰 Don't Leave Empty-Handed!
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of people making money online with our proven strategies.
            </p>
            <StartNowCTA url="/category/make-money" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
