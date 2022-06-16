import { ReactNode } from 'react';
import { toast, Toaster as RHTRoaster } from 'react-hot-toast';
import { MdErrorOutline, MdWarningAmber } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi';

import { XIcon } from '@heroicons/react/outline';
import { RoundButton } from './button';
import { iconButtonStyle } from 'utils/ui-constants';

export const Toaster = () => {
  return <RHTRoaster />;
};

// Toast a success message - first, include <Toaster /> in JSX.
export const toastSuccess = (message: ReactNode, content?: ReactNode) => {
  toastBase(message, 'success', content);
};

export const toastBase = (message: ReactNode, mode: 'error' | 'warning' | 'success', content?: ReactNode) => {
  let color = 'text-green-600';
  let icon = <FiCheckCircle className={`${color} h-16 w-16`} />;

  if (mode === 'error') {
    color = 'text-red-600';
    icon = <MdErrorOutline className={`${color} h-12 w-12`} />;
  }

  if (mode === 'warning') {
    color = 'text-orange-600';
    icon = <MdWarningAmber className={`${color} h-12 w-12`} />;
  }

  toast(
    (t) => (
      <div className="flex items-center">
        {icon}

        <div className="flex flex-col mx-6">
          <div className="text-lg font-bold text-gray-900">{message}</div>
          {content && <div className="mt-1 text-sm leading-tight text-gray-500">{content}</div>}
        </div>

        <RoundButton
          onClick={() => {
            toast.dismiss(t.id);
          }}
        >
          <XIcon className={iconButtonStyle} aria-hidden="true" />
        </RoundButton>
      </div>
    ),
    {
      duration: 4000
    }
  );
};

// Toast an error message - first, include <Toaster /> in JSX.
export const toastError = (message: ReactNode, content?: ReactNode) => {
  toastBase(message, 'error', content);
};

// Toast a warning message - first, include <Toaster /> in JSX.
export const toastWarning = (message: ReactNode, content?: ReactNode) => {
  toastBase(message, 'warning', content);
};
