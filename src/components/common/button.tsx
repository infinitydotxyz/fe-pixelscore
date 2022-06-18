import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { inputBorderColor } from '../../utils/ui-constants';

const classes = {
  base: ' hover:border-black ',
  disabled: 'opacity-30 cursor-not-allowed',
  pill: 'rounded-full',
  size: {
    plain: '',
    small: 'px-3 py-1 text-xs',
    normal: 'px-6 py-2',
    large: 'px-8 py-3 text-lg'
  },
  variant: {
    plain: '',
    ghost: 'rounded-full', // hover fill needs to be rounded
    primary: 'border rounded-full border-gray-100 bg-black font-bold text-white',
    secondary: 'border rounded-full border-gray-100 bg-black  font-bold  text-white',
    outline: twMerge(inputBorderColor, 'border rounded-full font-bold  text-gray-900'),
    round: 'rounded-full p-2' // use plain size
  }
};

export interface Props {
  onClick: (ev: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  children: ReactNode;
  variant?: keyof typeof classes.variant;
  size?: keyof typeof classes.size;
  disabled?: boolean;
  className?: string;
  showBackground?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'normal',
  disabled = false,
  children,
  className = '',
  onClick
}: Props): JSX.Element => {
  return (
    <ButtonBase
      disabled={disabled}
      className={twMerge(classes.base, classes.size[size], classes.variant[variant], className)}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};

// ======================================================

export interface BaseProps {
  onClick: (ev: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface BasePropsNoClick {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

const ButtonBaseNoClick = ({ disabled = false, children, className = '' }: BasePropsNoClick): JSX.Element => {
  const disabledClass = 'opacity-30 cursor-not-allowed';
  // focus ring appears on keyboard tab key navigation for accessibility, not on clicks
  const base =
    'active:bg-gray-900 active:text-white select-none transition ease-in-out duration-300 focus:outline-none focus-visible:ring focus:ring-black focus:ring-opacity-50';

  return (
    <button
      // don't disable here, just use the disabled style
      // otherwise a disabled buttons click will go to the parent, onClick isn't called
      // disabled={disabled}
      className={twMerge(base, disabled ? disabledClass : '', className)}
    >
      <div className="whitespace-nowrap">{children}</div>
    </button>
  );
};

const ButtonBase = ({ disabled = false, children, className = '', onClick }: BaseProps): JSX.Element => {
  const disabledClass = 'opacity-30 cursor-not-allowed';
  // focus ring appears on keyboard tab key navigation for accessibility, not on clicks
  const base =
    'active:bg-gray-900 active:text-white select-none transition ease-in-out duration-300 focus:outline-none focus-visible:ring focus:ring-black focus:ring-opacity-50';

  return (
    <button
      // don't disable here, just use the disabled style
      // otherwise a disabled buttons click will go to the parent, onClick isn't called
      // disabled={disabled}
      className={twMerge(base, disabled ? disabledClass : '', className)}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!disabled) {
          onClick(e);
        }
      }}
    >
      <div className="whitespace-nowrap">{children}</div>
    </button>
  );
};

// ======================================================

export const RoundButton = ({
  disabled = false,
  showBackground = false,
  children,
  className = '',
  onClick
}: Props): JSX.Element => {
  const cn = 'rounded-full p-2';
  const cnb = 'p-5 bg-gray-800';

  return (
    <ButtonBase disabled={disabled} className={twMerge(cn, showBackground ? cnb : '', className)} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

// ======================================================

export const LargeButton = ({ disabled = false, children, className = '', onClick }: Props): JSX.Element => {
  return (
    <ButtonBase
      disabled={disabled}
      className={twMerge(
        'text-xl font-bold px-8 text-white py-3 rounded-2xl border-4 border-cyan-400 bg-black',
        'shadow-[0_20px_40px_-13px_rgba(34,211,238,.6)]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
};

export const LargeButtonNoClick = ({ disabled = false, children, className = '' }: BasePropsNoClick): JSX.Element => {
  return (
    <ButtonBaseNoClick
      disabled={disabled}
      className={twMerge(
        'text-xl font-bold px-8 text-white py-3 rounded-2xl border-4 border-cyan-400 bg-black',
        'shadow-[0_20px_40px_-13px_rgba(34,211,238,.6)]',
        className
      )}
    >
      {children}
    </ButtonBaseNoClick>
  );
};
