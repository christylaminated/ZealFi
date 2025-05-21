# ZealFi Move Contract

This directory contains the Move smart contracts for the ZealFi project, built for the Aptos blockchain.

## ZealToken Contract

The main contract is `ZealToken.move`, which implements a custom token for the ZealFi platform with the following features:

- Token minting (restricted to admin)
- Token burning (restricted to admin)
- Token transfers between accounts
- Balance checking
- Event emission for tracking token operations

## Setup and Deployment

### Prerequisites

- [Aptos CLI](https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli/)
- [Move Compiler](https://github.com/move-language/move)

### Compile the Contract

```bash
cd contracts/move
aptos move compile
```

### Test the Contract

```bash
aptos move test
```

### Deploy to Testnet

```bash
aptos move publish --named-addresses ZealFi=<YOUR_ACCOUNT_ADDRESS>
```

## Usage Examples

### Initialize the Token

```move
use ZealFi::ZealToken;

public entry fun initialize_token(admin: &signer) {
    ZealToken::initialize(admin);
}
```

### Mint Tokens

```move
use ZealFi::ZealToken;

public entry fun mint_tokens(admin: &signer, amount: u64, recipient: address) {
    ZealToken::mint(admin, amount, recipient);
}
```

### Transfer Tokens

```move
use ZealFi::ZealToken;

public entry fun transfer_tokens(from: &signer, to: address, amount: u64) {
    ZealToken::transfer(from, to, amount);
}
```

### Check Balance

```move
use ZealFi::ZealToken;

public fun get_balance(account: address): u64 {
    ZealToken::balance_of(account)
}
```

## Integration with ZealFi Frontend

To integrate this contract with the ZealFi frontend, you'll need to use the Aptos SDK. See the project documentation for more details on frontend integration.
