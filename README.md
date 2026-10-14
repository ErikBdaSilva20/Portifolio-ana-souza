# Portfólio — Ana Julia Martinez

Portfólio profissional desenvolvido para Ana Julia Martinez, estudante de Publicidade e Propaganda com ênfase em Marketing (4º semestre, São Paulo/SP). O projeto nasceu da necessidade real da cliente: ela já havia precisado de um portfólio para se apresentar profissionalmente, mas não tinha um. A solução foi criar uma plataforma que funcionasse tanto como vitrine de cases quanto como ferramenta de captação de contatos — com painel de leads integrado.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Estilização | CSS puro (design system próprio com variáveis CSS) |
| Roteamento | History API nativa (sem react-router) |
| Notificações | Firebase Cloud Messaging (FCM) |
| Captação de leads | Google Apps Script (via `fetch` no-cors) |
| Assets | WebP otimizado |
| Deploy | — |

Sem bibliotecas de UI, sem gerenciamento de estado externo, sem CSS-in-JS. Intencionalmente leve.

---

## Funcionalidades

### Páginas públicas

- **Home** — apresentação com foto, tagline, contatos rápidos (e-mail, WhatsApp, LinkedIn) e acesso direto a projetos e comunidade Publigirls
- **Projetos** — grid filtrado por categoria com todos os cases
- **Case (detalhe)** — página individual por case com banner, galeria/carrossel, contexto, papel da Ana e tags
- **Sobre** — bio em texto corrido, formação acadêmica, experiência profissional e grid de competências
- **Contato** — formulário com nome, e-mail, empresa, tipo de serviço e mensagem; submissão via Google Apps Script

### Painel privado (área restrita)

- **Login** — autenticação simples com senha para acesso ao painel
- **Leads** — listagem de todos os contatos recebidos pelo formulário, com data, mensagem, empresa e tipo de serviço

### Push notifications

Ao visitar o portfólio, o visitante é convidado a autorizar notificações. O token FCM é enviado para uma planilha Google via Apps Script, permitindo que a Ana seja notificada em tempo real sobre novos leads — mesmo fora do painel.

---

## Cases documentados

| # | Título | Categoria | Status |
|---|---|---|---|
| 01 | **Publigirls** | Comunidade | Publicado |
| 02 | **Café Marqueteiro** | Branding · Autoral | Publicado |
| 03 | **Conectados com Consciência** | Extensão · Acadêmico | Publicado |
| 04 | **Essência & Identidade** | Branding · Acadêmico | Publicado |
| 05 | **Marcas que ficam** | Estratégia · Conceito | Em construção |

---

## Estrutura do projeto

```
src/
├── assets/                  # Imagens principais (Ana, Publigirls)
├── components/
│   ├── Header.jsx           # Navegação com menu mobile
│   ├── Footer.jsx           # Rodapé com CTA de contato
│   └── ProjectCard.jsx      # Card reutilizável de projeto
├── data/
│   └── cases.js             # Fonte de verdade de todos os cases
├── lib/
│   ├── firebase.js          # Init Firebase + FCM + envio de token
│   └── firebase-messaging-sw.template.js
├── myprojects/              # Imagens organizadas por case
│   ├── cafemarqueteiro/
│   ├── palestra/
│   └── academy/
├── pages/
│   ├── Home.jsx
│   ├── Projetos.jsx
│   ├── Sobre.jsx
│   ├── Case.jsx
│   ├── Contato.jsx
│   ├── Login.jsx
│   └── Leads.jsx
├── App.jsx                  # Roteador via History API
├── index.css                # Design system completo
└── main.jsx
```

---

## Roteamento

Sem dependências externas. O `App.jsx` ouve o evento `popstate` e faz parse manual do `window.location.pathname`. Navegação via `window.history.pushState`. Suporta URLs diretas (deep linking) desde que o servidor sirva o `index.html` para todas as rotas.

Rotas disponíveis:

```
/              → Home
/projetos      → Lista de projetos
/sobre         → Sobre a Ana
/contato       → Formulário de contato
/case/:slug    → Detalhe do case (slugs: cafe, palestra, perfume, publigirls, nestle)
/login         → Acesso ao painel
/painel        → Painel de leads (requer autenticação)
```

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_FIREBASE_VAPID_KEY=
VITE_GOOGLE_APPS_SCRIPT_URL=
```

O `firebase.js` valida as chaves obrigatórias na inicialização e lança erro descritivo se alguma estiver faltando.

---

## Como rodar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

---

## Design system

Todo o visual é controlado por variáveis CSS definidas em `src/index.css`:

```css
--cacau:      #3C1C0D   /* marrom escuro principal */
--caramelo:   #B97854   /* destaque, eyebrows, números */
--offwhite:   #F3ECDF   /* fundo geral */
--areia:      #E8DFCF   /* fundo de cards e seções alt */
--preto:      #1C1714   /* texto principal */
```

Tipografia: **Space Grotesk** (títulos) + **DM Sans** (corpo) via Google Fonts.

---

## Contexto do projeto

Este portfólio é um projeto real entregue para uma cliente que não tinha presença digital estruturada. Além de apresentar os trabalhos da Ana, o sistema foi pensado para converter visitas em contatos qualificados — com formulário, painel de gestão e notificações push, tudo sem depender de ferramentas de terceiros como Typeform ou Notion.

---

*Desenvolvido por [Erik Borges da Silva](https://github.com/ErikBdaSilva20)*
