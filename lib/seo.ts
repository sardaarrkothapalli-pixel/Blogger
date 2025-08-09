import { BlogPost } from '@/types';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export const generateSEOData = (post?: BlogPost, customData?: Partial<SEOData>): SEOData => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-blog.com';
  
  if (post) {
    return {
      title: post.seoTitle || `${post.title} | Revenue Blog`,
      description: post.seoDescription || post.excerpt,
      keywords: post.tags.join(', ') + ', make money online, affiliate marketing, passive income',
      canonicalUrl: `${baseUrl}/posts/${post.slug}`,
      ogImage: post.featuredImage,
      ogType: 'article',
      publishedTime: post.date,
      author: post.author,
      section: post.category,
      tags: post.tags,
      ...customData,
    };
  }

  return {
    title: 'Revenue Blog - Make Money Online with Expert Tips',
    description: 'Discover proven strategies to generate income online through affiliate marketing, ads, and digital products. Start earning today!',
    keywords: 'make money online, affiliate marketing, passive income, blog monetization, digital marketing, online business',
    canonicalUrl: baseUrl,
    ogImage: `${baseUrl}/images/og-default.jpg`,
    ogType: 'website',
    ...customData,
  };
};

export const generateStructuredData = (post?: BlogPost) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-blog.com';
  
  if (post) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImage,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Revenue Blog',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo.png`,
        },
      },
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/posts/${post.slug}`,
      },
      articleSection: post.category,
      keywords: post.tags.join(', '),
      wordCount: post.content.split(' ').length,
      timeRequired: `PT${post.readTime}M`,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Revenue Blog',
    description: 'Make Money Online with Expert Tips',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Revenue Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
  };
};

export const generateBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const generateHowToStructuredData = (
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
};
