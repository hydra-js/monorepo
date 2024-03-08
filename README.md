# Hydra-JS (Monorepo)

## Getting Started

```bash
git clone git@github.com:hydra-js/monorepo.git hydrajs-monorepo
cd hydrajs-monorepo
yarn
```

- Make a copy of `hydrajs-monorepo/packages/server-nodejs/.env.example` as `_/.env`
- Update `.env` file with correct values

```bash
cd hydrajs-monorepo/packages/core
yarn link
cd ../server-nodejs
yarn yarn link "@hydra-js/core
```
