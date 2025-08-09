import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/Layout';
import BlogCard from '@/components/BlogCard';
import AdBanner from '@/components/monetization/AdBanner';
import { SubscribeCTA } from '@/components/monetization/CTAButton';
import { getSortedPostsData, getPostsByCategory, getAllCategories } from '@/lib/blog';
import { generateSEOData } from '@/lib/seo';
import { BlogPost } from '@/types';
import { TrendingUp, DollarSign, Users, Star } from 'lucide-react';

interface CategoryProps {
  posts: BlogPost[];
  category: string;
  totalPosts: number;
}

export default function Category({ posts, category, totalPosts }: CategoryProps) {
  const categoryDisplayName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const seoData = generateSEOData(undefined, {
    title: `${categoryDisplayName} - Revenue Blog`,
    description: `Discover the best ${categoryDisplayName.toLowerCase()} strategies and tips to make money online. Proven methods that actually work.`,
    keywords: `${categoryDisplayName.toLowerCase()}, make money online, passive income, online business`,
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'affiliate-marketing':
        return TrendingUp;
      case 'passive-income':
        return DollarSign;
      case 'online-business':
        return Users;
      case 'reviews':
        return Star;
      default:
        return DollarSign;
    }
  };

  const getCategoryDescription = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'affiliate-marketing':
        return 'Learn how to earn commissions by promoting products you love. From beginner tips to advanced strategies.';
      case 'passive-income':
        return 'Build income streams that work while you sleep. Discover proven methods to create lasting wealth.';
      case 'online-business':
        return 'Start and scale your digital empire. Everything you need to build a successful online business.';
      case 'reviews':
        return 'Honest reviews of tools, courses, and products that can help you make money online.';
      default:
        return 'Discover proven strategies and tips to make money online and achieve financial freedom.';
    }
  };

  const CategoryIcon = getCategoryIcon(category);

  return (
    <Layout
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      canonicalUrl={seoData.canonicalUrl}
    >
      {/* Category Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-16 mb-12 rounded-2xl">
        <div className="text-center max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 rounded-2xl">
              <CategoryIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {categoryDisplayName}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {getCategoryDescription(category)}
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{totalPosts}</span>
              <span>Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">50K+</span>
              <span>Readers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Updated</span>
              <span>Weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-12 px-8 rounded-xl mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          💰 Get {categoryDisplayName} Tips Weekly
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
          Join thousands getting exclusive {categoryDisplayName.toLowerCase()} strategies, 
          tools, and insider tips delivered to your inbox.
        </p>
        <SubscribeCTA size="lg" />
        <p className="text-sm mt-4 opacity-75">No spam. Unsubscribe anytime.</p>
      </section>

      {/* Posts Grid */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Latest {categoryDisplayName} Articles
          </h2>
          <span className="text-gray-500 text-sm">
            {posts.length} of {totalPosts} articles
          </span>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <React.Fragment key={post.slug}>
                <BlogCard post={post} showExcerpt={true} />
                
                {/* Insert ad after every 6 posts */}
                {(index + 1) % 6 === 0 && (
                  <div className="md:col-span-2 lg:col-span-3 flex justify-center my-8">
                    <AdBanner position="between-posts" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No articles yet in {categoryDisplayName}
            </h3>
            <p className="text-gray-600 mb-6">
              We're working on creating amazing content for this category. Check back soon!
            </p>
            <a 
              href="/" 
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Browse all articles →
            </a>
          </div>
        )}
      </section>

      {/* Related Categories */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Explore More Ways to Make Money
        </h3>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: 'Affiliate Marketing',
              slug: 'affiliate-marketing',
              icon: '🤝',
              description: 'Earn commissions promoting products',
              color: 'from-blue-500 to-blue-600',
            },
            {
              name: 'Passive Income',
              slug: 'passive-income',
              icon: '💰',
              description: 'Build income while you sleep',
              color: 'from-green-500 to-green-600',
            },
            {
              name: 'Online Business',
              slug: 'online-business',
              icon: '🚀',
              description: 'Start your digital empire',
              color: 'from-purple-500 to-purple-600',
            },
            {
              name: 'Reviews',
              slug: 'reviews',
              icon: '⭐',
              description: 'Honest tool and course reviews',
              color: 'from-orange-500 to-orange-600',
            },
          ].filter(cat => cat.slug !== category).map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${cat.color} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {cat.name}
              </h4>
              <p className="text-gray-600 text-sm">
                {cat.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="flex justify-center">
        <AdBanner position="content" />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getAllCategories();
  const paths = categories.map((category) => ({
    params: { category: category.name.toLowerCase().replace(' ', '-') },
  }));

  // Add some common category variations
  const commonCategories = [
    'affiliate-marketing',
    'passive-income', 
    'online-business',
    'reviews',
    'make-money',
    'freelancing',
  ];

  commonCategories.forEach(cat => {
    if (!paths.find(p => p.params.category === cat)) {
      paths.push({ params: { category: cat } });
    }
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const categoryName = category.replace('-', ' ');
  
  const allPosts = getSortedPostsData();
  const posts = getPostsByCategory(categoryName);
  
  return {
    props: {
      posts,
      category,
      totalPosts: posts.length,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
