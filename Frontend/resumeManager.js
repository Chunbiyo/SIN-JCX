import React, { useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";

const ResumeManager = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(publicKey));

  const createResume = async () => {
    try {
      const resumeMetadata = {
        name,
        symbol: "RESUME",
        uri: "https://example.com/metadata.json",
        creators: [{ address: publicKey.toString(), verified: true, share: 100 }],
      };

      const { mintAddress } = await metaplex.nfts().create({
        ...resumeMetadata,
        maxSupply: 1,
      });

      console.log("NFT Resume Created:", mintAddress.toString());
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  return (
    <div>
      <h1>NFT Resume Manager</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Skills (comma-separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <button onClick={createResume}>Create Resume</button>
    </div>
  );
};

	export default ResumeManager;