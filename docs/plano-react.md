# Plano de migração — Editorial Cacau → React

**Template base aprovado pela cliente:** Editorial Cacau (`templates/template1/editorial-cacau/index.html`)

---

## Visão geral

Transformar o HTML/JS estático do Editorial Cacau em uma SPA React standalone.
O hub de templates (`template1/index.html` + iframe viewer) é **descartado** — o app novo vai direto para o portfólio.

---

## Stack definida

| Peça | Escolha | Motivo |
|---|---|---|
| Bundler | Vite | Mais rápido que CRA, padrão do ecossistema atual |
| Framework | React 18 | — |
| Roteamento | React Router v6 | Substitui o hash router manual atual |
| Estilos | CSS global (portado de `styles.css`) | O CSS já está maduro e aprovado — não reescrever |
| Linguagem | JavaScript (JSX) | Sem TypeScript por enquanto — adicionar quando o scope crescer |
| Deploy | Vercel | Já tem `vercel.json` no projeto |

---

## Estrutura de pastas (destino)

```
ana-julia-portifolio/          ← nova pasta (fora do repo atual ou subpasta)
├── public/
│   └── assets/                ← imagens futuras
├── src/
│   ├── data/
│   │   └── cases.js           ← dados dos cases (extraídos do HTML)
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Eyebrow.jsx
│   │   ├── Button.jsx
│   │   ├── Tag.jsx
│   │   └── Arrow.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   └── Case.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Roteamento

| URL | Componente | Equivalente atual |
|---|---|---|
| `/` | redirect → `/home` | `#home` (default) |
| `/home` | `<Home />` | `data-screen="home"` |
| `/projetos` | `<Projects />` | `data-screen="projetos"` |
| `/case/:slug` | `<Case />` | `data-screen="case"` + hash param |

**Anchors da Home** (`#sobre`, `#contato`) continuam funcionando via `useEffect` + `scrollIntoView` — o React Router passa o hash e o componente faz o scroll.

---

## O que é portado sem mudança

- Todo o CSS (variáveis, componentes, media queries)
- Conteúdo textual (títulos, descrições, nomes)
- Dados dos cases (`CASES` object)
- Visual do hero (portrait-frame, stamp, hero-scribble, tape)
- Lógica de filtros por categoria

## O que muda

- `innerHTML` programático → JSX declarativo
- `show(name)` / hash routing → React Router
- `renderCase()` / `renderProjGrid()` → componentes `<Case />` e `<Projects />`
- `hidden` attribute toggling → condicional de rota

---

## Fora do escopo desta migração

- Backend / CMS (dados ficam em `cases.js`)
- Internacionalização
- Animações além das que já existem no CSS
- Imagens reais (placeholders permanecem)
- Formulário de contato funcional (mailto continua)
