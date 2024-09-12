// src/components/Logo.tsx

import React from 'react';

// You can also define the prop types if needed
interface LogoProps {
  width?: string;
  height?: string;
  altText?: string;
}

const Logo: React.FC<LogoProps> = ({ width = '100px', height = '100px', altText = 'Logo' }) => {
  return (
    <img
      src={require('../../public/group6.jpg')}
      alt={altText}
      width={width}
      height={height}
      style={{ display: 'block' }}
    />
  );
};

export default Logo;
