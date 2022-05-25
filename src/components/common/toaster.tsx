import { ReactNode } from 'react';
import { toast, Toast, Toaster as RHTRoaster } from 'react-hot-toast';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdErrorOutline, MdWarningAmber } from 'react-icons/md';
import { XIcon } from '@heroicons/react/outline';
import { Button } from './button';

export const Toaster = () => {
  return <RHTRoaster />;
};

// styles: https://tailwindui.com/components/application-ui/overlays/notifications
const ToasterTemplate = ({
  toastObj,
  icon,
  message,
  content
}: {
  toastObj: Toast;
  icon: ReactNode;
  message: ReactNode;
  content?: ReactNode;
}) => (
  <div className="w-1/3" onClick={() => toast.remove(toastObj.id)}>
    <div className="flex items-end px-4 py-6 pointer-events-none sm:p-2 sm:items-start">
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">{icon}</div>
              <div className="ml-3 w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">{message}</div>
                {content && <div className="mt-1 text-sm text-gray-500">{content}</div>}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <Button
                  variant="round"
                  size="plain"
                  onClick={() => {
                    toast.remove(toastObj.id);
                  }}
                >
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Toast a success message - first, include <Toaster /> in JSX.
export const toastSuccess = (message: ReactNode, content?: ReactNode) => {
  toast.custom((toastObj) => (
    <ToasterTemplate
      toastObj={toastObj}
      icon={<IoMdCheckmarkCircleOutline className="text-green-600 h-8 w-8" />}
      message={message}
      content={content}
    />
  ));
};

// Toast an error message - first, include <Toaster /> in JSX.
export const toastError = (message: ReactNode, content?: ReactNode) => {
  toast.custom((toastObj) => (
    <ToasterTemplate
      toastObj={toastObj}
      icon={<MdErrorOutline className="text-red-700 h-8 w-8" />}
      message={message}
      content={content}
    />
  ));
};

// Toast a warning message - first, include <Toaster /> in JSX.
export const toastWarning = (message: ReactNode, content?: ReactNode) => {
  toast.custom((toastObj) => (
    <ToasterTemplate
      toastObj={toastObj}
      icon={<MdWarningAmber className="text-orange-500 h-8 w-8" />}
      message={message}
      content={content}
    />
  ));
};
