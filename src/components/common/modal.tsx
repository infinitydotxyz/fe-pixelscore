import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { Spacer, Button } from 'components/common';
import { XIcon } from '@heroicons/react/outline';
import { iconButtonStyle } from 'utils/ui-constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string | ReactNode;

  showCloseIcon?: boolean;

  children?: ReactNode;
  // you can repurpose the ok/cancel buttons
  // pass in '' to hide button
  okButton?: string;
  cancelButton?: string;

  disableOK?: boolean;
  disableCancel?: boolean;

  // if not set, it will call onClose
  onCancelButton?: () => void;
  onOKButton?: () => void;

  showActionButtons?: boolean;
  wide?: 'normal' | 'wide' | 'fit';
}

export const Modal = ({
  isOpen,
  children,
  onOKButton,
  onCancelButton,
  okButton = 'OK',
  cancelButton = 'Cancel',
  disableOK = false,
  showCloseIcon = false,
  disableCancel = false,
  title,
  onClose, // X icon, or click outside dialog
  showActionButtons = true,
  wide = 'normal'
}: Props) => {
  const buttons = [];

  // pass in '' to hide button
  if (okButton) {
    buttons.push(
      <Button
        key={Math.random()}
        className="flex-1"
        disabled={disableOK}
        onClick={() => {
          if (onOKButton) {
            onOKButton();
          } else {
            onClose();
          }
        }}
      >
        {okButton}
      </Button>
    );
  }

  // pass in '' to hide button
  if (cancelButton) {
    buttons.push(
      <Button
        key={Math.random()}
        className="flex-1"
        disabled={disableCancel}
        variant="outline"
        onClick={() => {
          if (onCancelButton) {
            onCancelButton();
          } else {
            onClose();
          }
        }}
      >
        {cancelButton}
      </Button>
    );
  }

  let wideStyle = '';
  let padding = 'py-8 px-9';

  switch (wide) {
    case 'normal':
      wideStyle = 'w-full max-w-md';
      break;
    case 'fit':
      wideStyle = 'w-fit';
      padding = '';
      break;
    case 'wide':
      wideStyle = 'w-full max-w-lg';
      break;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${wideStyle} transform overflow-hidden rounded-2xl bg-white ${padding} text-left align-middle shadow-xl transition-all`}
              >
                {(title || showCloseIcon) && (
                  <Dialog.Title className="flex items-center tracking-tight text-xl font-bold leading-6 text-gray-900 mb-6">
                    {title && title}

                    {showCloseIcon && (
                      <>
                        <Spacer />

                        <Button size="plain" variant="round" onClick={onClose}>
                          <XIcon className={iconButtonStyle} />
                        </Button>
                      </>
                    )}
                  </Dialog.Title>
                )}

                {children}
                {showActionButtons && <div className="p-4 flex space-x-4 mt-8">{buttons}</div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
