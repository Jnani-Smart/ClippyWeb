
import React, { type HTMLAttributes } from 'react';

// augment React's ImgHTMLAttributes to include fetchPriority
declare module 'react' {
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        fetchPriority?: 'high' | 'low' | 'auto';
    }
}

interface AssetPictureProps {
    index: number;
    sizes?: string;
    className?: string;
    alt: string;
    eager?: boolean;
    style?: React.CSSProperties;
    draggable?: boolean;
}

export function AssetPicture({ index, sizes, className, alt, eager = false, style, draggable }: AssetPictureProps) {
    const png = `/Assets/${index}.png`;
    const webp = `/Assets/${index}.webp`;
    const avif = `/Assets/${index}.avif`;
    const loading = eager ? 'eager' : 'lazy';
    const fetchPriority = eager ? 'high' : undefined;

    return (
        <picture>
            <source srcSet={avif} type="image/avif" />
            <source srcSet={webp} type="image/webp" />
            <img
                src={png}
                alt={alt}
                loading={loading}
                decoding="async"
                fetchPriority={fetchPriority}
                sizes={sizes}
                className={className}
                style={style}
                draggable={draggable}
            />
        </picture>
    );
}
