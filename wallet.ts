import { DigestClient } from "https://deno.land/x/digest_fetch@v1.2.1/mod.ts";

interface Args {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export class MoneroWalletRPC {
  url: string;
  auth: boolean = false;
  client?: DigestClient;

  /** Make a request to the Monero JSON RPC.
   * @param {string} method - The method to call.
   * @param {any[]} paramVars - The parameter values.
   * @param {string[]} paramNames - The parameter names.
   */
  async request(method: string, paramVars: any[], paramNames: any[]) {
    const params = Object.fromEntries(
      paramVars.map((
        v,
        i,
      ) => [(paramNames[i] === "should_be_in") ? "in" : paramNames[i], v]),
    );

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const customFetch = this.client ? this.client.fetch : fetch;

    const response = await customFetch(this.url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        method,
        params,
      }),
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    const json = await response.json();

    if (!json.error) {
      return json.result;
    }

    return Promise.reject(new Error(json.error.message));
  }

  /** initializes a new instance of the BitcoinRPC class.
   * @param {Args} args - The arguments to create the BitcoinRPC - host, port, username, password.
   */
  constructor({ host, port, username, password }: Args) {
    this.url = `http://${host}:${port}/json_rpc`;
    if (username && password) {
      this.client = new DigestClient(username, password);
    }
  }

  async set_daemon(
    address?: string,
    trusted?: boolean,
    ssl_support?: string,
    ssl_private_key_path?: string,
    ssl_certificate_path?: string,
    ssl_ca_path?: string,
    ssl_allowed_fingerprints?: Array<string>,
    ssl_allow_any_cert?: boolean,
  ) {
    return this.request("set_daemon", [
      address,
      trusted,
      ssl_support,
      ssl_private_key_path,
      ssl_certificate_path,
      ssl_ca_path,
      ssl_allowed_fingerprints,
      ssl_allow_any_cert,
    ], [
      "address",
      "trusted",
      "ssl_support",
      "ssl_private_key_path",
      "ssl_certificate_path",
      "ssl_ca_path",
      "ssl_allowed_fingerprints",
      "ssl_allow_any_cert",
    ]);
  }

  async get_balance(account_index: number, address_indices?: Array<number>) {
    return this.request("get_balance", [account_index, address_indices], [
      "account_index",
      "address_indices",
    ]);
  }

  async get_address(account_index: number, address_index?: number) {
    return this.request("get_address", [account_index, address_index], [
      "account_index",
      "address_index",
    ]);
  }

  async get_address_index(address: string) {
    return this.request("get_address_index", [address], ["address"]);
  }

  async create_address(account_index: number, label?: string) {
    return this.request("create_address", [account_index, label], [
      "account_index",
      "label",
    ]);
  }

  async label_address(index: { major: number; minor: number }, label: string) {
    return this.request("label_address", [index, label], ["index", "label"]);
  }

  async validate_address(
    address: string,
    any_net_type?: boolean,
    allow_openalias?: boolean,
  ) {
    return this.request("validate_address", [
      address,
      any_net_type,
      allow_openalias,
    ], ["address", "any_net_type", "allow_openalias"]);
  }

  async get_accounts(tag?: string) {
    return this.request("get_accounts", [tag], ["tag"]);
  }

  async create_account(label: string) {
    return this.request("create_account", [label], ["label"]);
  }

  async label_account(account_index: number, label: string) {
    return this.request("label_account", [account_index, label], [
      "account_index",
      "label",
    ]);
  }

  async get_account_tags() {
    return this.request("get_account_tags", [], []);
  }

  async tag_accounts(tag: string, accounts: Array<number>) {
    return this.request("tag_accounts", [tag, accounts], ["tag", "accounts"]);
  }

  async untag_accounts(accounts: Array<number>) {
    return this.request("untag_accounts", [accounts], ["accounts"]);
  }

  async set_account_tag_description(tag: string, description: string) {
    return this.request("set_account_tag_description", [tag, description], [
      "tag",
      "description",
    ]);
  }

  async get_height() {
    return this.request("get_height", [], []);
  }

  async transfer(
    destinations: Array<{ address: string; amount: number }>,
    priority: number,
    mixin: number,
    ring_size: number,
    unlock_time: number,
    account_index?: number,
    subaddr_indices?: Array<number>,
    get_tx_key?: boolean,
    do_not_relay?: boolean,
    get_tx_hex?: boolean,
    get_tx_metadata?: boolean,
  ) {
    return this.request("transfer", [
      destinations,
      priority,
      mixin,
      ring_size,
      unlock_time,
      account_index,
      subaddr_indices,
      get_tx_key,
      do_not_relay,
      get_tx_hex,
      get_tx_metadata,
    ], [
      "destinations",
      "priority",
      "mixin",
      "ring_size",
      "unlock_time",
      "account_index",
      "subaddr_indices",
      "get_tx_key",
      "do_not_relay",
      "get_tx_hex",
      "get_tx_metadata",
    ]);
  }

  async transfer_split(
    destinations: Array<{ address: string; amount: number }>,
    mixin: number,
    ring_size: number,
    unlock_time: number,
    priority: number,
    account_index?: number,
    subaddr_indices?: Array<number>,
    do_not_relay?: boolean,
    get_tx_hex?: boolean,
    new_algorithm?: boolean,
    get_tx_metadata?: boolean,
  ) {
    return this.request("transfer_split", [
      destinations,
      mixin,
      ring_size,
      unlock_time,
      priority,
      account_index,
      subaddr_indices,
      do_not_relay,
      get_tx_hex,
      new_algorithm,
      get_tx_metadata,
    ], [
      "destinations",
      "mixin",
      "ring_size",
      "unlock_time",
      "priority",
      "account_index",
      "subaddr_indices",
      "do_not_relay",
      "get_tx_hex",
      "new_algorithm",
      "get_tx_metadata",
    ]);
  }

  async sign_transfer(unsigned_txset: string, export_raw?: boolean) {
    return this.request("sign_transfer", [unsigned_txset, export_raw], [
      "unsigned_txset",
      "export_raw",
    ]);
  }

  async submit_transfer(tx_data_hex: string) {
    return this.request("submit_transfer", [tx_data_hex], ["tx_data_hex"]);
  }

  async sweep_dust(
    get_tx_keys?: boolean,
    do_not_relay?: boolean,
    get_tx_hex?: boolean,
    get_tx_metadata?: boolean,
  ) {
    return this.request("sweep_dust", [
      get_tx_keys,
      do_not_relay,
      get_tx_hex,
      get_tx_metadata,
    ], ["get_tx_keys", "do_not_relay", "get_tx_hex", "get_tx_metadata"]);
  }

  async sweep_all(
    address: string,
    account_index: number,
    mixin: number,
    ring_size: number,
    unlock_time: number,
    priority?: number,
    subaddr_indices?: Array<number>,
    get_tx_keys?: boolean,
    below_amount?: number,
    do_not_relay?: boolean,
    get_tx_hex?: boolean,
    get_tx_metadata?: boolean,
  ) {
    return this.request("sweep_all", [
      address,
      account_index,
      mixin,
      ring_size,
      unlock_time,
      priority,
      subaddr_indices,
      get_tx_keys,
      below_amount,
      do_not_relay,
      get_tx_hex,
      get_tx_metadata,
    ], [
      "address",
      "account_index",
      "mixin",
      "ring_size",
      "unlock_time",
      "priority",
      "subaddr_indices",
      "get_tx_keys",
      "below_amount",
      "do_not_relay",
      "get_tx_hex",
      "get_tx_metadata",
    ]);
  }

  async sweep_single(
    address: string,
    account_index: number,
    mixin: number,
    ring_size: number,
    unlock_time: number,
    key_image: string,
    subaddr_indices?: Array<number>,
    priority?: number,
    get_tx_keys?: boolean,
    below_amount?: number,
    do_not_relay?: boolean,
    get_tx_hex?: boolean,
    get_tx_metadata?: boolean,
  ) {
    return this.request("sweep_single", [
      address,
      account_index,
      mixin,
      ring_size,
      unlock_time,
      key_image,
      subaddr_indices,
      priority,
      get_tx_keys,
      below_amount,
      do_not_relay,
      get_tx_hex,
      get_tx_metadata,
    ], [
      "address",
      "account_index",
      "mixin",
      "ring_size",
      "unlock_time",
      "key_image",
      "subaddr_indices",
      "priority",
      "get_tx_keys",
      "below_amount",
      "do_not_relay",
      "get_tx_hex",
      "get_tx_metadata",
    ]);
  }

  async relay_tx(hex: string) {
    return this.request("relay_tx", [hex], ["hex"]);
  }

  async store() {
    return this.request("store", [], []);
  }

  async get_payments(payment_id: string) {
    return this.request("get_payments", [payment_id], ["payment_id"]);
  }

  async get_bulk_payments(
    payment_ids: Array<string>,
    min_block_height: number,
  ) {
    return this.request("get_bulk_payments", [payment_ids, min_block_height], [
      "payment_ids",
      "min_block_height",
    ]);
  }

  async incoming_transfers(
    transfer_type: string,
    account_index?: number,
    subaddr_indices?: Array<number>,
  ) {
    return this.request("incoming_transfers", [
      transfer_type,
      account_index,
      subaddr_indices,
    ], ["transfer_type", "account_index", "subaddr_indices"]);
  }

  async query_key(key_type: string) {
    return this.request("query_key", [key_type], ["key_type"]);
  }

  async make_integrated_address(
    standard_address?: string,
    payment_id?: string,
  ) {
    return this.request("make_integrated_address", [
      standard_address,
      payment_id,
    ], ["standard_address", "payment_id"]);
  }

  async split_integrated_address(integrated_address: string) {
    return this.request("split_integrated_address", [integrated_address], [
      "integrated_address",
    ]);
  }

  async stop_wallet() {
    return this.request("stop_wallet", [], []);
  }

  async rescan_blockchain() {
    return this.request("rescan_blockchain", [], []);
  }

  async set_tx_notes(txids: Array<string>, notes: Array<string>) {
    return this.request("set_tx_notes", [txids, notes], ["txids", "notes"]);
  }

  async get_tx_notes(txids: Array<string>) {
    return this.request("get_tx_notes", [txids], ["txids"]);
  }

  async set_attribute(key: string, value: string) {
    return this.request("set_attribute", [key, value], ["key", "value"]);
  }

  async get_attribute(key: string) {
    return this.request("get_attribute", [key], ["key"]);
  }

  async get_tx_key(txid: string) {
    return this.request("get_tx_key", [txid], ["txid"]);
  }

  async check_tx_key(txid: string, tx_key: string, address: string) {
    return this.request("check_tx_key", [txid, tx_key, address], [
      "txid",
      "tx_key",
      "address",
    ]);
  }

  async get_tx_proof(txid: string, address: string, message?: string) {
    return this.request("get_tx_proof", [txid, address, message], [
      "txid",
      "address",
      "message",
    ]);
  }

  async check_tx_proof(
    txid: string,
    address: string,
    signature: string,
    message?: string,
  ) {
    return this.request("check_tx_proof", [txid, address, signature, message], [
      "txid",
      "address",
      "signature",
      "message",
    ]);
  }

  async get_spend_proof(txid: string, message?: string) {
    return this.request("get_spend_proof", [txid, message], [
      "txid",
      "message",
    ]);
  }

  async check_spend_proof(txid: string, signature: string, message?: string) {
    return this.request("check_spend_proof", [txid, signature, message], [
      "txid",
      "signature",
      "message",
    ]);
  }

  async get_reserve_proof(
    all: boolean,
    account_index: number,
    amount: number,
    message?: string,
  ) {
    return this.request("get_reserve_proof", [
      all,
      account_index,
      amount,
      message,
    ], ["all", "account_index", "amount", "message"]);
  }

  async check_reserve_proof(
    address: string,
    signature: string,
    message?: string,
  ) {
    return this.request("check_reserve_proof", [address, signature, message], [
      "address",
      "signature",
      "message",
    ]);
  }

  async get_transfers(
    should_be_in?: boolean,
    out?: boolean,
    pending?: boolean,
    failed?: boolean,
    pool?: boolean,
    filter_by_height?: boolean,
    min_height?: number,
    max_height?: number,
    account_index?: number,
    subaddr_indices?: Array<number>,
  ) {
    return this.request("get_transfers", [
      should_be_in,
      out,
      pending,
      failed,
      pool,
      filter_by_height,
      min_height,
      max_height,
      account_index,
      subaddr_indices,
    ], [
      "should_be_in",
      "out",
      "pending",
      "failed",
      "pool",
      "filter_by_height",
      "min_height",
      "max_height",
      "account_index",
      "subaddr_indices",
    ]);
  }

  async get_transfer_by_txid(txid: string, account_index?: number) {
    return this.request("get_transfer_by_txid", [txid, account_index], [
      "txid",
      "account_index",
    ]);
  }

  async describe_transfer(unsigned_txset?: string, multisig_txset?: string) {
    return this.request("describe_transfer", [unsigned_txset, multisig_txset], [
      "unsigned_txset",
      "multisig_txset",
    ]);
  }

  async sign(data: string) {
    return this.request("sign", [data], ["data"]);
  }

  async verify(data: string, address: string, signature: string) {
    return this.request("verify", [data, address, signature], [
      "data",
      "address",
      "signature",
    ]);
  }

  async export_outputs(all?: boolean) {
    return this.request("export_outputs", [all], ["all"]);
  }

  async import_outputs(outputs_data_hex: string) {
    return this.request("import_outputs", [outputs_data_hex], [
      "outputs_data_hex",
    ]);
  }

  async export_key_images(all?: boolean) {
    return this.request("export_key_images", [all], ["all"]);
  }

  async import_key_images(
    signed_key_images: Array<{ key_image: string; signature: string }>,
  ) {
    return this.request("import_key_images", [signed_key_images], [
      "signed_key_images",
    ]);
  }

  async make_uri(
    address: string,
    amount?: number,
    payment_id?: string,
    recipient_name?: string,
    tx_description?: string,
  ) {
    return this.request("make_uri", [
      address,
      amount,
      payment_id,
      recipient_name,
      tx_description,
    ], ["address", "amount", "payment_id", "recipient_name", "tx_description"]);
  }

  async parse_uri(uri: string) {
    return this.request("parse_uri", [uri], ["uri"]);
  }

  async get_address_book(entries: Array<number>) {
    return this.request("get_address_book", [entries], ["entries"]);
  }

  async add_address_book(
    address: string,
    payment_id?: string,
    description?: string,
  ) {
    return this.request(
      "add_address_book",
      [address, payment_id, description],
      ["address", "payment_id", "description"],
    );
  }

  async edit_address_book(
    index: number,
    set_address: string,
    set_description: string,
    set_payment_id: string,
    address?: string,
    description?: string,
    payment_id?: string,
  ) {
    return this.request("edit_address_book", [
      index,
      set_address,
      set_description,
      set_payment_id,
      address,
      description,
      payment_id,
    ], [
      "index",
      "set_address",
      "set_description",
      "set_payment_id",
      "address",
      "description",
      "payment_id",
    ]);
  }

  async delete_address_book(index: number) {
    return this.request("delete_address_book", [index], ["index"]);
  }

  async refresh(start_height?: number) {
    return this.request("refresh", [start_height], ["start_height"]);
  }

  async auto_refresh(enabled?: boolean, period?: number) {
    return this.request("auto_refresh", [enabled, period], [
      "enabled",
      "period",
    ]);
  }

  async rescan_spent() {
    return this.request("rescan_spent", [], []);
  }

  async start_mining(
    threads_count: number,
    do_background_mining: boolean,
    ignore_battery: boolean,
  ) {
    return this.request("start_mining", [
      threads_count,
      do_background_mining,
      ignore_battery,
    ], ["threads_count", "do_background_mining", "ignore_battery"]);
  }

  async stop_mining() {
    return this.request("stop_mining", [], []);
  }

  async get_languages() {
    return this.request("get_languages", [], []);
  }

  async create_wallet(filename: string, language: string, password?: string) {
    return this.request("create_wallet", [filename, language, password], [
      "filename",
      "language",
      "password",
    ]);
  }

  async generate_from_keys(
    filename: string,
    address: string,
    viewkey: string,
    password: string,
    restore_height?: number,
    spendkey?: string,
    autosave_current?: boolean,
  ) {
    return this.request("generate_from_keys", [
      filename,
      address,
      viewkey,
      password,
      restore_height,
      spendkey,
      autosave_current,
    ], [
      "filename",
      "address",
      "viewkey",
      "password",
      "restore_height",
      "spendkey",
      "autosave_current",
    ]);
  }

  async open_wallet(filename: string, password?: string) {
    return this.request("open_wallet", [filename, password], [
      "filename",
      "password",
    ]);
  }

  async restore_deterministic_wallet(
    filename: string,
    password: string,
    seed: string,
    restore_height?: number,
    language?: string,
    seed_offset?: number,
    autosave_current?: boolean,
  ) {
    return this.request("restore_deterministic_wallet", [
      filename,
      password,
      seed,
      restore_height,
      language,
      seed_offset,
      autosave_current,
    ], [
      "filename",
      "password",
      "seed",
      "restore_height",
      "language",
      "seed_offset",
      "autosave_current",
    ]);
  }

  async close_wallet() {
    return this.request("close_wallet", [], []);
  }

  async change_wallet_password(old_password: string, new_password: string) {
    return this.request(
      "change_wallet_password",
      [old_password, new_password],
      ["old_password", "new_password"],
    );
  }

  async is_multisig() {
    return this.request("is_multisig", [], []);
  }

  async prepare_multisig() {
    return this.request("prepare_multisig", [], []);
  }

  async make_multisig(
    multisig_info: string,
    threshold: number,
    password: string,
  ) {
    return this.request("make_multisig", [multisig_info, threshold, password], [
      "multisig_info",
      "threshold",
      "password",
    ]);
  }

  async export_multisig_info() {
    return this.request("export_multisig_info", [], []);
  }

  async import_multisig_info(info: string) {
    return this.request("import_multisig_info", [info], ["info"]);
  }

  async finalize_multisig(multisig_info: string, password: string) {
    return this.request("finalize_multisig", [multisig_info, password], [
      "multisig_info",
      "password",
    ]);
  }

  async sign_multisig(tx_data_hex: string) {
    return this.request("sign_multisig", [tx_data_hex], ["tx_data_hex"]);
  }

  async submit_multisig(tx_data_hex: string) {
    return this.request("submit_multisig", [tx_data_hex], ["tx_data_hex"]);
  }

  async get_version() {
    return this.request("get_version", [], []);
  }
}

const wallet = new MoneroWalletRPC({
  host: "localhost",
  port: 28088,
});

console.log(await wallet.get_transfer_by_txid("sdfklj"));
