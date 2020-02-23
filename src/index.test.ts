import pluginTester from "babel-plugin-tester";
import transform from "./index";
const { format } = require("prettier");

const buildTestCase = ({ title, code }) => {
  return {
    title,
    code: `
      import oc from 'ts-optchain'
      ${code}`
  };
};

pluginTester({
  pluginName: "ts-optchain-codemod",
  plugin: transform,
  snapshot: true,
  formatResult: output =>
    format(output, {
      semi: true,
      singleQuote: true,
      parser: "babel"
    }),
  tests: [
    buildTestCase({
      title: "Simple test",
      code: `oc(one).two('default')`
    })
  ]
});
