/*
 * Hash router for the static template gallery.
 * Available URLs: #/inicio, #/projetos and #/case/publigirls.
 */
const CASES = {
  publigirls: { eyebrow: 'Case 01 · Comunidade', title: 'Publigirls', summary: 'Uma comunidade criada para conectar, apoiar e abrir caminhos para mulheres da comunicação.', tags: ['Branding', 'Comunidade', 'Conteúdo'], context: 'A Publigirls nasce da vontade de transformar troca em oportunidade. O projeto combina identidade verbal, conteúdo para redes e construção de comunidade.', role: 'Estratégia de comunicação, direção de conteúdo e construção de identidade para redes sociais.', items: ['Pilares editoriais e tom de voz', 'Linguagem visual reconhecível', 'Conteúdo que estimula conversa e networking'] },
  nestle: { eyebrow: 'Case 02 · Conexão profissional', title: 'Marcas que ficam', summary: 'Uma proposta conceitual sobre experiência do consumidor, relacionamento e presença de marca.', tags: ['Marketing B2C', 'Experiência', 'Conceito'], context: 'Este espaço recebe uma experiência, parceria ou projeto autorizado relacionado à Nestlé. A apresentação mostra pensamento estratégico, sem afirmar uma entrega ainda não publicada.', role: 'Pesquisa, referências, construção de conceito e planejamento de comunicação.', items: ['Mapeamento de pontos de contato', 'Conceito de campanha', 'Estrutura de conteúdo por canal'] },
  cafe: { eyebrow: 'Case 03 · Projeto autoral', title: 'Café Marqueteiro', summary: 'Identidade e direção criativa para um projeto que transforma repertório em conversa.', tags: ['Direção criativa', 'Branding', 'Social'], context: 'Um exercício de branding para uma marca de conteúdo sobre marketing. A proposta explora como um conceito simples pode ganhar presença e personalidade.', role: 'Conceito, referências visuais, naming e aplicações para redes sociais.', items: ['Território visual e moodboard', 'Símbolo e assinatura', 'Adaptação para formatos digitais'] }
};
const THEMES = {
  'editorial-cacau': { name: 'Template 01 · Editorial Cacau', brand: 'ana<span>julia</span>®', profile: 'Sobre', contact: 'Vamos conversar ↗', headline: 'Marcas que<br><em>conectam.</em>', intro: 'Sou Ana Julia, estudante de Publicidade e Propaganda com foco em marketing, conteúdo e experiências que aproximam marcas e pessoas.' },
  'minimal-conexao': { name: 'Template 02 · Minimal Conexão', brand: 'ajm®', profile: 'Perfil', contact: 'Contato ↗', headline: 'Ideias que<br><em>aproximam.</em>', intro: 'Publicidade, marketing e conteúdo para construir relações relevantes entre marcas e pessoas.' },
  'social-poster': { name: 'Template 03 · Social Poster', brand: 'ana<span>julia</span>®', profile: 'Sobre', contact: 'Contato ↗', headline: 'Comunicação<br>que dá <em>match.</em>', intro: 'Sou Ana Julia. Transformo referências, conversa e estratégia em ideias com presença nas telas — e fora delas.' }
};
function header(theme) {
  return `<header class="site-header"><a class="brand" href="#/inicio">${theme.brand}</a><nav class="nav" aria-label="Navegação principal"><a href="#/inicio?sobre">${theme.profile}</a><a href="#/projetos">Projetos</a><a class="nav-cta" href="#/inicio?contato">${theme.contact}</a></nav></header>`;
}
function footer(theme, back = false) {
  if (back) return `<footer class="footer"><div class="shell"><a class="button button-dark" href="#/inicio">← Voltar ao início</a><div class="footer-bottom"><span>${theme.name}</span><a href="../../index.html">Voltar à galeria</a></div></div></footer>`;
  return `<footer class="footer" id="contato"><div class="shell"><div class="eyebrow">Próximo projeto?</div><h2>Vamos criar algo que faça sentido para as pessoas.</h2><a class="button button-dark" href="mailto:anajuliamartinezdesouza@gmail.com">Entrar em contato ↗</a><div class="footer-bottom"><span>${theme.name}</span><a href="../../index.html">Voltar à galeria</a></div></div></footer>`;
}
function homeCacau(theme) {
  return `<main><section class="hero shell"><div class="hero-grid"><div class="hero-copy"><div class="eyebrow">Publicidade · Marketing · B2C</div><h1>${theme.headline}</h1><p>${theme.intro}</p><div class="hero-actions"><a class="button button-dark" href="#/projetos">Ver projetos ↗</a><a class="button" href="#/inicio?sobre">Conhecer meu olhar</a></div></div><div class="hero-art"><div class="hero-scribble">ideias com intenção</div><div class="portrait-frame"><span class="portrait-note">São Paulo · SP</span></div><div class="stamp">estratégia<br>+ afeto</div></div></div></section><div class="tape"><span>ESTRATÉGIA</span><span>CONTEÚDO</span><span>CONEXÃO</span><span>ESTRATÉGIA</span></div>${selectedProjects()}<section class="section about" id="sobre"><div class="shell about-layout"><div><div class="eyebrow">Um pouco sobre mim</div><h2>Curiosa por natureza. Estratégica por escolha.</h2></div><div class="about-copy"><p>Eu acredito que uma boa comunicação nasce quando estratégia e sensibilidade trabalham juntas.</p>${skills()}</div></div></section></main>`;
}
function homeMinimal(theme) {
  return `<main><section class="minimal-hero shell"><div class="minimal-hero-top"><div><div class="eyebrow">Ana Julia Martinez</div><h1>${theme.headline}</h1></div><p class="intro">${theme.intro}</p></div><div class="minimal-hero-bottom"><div class="minimal-line-art"></div><div class="minimal-index">PUBLICIDADE E PROPAGANDA<br>MARKETING · B2C · SÃO PAULO, SP</div></div></section><section class="minimal-work shell"><div class="minimal-heading"><div><div class="eyebrow">Trabalhos selecionados</div><h2>O que eu construo.</h2></div><a class="button" href="#/projetos">Arquivo completo ↗</a></div><div class="minimal-grid">${minimalLinks()}</div></section><section class="section about" id="sobre"><div class="shell about-layout"><div><div class="eyebrow">Perfil</div><h2>Escuta, clareza e repertório.</h2></div><div class="about-copy"><p>Tenho interesse em entender comportamentos, organizar caminhos e criar uma comunicação que seja simples de sentir e fácil de lembrar.</p>${skills()}</div></div></section></main>`;
}
function homeSocial(theme) {
  return `<main><section class="poster-hero"><div class="eyebrow">Publicidade · Marketing · Conteúdo</div><h1>${theme.headline}</h1><p>${theme.intro}</p><div class="hero-actions"><a class="button button-dark" href="#/projetos">Ver projetos ↗</a><a class="button" href="#/inicio?sobre">Meu universo</a></div><div class="poster-shape one"></div><div class="poster-shape two"></div><span class="poster-note">São Paulo · SP / 2026</span></section><div class="social-ribbon"><span>CONTEÚDO QUE CONECTA ✦</span><span>MARCA COM PERSONALIDADE ✦</span><span>CONTEÚDO QUE CONECTA ✦</span></div><section class="social-section shell"><div class="social-section-head"><div><div class="eyebrow">Cases selecionados</div><h2>Ideias que<br>saem do feed.</h2></div><p>Projetos que misturam comunidade, branding e curiosidade por quem está do outro lado da tela.</p></div><div class="social-grid">${socialLinks()}</div></section><section class="social-about" id="sobre"><div class="shell social-about-grid"><div><div class="eyebrow">Além do layout</div><h2>Estratégia com escuta.</h2></div><div><p>Gosto de entender o que faz as pessoas pararem, sentirem e participarem. É desse encontro entre comportamento, organização e criatividade que eu quero construir minha trajetória.</p><div class="social-chips"><span>Marketing digital</span><span>Branding</span><span>Redes sociais</span><span>Experiência</span></div></div></div></section></main>`;
}
function skills() {
  return `<div class="about-list"><div class="about-row"><strong>Marketing digital</strong><span>01</span></div><div class="about-row"><strong>Branding & conteúdo</strong><span>02</span></div><div class="about-row"><strong>Experiência do consumidor</strong><span>03</span></div></div>`;
}
function selectedProjects() {
  return `<section class="section shell"><div class="section-head"><div><div class="eyebrow">Seleção de trabalhos</div><h2>Projetos<br>com propósito.</h2></div><p>Cada projeto começa com uma pergunta: como transformar uma ideia em uma experiência que alguém queira lembrar?</p></div><div class="projects-grid"><a class="project-card dark" href="#/case/publigirls"><div class="project-meta"><span>01 / Comunidade</span><span>2024</span></div><div class="project-bottom"><div><h3>Publigirls</h3><div class="project-art"><div class="wordmark">Publigirls</div></div></div><span class="arrow">↗</span></div></a><a class="project-card" href="#/case/nestle"><div class="project-meta"><span>02 / Conceito</span><span>Em construção</span></div><div class="project-bottom"><div><h3>Marcas que ficam</h3><div class="project-art"><div class="donut"></div></div></div><span class="arrow">↗</span></div></a><a class="project-card" href="#/case/cafe"><div class="project-meta"><span>03 / Branding</span><span>Autoral</span></div><div class="project-bottom"><div><h3>Café Marqueteiro</h3><div class="project-art"><div class="coffee">☕<br><small>ideias<br>à mesa</small></div></div></div><span class="arrow">↗</span></div></a><a class="project-card dark" href="#/projetos"><div class="project-meta"><span>Arquivo completo</span><span>↗</span></div><div class="project-bottom"><h3>Ver todos<br>os projetos</h3><span class="arrow">↗</span></div></a></div></section>`;
}
function minimalLinks() {
  return ['Publigirls', 'Marcas que ficam', 'Café Marqueteiro'].map((title, i) => `<a class="minimal-card" href="#/case/${['publigirls', 'nestle', 'cafe'][i]}"><span>0${i + 1}</span><strong>${title}</strong><span>${['Comunidade, conteúdo e conexão.', 'Experiência e marketing B2C.', 'Branding e direção criativa.'][i]}</span><i>↗</i></a>`).join('');
}
function socialLinks() {
  return ['Publigirls', 'Marcas que ficam', 'Café Marqueteiro'].map((title, i) => `<a class="social-card" href="#/case/${['publigirls', 'nestle', 'cafe'][i]}"><span class="number">0${i + 1} / ${['Comunidade', 'Conceito B2C', 'Branding'][i]}</span><span class="social-symbol">${['✦', '●', '☕'][i]}</span><h3>${title}</h3></a>`).join('');
}
function filters() {
  return `<div class="filter-bar"><button class="filter active" data-filter="todos">Todos</button><button class="filter" data-filter="branding">Branding</button><button class="filter" data-filter="conteudo">Conteúdo</button><button class="filter" data-filter="estrategia">Estratégia</button></div>`;
}
function cards() {
  return `<a class="archive-card" data-category="branding conteudo estrategia" style="background:var(--cacao);color:var(--paper)" href="#/case/publigirls"><span class="tag">Branding · Comunidade</span><h2 style="color:var(--paper)">Publigirls</h2><p>Identidade e estratégia de conteúdo para uma comunidade de mulheres da comunicação.</p><div class="project-art"><div class="wordmark">Publigirls</div></div></a><a class="archive-card" data-category="estrategia conteudo" style="background:var(--rose)" href="#/case/nestle"><span class="tag">Marketing B2C · Conceito</span><h2>Marcas que ficam</h2><p>Espaço reservado para uma experiência ou parceria autorizada relacionada à Nestlé.</p><div class="project-art"><div class="donut"></div></div></a><a class="archive-card" data-category="branding" style="background:var(--paper-2)" href="#/case/cafe"><span class="tag">Branding · Autoral</span><h2>Café Marqueteiro</h2><p>Direção criativa para um projeto de conteúdo sobre comunicação e marketing.</p><div class="project-art"><div class="coffee">☕<br><small>ideias<br>à mesa</small></div></div></a><div class="archive-card" data-category="estrategia" style="background:var(--caramel);color:var(--paper)"><span class="tag">Em breve</span><h2 style="color:var(--paper)">A próxima ideia.</h2><p>Um novo case pode entrar neste arquivo assim que houver materiais e resultados para contar.</p></div>`;
}
function projects(theme) {
  return `<main class="shell"><section class="page-intro"><div class="eyebrow">Arquivo de projetos</div><h1>Ideias em<br><em>movimento.</em></h1><p>Uma seleção de trabalhos, estudos e projetos autorais que mostram como eu penso, organizo e conto histórias de marca.</p></section>${filters()}<section class="archive-grid">${cards()}</section></main>`;
}
function caseScreen(slug) {
  const item = CASES[slug] || CASES.publigirls;
  return `<section class="case-hero"><div class="shell"><div class="eyebrow">${item.eyebrow}</div><h1>${item.title}</h1><p>${item.summary}</p><div class="case-meta">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div></div></section><main class="shell case-body"><div><div class="case-section"><h3>Contexto</h3><p>${item.context}</p></div><div class="case-section"><h3>Minha atuação</h3><p>${item.role}</p></div><div class="case-section"><h3>Entregas</h3><ul>${item.items.map((itemText) => `<li>${itemText}</li>`).join('')}</ul></div></div><div class="case-visual"><div class="visual-card"><span class="tag">Direção de projeto</span><h3>${item.title}</h3><p>Uma narrativa visual construída para aproximar pessoas, ideias e marcas.</p></div></div></main>`;
}
function parseRoute() {
  const [path, query = ''] = (location.hash.replace('#', '') || '/inicio').split('?');
  const parts = path.split('/').filter(Boolean);
  return { page: parts[0] || 'inicio', slug: parts[1], query: new URLSearchParams(query) };
}
function bindFilters(root) {
  const buttons = root.querySelectorAll('[data-filter]');
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    root.querySelectorAll('[data-category]').forEach((card) => card.classList.toggle('is-hidden', button.dataset.filter !== 'todos' && !card.dataset.category.includes(button.dataset.filter)));
  }));
}
function render() {
  const root = document.querySelector('[data-template-root]');
  const theme = THEMES[document.body.dataset.template];
  if (!root || !theme) return;
  const route = parseRoute();
  let body = route.page === 'projetos' ? projects(theme) : route.page === 'case' ? caseScreen(route.slug) : document.body.dataset.template === 'minimal-conexao' ? homeMinimal(theme) : document.body.dataset.template === 'social-poster' ? homeSocial(theme) : homeCacau(theme);
  root.innerHTML = header(theme) + body + footer(theme, route.page !== 'inicio');
  document.title = route.page === 'case' ? `${(CASES[route.slug] || CASES.publigirls).title} — ${theme.name}` : theme.name;
  bindFilters(root);
  const id = route.query.has('sobre') ? 'sobre' : route.query.has('contato') ? 'contato' : null;
  if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }));
}
if (document.querySelector('[data-template-root]')) {
  addEventListener('hashchange', render);
  render();
}
