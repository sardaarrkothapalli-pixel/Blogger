import React from 'react';
import { ExternalLink, Star, Tag } from 'lucide-react';
import { AffiliateLink as AffiliateLinkType } from '@/types';

interface AffiliateLinkProps {
  link: AffiliateLinkType;
  variant?: 'button' | 'card' | 'inline';
  showPrice?: boolean;
  showDiscount?: boolean;
}

const AffiliateLink: React.FC<AffiliateLinkProps> = ({
  link,
  variant = 'button',
  showPrice = true,
  showDiscount = true,
}) => {
  const handleClick = () => {
    // Track affiliate link clicks for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        event_category: 'monetization',
        event_label: link.id,
        value: 1,
      });
    }
  };

  if (variant === 'inline') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        onClick={handleClick}
        className="text-primary-600 hover:text-primary-800 underline font-medium inline-flex items-center gap-1"
      >
        {link.text}
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{link.text}</h3>
          {link.discount && showDiscount && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {link.discount}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-4">{link.description}</p>
        
        <div className="flex items-center justify-between">
          {link.price && showPrice && (
            <span className="text-2xl font-bold text-gray-900">{link.price}</span>
          )}
          
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={handleClick}
            className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            Get Deal
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  // Default button variant
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className="bg-gradient-to-r from-success-600 to-success-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 text-center"
    >
      {link.text}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
};

export default AffiliateLink;
