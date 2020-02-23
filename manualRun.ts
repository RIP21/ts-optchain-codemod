import { format } from "prettier";

import { transform } from "@babel/core";

const check = `
import oc from 'ts-optchain'
oc(one).two("default")
`;

const result = transform(check, {
  plugins: [["./src/index.ts"]]
}).code;

console.log(
  format(result, { semi: false, singleQuote: true, parser: "babel" })
);
