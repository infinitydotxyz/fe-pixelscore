import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { CenteredContent } from './centered-content';
import { Spinner } from './spinner';

interface Props {
  src?: string;
  center?: boolean; // false for bg-top
  className?: string;
}

export const BGImage = ({ src, center = true, className = '' }: Props) => {
  const [loaded, setLoaded] = useState(false);

  // src.replace hack to handle changed opensea image url
  src = src?.replace('storage.opensea.io', 'openseauserdata.com');

  useEffect(() => {
    let img: HTMLImageElement | undefined;
    let deleted = false;

    if (src) {
      const img = new Image();

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
      if (img) {
        img.src = '';
        img.onload = null;
        img = undefined;
      }
    };
  }, [src]);

  return (
    <div className={twMerge('w-full h-full relative', className, 'dark:bg-dark-card bg-light-card')}>
      {src && (
        <>
          <div
            className={twMerge(
              center ? 'bg-center' : 'bg-top',
              loaded ? 'opacity-100' : 'opacity-0',
              'transition-opacity  duration-400 w-full h-full bg-cover bg-no-repeat',
              className
            )}
            style={{ backgroundImage: `url(${src})` }}
          />
          {!loaded && (
            <div className="absolute top-0 bottom-0 left-0 right-0">
              <CenteredContent>
                <Spinner />
              </CenteredContent>
            </div>
          )}
        </>
      )}
    </div>
  );
};
