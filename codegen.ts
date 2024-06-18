import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./.mesh/schema.graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "src/types/schema/": {
      preset: "client",
      plugins: [],
      config: {
        useTypeImports: true,
        nonOptionalTypename: true,
        avoidOptionals: {
          field: false,
          inputValue: false,
          object: true,
          defaultValue: true,
        },
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
