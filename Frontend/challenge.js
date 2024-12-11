import React, { useState } from "react";
import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

const Challenges = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [challenge, setChallenge] = useState("");
  const [points, setPoints] = useState(0);

  const submitChallenge = async () => {
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const rewardProgramId = new PublicKey("YourRewardProgramIDHere");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: rewardProgramId,
          lamports: points * 100, // Convert points to lamports
        })
      );

      const signature = await sendTransaction(transaction, connection);
      console.log("Challenge Submitted! Tx Signature:", signature);
    } catch (error) {
      console.error("Error submitting challenge:", error);
    }
  };

  return (
    <div>
      <h1>Complete Challenges</h1>
      <input
        type="text"
        placeholder="Challenge Name"
        value={challenge}
        onChange={(e) => setChallenge(e.target.value)}
      />
      <input
        type="number"
        placeholder="Points Earned"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />
      <button onClick={submitChallenge}>Submit Challenge</button>
    </div>
  );
};

			export default Challenges;