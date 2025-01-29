import React, { useState } from "react";
import "./officenotify.css";
import OfficeNav from "./OfficeNav";
import { BrowserProvider, Contract } from "ethers";

const OfficeNotify = () => {
  const [transactions, setTransactions] = useState([
    // Initial data could come from backend
  ]);

  const handleAcceptTransaction = async (transaction) => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
      const abi = [
        // Provide the ABI of your smart contract here
      ];
      const contract = new Contract(contractAddress, abi, signer);

      try {
        const tx = await contract.verifyAndSaveLand(
          transaction.buyer,
          transaction.landNo,
          transaction.location
        );
        await tx.wait();
        alert("Land verified and saved on the blockchain.");
        setTransactions(transactions.filter((t) => t !== transaction));
      } catch (error) {
        console.error("Verification failed:", error);
      }
    } else {
      alert("Ethereum wallet is not found.");
    }
  };

  return (
    <>
      <OfficeNav />
      <div className="container">
        <h2>Transaction Details</h2>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div key={index} className="transaction-item">
              <p><strong>Buyer:</strong> {transaction.buyer}</p>
              <button onClick={() => handleAcceptTransaction(transaction)}>
                Verify
              </button>
            </div>
          ))
        ) : (
          <p>No pending transactions.</p>
        )}
      </div>
    </>
  );
};

export default OfficeNotify;
