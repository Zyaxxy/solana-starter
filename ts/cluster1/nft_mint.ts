import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../dev-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx =  createNft(umi,{mint,
         name:"Snow Carpet",
         symbol: "RUG",
         uri:"https://gateway.irys.xyz/EEFTARCK2zEHE6v1UGz7yAbpWHajAfonTyFrB9zor7Gh",
         sellerFeeBasisPoints: percentAmount(5)
    })
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();

// Succesfully Minted! Check out your TX here:
// https://explorer.solana.com/tx/5oVT67idE7Mf9vppSbvZqnHRGugq6XPPrgsjPrHQffZ53cUPmYe7tHGpDQNsqb6GcNm1aWFB1nDWbjY4fUcbu7rs?cluster=devnet
// Mint Address:  6EQG1uyVagQCFTtEyvuW7H4VC43zu49irmd9Szny4oqm