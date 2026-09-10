import { resolve } from 'node:path';
import { defineConfig } from 'oxlint';

const layers = ['gateway', 'application', 'core', 'infrastructure'];

export default defineConfig({
  plugins: ['typescript'],
  jsPlugins: ['eslint-plugin-boundaries'],
  categories: { correctness: 'error' },
  env: { node: true },
  settings: {
    'boundaries/root-path': import.meta.dirname,
    'boundaries/include': [
      'src/gateway/**/*.ts',
      'src/application/**/*.ts',
      'src/core/**/*.ts',
      'src/infrastructure/**/*.ts',
    ],
    'boundaries/elements': [
      { type: 'gateway', pattern: 'src/gateway' },
      ...layers.slice(1).map((layer) => ({
        type: layer,
        pattern: `src/${layer}/*`,
        capture: ['domain'],
      })),
    ],
    'import/resolver': {
      typescript: { project: resolve(import.meta.dirname, 'tsconfig.json') },
    },
  },
  overrides: [
    {
      files: [
        'src/gateway/**/*.ts',
        'src/application/**/*.ts',
        'src/core/**/*.ts',
        'src/infrastructure/**/*.ts',
      ],
      rules: {
        'boundaries/no-unknown-files': 'error',
        'boundaries/no-unknown-dependencies': 'error',
        'boundaries/dependencies': [
          'error',
          {
            default: 'disallow',
            policies: layers.slice(0, -1).map((layer, index) => ({
              from: { element: { type: layer } },
              allow: {
                to: {
                  element: {
                    type: layers.slice(index + 1),
                    fileInternalPath: 'index.ts',
                  },
                },
              },
            })),
          },
        ],
      },
    },
  ],
});
