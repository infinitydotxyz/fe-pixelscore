import { iconButtonStyle, inputBorderColor } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { BGImage, ReadMoreText, Spacer, SVG } from 'components/common';
import { AstraNavTab } from '../astra-navbar';
import { useDashboardContext } from 'utils/context/DashboardContext';

interface Props {
  route: AstraNavTab;
  vertical: boolean;
}

export const GridHeader = ({ route, vertical }: Props) => {
  const { numTokens, userRecord, collection } = useDashboardContext();

  let avatarUrl;
  let name = '';
  let description = '';
  let scoreText = '';
  let numNfts = numTokens;

  switch (route) {
    case AstraNavTab.All:
      avatarUrl = collection?.bannerImage || collection?.profileImage;
      name = collection?.name ?? '';
      description = collection?.description ?? '';
      numNfts = numTokens;
      break;
    case AstraNavTab.Pending:
      name = route;
      description = 'Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. ';
      break;
    case AstraNavTab.MyNFTs:
      name = route;

      if (userRecord && userRecord.portfolioScore !== -1) {
        scoreText = `Portfolio Score: ${userRecord.portfolioScore}`;
      }
      break;
    case AstraNavTab.Hot:
    case AstraNavTab.Top100:
      name = route;
      break;
  }

  if (vertical) {
    if (route !== AstraNavTab.Pending) {
      return (
        <div className={twMerge(inputBorderColor, 'flex-col items-center bg-gray-100 border-b px-8 py-3')}>
          <div className="relative">
            <BGImage src={avatarUrl} className="mr-6 h-20 w-full rounded-xl" />
            {collection?.hasBlueCheck && (
              <div className="absolute bottom-1 right-1 bg-white">
                <SVG.blueCheck className={iconButtonStyle} />
              </div>
            )}
          </div>

          <div className="my-2 tracking-tight text-theme-light-800 font-bold text-xl text-center">{name}</div>

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
            <div className="tracking-tight text-theme-light-800 font-bold text-xl text-center">{name}</div>
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
    if (route !== AstraNavTab.Pending) {
      return (
        <div className={twMerge(inputBorderColor, 'flex items-center bg-gray-100 border-b px-8 py-3')}>
          <div className="relative mr-6">
            <BGImage src={avatarUrl} className="h-16 w-36 rounded-xl" />
            {collection?.hasBlueCheck && (
              <div className="absolute bottom-1 right-1 bg-white rounded-full">
                <SVG.blueCheck className={iconButtonStyle} />
              </div>
            )}
          </div>

          <div className="flex flex-col items-start">
            <div className="tracking-tight text-theme-light-800 font-bold text-xl text-center">{name}</div>
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
