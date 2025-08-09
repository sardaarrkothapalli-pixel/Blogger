import React from 'react';
import AdBanner from './monetization/AdBanner';
import { SubscribeCTA, DownloadCTA } from './monetization/CTAButton';
import { TrendingUp, DollarSign, Users, Star } from 'lucide-react';

const Sidebar: React.FC = () => {
  const popularPosts = [
    {
      title: 'How I Made $10,000 in My First Month with Affiliate Marketing',
      href: '/posts/first-month-affiliate-success',
      views: '15.2K',
    },
    {
      title: '7 Passive Income Streams That Actually Work in 2024',
      href: '/posts/passive-income-streams-2024',
      views: '12.8K',
    },
    {
      title: 'The Complete Guide to Making Money with Google AdSense',
      href: '/posts/google-adsense-guide',
      views: '9.5K',
    },
    {
      title: 'Best High-Paying Affiliate Programs for Beginners',
      href: '/posts/best-affiliate-programs',
      views: '8.1K',
    },
  ];

  const categories = [
    { name: 'Affiliate Marketing', count: 45, icon: TrendingUp },
    { name: 'Passive Income', count: 32, icon: DollarSign },
    { name: 'Online Business', count: 28, icon: Users },
    { name: 'Product Reviews', count: 23, icon: Star },
  ];

  return (
    <aside className="space-y-8">
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 rounded-lg border border-primary-100">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          💰 Get Rich Quick Tips
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Join 50,000+ subscribers getting weekly tips on making money online. 
          Free guides, exclusive deals, and proven strategies!
        </p>
        <SubscribeCTA size="sm" />
        <p className="text-xs text-gray-500 mt-2">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      {/* Sidebar Ad */}
      <div className="flex justify-center">
        <AdBanner position="sidebar" />
      </div>

      {/* Free Download */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          🎁 Free Money-Making Guide
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Download our complete guide: "10 Ways to Make $1000+ Per Month Online" 
          - Absolutely FREE!
        </p>
        <DownloadCTA 
          url="/download/money-making-guide" 
          text="Download Now"
          size="sm"
        />
      </div>

      {/* Popular Posts */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary-600" />
          Most Popular
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={index} className="group">
              <a href={post.href} className="block">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500">{post.views} views</p>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <a
              key={category.name}
              href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <category.icon className="h-4 w-4 text-primary-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600">
                  {category.name}
                </span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Another Ad Spot */}
      <div className="flex justify-center">
        <AdBanner position="sidebar" />
      </div>

      {/* Social Proof */}
      <div className="bg-gradient-to-br from-success-50 to-success-100 p-6 rounded-lg border border-success-200">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          ✅ Success Stories
        </h3>
        <div className="space-y-3 text-sm">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-gray-700 italic">
              "Made my first $500 online following these tips!"
            </p>
            <p className="text-gray-500 text-xs mt-1">- Sarah M.</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-gray-700 italic">
              "Quit my 9-5 after 6 months of affiliate marketing."
            </p>
            <p className="text-gray-500 text-xs mt-1">- Mike R.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
