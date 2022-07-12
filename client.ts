import { DigestClient } from "https://deno.land/x/digest_fetch@v1.2.1/mod.ts";

interface Args {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export class BaseClient {
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

    if (response.status === 200) {
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
}
