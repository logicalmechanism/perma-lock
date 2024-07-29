# Perma Lock

*This is a fork of the [perma-lock](https://github.com/DripDropz/perma-lock) contracts by Dripdropz.*

The `Perma Lock` contract is designed to permanently lock various types of tokens. It allows users to add tokens but prevents any withdrawals. Once tokens are locked in this contract, they cannot be removed. This flexibility makes the contract particularly beneficial for non-fungible and arbitrary tokens, as it can accommodate any token in the UTxO. The minimum required Lovelace in this contract is variable and must be adjusted during transaction creation. Transaction fees tend to increase over time, closely correlating with the number of tokens in the UTxO and the number of UTxOs involved in the transaction.

## **Prerequisites**

- Ensure you have `ADA` available for funding the wallets.
- Aiken, Python3, cardano-cli, jq, bc need to be installed for the happy path to function properly.

## **Configuration**

Configuring the `Perma Lock` contract begins by specifying the required compile information inside `config.json`:

```json
{
  "__comment1__": "The compile information",
  "randomString": "acab",
}
```

## **Setup**

1. Execute the `complete_build.sh` script to prepare the environment.
   
2. Navigate to the `scripts` directory and create the necessary testnet wallets:

```bash
./create_testnet_wallet.sh wallets/reference-wallet
./create_testnet_wallet.sh wallets/collat-wallet
./create_testnet_wallet.sh wallets/user-wallet
```

3. Fund the wallets. The `user-wallet` will store the tokens you intend to add to the perma lock contracts. The `collat-wallet` needs 5 ADA and the `reference-wallet` needs at least 20 ADA.

4. Create the script references.

5. Change directory into `lock`.

6. Create the perma locked UTxO required for the contract in use.

- The happy path assumes a synced testnet node. 
- Please update the `scripts/data/path_to_cli.sh` and `scripts/data/path_to_socket.sh` files to match your current `cardano-cli` and `node.socket` path.
- The `scripts/all_balances.sh` script will display the testnet wallet addresses and UTxOs.

## **Usage**

The `scripts` directory contains sequential scripts for a smooth execution. They facilitate:

- Setting up the reference wallet.
- Folders containing scripts for the perma-locked contracts.
- Depositing tokens into the contracts.


To add tokens to the `Perma Lock` contract:

```bash
./02_permaLock.sh $policy_id $token_name $amount
```

The command above locks some amount of tokens into the contract, as specified by the `policy_id` and `token_name`.

> ⚠️ **Caution**: This contract is designed to lock tokens irreversibly. Ensure you understand the implications before using.

## **App**

- TODO

## **Limits**

Worst case for the nft lock is 64 unique policy ids. On pre-production, the UTxO `2981fdc49509b9cfc1c122b0dfc2563f29e49c2a07337ad55da3e2017a561124#0` is currently maxed out. 

Worst case for the nft lock per transaction is 36. On pre-production, the transaction `ff9b410414a5a5c0a2f63e9358b7299d296bb304ae579360dccf008357149809` shows the maximum amount of tokens for a single transaction. 

The max memory parameter would have to be increased at the protocol level to account for more unique policy ids on the UTxO.