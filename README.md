# Portfólio Ana Julia

Portfólio em React + Vite para apresentação de projetos de publicidade, marketing,
branding e conteúdo.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run lint
npm run build
```

## Rotas

A aplicação usa rotas do navegador, com fallback configurado em `vercel.json` para
que páginas internas continuem funcionando ao serem acessadas diretamente ou
recarregadas:

- `/`
- `/projetos`
- `/sobre`
- `/contato`
- `/case/:slug`
