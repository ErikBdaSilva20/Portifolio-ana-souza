# Stories de implementação — Editorial Cacau React

Ver contexto completo em [`plano-react.md`](./plano-react.md).

---

## Story 1 — Bootstrap do projeto

**Como** dev,
**quero** criar o projeto Vite + React com a estrutura de pastas definida,
**para** ter o ambiente base pronto para desenvolvimento.

### Tarefas

- [ ] `npm create vite@latest ana-julia-portifolio -- --template react` na pasta destino
- [ ] Instalar `react-router-dom`
- [ ] Criar estrutura de pastas: `src/data/`, `src/components/`, `src/pages/`, `src/styles/`
- [ ] Remover arquivos boilerplate do Vite (`App.css`, `assets/react.svg`, conteúdo de `App.jsx`)
- [ ] Confirmar `npm run dev` sobe sem erros

### Critério de aceite
`npm run dev` → página em branco sem erros no console.

---

## Story 2 — Dados (`src/data/cases.js`)

**Como** dev,
**quero** extrair os dados dos cases para um módulo separado,
**para** que qualquer componente possa importá-los sem duplicação.

### Tarefas

- [ ] Criar `src/data/cases.js` com export do objeto `CASES` (publigirls, nestle, cafe)
- [ ] Cada case: `{ eyebrow, title, description, tags[], context, role, bullets[], note }`
- [ ] Criar `src/data/homeProjects.js` com os 3 cards fixos da home (slug, número, categoria, ano, artType)

### Critério de aceite
`import { CASES } from '../data/cases'` retorna os 3 cases sem erro.

---

## Story 3 — Estilos globais (`src/styles/global.css`)

**Como** dev,
**quero** ter o CSS aprovado disponível no projeto React,
**para** que o visual seja idêntico ao template estático.

### Tarefas

- [ ] Copiar `styles.css` do repo atual para `src/styles/global.css`
- [ ] Remover classes exclusivas do hub: `.template-hub`, `.hub-shell`, `.hub-header`, `.hub-footer`, `.hub-intro`, `.template-list`, `.template-tile`, `.tile-*`
- [ ] Remover variações de tema: `.t-minimal`, `.t-social` e todos os seletores aninhados delas
- [ ] Remover `.back-home` (botão flutuante de galeria — não existe mais)
- [ ] Manter todo o resto intacto (variáveis, reset, componentes, media queries)
- [ ] Importar em `src/main.jsx`: `import './styles/global.css'`

### Critério de aceite
Inspecionar variáveis CSS no browser → `--cacao: #3c1c0d` presente.

---

## Story 4 — Componentes atômicos

**Como** dev,
**quero** ter os blocos reutilizáveis do design como componentes,
**para** não repetir markup nas páginas.

### Componentes

**`Eyebrow.jsx`**
```jsx
export default function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>
}
```

**`Button.jsx`**
```jsx
// href externo usa <a>; rota interna usa <Link>
export default function Button({ href, to, dark, children }) { ... }
```

**`Tag.jsx`**
```jsx
export default function Tag({ children }) {
  return <span className="tag">{children}</span>
}
```

**`Arrow.jsx`**
```jsx
export default function Arrow() {
  return <span className="arrow">↗</span>
}
```

### Critério de aceite
Componentes importáveis e renderizam sem props extras obrigatórias.

---

## Story 5 — Header e Footer

**Como** visitante,
**quero** ver o header e footer corretos em todas as páginas,
**para** navegar e entrar em contato.

### `Header.jsx`
- Logo `ana<span>julia</span>®` linkando para `/home`
- Nav: "Sobre" (scroll `#sobre`), "Projetos" (`/projetos`), "Vamos conversar ↗" (`#contato`) — usa `<Link>` do React Router
- Classe `site-header`

### `Footer.jsx`
- Recebe props `eyebrow`, `title`, `ctaHref` (padrão: `mailto:anajuliamartinezdesouza@gmail.com`)
- Renderiza a seção de contato + `.footer-bottom` com slot para links adicionais

### Critério de aceite
Header e Footer renderizam em todas as 3 rotas sem console errors.

---

## Story 6 — Página Home (`/home`)

**Como** visitante,
**quero** ver a página inicial completa do portfólio,
**para** entender o trabalho da Ana Julia.

### Seções (em ordem)

1. **Hero** — `.hero-grid` com hero-copy (eyebrow, h1, parágrafo, botões) + hero-art (portrait-frame, stamp, hero-scribble)
2. **Tape** — faixa `.tape` com `ESTRATÉGIA · CONTEÚDO · CONEXÃO`
3. **Projetos na home** — `.projects-grid` com 3 cards fixos + card "Ver todos"
4. **Sobre** (`id="sobre"`) — `.about` com about-layout, about-list com 4 linhas
5. **Footer/Contato** (`id="contato"`) — via `<Footer />`

### Scroll para anchor
```jsx
// Home.jsx
import { useLocation } from 'react-router-dom'

useEffect(() => {
  const hash = location.hash.slice(1)
  if (hash) {
    const el = document.getElementById(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}, [location.hash])
```

### Critério de aceite
- Rota `/home` renderiza hero visualmente idêntico ao HTML estático
- Clicar "Sobre" na nav faz scroll suave até a seção
- Clicar nos project cards navega para `/case/:slug`

---

## Story 7 — Página Projetos (`/projetos`)

**Como** visitante,
**quero** ver todos os projetos com filtro por categoria,
**para** encontrar o que me interessa.

### Comportamento

- Lista todos os cases de `CASES` como `.project-card`
- Filtros: Todos / Comunidade / Branding / Estratégia / Conteúdo
- Filtro ativo esconde cards que não têm a tag — via `useState(activeFilter)`
- Filtro "Todos" mostra tudo

### Estado local
```jsx
const [filter, setFilter] = useState('todos')
const visible = filter === 'todos'
  ? Object.entries(CASES)
  : Object.entries(CASES).filter(([, c]) => c.tags.includes(filter))
```

### Critério de aceite
- Clicar "Branding" esconde "Publigirls" (tag Comunidade) e mostra "Café Marqueteiro"
- Clicar "Todos" restaura todos os cards

---

## Story 8 — Página Case (`/case/:slug`)

**Como** visitante,
**quero** ver o detalhe de um case,
**para** entender o contexto, atuação e entregas do projeto.

### Comportamento

```jsx
// Case.jsx
const { slug } = useParams()
const c = CASES[slug]
if (!c) return <Navigate to="/projetos" />
```

### Seções renderizadas

- Breadcrumb: `← Voltar aos projetos` (link `/projetos`)
- Eyebrow, H1, Tags
- Descrição
- Grid 3 colunas: Contexto / Atuação / Entregas
- Note box (se `c.note` existir)
- CTAs: "Ver outros projetos" + "Entrar em contato ↗"

### Critério de aceite
- `/case/publigirls` renderiza o case Publigirls
- `/case/inexistente` redireciona para `/projetos`
- Note box aparece somente para `nestle` e `cafe`

---

## Story 9 — Roteamento e App.jsx

**Como** dev,
**quero** o roteamento configurado e funcionando,
**para** que as URLs reflitam a tela atual e o browser back/forward funcione.

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Case from './pages/Case'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/case/:slug" element={<Case />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Critério de aceite
- Digitar `/` no browser redireciona para `/home`
- Back/forward do browser funciona entre rotas
- Refresh em `/case/publigirls` não quebra (requer `vite.config.js` com `historyApiFallback` ou configuração no Vercel)

---

## Story 10 — Build e deploy

**Como** dev,
**quero** o app buildado e deployado na Vercel,
**para** que a cliente possa acessar o portfólio online.

### Tarefas

- [ ] `npm run build` sem erros
- [ ] Criar `vercel.json` no projeto React com rewrites para SPA:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- [ ] Subir para repositório Git
- [ ] Conectar ao Vercel e fazer deploy

### Critério de aceite
- URL pública acessível
- Refresh em `/case/publigirls` não retorna 404
- Visual idêntico ao template estático aprovado

---

## Ordem de execução sugerida

```
1 → 2 → 3 → 4 → 5 → 9 → 6 → 7 → 8 → 10
```

Stories 4 e 5 podem ser feitas em paralelo com a 3.
Story 9 pode ser feita após a 1 (skeleton) e completada junto com a 6.
