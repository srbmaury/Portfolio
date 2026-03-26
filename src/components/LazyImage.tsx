import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
    spinnerClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    fallback = null,
    spinnerClassName = '',
    ...props
}) => {
    const [loading, setLoading] = useState(true);
    const [showFallback, setShowFallback] = useState(false);

    return (
        <div className={`relative w-full h-full ${className}`}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoading(false)}
                onError={e => {
                    setLoading(false);
                    setShowFallback(true);
                    if (e.target instanceof HTMLImageElement) {
                        e.target.style.display = 'none';
                    }
                }}
                {...props}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ ...(props.style || {}) }}
            />
            {loading && (
                <div className={`absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/40 z-10 ${spinnerClassName}`}>
                    <div className="spinner"></div>
                </div>
            )}
            {showFallback && fallback}
        </div>
    );
};

export default LazyImage;
