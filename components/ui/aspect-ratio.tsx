'use client';

import type { CSSProperties, HTMLAttributes } from 'react';

interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number | string;
  style?: CSSProperties;
}

const AspectRatio = ({ ratio = 1, style, ...props }: AspectRatioProps) => (
  <div
    style={{
      aspectRatio: ratio,
      ...style,
    }}
    {...props}
  />
);

AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
