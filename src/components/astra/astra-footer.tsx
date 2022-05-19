import { inputBorderColor } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { Button, Spacer } from 'components/common';
import { getReveals } from './astra-utils';
import { User } from 'utils/context/AppContext';

interface Props {
  user?: User;
  name: string;
  numTokens: number;
}

export const AstraFooter = ({ user, name, numTokens }: Props) => {
  return (
    <div className={twMerge(inputBorderColor, 'px-6 py-1 flex justify-center border-t bg-slate-200')}>
      <div className="text-lg"> {name}</div>
      <Spacer />
      {user && (
        <Button
          onClick={() => {
            getReveals(user.address);
          }}
        >
          Reveal
        </Button>
      )}

      <Spacer />
      <div className="text-lg">{numTokens} items</div>
    </div>
  );
};
