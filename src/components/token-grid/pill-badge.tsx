import { HelpTip } from 'components/astra/helptip';
import { twMerge } from 'tailwind-merge';

interface Props {
  val: number | string | undefined;
  tooltip: string;
  className?: string;
}

export const PillBadge = ({ val, tooltip, className = 'top-1 left-1' }: Props) => {
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
