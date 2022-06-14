import { HelpTip } from 'components/astra/helptip';
import { SVG } from 'components/common';
import { twMerge } from 'tailwind-merge';

interface Props {
  val: number | string | undefined;
  tooltip: string;
  className?: string;
  numberSign?: boolean;
}

export const PillBadge = ({ val, tooltip, className = 'top-2 left-2', numberSign = false }: Props) => {
  if (val) {
    return (
      <div className={twMerge(className, 'absolute')}>
        <HelpTip content={tooltip}>
          <div className="bg-white  rounded-full px-3 shadow-lg">
            {numberSign && <div className="inline-block mr-1">#</div>}
            <div className="inline-block font-bold">{val}</div>
          </div>
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
