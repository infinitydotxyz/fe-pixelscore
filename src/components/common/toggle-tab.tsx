import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  selected: string;
  className?: string;
  options: string[];
  onChange: (option: string) => void;
  equalWidths?: boolean;
  altStyle?: boolean;
}

export const useToggleTab = (options: string[], selectedOption: string) => {
  const [selected, setSelected] = useState(selectedOption);

  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  const onChange = (option: string) => {
    setSelected(option);
  };

  return { onChange, selected, options };
};

export const ToggleTab = ({
  options,
  onChange,
  selected,
  className = '',
  equalWidths = true,
  altStyle = false
}: Props) => {
  return (
    <div className={`flex ${className}`}>
      <div
        className={twMerge(
          'cursor-pointer flex gap-1 rounded-full items-center p-1',
          altStyle ? 'bg-white' : 'bg-gray-100'
        )}
      >
        {options.map((option: string) => {
          return (
            <div
              key={option}
              className={twMerge(
                equalWidths ? 'min-w-[130px]' : '',
                'flex select-none text-md items-center justify-center  text-center whitespace-nowrap font-medium rounded-full text-secondary',
                selected === option ? 'bg-black dark:text-dark-body text-light-body font-bold' : '',
                altStyle ? 'py-1 px-6' : 'py-2.5 px-10'
              )}
              onClick={() => onChange(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ToggleTabAlt = ({ options, onChange, selected, className = '', equalWidths = true }: Props) => {
  return (
    <div className={`flex ${className}`}>
      <div className={twMerge('cursor-pointer lg:space-x-8 sm:space-x-6 flex rounded-full items-center')}>
        {options.map((option: string) => {
          return (
            <div
              key={option}
              className={twMerge(
                equalWidths ? 'min-w-[130px]' : '',
                'text-md flex select-none items-center justify-center text-center whitespace-nowrap rounded-full',
                selected === option
                  ? 'dark:text-dark-blue text-light-blue font-bold'
                  : 'dark:text-dark-disabled text-light-disabled'
              )}
              onClick={() => onChange(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};
