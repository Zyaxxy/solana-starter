import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../dev-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000;

// Mint address
const mint = new PublicKey("34h2ykgQ1jFarABav8oJdFZ8AfGmUjN5JZbcPwipTRe4");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection,
            keypair,
            mint,
            keypair.publicKey
        )
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const mintTx = await mintTo(connection,keypair,mint,ata.address,keypair,2000)
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()

//
// Your ata is: 4G5uk9dGryeeh95M5UD8HTKTkUZf7dKwFsh4LfC7ur3R
// Your mint txid: 5f2tWeJBZESEvyHzdv5yHpc2jCyG492hHBdFy7mhkQrR2L3HbRnJNix3FARm7dH61KwDSo8KabjZ3Zqq14g6Zxyr
