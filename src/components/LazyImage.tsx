import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
    spinnerClassName?: string;
    fit?: 'cover' | 'contain';
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    fallback = null,
    spinnerClassName = '',
    fit = 'cover',
    ...props
}) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    return (
        <div className={`relative overflow-hidden ${className || 'w-full h-full'}`}>
            {status === 'error' ? fallback : (
                <img
                    {...props}
                    src={src}
                    alt={alt}
                    loading={props.loading ?? 'lazy'}
                    onLoad={(event) => {
                        setStatus('loaded');
                        props.onLoad?.(event);
                    }}
                    onError={(event) => {
                        setStatus('error');
                        props.onError?.(event);
                    }}
                    className={`w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover object-top'} transition-transform duration-300 group-hover:scale-105`}
                />
            )}
            {status === 'loading' && (
                <div aria-hidden="true" className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/40 ${spinnerClassName}`}>
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
};

export default LazyImage;
