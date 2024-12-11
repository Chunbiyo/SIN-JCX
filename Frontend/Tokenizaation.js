import React, { useState } from "react";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const Tokenization = () => {
  const [amount, setAmount] = useState(0);
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const tokenMint = new PublicKey("YourTokenMintAddressHere");

  const mintTokens = async () => {
    try {
      const wallet = window.solana;
      const payer = wallet.publicKey;

      const token = new Token(
        connection,
        tokenMint,
        TOKEN_PROGRAM_ID,
        payer // Use the connected wallet as the authority
      );

      const tokenAccount = await token.getOrCreateAssociatedAccountInfo(payer);

      await token.mintTo(tokenAccount.address, payer, [], amount * 1e9); // Convert to smallest unit
      console.log(`Minted ${amount} tokens to ${tokenAccount.address.toString()}`);
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  return (
    <div>
      <h1>Resource Tokenization</h1>
      <input
        type="number"
        placeholder="Amount to Mint"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={mintTokens}>Mint Tokens</button>
    </div>
  );
};

	export default Tokenization;