import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = [
    ...nextCoreWebVitals,
    ...nextTypescript,
    {
        // Regras novas do eslint-plugin-react-hooks v7 (React Compiler).
        // Mantidas como aviso até o código existente ser ajustado.
        rules: {
            'react-hooks/set-state-in-effect': 'warn',
            'react-hooks/purity': 'warn',
            'react-hooks/refs': 'warn',
        },
    },
    {
        // Arquivos de configuração em CommonJS (next.config.js, prettier.config.js...).
        files: ['**/*.js', '**/*.cjs'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts',
        ],
    },
    // Desliga regras de estilo que conflitam com o Prettier (deve ficar por último).
    prettier,
];

export default eslintConfig;
