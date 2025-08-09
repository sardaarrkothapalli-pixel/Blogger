import React from 'react';
import { AdPlacement } from '@/types';

interface AdBannerProps {
  position: AdPlacement['position'];
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  // In production, replace with actual ad code (Google AdSense, etc.)
  const getAdContent = (position: string) => {
    const adConfigs = {
      header: {
        width: '728px',
        height: '90px',
        text: 'Header Banner Ad - 728x90',
        bgColor: 'bg-blue-100',
      },
      sidebar: {
        width: '300px',
        height: '250px',
        text: 'Sidebar Ad - 300x250',
        bgColor: 'bg-green-100',
      },
      content: {
        width: '100%',
        height: '280px',
        text: 'Content Ad - Responsive',
        bgColor: 'bg-purple-100',
      },
      footer: {
        width: '728px',
        height: '90px',
        text: 'Footer Banner Ad - 728x90',
        bgColor: 'bg-orange-100',
      },
      'between-posts': {
        width: '100%',
        height: '200px',
        text: 'Between Posts Ad - Native',
        bgColor: 'bg-pink-100',
      },
    };

    return adConfigs[position as keyof typeof adConfigs] || adConfigs.content;
  };

  const adConfig = getAdContent(position);

  return (
    <div className={`ad-banner ad-${position} ${className}`}>
      <div 
        className={`${adConfig.bgColor} border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-600 font-medium rounded-lg`}
        style={{ 
          width: adConfig.width, 
          height: adConfig.height,
          maxWidth: '100%'
        }}
      >
        <div className="text-center">
          <p className="text-sm">{adConfig.text}</p>
          <p className="text-xs text-gray-500 mt-1">
            Replace with actual ad code
          </p>
        </div>
      </div>
      
      {/* Example Google AdSense placeholder - uncomment and configure when ready */}
      {/*
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      */}
    </div>
  );
};

export default AdBanner;
