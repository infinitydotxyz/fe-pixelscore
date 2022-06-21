import { PageBox, NextLink } from 'components/common';
import { twMerge } from 'tailwind-merge';

export const PaperPage = () => {
  return (
    <PageBox customHeader={<PDFNavbar />} extraScrollHeight={false} className="w-full h-full m-0" pageClass="h-screen">
      <iframe src="paper.pdf" height="100%" width="100%" />
    </PageBox>
  );
};

export const PDFNavbar = () => {
  return (
    // relative added to give it a different layer so shadow isn't wiped out by sidebar
    <div className={twMerge('flex px-4 pt-2 items-center   bg-[#323639]   ')}>
      <NextLink href="/" className="flex items-center">
        <div className="text-2xl font-bold text-dark-body font-pixel">Pixelrank</div>
      </NextLink>
    </div>
  );
};
