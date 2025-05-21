module ZealFi::ZealToken {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::event;
    use aptos_std::table::{Self, Table};

    /// Error codes
    const E_NOT_INITIALIZED: u64 = 1;
    const E_ALREADY_INITIALIZED: u64 = 2;
    const E_INSUFFICIENT_BALANCE: u64 = 3;
    const E_NOT_AUTHORIZED: u64 = 4;

    /// ZealToken struct - represents the token type
    struct ZealToken has key {
        mint_capability: coin::MintCapability<ZealTokenCoin>,
        burn_capability: coin::BurnCapability<ZealTokenCoin>,
        freeze_capability: coin::FreezeCapability<ZealTokenCoin>,
    }

    /// The actual coin type
    struct ZealTokenCoin has key {}

    /// Events
    struct TokenEvents has key {
        mint_events: event::EventHandle<MintEvent>,
        transfer_events: event::EventHandle<TransferEvent>,
        burn_events: event::EventHandle<BurnEvent>,
    }

    struct MintEvent has drop, store {
        amount: u64,
        recipient: address,
    }

    struct TransferEvent has drop, store {
        from: address,
        to: address,
        amount: u64,
    }

    struct BurnEvent has drop, store {
        amount: u64,
        burner: address,
    }

    /// Initialize the ZealToken module
    public fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        
        // Check if the module is already initialized
        assert!(!exists<ZealToken>(admin_addr), E_ALREADY_INITIALIZED);
        
        // Register the coin with the Aptos Framework
        let (mint_cap, burn_cap, freeze_cap) = coin::initialize<ZealTokenCoin>(
            admin,
            b"ZealToken",
            b"ZEAL",
            8, // decimals
            true, // monitor_supply
        );
        
        // Store the capabilities
        move_to(admin, ZealToken {
            mint_capability: mint_cap,
            burn_capability: burn_cap,
            freeze_capability: freeze_cap,
        });
        
        // Initialize events
        move_to(admin, TokenEvents {
            mint_events: event::new_event_handle<MintEvent>(admin),
            transfer_events: event::new_event_handle<TransferEvent>(admin),
            burn_events: event::new_event_handle<BurnEvent>(admin),
        });
    }

    /// Mint new tokens
    public fun mint(admin: &signer, amount: u64, recipient: address) acquires ZealToken, TokenEvents {
        let admin_addr = signer::address_of(admin);
        
        // Ensure the module is initialized
        assert!(exists<ZealToken>(admin_addr), E_NOT_INITIALIZED);
        
        // Get the mint capability
        let token = borrow_global<ZealToken>(admin_addr);
        
        // Mint the coins
        let coins = coin::mint<ZealTokenCoin>(amount, &token.mint_capability);
        
        // Ensure the recipient has a coin store
        if (!coin::is_account_registered<ZealTokenCoin>(recipient)) {
            coin::register<ZealTokenCoin>(admin);
        };
        
        // Deposit the coins to the recipient
        coin::deposit<ZealTokenCoin>(recipient, coins);
        
        // Emit mint event
        let events = borrow_global_mut<TokenEvents>(admin_addr);
        event::emit_event(&mut events.mint_events, MintEvent {
            amount,
            recipient,
        });
    }

    /// Transfer tokens
    public fun transfer(from: &signer, to: address, amount: u64) acquires TokenEvents {
        let from_addr = signer::address_of(from);
        
        // Ensure the recipient has a coin store
        if (!coin::is_account_registered<ZealTokenCoin>(to)) {
            coin::register<ZealTokenCoin>(from);
        };
        
        // Transfer the coins
        coin::transfer<ZealTokenCoin>(from, to, amount);
        
        // Emit transfer event
        let events = borrow_global_mut<TokenEvents>(@ZealFi);
        event::emit_event(&mut events.transfer_events, TransferEvent {
            from: from_addr,
            to,
            amount,
        });
    }

    /// Burn tokens
    public fun burn(admin: &signer, amount: u64) acquires ZealToken, TokenEvents {
        let admin_addr = signer::address_of(admin);
        
        // Ensure the module is initialized
        assert!(exists<ZealToken>(admin_addr), E_NOT_INITIALIZED);
        
        // Get the burn capability
        let token = borrow_global<ZealToken>(admin_addr);
        
        // Withdraw coins from admin's account
        let coins = coin::withdraw<ZealTokenCoin>(admin, amount);
        
        // Burn the coins
        coin::burn<ZealTokenCoin>(coins, &token.burn_capability);
        
        // Emit burn event
        let events = borrow_global_mut<TokenEvents>(admin_addr);
        event::emit_event(&mut events.burn_events, BurnEvent {
            amount,
            burner: admin_addr,
        });
    }

    /// Get balance of an account
    public fun balance_of(account: address): u64 {
        if (!coin::is_account_registered<ZealTokenCoin>(account)) {
            return 0
        };
        coin::balance<ZealTokenCoin>(account)
    }
}
