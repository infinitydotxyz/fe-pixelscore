import { HelpTip } from 'components/astra/helptip';
import { SVG } from 'components/common';
import { twMerge } from 'tailwind-merge';

interface Props {
  val: number | string | undefined;
  tooltip: string;
  className?: string;
}

export const PillBadge = ({ val, tooltip, className = 'top-2 left-2' }: Props) => {
  if (val) {
    return (
      <div className={twMerge(className, 'absolute')}>
        <HelpTip content={tooltip}>
          <div className="bg-white font-bold rounded-full px-3 shadow-lg">{val}</div>
        </HelpTip>
      </div>
    );
  }

  return <></>;
};

// ===============================================================

interface Props2 {
  val: boolean | undefined;
  tooltip?: string;
  className?: string;
}

export const BlueCheckBadge = ({ val, tooltip = 'Blue check verified', className = 'bottom-1 right-1' }: Props2) => {
  if (val) {
    return (
      <div className={twMerge(className, 'absolute')}>
        <HelpTip content={tooltip}>
          <div className="bg-white opacity-70 bg-opacity-80 rounded-full">
            <SVG.blueCheck className={'h-5 w-5'} />
          </div>
        </HelpTip>
      </div>
    );
  }

  return <></>;
};
