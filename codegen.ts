
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'http://localhost:8080/query': {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`
        }
      }
    }
  ],
  documents: './src/**/*.gql',
  generates: {
    "src/generated/graphql.ts": {
      plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo']
    }
  }
};

export default config;
