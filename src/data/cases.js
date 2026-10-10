import publigirlsImg from '../assets/publigirls.jpeg'
import marcasqficamImg from '../assets/cafemarqueteiro/reforcamentoCafeMarqueteiro/marcairresisstivel.jpeg'
import cafeLogoImg from '../assets/cafemarqueteiro/cafemarqueteiro.jpeg'
import cafeFeedImg from '../assets/cafemarqueteiro/feedcafe/excelenciapost.jpeg'

export const CASES = {
  publigirls: {
    slug: 'publigirls',
    thumb: publigirlsImg,
    images: [
      { src: publigirlsImg, alt: 'Publigirls — identidade visual da comunidade' },
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
    thumb: marcasqficamImg,
    images: [
      { src: marcasqficamImg, alt: 'Marcas que ficam — peça gráfica promocional' },
    ],
    eyebrow: 'Case 02 · Conceito B2C · Em construção',
    title: 'Marcas que ficam',
    description: 'Estudo conceitual de marketing B2C inspirado em experiências de marca.',
    tags: ['Marketing B2C', 'Estratégia', 'Conceito'],
    category: 'Estratégia',
    context: 'Conexão profissional com o universo Nestlé. Este espaço está reservado para uma experiência autorizada — conteúdo, vínculo e permissão de uso em confirmação.',
    role: 'Pesquisa, análise de comportamento do consumidor e desenvolvimento de conceito estratégico.',
    bullets: [
      'Estudo de experiência de marca',
      'Análise de público B2C',
      'Desenvolvimento de conceito criativo',
    ],
    note: 'Projeto conceitual. A relação com a Nestlé não representa parceria ou campanha oficial. Conteúdo pendente de autorização.',
    dark: false,
  },
  cafe: {
    slug: 'cafe',
    thumb: cafeLogoImg,
    images: [
      { src: cafeLogoImg, alt: 'Café Marqueteiro — logotipo' },
      { src: cafeFeedImg, alt: 'Café Marqueteiro — post de feed' },
    ],
    eyebrow: 'Case 03 · Branding · Autoral',
    title: 'Café Marqueteiro',
    description: 'Projeto autoral de branding e direção criativa para uma marca conceitual.',
    tags: ['Branding', 'Autoral', 'Direção criativa'],
    category: 'Branding',
    context: 'Projeto conceitual criado para explorar naming, identidade visual e construção de presença de marca.',
    role: 'Criação do conceito, naming, direção de comunicação e desenvolvimento da identidade.',
    bullets: [
      'Naming e conceito de marca',
      'Identidade visual e tom de voz',
      'Direção criativa para conteúdo',
    ],
    note: 'Projeto autoral / acadêmico. Criado para exercitar construção de marca.',
    dark: false,
  },
};

export const CASES_LIST = Object.values(CASES);

export const CATEGORIES = ['Todos', 'Comunidade', 'Branding', 'Estratégia', 'Conteúdo'];
