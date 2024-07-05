# Function Frontend

The program is an ATM application built on Ethereum that aims to give customers an easy-to-use, interactive way to manage their bitcoin holdings in a decentralized manner. Users may safely deposit and withdraw Ether (ETH) while taking use of a dynamic React-built user interface by utilizing MetaMask for wallet connection and smart contracts implemented on the Ethereum network. Real-time balance updates, transaction history tracking with optional comments, and slider input for easy transaction amount specification are just a few of the features that the program offers. This novel approach to decentralized financial transactions is made possible by the system's strong error management, which guarantees dependable and efficient operations.


## Functions

Deposit Function: 

- This function allows the user to add a specified amount of Ether (ETH) to their balance in the smart contract. The amount is determined by a slider input, and the transaction is confirmed with a success message.

Withdraw Function: 

- This function enables the user to withdraw a specified amount of Ether (ETH) from their balance in the smart contract. If the withdrawal amount exceeds the available balance, an error message is displayed to notify the user.

History Function: 

- This function tracks and displays the user's transaction history, including deposits and withdrawals, along with timestamps and optional notes for each transaction.

Notes Function: 

- This function allows users to add optional notes to their deposit and withdrawal transactions, providing additional context or details for each transaction recorded in the history.

Slider Function: 

- This function provides a user-friendly interface for specifying the amount of Ether (ETH) to be deposited or withdrawn. The slider allows users to easily adjust the amount before initiating a transaction.

Character Function: 

- This function adds a fun and interactive element to the user interface by displaying character messages based on the user's actions, such as depositing or withdrawing funds, enhancing the overall user experience.

### Executing program
To run this program, you would first want to launch the repo in gitpod by cloning the repository

1. Inside the project directory, open a terminal and type: 
```javascript
npm install
```
2. Open two additional terminals in your VS Code.
3. In the second terminal, type:
```javascript
npx hardhat node
```
This will initiate the start to a local Ethereum blockchain.
4. In the third terminal, type: 
```javascript
npx hardhat run --network localhost scripts/deploy.js 
```
This is to deploy the smart contract to the local blockchain.
5. Return to the first terminal and type: 
```javascript
npm run dev
```
This is so that you can launch the front-end application.

## Authors

Metacrafter Student Adam
LinkedIn: www.linkedin.com/in/adam-buenaventura.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
