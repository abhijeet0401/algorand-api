import algosdk from 'algosdk';
import express from 'express'
const app = express();
const PORT = 8080
// Set the Algorand Testnet API endpoint
  const algodToken = {
      "X-API-KEY": ""
  };
  const algodServer = 'https://testnet-api.algonode.cloud';
  const algodPort = "443";
// Initialize an Algod client
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

async function getKit(addrssofmint, nft) {
const suggestedParams = await algodClient.getTransactionParams().do();
const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
  from: 'MT5QWH2YWKQLQMDSGCNMEPCDKJLXMBWTRINNHRU3L6R7XZEIA6C2FNWKXU',
  suggestedParams,
  defaultFrozen: false,
  unitName: '',
  assetName: 'Tea Coupon get 25% off',
  manager: addrssofmint,
  reserve: addrssofmint,
  freeze: addrssofmint,
  clawback: addrssofmint,
  assetURL: 'https://ipfs.io/ipfs/QmRyqZP8QXzV1cymp1XFDkkQzqrJKk4GJM5SJSabyfYxRE',
  total: 1000,
  decimals: 0,
});

const signedTxn = txn.signTxn(algosdk.mnemonicToSecretKey('suspect attract arrange despair various outside fancy athlete truly gospel reunion include misery identify inject alpha type like space paper young culture humble ability invest').sk);
await algodClient.sendRawTransaction(signedTxn).do();
const result = await algosdk.waitForConfirmation(
  algodClient,
  txn.txID().toString(),
  10
);




const assetIndex = result['asset-index'];
console.log(`Asset ID created: ${assetIndex}`);
return assetIndex.toString()
}
 app.get('/mintnft/:address/:nft', async (req, res) => {

 const detailofnft= await  getKit(req.params.address,req.params.nft)
  console.log(detailofnft)
  res.send(detailofnft)
  })
  
  app.listen(process.env.PORT || PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
