import { inputBorderColor } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { AstraNavTab } from '../astra-navbar';
import { useDashboardContext } from 'utils/context/DashboardContext';
import { Spacer } from 'components/common';

interface Props {
  route: AstraNavTab;
}

export const GridHeader = ({ route }: Props) => {
  const { numTokens, userRecord, setShowOnlyUnvisible, showOnlyUnvisible } = useDashboardContext();

  let name = '';
  let scoreText = '';
  let showCheckbox = false;

  switch (route) {
    case AstraNavTab.All:
    case AstraNavTab.Top5:
      showCheckbox = true;
      break;
    case AstraNavTab.Pending:
    case AstraNavTab.Revealed:
      break;
    case AstraNavTab.Portfolio:
      name = route;
      if (userRecord && userRecord.portfolioScore !== -1) {
        scoreText = `Portfolio Score: ${userRecord.portfolioScore}`;
      }
      break;
  }

  if (route === AstraNavTab.Portfolio) {
    return (
      <div
        className={twMerge(
          inputBorderColor,
          'flex items-center bg-gray-100 dark:bg-dark-card border-b px-8 py-3 dark:text-dark-body'
        )}
      >
        <div className="flex flex-col items-start">
          <div className="tracking-tight font-bold text-xl text-center">{name}</div>
        </div>
        <Spacer />
        <div className="flex flex-col items-end">
          <div className="text-lg whitespace-nowrap ml-3">{numTokens} Nfts</div>

          {scoreText && <div className="text-lg whitespace-nowrap ml-3">{scoreText}</div>}
        </div>
      </div>
    );
  }

  if (showCheckbox) {
    return (
      <>
        <div className="flex items-center ml-8 mt-4">
          <input
            checked={showOnlyUnvisible}
            onChange={(e) => setShowOnlyUnvisible(e.target.checked)}
            id="checkbox"
            type="checkbox"
            className={twMerge(
              'w-6 h-6 focus-visible:ring focus:ring-0 text-gray-600  rounded',
              '  dark:ring-offset-dark-bg   dark:bg-gray-600 dark:dark-blue'
            )}
          />
          <label htmlFor="checkbox" className="ml-4 text-xl lg:text-lg font-medium text-gray-900 dark:text-dark-body">
            Show Unrevealed
          </label>
        </div>
      </>
    );
  }

  return <></>;
};

/* 


export const GridHeader = ({ route, vertical }: Props) => {
  const { numTokens, userRecord, collection } = useDashboardContext();

  let avatarUrl;
  let name = '';
  let description = '';
  let scoreText = '';
  let numNfts = numTokens;
  let showCollectionImage = false;

  switch (route) {
    case AstraNavTab.All:
      avatarUrl = collection?.bannerImage || collection?.profileImage;
      name = collection?.name ?? '';
      description = collection?.description ?? '';
      showCollectionImage = true;
      numNfts = numTokens;
      break;
    case AstraNavTab.Pending:
      name = route;
      description = 'Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. ';
      break;
    case AstraNavTab.Revealed:
      name = route;
      description = 'Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. ';
      break;
    case AstraNavTab.Portfolio:
      name = route;
      if (userRecord && userRecord.portfolioScore !== -1) {
        scoreText = `Portfolio Score: ${userRecord.portfolioScore}`;
      }
      break;
    case AstraNavTab.Top5:
      name = route;
      break;
  }

  if (vertical) {
    if (route !== AstraNavTab.Pending && route !== AstraNavTab.Revealed) {
      return (
        <div className={twMerge(inputBorderColor, 'flex-col items-center bg-gray-100 border-b px-8 py-3')}>
          {showCollectionImage && (
            <div className="relative">
              <BGImage src={avatarUrl} className="mr-6 h-20 w-full rounded-xl" />
              <BlueCheckBadge val={collection?.hasBlueCheck} />
            </div>
          )}

          <div className="my-2 tracking-tight font-bold text-xl text-center">{name}</div>

          <div className="flex flex-col items-start">
            <div className="max-w-3xl">
              <ReadMoreText text={description} min={50} ideal={160} max={10000} />
            </div>
          </div>

          <Spacer />

          <div className="text-lg whitespace-nowrap text-center my-2 ">{numNfts} Nfts</div>

          {scoreText && <div className="text-lg whitespace-nowrap text-center my-2 ">{scoreText}</div>}
        </div>
      );
    } else {
      return (
        <div className={twMerge(inputBorderColor, 'flex-col items-center bg-gray-100 border-b px-8 py-3')}>
          <div className="flex flex-col items-start">
            <div className="tracking-tight font-bold text-xl text-center">{name}</div>
            <div className="max-w-3xl">
              <ReadMoreText text={description} min={50} ideal={160} max={10000} />
            </div>
          </div>
          <Spacer />
          <div className="flex flex-col items-end">
            <div className="text-lg whitespace-nowrap ml-3">{numNfts} Nfts</div>
          </div>
        </div>
      );
    }
  } else {
    if (route !== AstraNavTab.Pending && route !== AstraNavTab.Revealed) {
      return (
        <div
          className={twMerge(
            inputBorderColor,
            'flex items-center bg-gray-100 dark:bg-dark-card border-b px-8 py-3 dark:text-dark-body'
          )}
        >
          {showCollectionImage && (
            <div className="relative mr-6">
              <BGImage src={avatarUrl} className="h-16 w-36 rounded-xl" />
              <BlueCheckBadge val={collection?.hasBlueCheck} />
            </div>
          )}

          <div className="flex flex-col items-start">
            <div className="tracking-tight font-bold text-xl text-center">{name}</div>
            <div className="max-w-2xl">
              <ReadMoreText text={description} min={50} ideal={160} max={10000} />
            </div>
          </div>
          <Spacer />
          <div className="flex flex-col items-end">
            <div className="text-lg whitespace-nowrap ml-3">{numNfts} Nfts</div>

            {scoreText && <div className="text-lg whitespace-nowrap ml-3">{scoreText}</div>}
          </div>
        </div>
      );
    }
  }

  return <></>;
};


      */
