# Alchemy University 2022

This is the repository for the Ethereum Dev. Bootcamp from Alchemy University 2022.
For more info visit https://university.alchemy.com/

# Week 1: Blockchain Cryptography

Cryptographic fundamentals: hash functions, digital signatures, and public key cryptography.

Consensus mechanisms: proof of work, proof of stake, and proof of authority.

<details>
<summary>

## Week 1 Exercises...

</summary>

### Week 1 assignment

ECDSA Node, react frontend that communicates to centralized (trusted) backend to transfer funds between accounts.

The frontend requests a private key, it display account balance, and allows to send funds to another account (use account public key).

The Transfer function on the client signs the transaction for the backend to verify.

The backend verifies the signature and updates the account balances if everything checks out correct.

### Exercise 1: findColor

Using Rainbow table approach, find the color of the given hash from a list of known colors.

### Exercise 2: publicKey

1. hashMessage: Use keccak256 to hash the given message.
2. signMessage: Sign the given message using the given private key.
3. recoveryKey: Recover the public key from the given message, signature and recoveryBit.
4. getAddress: Return the address of the given public key.

### Exercise 3: PoW Mining

1. addTransaction: Add a transaction to the mempool
2. mine: Create a new block with uuid and ad it to our blocks array
3. block hash: add to the new block the sha256 hash of the new block
4. mine transaction: add to the new block a list of transactions from the mempool
5. difficulty: add the new block if the hash of the new block is lower than the given difficulty

### Exercise 4: Blockchain

1. toHash: hash the given block
2. constructor: add a constructor to the Block class
3. genesis: create a gennesis block in the Blockchain class
4. addBlock: add a new block to the blockchain
5. link blocks: link the blocks in the blockchain
6. isValid: validate the blockchain, check that every block previousHash match the previous block's hash

</details>


# Week 2: Blockchain Storage

Unspent Transaction Outputs (UTXO) and Account-based models.

Tree Data Structures: Binary Search Trees, Merkle Trees

Blockchain Data Storage: Merkle trees, Ethereum Tries.

<details>
<summary>

## Week 2 Exercises...

</summary>

### Week 2 assignment


### Exercise 1: UTXO Model

1. TXO: Create a transaction output class
when executing a transaction,
2. check that no input is already spent
3. check that the input are greather or equal than the outputs transactions
4. if a transaction is valid, update inputs uTXOSs as spent
5. calculate a transaction fee for the miners

</details>
