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
    <div className="flex dark:text-dark-body text-6xl space-x-20">
      <div className="  ">
        Frequently
        <br />
        Asked
        <br />
        <span className="text-blue-600">Questions</span>
      </div>

      <div className="w-full  space-y-6 ">
        {faqs.map((faq) => (
          <Disclosure
            as="div"
            key={faq.question}
            className=" bg-gray-100 bg-opacity-10  rounded-3xl border-2 hover:border-blue-600 border-transparent hover:bg-blue-600 hover:bg-opacity-10  "
          >
            {({ open }) => (
              <>
                <dt className=" ">
                  <Disclosure.Button className="text-left p-10 w-full flex justify-between items-start text-blue-600">
                    <span className="font-medium text-3xl dark:text-dark-body">{faq.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                      <ChevronDownIcon
                        className={twMerge(open ? '-rotate-180' : 'rotate-0', 'h-10 w-10 transform ')}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="p-10 pt-0 pr-12">
                  <p className="text-2xl dark:text-dark-body">{faq.answer}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};
