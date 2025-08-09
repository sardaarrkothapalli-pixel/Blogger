import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import AdBanner from '@/components/monetization/AdBanner';
import AffiliateLink from '@/components/monetization/AffiliateLink';
import { SubscribeCTA } from '@/components/monetization/CTAButton';
import { getAllPostSlugs, getPostData, getRelatedPosts } from '@/lib/blog';
import { generateSEOData, generateStructuredData } from '@/lib/seo';
import { BlogPost } from '@/types';
import { Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

interface PostProps {
  postData: BlogPost;
  relatedPosts: BlogPost[];
}

export default function Post({ postData, relatedPosts }: PostProps) {
  const seoData = generateSEOData(postData);
  const structuredData = generateStructuredData(postData);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = encodeURIComponent(postData.title);

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

      <article className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
            <li>/</li>
            <li><Link href={`/category/${postData.category.toLowerCase().replace(' ', '-')}`} className="hover:text-primary-600">{postData.category}</Link></li>
            <li>/</li>
            <li className="text-gray-900 truncate">{postData.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link 
              href={`/category/${postData.category.toLowerCase().replace(' ', '-')}`}
              className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
            >
              {postData.category}
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {postData.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {postData.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{postData.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(postData.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{postData.readTime} min read</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <span className="text-gray-600 font-medium flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share:
            </span>
            <a
              href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={postData.featuredImage}
            alt={postData.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>

        {/* Content */}
        <div className="prose-custom mb-12">
          <div dangerouslySetInnerHTML={{ __html: postData.content }} />
        </div>

        {/* Affiliate Links Section */}
        {postData.affiliateLinks && postData.affiliateLinks.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔥 Recommended Tools & Resources</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {postData.affiliateLinks.map((link) => (
                <AffiliateLink key={link.id} link={link} variant="card" />
              ))}
            </div>
          </section>
        )}

        {/* Content Ad */}
        <AdBanner position="content" className="my-12" />

        {/* Newsletter CTA */}
        <section className="bg-gradient-to-r from-primary-50 to-accent-50 p-8 rounded-xl mb-12 text-center border border-primary-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            💰 Want More Money-Making Tips?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join 50,000+ subscribers getting weekly tips, exclusive deals, and proven strategies. 
            Get our free "10 Ways to Make $1000+ Per Month" guide when you subscribe!
          </p>
          <SubscribeCTA size="lg" />
          <p className="text-sm text-gray-500 mt-4">No spam. Unsubscribe anytime.</p>
        </section>

        {/* Tags */}
        {postData.tags && postData.tags.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {postData.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag.toLowerCase().replace(' ', '-')}`}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <article key={post.slug} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <Link href={`/posts/${post.slug}`}>
                    <div className="relative h-48">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/posts/${post.slug}`}>
                      <h4 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.author}</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Author Bio */}
        <section className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {postData.author.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                About {postData.author}
              </h4>
              <p className="text-gray-600 mb-4">
                {postData.author} is a successful online entrepreneur who has helped thousands of people 
                build profitable online businesses. With years of experience in affiliate marketing, 
                passive income, and digital entrepreneurship, they share proven strategies that actually work.
              </p>
              <Link 
                href="/about" 
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                Read more about {postData.author} →
              </Link>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.slug as string);
  const relatedPosts = getRelatedPosts(postData, 3);

  return {
    props: {
      postData,
      relatedPosts,
    },
    revalidate: 3600, // Revalidate every hour
  };
};
