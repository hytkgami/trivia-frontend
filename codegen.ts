import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'http://localhost:8080/query': {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      },
    },
  ],
  documents: 'src/**/*.tsx',
  generates: {
    'src/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
