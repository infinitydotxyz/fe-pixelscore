import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { twMerge } from 'tailwind-merge';

const faqs = [
  {
    question: 'How are the ranks calculated?',
    answer:
      'Each NFT is decomposed into a 224x224 matrix of pixels. Then each pixel is assigned a score based on how rarely it occurs in the entire dataset. All the scores for each pixel in the NFT are added up to arrive at the rarity/rank of the NFT.'
  },
  {
    question: 'Why is this ranking method better?',
    answer:
      'Our ranking method is the only one that can rank NFTs globally. The rarity score is based on a clear mathematical formula and bare-bones NFT data, which makes it free from biases, market trends and community sentiment created by influencers, forums, discord groups, and creators.'
  },
  {
    question: 'How many NFTs are ranked?',
    answer: 'We ranked around 10M NFTs after analyzing a total of 55,000 collections'
  },
  {
    question: 'Can Pixelrank be used to rank new NFTs?',
    answer:
      'Absolutely. Our goal is to rank every NFT in existence. The algorithm scales linearly and can be easily extended to rank previously unseen NFTs.'
  }
];

export const FAQ = () => {
  return (
    <div className="flex flex-col dark:text-dark-body text-light-body text-7xl gap-20 lg:flex-row">
      <div className="  ">
        Frequently
        <br />
        Asked
        <br />
        <span className="dark:text-dark-blue text-light-blue">Questions</span>
      </div>

      <div className="w-full  space-y-6 ">
        {faqs.map((faq) => (
          <Disclosure
            as="div"
            key={faq.question}
            className=" bg-gray-100 bg-opacity-10 rounded-3xl border-2 hover:border-blue-600 border-transparent hover:bg-blue-600 hover:bg-opacity-10  "
          >
            {({ open }) => (
              <>
                <dt className="">
                  <Disclosure.Button className="text-left p-10 w-full flex justify-between items-start dark:text-dark-blue text-light-blue">
                    <span className="font-medium text-3xl dark:text-dark-body text-light-body">{faq.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                      <ChevronDownIcon
                        className={twMerge(open ? '-rotate-180' : 'rotate-0', 'h-10 w-10 transform ')}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="p-10 pt-0 pr-12">
                  <p className="text-2xl dark:text-dark-body text-light-body">{faq.answer}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};
