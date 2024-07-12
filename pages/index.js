import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "/workspace/SCM-Starter/artifacts/contracts/Assessment.sol/CarparkTicket.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [ticketId, setTicketId] = useState(undefined);
  const [duration, setDuration] = useState(0);
  const [amount, setAmount] = useState(0);

  const contractAddress = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c"; // Update with your deployed contract address
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (account) => {
    if (account.length > 0) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const weiBalance = await atm.getBalance();
      setBalance(ethers.utils.formatEther(weiBalance)); // Convert wei to ETH
    }
  };

  const purchaseTicket = async () => {
    if (atm) {
      try {
        let tx = await atm.purchaseTicket(duration, { value: amount, gasLimit: 100000 });
        await tx.wait();
        getBalance();
        setTicketId(await atm.generateTicketId()); // Set ticket ID to state
      } catch (error) {
        console.error("Transaction error:", error);
      }
    }
  };

  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value));
    const amounts = [10, 20, 30, 40, 50];
    setAmount(ethers.utils.parseEther(amounts[Number(e.target.value)].toString())); // Convert to wei
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask to use this service.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Carpak System Number: {account}</p>
        <p>System Balance: {balance} ETH</p>
        <h3>Select Parking Duration:</h3>
        <div onChange={handleDurationChange} className="radio-buttons">
          <label>
            <input type="radio" value={0} name="duration" /> 30 minutes (10 ETH)
          </label>
          <label>
            <input type="radio" value={1} name="duration" /> 1 Hour (20 ETH)
          </label>
          <label>
            <input type="radio" value={2} name="duration" /> 3 Hours (30 ETH)
          </label>
          <label>
            <input type="radio" value={3} name="duration" /> 5 Hours (40 ETH)
          </label>
          <label>
            <input type="radio" value={4} name="duration" /> 24 Hours (50 ETH)
          </label>
        </div>
        <button onClick={purchaseTicket}>Book Ticket</button>
        <p>Your Ticket ID: {ticketId}</p>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Carpark Ticket System!</h1></header>
      {initUser()}
      <style jsx>{`
               body {
          background-color: #e9f5ff;
          font-family: 'Arial', sans-serif;
          text-align: center;
          padding: 20px;
        }

        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        header {
          background-color: #007BFF;
          color: white;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          width: 100%;
          max-width: 600px;
        }

        h1 {
          font-size: 24px;
          margin: 0;
        }

        button {
          background-color: #007BFF;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          font-size: 16px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 200px;
          margin: 10px auto; /* Center the button */
        }

        button:hover {
          background-color: #0056b3;
          transform: scale(1.05);
        }

        button:active {
          transform: scale(0.95);
        }

        p {
          color: #333;
          font-size: 18px;
          margin: 10px 0;
          padding: 8px;
          background-color: #f0f4ff;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s;
          width: 100%;
          max-width: 600px;
        }

        p:hover {
          background-color: #e3eaf5;
        }

        .radio-buttons {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .radio-buttons label {
          display: flex;
          align-items: center;
          background-color: #e9f5ff;
          border: 2px solid #007BFF;
          border-radius: 5px;
          padding: 10px;
          width: 80%;
          cursor: pointer;
          transition: background-color 0.3s, border-color 0.3s;
          text-align: center;
        }

        .radio-buttons input {
          display: none;
        }

        .radio-buttons input + label:before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #007BFF;
          border-radius: 50%;
          background-color: white;
          margin-right: 10px;
          transition: background-color 0.3s;
        }

        .radio-buttons input:checked + label:before {
          background-color: #007BFF;
          border: 2px solid #0056b3;
        }

        .radio-buttons label:hover {
          background-color: #cce5ff;
          border-color: #0056b3;
        }
      `}</style>
    </main>
  );
}
