'use client';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useId } from 'react';

const LinesIllustration = ({ className: additionalClassName, color, bgColor }) => {
  const id = useId();

  return (
    <LazyMotion features={domAnimation}>
      <m.span
        className={clsx(
          'pointer-events-none absolute -top-1/2 left-1/2 -z-10 block h-[130px] w-[113%] -translate-x-1/2',
          additionalClassName
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-hidden
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 150"
          preserveAspectRatio="none"
          fill="none"
          className="absolute top-0"
        >
          <g opacity="0.6" filter="url(#filter)">
            <path
              d="M30.1987 61.1842C30.1987 43.7436 44.3371 29.6052 61.7777 29.6052H238.212C255.652 29.6052 269.791 43.7436 269.791 61.1842C269.791 93.8853 243.281 120.395 210.58 120.395H89.4092C56.7082 120.395 30.1987 93.8853 30.1987 61.1842Z"
              fill={`url(#${id})`}
            />
            <path
              d="M30.6924 61.1842C30.6924 44.0161 44.6098 30.0986 61.7779 30.0986H238.212C255.38 30.0986 269.297 44.0161 269.297 61.1842C269.297 93.6127 243.009 119.901 210.58 119.901H89.4094C56.9809 119.901 30.6924 93.6127 30.6924 61.1842Z"
              stroke={bgColor}
            />
          </g>

          <defs>
            <filter
              id="filter"
              x="0"
              y="0"
              width="100%"
              height="100%"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="15" result="effect1_foregroundBlur_103_7" />
            </filter>
            <linearGradient
              id={`${id}`}
              x1="154.432"
              y1="29.6052"
              x2="154.432"
              y2="145.614"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.789474" stopColor={color} />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <svg width="100%" height="100%" fill="none" className="absolute top-0">
          <defs>
            <pattern id="linePattern" patternUnits="userSpaceOnUse" width="200" height="2">
              <line x1="0" y1="0" x2="300" y2="0" stroke={bgColor} strokeWidth="1" />
              <line x1="0" y1="2" x2="300" y2="2" stroke={bgColor} strokeWidth="1" />
            </pattern>
          </defs>
          <g className="button-line-animation">
            <rect width="100%" height="100%" y="-1" fill="url(#linePattern)" />
            <rect width="100%" height="100%" y="100%" fill="url(#linePattern)" />
          </g>
        </svg>
      </m.span>
    </LazyMotion>
  );
};

LinesIllustration.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

export default LinesIllustration;
