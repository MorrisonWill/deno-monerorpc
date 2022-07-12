export const DaemonList = {
  "get_block_count": {},
  "on_get_block_hash": {
    "height": "Array<number>",
  },
  "get_block_template": {
    "wallet_address": "string",
    "reserve_size": "number",
  },
  "submit_block": {
    "blob": "Array<string>",
  },
  "get_last_block_header": {},
  "get_block_header_by_hash": {
    "hash": "number",
  },
  "get_block_header_by_height": {
    "height": "number",
  },
  "get_block_headers_range": {
    "start_height": "number",
    "end_height": "number",
  },
  "get_block": {
    "height?": "number",
    "hash?": "number",
  },
  "get_connections": {},
  "get_info": {},
  "hard_fork_info": {},
  "set_bans": {
    "bans":
      "Array<{ host: string; ip: number; ban: boolean; seconds: number }>",
  },
  "get_bans": {},
  "get_output_histogram": {
    "amounts": "Array<number>",
    "min_count": "number",
    "max_count": "number",
    "unlocked": "number",
    "recent_cutoff": "number",
  },
  "get_version": {},
  "get_coinbase_tx_sum": {
    "height": "number",
    "count": "number",
  },
  "get_fee_estimate": {
    "grace_blocks?": "number",
  },
  "get_alternate_chains": {},
  "relay_tx": {
    "txids": "Array<string>",
  },
  "sync_info": {},
  "get_txpool_backlog": {},
  "get_output_distribution": {
    "amounts": "Array<number>",
    "cumulative?": "number",
    "from_height?": "number",
    "to_height?": "number",
  },
};

export const WalletList = {
  "set_daemon": {
    "address?": "string",
    "trusted?": "boolean",
    "ssl_support?": "string",
    "ssl_private_key_path?": "string",
    "ssl_certificate_path?": "string",
    "ssl_ca_path?": "string",
    "ssl_allowed_fingerprints?": "Array<string>",
    "ssl_allow_any_cert?": "boolean",
  },
  "get_balance": {
    "account_index": "number",
    "address_indices?": "Array<number>",
  },
  "get_address": {
    "account_index": "number",
    "address_index?": "number",
  },
  "get_address_index": {
    "address": "string",
  },
  "create_address": {
    "account_index": "number",
    "label?": "string",
  },
  "label_address": {
    "index": "{ major: number, minor: number }",
    "label": "string",
  },
  "validate_address": {
    "address": "string",
    "any_net_type?": "boolean",
    "allow_openalias?": "boolean",
  },
  "get_accounts": {
    "tag?": "string",
  },
  "create_account": {
    "label": "string",
  },
  "label_account": {
    "account_index": "number",
    "label": "string",
  },
  "get_account_tags": {},
  "tag_accounts": {
    "tag": "string",
    "accounts": "Array<number>",
  },
  "untag_accounts": {
    "accounts": "Array<number>",
  },
  "set_account_tag_description": {
    "tag": "string",
    "description": "string",
  },
  "get_height": {},
  "transfer": {
    "destinations": "Array<{ address: string; amount: number }>",
    "priority": "number",
    "mixin": "number",
    "ring_size": "number",
    "unlock_time": "number",
    "account_index?": "number",
    "subaddr_indices?": "Array<number>",
    "get_tx_key?": "boolean",
    "do_not_relay?": "boolean",
    "get_tx_hex?": "boolean",
    "get_tx_metadata?": "boolean",
  },
  "transfer_split": {
    "destinations": "Array<{ address: string; amount: number }>",
    "mixin": "number",
    "ring_size": "number",
    "unlock_time": "number",
    "priority": "number",
    "account_index?": "number",
    "subaddr_indices?": "Array<number>",
    "do_not_relay?": "boolean",
    "get_tx_hex?": "boolean",
    "new_algorithm?": "boolean",
    "get_tx_metadata?": "boolean",
  },
  "sign_transfer": {
    "unsigned_txset": "string",
    "export_raw?": "boolean",
  },
  "submit_transfer": {
    "tx_data_hex": "string",
  },
  "sweep_dust": {
    "get_tx_keys?": "boolean",
    "do_not_relay?": "boolean",
    "get_tx_hex?": "boolean",
    "get_tx_metadata?": "boolean",
  },
  "sweep_all": {
    "address": "string",
    "account_index": "number",
    "mixin": "number",
    "ring_size": "number",
    "unlock_time": "number",
    "priority?": "number",
    "subaddr_indices?": "Array<number>",
    "get_tx_keys?": "boolean",
    "below_amount?": "number",
    "do_not_relay?": "boolean",
    "get_tx_hex?": "boolean",
    "get_tx_metadata?": "boolean",
  },
  "sweep_single": {
    "address": "string",
    "account_index": "number",
    "mixin": "number",
    "ring_size": "number",
    "unlock_time": "number",
    "key_image": "string",
    "subaddr_indices?": "Array<number>",
    "priority?": "number",
    "get_tx_keys?": "boolean",
    "below_amount?": "number",
    "do_not_relay?": "boolean",
    "get_tx_hex?": "boolean",
    "get_tx_metadata?": "boolean",
  },
  "relay_tx": {
    "hex": "string",
  },
  "store": {},
  "get_payments": {
    "payment_id": "string",
  },
  "get_bulk_payments": {
    "payment_ids": "Array<string>",
    "min_block_height": "number",
  },
  "incoming_transfers": {
    "transfer_type": "string",
    "account_index?": "number",
    "subaddr_indices?": "Array<number>",
  },
  "query_key": {
    "key_type": "string",
  },
  "make_integrated_address": {
    "standard_address?": "string",
    "payment_id?": "string",
  },
  "split_integrated_address": {
    "integrated_address": "string",
  },
  "stop_wallet": {},
  "rescan_blockchain": {},
  "set_tx_notes": {
    "txids": "Array<string>",
    "notes": "Array<string>",
  },
  "get_tx_notes": {
    "txids": "Array<string>",
  },
  "set_attribute": {
    "key": "string",
    "value": "string",
  },
  "get_attribute": {
    "key": "string",
  },
  "get_tx_key": {
    "txid": "string",
  },
  "check_tx_key": {
    "txid": "string",
    "tx_key": "string",
    "address": "string",
  },
  "get_tx_proof": {
    "txid": "string",
    "address": "string",
    "message?": "string",
  },
  "check_tx_proof": {
    "txid": "string",
    "address": "string",
    "signature": "string",
    "message?": "string",
  },
  "get_spend_proof": {
    "txid": "string",
    "message?": "string",
  },
  "check_spend_proof": {
    "txid": "string",
    "signature": "string",
    "message?": "string",
  },
  "get_reserve_proof": {
    "all": "boolean",
    "account_index": "number",
    "amount": "number",
    "message?": "string",
  },
  "check_reserve_proof": {
    "address": "string",
    "signature": "string",
    "message?": "string",
  },
  "get_transfers": {
    "should_be_in?": "boolean",
    "out?": "boolean",
    "pending?": "boolean",
    "failed?": "boolean",
    "pool?": "boolean",
    "filter_by_height?": "boolean",
    "min_height?": "number",
    "max_height?": "number",
    "account_index?": "number",
    "subaddr_indices?": "Array<number>",
  },
  "get_transfer_by_txid": {
    "txid": "string",
    "account_index?": "number",
  },
  "describe_transfer": {
    "unsigned_txset?": "string",
    "multisig_txset?": "string",
  },
  "sign": {
    "data": "string",
  },
  "verify": {
    "data": "string",
    "address": "string",
    "signature": "string",
  },
  "export_outputs": {
    "all?": "boolean",
  },
  "import_outputs": {
    "outputs_data_hex": "string",
  },
  "export_key_images": {
    "all?": "boolean",
  },
  "import_key_images": {
    "signed_key_images": "Array<{key_image: string, signature: string}>",
  },
  "make_uri": {
    "address": "string",
    "amount?": "number",
    "payment_id?": "string",
    "recipient_name?": "string",
    "tx_description?": "string",
  },
  "parse_uri": {
    "uri": "string",
  },
  "get_address_book": {
    "entries": "Array<number>",
  },
  "add_address_book": {
    "address": "string",
    "payment_id?": "string",
    "description?": "string",
  },
  "edit_address_book": {
    "index": "number",
    "set_address": "string",
    "set_description": "string",
    "set_payment_id": "string",
    "address?": "string",
    "description?": "string",
    "payment_id?": "string",
  },
  "delete_address_book": {
    "index": "number",
  },
  "refresh": {
    "start_height?": "number",
  },
  "auto_refresh": {
    "enabled?": "boolean",
    "period?": "number",
  },
  "rescan_spent": {},
  "start_mining": {
    "threads_count": "number",
    "do_background_mining": "boolean",
    "ignore_battery": "boolean",
  },
  "stop_mining": {},
  "get_languages": {},
  "create_wallet": {
    "filename": "string",
    "language": "string",
    "password?": "string",
  },
  "generate_from_keys": {
    "filename": "string",
    "address": "string",
    "viewkey": "string",
    "password": "string",
    "restore_height?": "number",
    "spendkey?": "string",
    "autosave_current?": "boolean",
  },
  "open_wallet": {
    "filename": "string",
    "password?": "string",
  },
  "restore_deterministic_wallet": {
    "filename": "string",
    "password": "string",
    "seed": "string",
    "restore_height?": "number",
    "language?": "string",
    "seed_offset?": "number",
    "autosave_current?": "boolean",
  },
  "close_wallet": {},
  "change_wallet_password": {
    "old_password": "string",
    "new_password": "string",
  },
  "is_multisig": {},
  "prepare_multisig": {},
  "make_multisig": {
    "multisig_info": "string",
    "threshold": "number",
    "password": "string",
  },
  "export_multisig_info": {},
  "import_multisig_info": {
    "info": "string",
  },
  "finalize_multisig": {
    "multisig_info": "string",
    "password": "string",
  },
  "sign_multisig": {
    "tx_data_hex": "string",
  },
  "submit_multisig": {
    "tx_data_hex": "string",
  },
  "get_version": {},
};
