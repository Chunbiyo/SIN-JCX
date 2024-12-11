import React, { useState } from "react";
import { PublicKey, Connection, Transaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

const DAO = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [proposal, setProposal] = useState("");
  const [vote, setVote] = useState(null);
  const [proposals, setProposals] = useState([]);
  const daoProgramId = new PublicKey("YourDAOProgramIDHere");

  const fetchProposals = async () => {
    try {
      // Fetch current proposals (mocked here, replace with actual DAO API)
      setProposals([
        { id: 1, title: "Proposal 1", description: "Increase rewards by 10%" },
        { id: 2, title: "Proposal 2", description: "Add a new feature to the app" },
      ]);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };

  const createProposal = async () => {
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com");
      const transaction = new Transaction().add(
        // Example transaction logic for DAO proposal creation
        {
          keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
          programId: daoProgramId,
          data: Buffer.from(proposal),
        }
      );

      await sendTransaction(transaction, connection);
      console.log("Proposal submitted successfully!");
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  };

  const submitVote = async (proposalId, voteType) => {
    try {
      console.log(`Voting ${voteType} on proposal ${proposalId}`);
      // Add voting logic here
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div>
      <h1>DAO Voting and Proposals</h1>
      <textarea
        placeholder="Describe your proposal"
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
      ></textarea>
      <button onClick={createProposal}>Submit Proposal</button>

      <h2>Active Proposals</h2>
      <button onClick={fetchProposals}>Refresh Proposals</button>
      <ul>
        {proposals.map((p) => (
          <li key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <button onClick={() => submitVote(p.id, "FOR")}>Vote For</button>
            <button onClick={() => submitVote(p.id, "AGAINST")}>Vote Against</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

	export default DAO;