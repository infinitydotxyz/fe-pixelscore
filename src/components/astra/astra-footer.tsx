import { inputBorderColor } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { Button, Spacer } from 'components/common';
import { MdRefresh } from 'react-icons/md';

interface Props {
  name: string;
  numTokens: number;
  onRefresh: () => void;
}

export const AstraFooter = ({ name, numTokens, onRefresh }: Props) => {
  return (
    <div className={twMerge(inputBorderColor, 'px-6 py-1 flex items-center border-t bg-slate-200')}>
      <div className="text-lg"> {name}</div>

      <Spacer />

      <Button onClick={onRefresh} size="plain" variant="round">
        <MdRefresh className="h-6 w-6" />
      </Button>

      <div className="ml-4 text-lg">{numTokens} items</div>
    </div>
  );
};
