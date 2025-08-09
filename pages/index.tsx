import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import AdBanner from '@/components/monetization/AdBanner';
import { StartNowCTA, SubscribeCTA, DownloadCTA } from '@/components/monetization/CTAButton';
import { getSortedPostsData, getFeaturedPosts } from '@/lib/blog';
import { generateSEOData, generateStructuredData } from '@/lib/seo';
import { BlogPost } from '@/types';
import { TrendingUp, DollarSign, Users, Star, ArrowRight } from 'lucide-react';

interface HomeProps {
  allPostsData: BlogPost[];
  featuredPosts: BlogPost[];
}

export default function Home({ allPostsData, featuredPosts }: HomeProps) {
  const seoData = generateSEOData();
  const structuredData = generateStructuredData();

  const stats = [
    { label: 'Active Readers', value: '50,000+', icon: Users },
    { label: 'Success Stories', value: '1,200+', icon: Star },
    { label: 'Monthly Revenue', value: '$100K+', icon: DollarSign },
    { label: 'Growth Rate', value: '300%', icon: TrendingUp },
  ];

  return (
    <Layout
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      canonicalUrl={seoData.canonicalUrl}
      ogImage={seoData.ogImage}
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-16 mb-12 rounded-2xl">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Make <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">$10,000+</span> Per Month Online
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover proven strategies, tools, and insider secrets to build multiple income streams. 
            Join thousands who've already transformed their financial future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <StartNowCTA url="/category/make-money" />
            <DownloadCTA url="/download/free-guide" text="Get Free $10K Guide" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">🔥 Trending Now</h2>
            <a 
              href="/category/make-money" 
              className="text-primary-600 hover:text-primary-800 font-medium flex items-center gap-2"
            >
              View All <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <BlogCard 
                key={post.slug} 
                post={post} 
                featured={index === 0}
                showExcerpt={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Content Ad */}
      <AdBanner position="content" className="my-12" />

      {/* Newsletter CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16 px-8 rounded-2xl mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          💰 Get Rich Quick Newsletter
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join 50,000+ subscribers getting weekly tips, exclusive deals, and proven money-making strategies. 
          Completely FREE!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Get Free Tips
          </button>
        </div>
        <p className="text-sm mt-4 opacity-75">No spam. Unsubscribe anytime.</p>
      </section>

      {/* Latest Posts */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Money-Making Tips</h2>
          <a 
            href="/blog" 
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center gap-2"
          >
            View All Posts <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allPostsData.slice(0, 6).map((post) => (
            <BlogCard key={post.slug} post={post} showExcerpt={true} />
          ))}
        </div>
      </section>

      {/* Between Posts Ad */}
      <AdBanner position="between-posts" className="my-12" />

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Choose Your Money-Making Path
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Affiliate Marketing',
              description: 'Earn commissions promoting products you love',
              icon: '🤝',
              href: '/category/affiliate-marketing',
              color: 'from-blue-500 to-blue-600',
            },
            {
              title: 'Passive Income',
              description: 'Build income streams that work while you sleep',
              icon: '💰',
              href: '/category/passive-income',
              color: 'from-green-500 to-green-600',
            },
            {
              title: 'Online Business',
              description: 'Start and scale your digital empire',
              icon: '🚀',
              href: '/category/online-business',
              color: 'from-purple-500 to-purple-600',
            },
            {
              title: 'Product Reviews',
              description: 'Honest reviews of money-making tools',
              icon: '⭐',
              href: '/category/reviews',
              color: 'from-orange-500 to-orange-600',
            },
          ].map((category) => (
            <a
              key={category.title}
              href={category.href}
              className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {category.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {category.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const featuredPosts = getFeaturedPosts(3);

  return {
    props: {
      allPostsData,
      featuredPosts,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
