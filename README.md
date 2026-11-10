# Interface de autenticação — React + Vite

Front-end que consome a [API de autenticação](https://github.com/Brandon-Magalhaes/auth-api-nestjs): login, cadastro e dashboard protegido.

## Telas

| Rota | Tela |
|---|---|
| `/login` | formulário de login |
| `/signup` | formulário de cadastro |
| `/dashboard` | área protegida; redireciona para `/login` sem token |

## Como funciona

- Os tokens (`access_token` e `refresh_token`) são salvos no `localStorage`.
- O `access_token` é aplicado como header padrão do axios (`Authorization: Bearer ...`).
- Ao abrir o app, `src/App.tsx` verifica se existe token e libera a rota `/dashboard`.
- Erros da API são exibidos no formulário (ex.: credenciais inválidas, e-mail já cadastrado).
- O "sair" limpa os tokens e volta para o login.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS 4 · axios · react-router-dom 7

## Como rodar

Suba primeiro o backend. Depois:

```bash
npm install
cp .env.example .env
npm run dev
```

A aplicação abre em `http://localhost:5173`.

## Variáveis de ambiente

| Variável | Padrão | Uso |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3000` | endereço da API |

## Limitações conhecidas

- Não há renovação automática do access token: quando ele expira (15 min), o usuário volta para o login.
- Tokens em `localStorage` são acessíveis por JavaScript; em produção o recomendado é cookie `httpOnly`.
- Não há testes automatizados.
