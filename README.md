TODO:

1. use result from refresh on Pending item and update the list on screen
2. Search doesn't work well
3. Some of your NFTs are in the top 1%, pay to reveal
4. score NFTs that are not scored yet. show unscored?
5. tab routes
6. dark home page, https://pixelverse.ai/, https://nft-avatars.webflow.io/
7. in the checkout flow, if someone tries to checkout NFTs whose ranks are already revealed (all NFTs whose pixel rank bucket < 10 and the ones with bucket 10 but pixelRankRevealed = true), checkout should show an error to remove already revealed items from cart (edited)
8. pending cards ugly
9.

1) loop over the rankings collection in pixeldb - has 10M docs, so you can fetch maybe 1000 at a time and paginate
2) for each <rankingsdoc>, read the collectionAddress
   2.1) check if pixeldb already has data for this address in collections collection (initially it won't have it)
   2.2) If not do step 3. If yes, do step 4
3) Do const collectionInfo = await getCollectionInfo(collection) from collectMetadata.ts. Dump this in collections collection with a doc id <1:$collectionAddress>. Also merge this to the <rankingsdoc> above
4) Fetch this data and merge this to the <rankingsdoc> above

So in the end, you will have a new collections collection which you can use for list and search
You will also have the ranking docs enhanced with collection data so the 'unknowns' we are seeing now won't be there

It's important to not do step 3 for collections already fetched, otherwise you will run into rate limits

check collectMetadata.ts for reference

const collectionInfo = await getCollectionInfo(collection) this fetches this type:

export interface CollectionInfo {
address: string;
chainId: string;
tokenStandard: string;
slug: string;
name: string;
symbol: string;
description: string;
profileImage: string;
bannerImage: string;
cardDisplaytype?: string;
twitter?: string;
discord?: string;
external?: string;
}

so I think you can add what's missing

it already has this type:
export interface TokenInfo {
chainId: string;
collectionAddress: string;
collectionSlug?: string;
tokenId: string;
imageUrl: string;
rarityScore?: number;
rarityRank?: number;
inCollectionPixelScore?: number;
inCollectionPixelRank?: number;
pixelScore?: number;
pixelRank?: number;
pixelRankBucket?: number;
pixelRankRevealed?: boolean;
pixelRankVisible?: boolean;
pixelRankRevealer?: string;
pixelRankRevealedAt?: number;
}

export interface TokenInfo {
chainId: string;
collectionAddress: string;
collectionSlug?: string;
tokenId: string;
imageUrl: string;
rarityScore?: number;
rarityRank?: number;
inCollectionPixelScore?: number;
inCollectionPixelRank?: number;
pixelScore?: number;
pixelRank?: number;
pixelRankBucket?: number;
pixelRankRevealed?: boolean;
pixelRankVisible?: boolean;
pixelRankRevealer?: string;
pixelRankRevealedAt?: number;
}

you may have to update this type with stuff from CollectionInfo type
