import { toast } from 'react-hot-toast';
import { MdErrorOutline, MdWarningAmber } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi';

import { XIcon } from '@heroicons/react/outline';
import { RoundButton } from './button';
import { iconButtonStyle } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';

export const toastSuccess = (message: string, content?: string) => {
  toastBase(message, 'success', content);
};

export const toastBase = (message: string, mode: 'error' | 'warning' | 'success', content?: string) => {
  let color = 'text-green-600';
  let icon = <FiCheckCircle className={`${color} h-11 w-11 shrink-0`} />;

  if (mode === 'error') {
    color = 'text-red-600';
    icon = <MdErrorOutline className={`${color} h-12 w-12 shrink-0`} />;
  }

  if (mode === 'warning') {
    color = 'text-orange-600';
    icon = <MdWarningAmber className={`${color} h-12 w-12 shrink-0`} />;
  }

  toast(
    (t) => (
      <div className="flex items-center">
        {icon}

        <div className="flex flex-col mx-5">
          <div className="text-lg font-bold leading-tight text-gray-900">{message}</div>
          {content && <div className="mt-1 text-sm leading-tight text-gray-500">{content}</div>}
        </div>

        <RoundButton
          onClick={() => {
            toast.dismiss(t.id);
          }}
        >
          <XIcon className={twMerge(iconButtonStyle, 'shrink-0')} aria-hidden="true" />
        </RoundButton>
      </div>
    ),
    {
      duration: 4000,
      style: { maxWidth: '400px' }
    }
  );
};

export const toastError = (message: string, content?: string) => {
  toastBase(message, 'error', content);
};

export const toastWarning = (message: string, content?: string) => {
  toastBase(message, 'warning', content);
};
