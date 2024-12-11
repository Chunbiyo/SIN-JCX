import React, { useEffect, useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

const Dashboard = () => {
  const { publicKey } = useWallet();
  const [rewards, setRewards] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const connection = new Connection(clusterApiUrl("mainnet-beta"));
        const rewardsProgram = new PublicKey("YourRewardsProgramIDHere");
        console.log("Fetching rewards from:", rewardsProgram.toString());
        // Mocked rewards, replace with actual Wormhole integration
        setRewards([{ title: "Challenge 1", points: 100 }]);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    const fetchProgress = async () => {
      try {
        // Fetch progress (mocked here, replace with actual API call)
        setProgress({ challengesCompleted: 5, totalPoints: 500 });
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchRewards();
    fetchProgress();
  }, [publicKey]);

  return (
    <div>
      <h1>User Dashboard</h1>
      <h2>Your Progress</h2>
      <p>Challenges Completed: {progress.challengesCompleted}</p>
      <p>Total Points: {progress.totalPoints}</p>

      <h2>Your Rewards</h2>
      <ul>
        {rewards.map((reward, index) => (
          <li key={index}>
            <h3>{reward.title}</h3>
            <p>{reward.points} points</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

					export default Dashboard;