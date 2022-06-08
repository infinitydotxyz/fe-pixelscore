import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  src?: string;
  center?: boolean; // false for bg-top
  className?: string;
}

export const BGImage = ({ src, center = true, className = '' }: Props) => {
  const [loaded, setLoaded] = useState(false);

  // todo: src.replace hack to handle changed opensea image url
  src = src?.replace('storage.opensea.io', 'openseauserdata.com');

  useEffect(() => {
    const img = new Image();
    let deleted = false;

    if (src) {
      img.onload = () => {
        if (!deleted) {
          setLoaded(true);
        }
      };
      img.src = src;
    }

    return () => {
      deleted = true;

      // trying to cancel load? not sure if this works
      img.src = '';
      img.onload = null;
    };
  }, [src]);

  return (
    <div className={twMerge('w-full h-full', className, 'bg-slate-400')}>
      {src && (
        <div
          className={twMerge(
            center ? 'bg-center' : 'bg-top',
            loaded ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-400 w-full h-full bg-cover bg-no-repeat',
            className
          )}
          style={{ backgroundImage: `url(${src})` }}
        />
      )}
    </div>
  );
};
