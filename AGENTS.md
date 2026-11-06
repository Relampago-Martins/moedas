# AGENTS.md

Guia para agentes de código que trabalham no **Pharus** (repositório `moedas`).

## O projeto

Pharus é uma ferramenta pessoal de finanças que vai para produção. O usuário cadastra despesas e
receitas para controlar as finanças do dia a dia, mas o diferencial do produto é a **organização
financeira do futuro**: orçamentos, caixinhas e anotações. Boa parte disso ainda não existe no
código, então ao criar algo novo pense em como encaixa nessa visão.

## Estrutura

```
api/        Backend: Django 5.1 + Django REST Framework + Postgres
  app/config/    settings, urls, wsgi
  app/moedas/    app única do domínio (models/, serializers/, views/, filters.py, urls.py)
  .bruno/        coleção de requisições do Bruno (cliente HTTP)
frontend/   Frontend: Next.js 16 (App Router) + React 19 + Tailwind 4 + shadcn/ui
  src/app/       rotas; as telas logadas ficam em (user-stuff)/
  src/features/  funcionalidades completas (conta-bancaria, dashboard, plano-financeiro...)
  src/entities/  blocos de domínio reutilizáveis (movimentacoes, orcamento, stepper...)
  src/shared/    api/ (cliente HTTP e endpoints), lib/ (helpers, hooks), ui/ (componentes base shadcn)
  src/types/     tipos globais e models/ espelhando a API
```

Dependências no front seguem a direção `app → features → entities → shared`. Um módulo de baixo nunca
importa de um de cima.

## Stack e ferramentas

- **Backend:** Python 3.13, Django 5.1, DRF, dj-rest-auth + allauth (login com Google),
  django-filter, django-environ, whitenoise, gunicorn. Lint e format com **Ruff** (`api/ruff.toml`,
  `select = ["ALL"]`, linha de 100 colunas).
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind 4, shadcn/ui (Radix), next-auth v4,
  TanStack Query, axios, react-hook-form + zod, zustand, framer-motion, recharts, date-fns.
  Gerenciador de pacotes: **Yarn**. Prettier com 4 espaços, aspas simples, vírgula final e
  `prettier-plugin-tailwindcss`.

## Comandos

Frontend (em `frontend/`):

```bash
yarn dev            # servidor de desenvolvimento
yarn build          # build de produção
yarn lint           # ESLint
yarn format:check   # Prettier (yarn format para corrigir)
```

Backend (em `api/`, via Docker):

```bash
./build.sh          # monta a imagem moedas:<VERSION>
./run.sh -p 8001    # abre um shell no container com app/ montado
# dentro do container: ./run.sh (migra e sobe runserver se DEBUG=True, gunicorn caso contrário)
ruff check app && ruff format app
```

Variáveis do backend ficam em `.env` (lido por django-environ): `SECRET_KEY`, `DEBUG`,
`ALLOWED_HOSTS`, `ROOT_URL`, `DB_*`, `GOOGLE_CALLBACK_URL`, `GOOGLE_CLIENT_ID`,
`GOOGLE_SECRET_KEY`. Com `DEBUG=True` o banco é SQLite. O front precisa de `NEXTAUTH_SECRET`
(veja `frontend/.env-exemple`). **Nunca sobrescreva um `.env` sem perguntar antes.**

## Idioma

- **Português:** nomes de domínio (models, campos, entidades e features como `Despesa`,
  `ContaBancaria`, `OrcamentoMensal`, `saldo`, `conta-bancaria`) e todo texto que chega ao usuário
  (labels, mensagens de erro, toasts, validações).
- **Inglês:** todo o resto (nomes de funções genéricas, hooks, utilitários, variáveis técnicas).
- Mensagens de commit em pt-BR (veja abaixo).

## Domínio

- **Movimentacao** é a base de toda entrada e saída de dinheiro (herança multi-tabela). `Despesa`
  e `Receita` estendem Movimentacao. O campo `tipo` usa `R` (receita), `D` (despesa), `T`
  (transferência) e `I` (investimento); hoje só `R` e `D` são tratados nos cálculos.
- **ContaBancaria** pertence a um usuário e aponta para um **Banco** (dados públicos, com ISPB e
  foto). O campo `saldo` é o **saldo inicial** da conta e não é atualizado pelas movimentações.
- **Saldo** de um usuário em uma data = soma dos saldos iniciais das contas + receitas − despesas
  até aquela data.
- **Categoria** tem `tipo` (despesa ou receita). Categorias com `is_base` são padrão do sistema.
- **Estrategia** divide a renda em percentuais fixos (gastos, investimentos, dívidas, reserva). A
  ideia é virar um modelo flexível com quantos percentuais o usuário quiser.
- **OrcamentoMensal** guarda limite de gastos e salário de um mês.
- Todo dado é do usuário logado: querysets sempre filtram por `request.user`.
- Valores monetários são `Decimal` (`max_digits=10, decimal_places=2`), nunca `float`.
- Fuso e idioma: `America/Sao_Paulo` e `pt-br`.

## Diretrizes de código

- Prefira soluções simples. Faça só as mudanças pedidas ou claramente entendidas.
- Antes de criar algo, procure se já existe no projeto. Evite duplicação.
- Arquivos não devem passar de 200 a 300 linhas; ao chegar nesse limite, divida. Funções longas
  também devem ser quebradas em funções menores.
- Ao corrigir bugs, esgote as opções da implementação atual antes de trazer tecnologia nova. Se
  trouxer, remova a antiga para não duplicar lógica.
- Considere os ambientes dev, test e prod. Dados simulados (mocks) só em testes, nunca em dev ou
  prod.
- Evite scripts soltos em arquivos, a menos que sejam realmente necessários.
- No front, componentes base vêm do shadcn em `shared/ui`; não edite esses componentes para regra
  de negócio, componha em `entities` ou `features`.
- Fluxos de várias telas dentro de modais usam o `Stepper` (`src/entities/stepper`); veja o
  README do frontend.
- Arquivos Markdown de PRD servem de referência. Não altere sem pedido explícito.

## Testes

Ainda não há testes exigidos. Antes de entregar, rode pelo menos `yarn lint`, `yarn build` e
`ruff check` nas partes que mudaram.

## Git

- Branches: `feat/<nome>` → `develop` → `main`.
- Commits no formato Conventional Commits com gitmoji, em pt-BR:
  `tipo(escopo): emoji Mensagem`. Exemplos:
  - `feat(conta-bancaria): ✨ Adiciona configuração e eventos para conta bancária`
  - `fix(dependencies): 🐛 Atualiza versão do psycopg`
  - `refactor(layout): ♻️ Altera fonte do corpo para poppins`
- Não faça commit nem push sem confirmação.

## Deploy

O deploy é automático na Vercel a partir do repositório. Tudo que vai para `main` vai para
produção, então mantenha `main` sempre com build passando.
