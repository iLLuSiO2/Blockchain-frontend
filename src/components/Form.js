import React, { useState, useEffect } from "react";
import web3 from "../web3/web3"; // Import the Web3.js instance
import StorageContract from "../contracts/StorageContract.json"; // Import your contract ABI

const Form = () => {
  const [contract, setContract] = useState(null);
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initContract = async () => {
      try {
        // Replace with your deployed contract address
        const contractAddress = "0x491427286946875F80aFa45849500505BFE401b5";
        const instance = new web3.eth.Contract(
          StorageContract.abi,
          contractAddress
        );
        setContract(instance);
      } catch (error) {
        console.error(error);
      }
    };

    initContract();
  }, []);

  const setDataOnBlockchain = async () => {
    if (!contract) {
      setMessage("Contract not initialized.");
      return;
    }

    const accounts = await web3.eth.getAccounts();
    try {
      await contract.methods.set(data).send({ from: accounts[0] });
      setMessage("Data stored on the blockchain.");
    } catch (error) {
      console.error("Error storing data:", error);
      setMessage("Error storing data on the blockchain.");
    }
  };

  const getDataFromBlockchain = async () => {
    if (!contract) {
      setMessage("Contract not initialized.");
      return;
    }

    try {
      const result = await contract.methods.get().call();
      setMessage(`Retrieved data from the blockchain: ${result}`);
    } catch (error) {
      console.error("Error retrieving data:", error);
      setMessage("Error retrieving data from the blockchain.");
    }
  };

  return (
    <div>
      <h2>Blockchain Data Storage</h2>
      <input
        type="text"
        placeholder="Enter data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="button" onClick={setDataOnBlockchain}>
        Store Data
      </button>
      <button type="button" onClick={getDataFromBlockchain}>
        Retrieve Data
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Form;
