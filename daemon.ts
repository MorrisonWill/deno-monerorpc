import { DigestClient } from "https://deno.land/x/digest_fetch@v1.2.1/mod.ts";

interface Args {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export class MoneroDaemonRPC {
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

    async get_block_count() {
        return this.request("get_block_count", [], []);
    }

    async on_get_block_hash(height: Array<number>) {
        return this.request("on_get_block_hash", [height], ["height"]);
    }

    async get_block_template(wallet_address: string, reserve_size: number) {
        return this.request("get_block_template", [wallet_address,reserve_size], ["wallet_address","reserve_size"]);
    }

    async submit_block(blob: Array<string>) {
        return this.request("submit_block", [blob], ["blob"]);
    }

    async get_last_block_header() {
        return this.request("get_last_block_header", [], []);
    }

    async get_block_header_by_hash(hash: number) {
        return this.request("get_block_header_by_hash", [hash], ["hash"]);
    }

    async get_block_header_by_height(height: number) {
        return this.request("get_block_header_by_height", [height], ["height"]);
    }

    async get_block_headers_range(start_height: number, end_height: number) {
        return this.request("get_block_headers_range", [start_height,end_height], ["start_height","end_height"]);
    }

    async get_block(height?: number, hash?: number) {
        return this.request("get_block", [height,hash], ["height","hash"]);
    }

    async get_connections() {
        return this.request("get_connections", [], []);
    }

    async get_info() {
        return this.request("get_info", [], []);
    }

    async hard_fork_info() {
        return this.request("hard_fork_info", [], []);
    }

    async set_bans(bans: Array<{ host: string; ip: number; ban: boolean; seconds: number }>) {
        return this.request("set_bans", [bans], ["bans"]);
    }

    async get_bans() {
        return this.request("get_bans", [], []);
    }

    async get_output_histogram(amounts: Array<number>, min_count: number, max_count: number, unlocked: number, recent_cutoff: number) {
        return this.request("get_output_histogram", [amounts,min_count,max_count,unlocked,recent_cutoff], ["amounts","min_count","max_count","unlocked","recent_cutoff"]);
    }

    async get_version() {
        return this.request("get_version", [], []);
    }

    async get_coinbase_tx_sum(height: number, count: number) {
        return this.request("get_coinbase_tx_sum", [height,count], ["height","count"]);
    }

    async get_fee_estimate(grace_blocks?: number) {
        return this.request("get_fee_estimate", [grace_blocks], ["grace_blocks"]);
    }

    async get_alternate_chains() {
        return this.request("get_alternate_chains", [], []);
    }

    async relay_tx(txids: Array<string>) {
        return this.request("relay_tx", [txids], ["txids"]);
    }

    async sync_info() {
        return this.request("sync_info", [], []);
    }

    async get_txpool_backlog() {
        return this.request("get_txpool_backlog", [], []);
    }

    async get_output_distribution(amounts: Array<number>, cumulative?: number, from_height?: number, to_height?: number) {
        return this.request("get_output_distribution", [amounts,cumulative,from_height,to_height], ["amounts","cumulative","from_height","to_height"]);
    }
}
