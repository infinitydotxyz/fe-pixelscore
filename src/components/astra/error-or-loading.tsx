import { CenteredContent, Spinner } from 'components/common';

interface Props2 {
  error: boolean;
}

export const ErrorOrLoading = ({ error }: Props2) => {
  let contents;

  if (error) {
    contents = <div>Unable to load data</div>;
  } else {
    contents = <Spinner />;
  }

  return (
    <div className="h-full w-full">
      <CenteredContent>{contents}</CenteredContent>
    </div>
  );
};
