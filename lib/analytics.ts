// Google Analytics and conversion tracking utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track affiliate link clicks
export const trackAffiliateClick = (linkId: string, productName: string, url: string) => {
  event('affiliate_click', 'monetization', `${linkId}-${productName}`, 1);
  
  // Also track as conversion for optimization
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_TRACKING_ID,
      event_category: 'affiliate',
      event_label: linkId,
      value: 1,
    });
  }
};

// Track newsletter signups
export const trackNewsletterSignup = (source: string) => {
  event('newsletter_signup', 'conversion', source, 1);
  
  // Track as conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_TRACKING_ID,
      event_category: 'newsletter',
      event_label: source,
      value: 1,
    });
  }
};

// Track CTA button clicks
export const trackCTAClick = (ctaId: string, ctaText: string, url: string) => {
  event('cta_click', 'conversion', `${ctaId}-${ctaText}`, 1);
};

// Track download events
export const trackDownload = (fileName: string, source: string) => {
  event('download', 'engagement', `${fileName}-${source}`, 1);
};

// Track scroll depth for engagement
export const trackScrollDepth = (percentage: number) => {
  event('scroll_depth', 'engagement', `${percentage}%`, percentage);
};

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  event('time_on_page', 'engagement', 'seconds', seconds);
};

// Track search queries
export const trackSearch = (query: string, resultsCount: number) => {
  event('search', 'engagement', query, resultsCount);
};

// Track social shares
export const trackSocialShare = (platform: string, url: string, title: string) => {
  event('social_share', 'engagement', `${platform}-${title}`, 1);
};

// Track video engagement
export const trackVideoPlay = (videoTitle: string, duration: number) => {
  event('video_play', 'engagement', videoTitle, duration);
};

export const trackVideoComplete = (videoTitle: string) => {
  event('video_complete', 'engagement', videoTitle, 1);
};

// Enhanced ecommerce tracking for affiliate products
export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'USD',
      items: items,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  event('form_submission', 'conversion', `${formName}-${success ? 'success' : 'error'}`, 1);
};

// Track ad clicks (for revenue optimization)
export const trackAdClick = (adPosition: string, adType: string) => {
  event('ad_click', 'monetization', `${adPosition}-${adType}`, 1);
};

// Track user engagement score
export const calculateEngagementScore = (timeOnPage: number, scrollDepth: number, interactions: number) => {
  const score = (timeOnPage / 60) + (scrollDepth / 100) + interactions;
  event('engagement_score', 'engagement', 'calculated', Math.round(score));
  return score;
};

// Track conversion funnel steps
export const trackFunnelStep = (step: string, funnelName: string) => {
  event('funnel_step', 'conversion', `${funnelName}-${step}`, 1);
};

// Track A/B test variations
export const trackABTest = (testName: string, variation: string, converted: boolean) => {
  event('ab_test', 'optimization', `${testName}-${variation}-${converted ? 'converted' : 'viewed'}`, 1);
};

// Initialize scroll tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let scrollDepthMarks = [25, 50, 75, 90, 100];
  let scrollDepthReached: number[] = [];

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    scrollDepthMarks.forEach(mark => {
      if (scrollPercent >= mark && !scrollDepthReached.includes(mark)) {
        scrollDepthReached.push(mark);
        trackScrollDepth(mark);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Initialize time tracking
export const initTimeTracking = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  let timeMarks = [30, 60, 120, 300, 600]; // 30s, 1m, 2m, 5m, 10m
  let timeReached: number[] = [];

  const checkTimeMarks = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    timeMarks.forEach(mark => {
      if (timeSpent >= mark && !timeReached.includes(mark)) {
        timeReached.push(mark);
        trackTimeOnPage(mark);
      }
    });
  };

  const interval = setInterval(checkTimeMarks, 5000); // Check every 5 seconds

  return () => {
    clearInterval(interval);
    const finalTime = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(finalTime);
  };
};
