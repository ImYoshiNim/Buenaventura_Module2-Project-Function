# Function Frontend

The Carpark Ticket system is a decentralized application that allows users to purchase parking tickets on the Ethereum blockchain using a smart contract. This contract, implemented in Solidity, manages parking fees and user interactions, with the owner maintaining control over the contract. Users can select various parking durations, which determine the ETH amount required for the ticket purchase—ranging from 10 ETH for 30 minutes to 50 ETH for 24 hours. Upon purchasing a ticket, the contract verifies the payment amount and updates the balance accordingly, emitting a TicketPurchased event that includes a unique ticket ID, the amount paid, and the selected duration. The unique ticket ID is generated through a secure hashing mechanism, ensuring each ticket is distinct. The system provides a transparent and efficient way for users to manage parking, leveraging blockchain technology for secure transactions and ownership verification.

## Functions

getBalance():

Returns the current balance of the contract, representing the total amount of ETH deposited through ticket purchases.

deposit():

An internal function that adds the received ETH (msg.value) to the contract's balance, effectively updating the total balance after a ticket purchase.

purchaseTicket(uint8 duration):

Allows users to purchase a parking ticket for a specified duration. It checks the duration, sets the corresponding ETH amount required, validates the sent amount, calls the deposit() function, generates a unique ticket ID, and emits a TicketPurchased event with the ticket details.

generateTicketId():

Generates a unique three-letter ticket ID using a hash of the current timestamp and the sender's address. Each letter is randomly chosen from the English alphabet (A-Z) to ensure uniqueness for every ticket issued.

### Executing program
To run this program, you would first want to launch the repo in gitpod by cloning the repository

1. Inside the project directory, open a terminal and type the code below
```javascript
npm install
```
2. Open two additional terminals in your VS Code.
3. In the second terminal, type the code below (This will initiate the start to a local Ethereum blockchain.)
```javascript
npx hardhat node
```
4. In the third terminal, type the code below (This is to deploy the smart contract to the local blockchain.)
```javascript
npx hardhat run --network localhost scripts/deploy.js 
```
5. Return to the first terminal and type the code below (This is so that you can launch the front-end application.) 
```javascript
npm run dev
```
Under the "Ports" you will have access to the 3000 local that will be the host for the frontend of the actual program itself. After such you can configure your MetaMask wallet to the given accounts under the second terminal using the private key given to you, in the process you may also need to configure the network setting in your metamask. You may simply add a network using the 8545 Port address, this will allow your wallet to have the currency (10000 ETH) that is needed to be utilized for testing.

## Authors

Metacrafter Student Adam
LinkedIn: www.linkedin.com/in/adam-buenaventura.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
