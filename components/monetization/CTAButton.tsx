import React from 'react';
import { ArrowRight, Download, Mail, Star } from 'lucide-react';
import { CTAButton as CTAButtonType } from '@/types';

interface CTAButtonProps {
  cta: CTAButtonType;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: 'arrow' | 'download' | 'mail' | 'star' | 'none';
}

const CTAButton: React.FC<CTAButtonProps> = ({
  cta,
  size = 'md',
  fullWidth = false,
  icon = 'arrow',
}) => {
  const handleClick = () => {
    // Track CTA clicks for conversion optimization
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'conversion',
        event_label: cta.trackingId || cta.id,
        value: 1,
      });
    }
  };

  const getIcon = () => {
    const iconClass = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';
    
    switch (icon) {
      case 'download':
        return <Download className={iconClass} />;
      case 'mail':
        return <Mail className={iconClass} />;
      case 'star':
        return <Star className={iconClass} />;
      case 'arrow':
        return <ArrowRight className={iconClass} />;
      default:
        return null;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const getStyleClasses = () => {
    const baseClasses = 'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2';
    
    switch (cta.style) {
      case 'secondary':
        return `${baseClasses} bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300`;
      case 'accent':
        return `${baseClasses} bg-gradient-to-r from-accent-600 to-accent-700 text-white hover:shadow-lg hover:from-accent-700 hover:to-accent-800`;
      default: // primary
        return `${baseClasses} bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg hover:from-primary-700 hover:to-primary-800`;
    }
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <a
      href={cta.url}
      onClick={handleClick}
      className={`${getStyleClasses()} ${getSizeClasses()} ${widthClass}`}
    >
      {cta.text}
      {getIcon()}
    </a>
  );
};

// Pre-configured CTA components for common use cases
export const SubscribeCTA: React.FC<{ url?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  url = '/newsletter', 
  size = 'md' 
}) => (
  <CTAButton
    cta={{
      id: 'subscribe',
      text: 'Get Free Newsletter',
      url,
      style: 'primary',
      trackingId: 'newsletter_subscribe',
    }}
    size={size}
    icon="mail"
  />
);

export const DownloadCTA: React.FC<{ url: string; text?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  url, 
  text = 'Download Free Guide',
  size = 'md' 
}) => (
  <CTAButton
    cta={{
      id: 'download',
      text,
      url,
      style: 'accent',
      trackingId: 'free_download',
    }}
    size={size}
    icon="download"
  />
);

export const StartNowCTA: React.FC<{ url: string; text?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  url, 
  text = 'Start Making Money Now',
  size = 'lg' 
}) => (
  <CTAButton
    cta={{
      id: 'start-now',
      text,
      url,
      style: 'primary',
      trackingId: 'start_now',
    }}
    size={size}
    fullWidth={true}
    icon="star"
  />
);

export default CTAButton;
