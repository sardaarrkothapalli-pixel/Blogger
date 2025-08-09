export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  affiliateLinks?: AffiliateLink[];
}

export interface AffiliateLink {
  id: string;
  text: string;
  url: string;
  description: string;
  price?: string;
  discount?: string;
}

export interface AdPlacement {
  id: string;
  position: 'header' | 'sidebar' | 'content' | 'footer' | 'between-posts';
  type: 'banner' | 'square' | 'native' | 'video';
  content: string;
  isActive: boolean;
}

export interface CTAButton {
  id: string;
  text: string;
  url: string;
  style: 'primary' | 'secondary' | 'accent';
  trackingId?: string;
}

export interface NewsletterSignup {
  email: string;
  source: string;
  timestamp: Date;
}

export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
}
