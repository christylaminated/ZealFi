#![no_std]

use soroban_sdk::{contract, contractimpl, token, Address, Env, String};

#[contract]
pub struct ZealToken;

#[contractimpl]
impl ZealToken {
    /// Initialize a new token contract with admin controls
    pub fn initialize(
        env: Env,
        admin: Address,
        name: String,
        symbol: String,
        decimal: u32,
    ) -> Address {
        // Create the Soroban token contract with the specified parameters
        let token_client = token::Client::new(&env, &env.register_stellar_asset_contract(admin.clone()));
        token_client.initialize(
            &admin,                // admin who can mint/burn tokens
            &decimal,             // decimal precision
            &name,                // token name
            &symbol,              // token symbol
        );
        
        // Return the token contract's address
        token_client.address
    }

    /// Mint new tokens to a specified recipient
    pub fn mint(
        env: Env,
        admin: Address,
        token_id: Address,
        to: Address,
        amount: i128,
    ) {
        // Verify admin authorization
        admin.require_auth();
        
        // Create token client for the specified token contract
        let token_client = token::Client::new(&env, &token_id);
        
        // Mint tokens to the recipient
        token_client.mint(&to, &amount);
    }

    /// Transfer tokens from one account to another
    pub fn transfer(
        env: Env,
        from: Address,
        token_id: Address,
        to: Address,
        amount: i128,
    ) {
        // Verify sender authorization
        from.require_auth();
        
        // Create token client for the specified token contract
        let token_client = token::Client::new(&env, &token_id);
        
        // Transfer tokens from sender to recipient
        token_client.transfer(&from, &to, &amount);
    }

    /// Burn tokens from a specified account
    pub fn burn(
        env: Env,
        from: Address,
        token_id: Address,
        amount: i128,
    ) {
        // Verify sender authorization
        from.require_auth();
        
        // Create token client for the specified token contract
        let token_client = token::Client::new(&env, &token_id);
        
        // Burn tokens from the specified account
        token_client.burn(&from, &amount);
    }

    /// Check the balance of an account
    pub fn balance(
        env: Env,
        token_id: Address,
        account: Address,
    ) -> i128 {
        // Create token client for the specified token contract
        let token_client = token::Client::new(&env, &token_id);
        
        // Get and return the account balance
        token_client.balance(&account)
    }

    /// Get token metadata (name, symbol, decimals)
    pub fn get_metadata(
        env: Env,
        token_id: Address,
    ) -> (String, String, u32) {
        // Create token client for the specified token contract
        let token_client = token::Client::new(&env, &token_id);
        
        // Get token metadata
        let name = token_client.name();
        let symbol = token_client.symbol();
        let decimals = token_client.decimals();
        
        // Return token metadata as a tuple
        (name, symbol, decimals)
    }
}
