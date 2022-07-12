import { Project } from "https://deno.land/x/ts_morph@15.1.0/mod.ts";
import { DaemonList, WalletList } from "./methods.ts";

const project = new Project();

const client = project.addSourceFileAtPath("./client.ts");

const daemonFile = client.copy("daemon.ts", { overwrite: true });
const walletFile = client.copy("wallet.ts", { overwrite: true });

const daemonClient = daemonFile.getClass("BaseClient");
const walletClient = walletFile.getClass("BaseClient");

if (!daemonClient || !walletClient) {
  throw new Error("Could not find BaseClient");
}

daemonClient.rename("MoneroDaemonRPC");
walletClient.rename("MoneroWalletRPC");

for (const list of [DaemonList, WalletList]) {
  for (const method in list) {
    const keyTyped = method as keyof typeof list;
    const paramObject = list[keyTyped];
    let methodDeclaration;

    if (list === DaemonList) {
      methodDeclaration = daemonClient.addMethod({
        name: method,
      });
    } else {
      methodDeclaration = walletClient.addMethod({
        name: method,
      });
    }

    let params: string[] = [];

    for (const param in paramObject) {
      const keyTyped = param as keyof typeof paramObject;
      params.push(keyTyped);
      const paramType = paramObject[keyTyped];
      methodDeclaration.addParameter({
        name: param,
        type: paramType,
      });
    }

    params = params.map((param) => param.replace("?", ""));

    console.log(paramObject);

    // convert paramNames to a list of strings
    const paramNames = params.map((param) => `"${param}"`);

    methodDeclaration.setIsAsync(true);

    methodDeclaration.setBodyText((writer) => {
      writer.writeLine(
        `return this.request("${method}", [${params}], [${paramNames}]);`,
      );
    });
  }
}

await project.save();

// for (const [_, calls] of Object.entries(methods)) {
//   for (const call of calls) {
//     // getting descriptions
//     // const description = await getDescription(call.name);
//     // descriptions.set(call.name, description);
//
//     const descriptions = JSON.parse(
//       Deno.readTextFileSync("./descriptions.json"),
//     );
//     const description = descriptions[call.name];
//
//     const client = clientCopy.getClass("BitcoinRPC");
//     if (client === undefined) {
//       throw new Error("BitcoinRPC class not found");
//     }
//
//     const methodDeclaration = client.addMethod({
//       name: call.name,
//     });
//
//     methodDeclaration.setIsAsync(true);
//
//     methodDeclaration.setBodyText((writer) => {
//       writer.writeLine(
//         `return await this.request("${call.name}", [${
//           call.params.map((param) => `${param.name.replace("?", "")}`).join(
//             ", ",
//           )
//         }]);`,
//       );
//     });
//
//     methodDeclaration.addJsDoc({
//       description: description + "\n" + `${docBase}${call.name}.html`,
//     });
//
//     for (const param of call.params) {
//       methodDeclaration.addParameter({
//         name: param.name,
//         type: param.type,
//       });
//     }
//   }
//   await project.save();
// }
//
// // writing to descriptions file
// // Deno.writeTextFileSync(
// //   "./descriptions.json",
// //   JSON.stringify(Object.fromEntries(descriptions)),
// // );
