import publigirlsImg from '../assets/publigirls.webp'

import cafeBannerImg from '../myprojects/cafemarqueteiro/banner.webp'
import cafeLogoImg from '../myprojects/cafemarqueteiro/logo/cafemarqueteiro.webp'
import cafeExcelenciaImg from '../myprojects/cafemarqueteiro/excelencia/excelenciapost.webp'
import cafeOportunidadeImg from '../myprojects/cafemarqueteiro/oprtunidadeunica/oportunidade.webp'
import cafeReforcoImg from '../myprojects/cafemarqueteiro/reforcoidentidade/reforcoidentidade.webp'

import perfumeImg from '../myprojects/academy/perfume/perfume.webp'
import palestraLogoImg from '../myprojects/palestra/logo.webp'

const _palestraGlob = import.meta.glob('../myprojects/palestra/img*.webp', { eager: true })
const palestraImages = Object.entries(_palestraGlob)
  .sort(([a], [b]) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
  .map(([_, m], i) => ({ src: m.default, alt: `Palestra - imagem ${i + 1}` }))

export const CASES = {
  cafe: {
    slug: 'cafe',
    banner: {
      src: cafeBannerImg,
      caption: 'Peças visuais desenvolvidas com atenção à composição, tipografia e paleta de cores - alinhadas à identidade da marca.',
    },
    thumb: cafeLogoImg,
    images: [
      { src: cafeLogoImg, alt: 'Café Marqueteiro - logotipo', fit: 'cover', caption: 'Logotipo criado em 2025 para marcar o início da carreira na área de comunicação e design gráfico. A marca combina o símbolo de um alto-falante com uma xícara de café, unindo o universo do marketing, da difusão de ideias e da energia da criação de conteúdo.' },
      { src: cafeExcelenciaImg, alt: 'Café Marqueteiro - post excelência', caption: 'Arte para o feed com foco na divulgação de sessão de branding personalizada. Apelo visual gastronômico e chamada para ação direta para atrair novos clientes.' },
      { src: cafeOportunidadeImg, alt: 'Café Marqueteiro - post oportunidade única', caption: 'Peça para atrair pequenos negócios para a construção de portfólio por meio de serviços de marketing gratuitos, com vagas limitadas. Comunicação persuasiva, hierarquia visual e identidade de marca em formato de feed.' },
      { src: cafeReforcoImg, alt: 'Café Marqueteiro - post reforço de identidade', caption: 'Arte focada na divulgação de serviços de comunicação com chamada para ação que direciona o público para o texto completo. Contraste tipográfico entre letra preenchida e vazada.' },
    ],
    eyebrow: 'Case 02 · Branding · Autoral',
    title: 'Café Marqueteiro',
    description: 'Projeto autoral de branding e direção criativa para uma marca conceitual de comunicação.',
    tags: ['Branding', 'Autoral', 'Direção criativa'],
    category: 'Branding',
    context: 'Projeto conceitual criado para explorar naming, identidade visual e construção de presença de marca - unindo o universo do marketing com a estética do café.',
    role: 'Criação do conceito, naming, logotipo, direção de comunicação e desenvolvimento das peças gráficas para feed.',
    bullets: [
      'Naming e conceito de marca',
      'Identidade visual e logotipo',
      'Tom de voz e direção criativa',
      'Produção de peças para feed',
    ],
    note: 'Projeto autoral / acadêmico. Criado para exercitar construção de marca.',
    dark: false,
  },
  palestra: {
    slug: 'palestra',
    thumb: palestraLogoImg,
    images: palestraImages,
    eyebrow: 'Case 03 · Extensão · Acadêmico',
    title: 'Conectados com Consciência',
    description: 'Palestra de extensão sobre segurança digital e uso responsável da internet para estudantes de escola pública.',
    tags: ['Extensão', 'Acadêmico', 'Educação', 'Conteúdo'],
    category: 'Extensão',
    context: 'Projeto de extensão do curso de Publicidade e Propaganda, apresentado voluntariamente a adolescentes de uma escola pública. O desafio foi transformar temas sensíveis - saúde mental, cyberbullying, fake news - em conteúdo claro e engajador.',
    role: 'Pesquisa, desenvolvimento do conteúdo, criação da apresentação visual e facilitação da dinâmica com o público.',
    bullets: [
      'Curadoria de conteúdo sobre segurança digital',
      'Criação de apresentação visual acessível',
      'Linguagem adaptada ao público adolescente',
      'Dinâmica de interação e perguntas ao público',
      'Divulgação de canais de apoio (CVV, Disque 100)',
    ],
    note: null,
    dark: false,
  },
  perfume: {
    slug: 'perfume',
    thumb: perfumeImg,
    images: [
      { src: perfumeImg, alt: 'Essência & Identidade - marca de perfumaria' },
    ],
    eyebrow: 'Case 04 · Branding · Acadêmico',
    title: 'Essência & Identidade',
    description: 'Marca conceitual de perfumaria desenvolvida na faculdade, explorando identidade visual sofisticada e elegante.',
    tags: ['Branding', 'Acadêmico', 'Identidade Visual'],
    category: 'Branding',
    context: 'Projeto fictício desenvolvido para a faculdade com foco na criação de uma marca de perfumaria sofisticada. A proposta explora a identidade visual, a estética dos frascos e a harmonia entre cores e materiais.',
    role: 'Criação do conceito de marca, direção de identidade visual, definição de paleta, tipografia e estética geral.',
    bullets: [
      'Conceito de marca e posicionamento',
      'Identidade visual e paleta de cores',
      'Estética de frascos e embalagem',
      'Harmonia entre delicadeza, exclusividade e refinamento',
    ],
    note: 'Projeto acadêmico / fictício.',
    dark: false,
  },
  publigirls: {
    slug: 'publigirls',
    thumb: publigirlsImg,
    images: [
      { src: publigirlsImg, alt: 'Publigirls - identidade visual da comunidade' },
    ],
    eyebrow: 'Case 01 · Comunidade · 2024',
    title: 'Publigirls',
    description: 'Comunidade criada para conectar e apoiar mulheres da área de comunicação.',
    tags: ['Branding', 'Comunidade', 'Conteúdo'],
    category: 'Comunidade',
    context: 'Mulheres da área de comunicação precisam de espaços de troca, apoio e circulação de oportunidades. A Publigirls nasce dessa necessidade.',
    role: 'Fundadora. Responsável pela criação do conceito, direção de comunicação, produção de conteúdo e articulação da rede.',
    bullets: [
      'Criação da identidade e naming',
      'Estratégia de conteúdo para redes sociais',
      'Organização e moderação da comunidade',
      'Articulação de networking e divulgação de oportunidades',
    ],
    note: null,
    dark: true,
  },
  nestle: {
    slug: 'nestle',
    thumb: null,
    images: [],
    eyebrow: 'Case 05 · Experiência profissional · Atendimento de marca',
    title: 'Marcas que ficam',
    description: 'Atendimento na área de comunicação para marcas do grupo Nestlé, com foco em reclamações e recuperação de confiança.',
    tags: ['Atendimento', 'Comunicação de marca', 'Tom de voz'],
    category: 'Estratégia',
    context: 'Atuação no atendimento de comunicação para Nestlé, Garoto, KitKat e Nestlé Chocolates. A linha de frente era o contato com o consumidor insatisfeito - feedbacks negativos e reclamações - onde cada resposta precisava resolver o problema e, ao mesmo tempo, soar como a marca.',
    role: 'Atendimento ao consumidor na área de comunicação: tratamento de reclamações e feedbacks negativos, sugestão de produtos e adequação da resposta ao tom de voz de cada marca.',
    bullets: [
      'Tratamento de reclamações e feedbacks negativos',
      'Adequação do discurso ao tom de voz de cada marca (Nestlé, Garoto, KitKat)',
      'Sugestão e recomendação de produtos ao consumidor',
      'Escuta ativa e recuperação da relação com o cliente',
    ],
    note: 'Experiência de atendimento junto a marcas do grupo. As marcas citadas são referência de atuação profissional, não parceria ou campanha oficial.',
    dark: false,
  },
}

export const CASES_LIST = [CASES.publigirls, CASES.cafe, CASES.palestra, CASES.perfume]

export const CATEGORIES = ['Todos', 'Branding', 'Comunidade', 'Extensão', 'Estratégia']
