'use client';

interface AspectRatioProps {
  ratio?: number | string;
  style?: Partial<CSSStyleDeclaration>;
  [key: string]: unknown;
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
