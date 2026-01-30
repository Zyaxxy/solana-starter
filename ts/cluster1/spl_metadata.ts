import wallet from "../dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("34h2ykgQ1jFarABav8oJdFZ8AfGmUjN5JZbcPwipTRe4")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint,
            mintAuthority:signer
        }

        let data: DataV2Args = {
            name:"Turbin3 PreBuilder",
            symbol:"TPB",
            uri:"https://solanaanz.org/partners/turbine.jpg",
            sellerFeeBasisPoints:0,
            creators:null,
            collection:null,
            uses:null,
            
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable:true,
            collectionDetails:null,
        }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

//metadataTx: 4ct8pCXbJvWx84BbnDWEbK1xn3kyFsDLPTRiwR6HQJevR4rQVp9UkrbGLQUBEA6kH2wTwnd4iWDyaKhY3TEyfebG