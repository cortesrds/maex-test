import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: './maex-openapi/maex-openapi-web.yaml',
  apiFile: './src/services/emptyMaex.ts',
  apiImport: 'emptyMaexApi',
  outputFile: './src/services/maex.ts',
  exportName: 'maexApi',
  hooks: { queries: true, lazyQueries: true, mutations: true },
  tag: true,
};

export default config;
