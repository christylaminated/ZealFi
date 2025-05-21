# ZealFi Stellar Contract

This directory contains the Stellar smart contracts for the ZealFi project, built using Soroban, Stellar's smart contract platform.

## ZealToken Contract

The main contract is a token contract implemented in Rust using the Soroban SDK. It provides the following features:

- Token initialization with custom name, symbol, and decimal precision
- Token minting (requires admin authorization)
- Token transfers between accounts
- Token burning
- Balance checking
- Metadata retrieval

## Setup and Development

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup)

### Build the Contract

```bash
cd contracts/stellar/zeal_token
cargo build --target wasm32-unknown-unknown --release
```

The compiled WebAssembly file will be located at `target/wasm32-unknown-unknown/release/zeal_token.wasm`.

### Optimize the Contract

```bash
soroban contract optimize --wasm target/wasm32-unknown-unknown/release/zeal_token.wasm
```

### Test the Contract

```bash
cargo test
```

### Deploy to Testnet

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/zeal_token.optimized.wasm \
  --source <YOUR_SECRET_KEY> \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase 'Test SDF Network ; September 2015'
```

## Usage Examples

### Initialize the Token

```bash
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source <ADMIN_SECRET_KEY> \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase 'Test SDF Network ; September 2015' \
  -- \
  initialize \
  --admin <ADMIN_ADDRESS> \
  --name "ZealFi Token" \
  --symbol "ZEAL" \
  --decimal 7
```

### Mint Tokens

```bash
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source <ADMIN_SECRET_KEY> \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase 'Test SDF Network ; September 2015' \
  -- \
  mint \
  --admin <ADMIN_ADDRESS> \
  --token_id <TOKEN_ADDRESS> \
  --to <RECIPIENT_ADDRESS> \
  --amount 1000000000
```

### Transfer Tokens

```bash
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source <SENDER_SECRET_KEY> \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase 'Test SDF Network ; September 2015' \
  -- \
  transfer \
  --from <SENDER_ADDRESS> \
  --token_id <TOKEN_ADDRESS> \
  --to <RECIPIENT_ADDRESS> \
  --amount 50000000
```

### Check Balance

```bash
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source <YOUR_SECRET_KEY> \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase 'Test SDF Network ; September 2015' \
  -- \
  balance \
  --token_id <TOKEN_ADDRESS> \
  --account <ACCOUNT_ADDRESS>
```

## Integration with ZealFi Frontend

To integrate this contract with the ZealFi frontend, you'll need to use the Stellar JavaScript SDK and Soroban JavaScript SDK. See the project documentation for more details on frontend integration.
