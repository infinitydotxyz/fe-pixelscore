import { PageBox } from 'components/common';

export const PaperPage = () => {
  return (
    <PageBox extraScrollHeight={false} className="w-full h-full m-0" pageClass="h-screen">
      <iframe src="paper.pdf" height="100%" width="100%" />
    </PageBox>
  );
};
