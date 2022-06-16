TODO:

1. use result from refresh on Pending item and update the list on screen
2. score NFTs that are not scored yet. show unscored?
3. dark home page, https://pixelverse.ai/, https://nft-avatars.webflow.io/
4. in the checkout flow, if someone tries to checkout NFTs whose pixel rank bucket < 10, checkout should show an error to remove them from cart (edited)
5. make left side cards nice
6. aspect ratio
7. Reveal and ranks
8. toasts?
9. Some of your NFTs are in the top 1%, pay to reveal
10. first revealer can hide, if they hide and it's reshown, the new person has control
11. must dump the caches if visibility is set
12. tabs in the navbar should have the right tabs (top 100 and hot don't make sense); maybe top 1%, 2% and 3% do

bucket 10 only add those to cart

re: price differences for reveals - I like that and makes sense

top 1%, (pixel rank bucket 10)

.1% of the sorted by rank list (top .1%) 10,000,

revealed? visible, revealer.

responsive

connect page broken

checkout not connected falied?

// you need collectionAddress for cart?
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
