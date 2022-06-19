import { CenteredContent, Spinner } from 'components/common';

interface Props2 {
  error: boolean;
  noData: boolean;
}

export const ErrorOrLoading = ({ error, noData }: Props2) => {
  let contents;

  if (error) {
    contents = <div>Unable to load data</div>;
  } else {
    if (noData) {
      contents = <div>Nothing found</div>;
    } else {
      contents = <Spinner />;
    }
  }

  return (
    <div className="h-full w-full dark:text-dark-body">
      <CenteredContent>{contents}</CenteredContent>
    </div>
  );
};
