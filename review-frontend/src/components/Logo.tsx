// src/components/Logo.tsx

import React from 'react';
import logoPic from '../../public/group6.jpg';

// You can also define the prop types if needed
interface LogoProps {
  width?: string;
  height?: string;
  altText?: string;
}

const Logo: React.FC<LogoProps> = ({ width = '968px', height = '563px', altText = 'Logo' }) => {
  return (
    <img
      src="/group6.jpg"
      alt={altText}
      width={width}
      height={height}
      style={{ display: 'block' }}
    />
  );
};

export default Logo;
