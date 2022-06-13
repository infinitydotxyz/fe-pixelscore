TODO:

1. use result from refresh on Pending item and update the list on screen
2. score NFTs that are not scored yet. show unscored?
3. dark home page, https://pixelverse.ai/, https://nft-avatars.webflow.io/
4. in the checkout flow, if someone tries to checkout NFTs whose ranks are already revealed (all NFTs whose pixel rank bucket < 10 and the ones with bucket 10 but pixelRankRevealed = true), checkout should show an error to remove already revealed items from cart (edited)
5. pending cards ugly
6. reveals tab
7. make left side cards nice
8. aspect ratio
9. Reveal and ranks
10. toasts?
11. nfts?
12. Some of your NFTs are in the top 1%, pay to reveal

top 1%, (pixel rank bucket 10)

.1% of the sorted by rank list (top .1%) 10,000,

ui for choosing public visibility

revealed? visible, revealer.

responsive

checkout not connected falied?

pending tab should also have public option

no pixelrank, no collection address,

rarity.tools

nonrevealed: image, bluecheck.
Revealed everthing. filter on backend.

.5% 10,000 - 50,000,
1% 50,000 - 100,000

pixel rank >=1 <10,000,

rank: 1-10,000,000
bucket: 1-10
score 0-1

clean up any bad collections

Error getting collection info from infinity: TypeError: Cannot read properties of undefined (reading 'name')
at getCollectionInfoFromInfinity (/home/steve/Documents/GitHub/mavrik/pixelscore/src/scripts/metadataUtils.ts:40:29)
at runMicrotasks (<anonymous>)
at processTicksAndRejections (node:internal/process/task_queues:96:5)
at async \_fetchCollectionInfo (/home/steve/Documents/GitHub/mavrik/pixelscore/src/scripts/secondpass.ts:112:26)
at async updateCollections (/home/steve/Documents/GitHub/mavrik/pixelscore/src/scripts/secondpass.ts:69:30)
