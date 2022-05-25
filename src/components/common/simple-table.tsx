import { Spacer } from 'components/common';
import { twMerge } from 'tailwind-merge';

// ---------------------------------
// Example
//
// const items: SimpleTableItem[] = [];
// items.push({ title: 'Max budget',  value: <div>{order.maxBudget}</div> });
// items.push({ title: 'Number of NFTs', value: <div>{order.numItems}</div> });
//
// return (<div className="w-full">
//     <SimpleTable items={items} />
//   </div>)
// );

export interface SimpleTableItem {
  title: string;
  value: JSX.Element;
}

interface Props {
  items: SimpleTableItem[];
  className?: string;
  compact?: boolean;
}

export const SimpleTable = ({ items, className = '', compact = false }: Props) => {
  let spacing = 'space-y-2';

  if (compact) {
    spacing = 'space-y-1';
  }

  const table = items.map((item) => {
    return (
      <div key={Math.random()} className="flex w-full">
        <div>{item.title}</div>
        <Spacer />
        <div className="font-bold">{item.value}</div>
      </div>
    );
  });

  return <div className={twMerge(className, spacing)}>{table}</div>;
};
