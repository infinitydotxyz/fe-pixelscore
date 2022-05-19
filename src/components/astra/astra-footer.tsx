import { inputBorderColor } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { Spacer } from 'components/common';

interface Props {
  name: string;
  numTokens: number;
}

export const AstraFooter = ({ name, numTokens }: Props) => {
  return (
    <div className={twMerge(inputBorderColor, 'px-6 py-1 flex justify-center border-t bg-slate-200')}>
      <div className="text-lg"> {name}</div>
      <Spacer />
      <div className="text-lg">{numTokens} items</div>
    </div>
  );
};
