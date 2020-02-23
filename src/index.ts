import { declare } from "@babel/helper-plugin-utils";
import { types as t, PluginObj } from "@babel/core";
import typescript from "@babel/plugin-syntax-typescript";
import { CallExpression, Identifier } from "@babel/types";

let isOcInScope = false;

export default declare((api, options) => {
  return {
    name: "ts-optchain-codemod",
    inherits: typescript,
    visitor: {
      Program(path) {
        isOcInScope = !!path.node.body.find(arg => {
          if (t.isImportDeclaration(arg)) {
            const hasOc = arg.specifiers.find(
              specifier => specifier.local.name === "oc"
            );
            const hasTsOptchainFrom = arg.source.value === "ts-optchain";
            return hasTsOptchainFrom && hasOc;
          }
        });
      },
      ImportDeclaration(path) {
        const { node } = path;
        if (
          t.isImportDeclaration(node) &&
          node.source.value === "ts-optchain"
        ) {
          path.remove();
        }
      },
      CallExpression(path, state) {
        const node = path.node as CallExpression;
        const isOcCall =
          t.isIdentifier(node.callee) && node.callee.name === "oc";
        if (isOcInScope && isOcCall) {
          const [wrappedInOcCall] = node.arguments as [Identifier];
          path.replaceWith(
            wrappedInOcCall
          );
        }
      }
    }
  } as PluginObj;
});
