<h1 align="center">monero_rpc</h1>
<p align="center">Monero RPC Library for Deno</p>

## Usage

The latest version of monero_rpc can be imported from https://deno.land/x/monero_rpc/mod.ts.

You can also view the documentaton [here](https://doc.deno.land/https://deno.land/x/monero_rpc/mod.ts).

## Example

```typescript
import MoneroDaemonRPC from "https://deno.land/x/monero_rpc/mod.ts";
import MoneroWalletRPC from "https://deno.land/x/monero_rpc/mod.ts";

const daemon = new MoneroDaemonRPC({
  host: "localhost",
  port: 28081,
});

const wallet = new MoneroWalletRPC({
  host: "localhost",
  port: 28088,
});

console.log(await daemon.get_block_count()); // { count: 2021823, status: "OK", untrusted: false }
console.log(await wallet.get_height()); // { height: 2021823 }
```
