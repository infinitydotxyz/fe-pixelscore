import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { twMerge } from 'tailwind-merge';

const faqs = [
  {
    question: 'How we rank NFTs',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.'
  },
  {
    question: 'Benefits',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.'
  },
  {
    question: 'How do you make money selling NFTs?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.'
  },
  {
    question: 'How do you scam old people?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.'
  }
];

export const FAQ = () => {
  return (
    <div className="flex dark:text-dark-body text-6xl">
      <div className="  mr-14">
        Frequently
        <br />
        Asked
        <br />
        <span className="text-blue-600">Questions</span>
      </div>

      <div className="w-full       ">
        <div className="     ">
          <div className="  space-y-6 ">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className=" bg-gray-100 bg-opacity-10 p-10 rounded-3xl">
                {({ open }) => (
                  <>
                    <dt className=" ">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-blue-600">
                        <span className="font-medium text-3xl dark:text-dark-body">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={twMerge(open ? '-rotate-180' : 'rotate-0', 'h-10 w-10 transform ')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
