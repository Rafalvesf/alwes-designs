export const CONTACT_EMAIL = 'rafaalves2mil1@gmail.com';

export const BASE_PRICE = 790;

export const BASE_FEATURES = [
  '1–3 páginas',
  'Até 3 secções por página',
  'Design personalizado',
  'Mobile responsive',
  'SEO base',
  'Analytics',
  'Formulário de contacto',
  'Links para redes sociais',
  'Alterações incluídas',
  'Publicação',
];

export type ModuleUnit = 'fixed' | 'idioma' | 'pagina';

export interface PricingModule {
  id: string;
  label: string;
  price: number;
  unit: ModuleUnit;
}

export interface PricingCategory {
  id: string;
  label: string;
  modules: PricingModule[];
}

export const MODULE_CATEGORIES: PricingCategory[] = [
  {
    id: 'principais',
    label: 'Módulos principais',
    modules: [
      { id: 'pagina-adicional', label: 'Página adicional', price: 200, unit: 'fixed' },
      { id: 'landing-page', label: 'Landing Page', price: 300, unit: 'fixed' },
      { id: 'booking', label: 'Booking / Reservas', price: 450, unit: 'fixed' },
      { id: 'booking-avancado', label: 'Booking avançado', price: 750, unit: 'fixed' },
      { id: 'ecommerce', label: 'E-commerce', price: 900, unit: 'fixed' },
      { id: 'ecommerce-avancado', label: 'E-commerce avançado', price: 1500, unit: 'fixed' },
      { id: 'area-cliente', label: 'Área de cliente / Login', price: 500, unit: 'fixed' },
      { id: 'crm', label: 'CRM', price: 600, unit: 'fixed' },
      { id: 'blog', label: 'Blog / Notícias', price: 300, unit: 'fixed' },
      { id: 'area-membros', label: 'Área de membros', price: 700, unit: 'fixed' },
      { id: 'multilingue', label: 'Multilingue', price: 250, unit: 'idioma' },
      { id: 'pagamentos', label: 'Pagamentos online', price: 300, unit: 'fixed' },
    ],
  },
  {
    id: 'marketing-seo',
    label: 'Marketing & SEO',
    modules: [
      { id: 'seo-avancado', label: 'SEO avançado', price: 400, unit: 'fixed' },
      { id: 'seo-tecnico', label: 'SEO técnico', price: 350, unit: 'fixed' },
      { id: 'analytics-avancado', label: 'Google Analytics + tracking avançado', price: 200, unit: 'fixed' },
      { id: 'search-console', label: 'Google Search Console + configuração', price: 150, unit: 'fixed' },
      { id: 'performance', label: 'Performance / Core Web Vitals', price: 300, unit: 'fixed' },
      { id: 'copywriting', label: 'Copywriting', price: 200, unit: 'pagina' },
      { id: 'blog-seo', label: 'Blog + estrutura SEO', price: 400, unit: 'fixed' },
    ],
  },
  {
    id: 'integracoes',
    label: 'Integrações & automações',
    modules: [
      { id: 'whatsapp', label: 'WhatsApp / contacto avançado', price: 150, unit: 'fixed' },
      { id: 'newsletter', label: 'Newsletter / Email marketing', price: 250, unit: 'fixed' },
      { id: 'automacoes', label: 'Automações', price: 400, unit: 'fixed' },
      { id: 'api-externa', label: 'Integração com API externa', price: 500, unit: 'fixed' },
      { id: 'software-externo', label: 'Integração com software externo', price: 400, unit: 'fixed' },
      { id: 'crm-integracao', label: 'CRM + integração', price: 750, unit: 'fixed' },
      { id: 'notificacoes', label: 'Sistema de notificações', price: 300, unit: 'fixed' },
      { id: 'formularios-avancados', label: 'Formulários avançados', price: 200, unit: 'fixed' },
    ],
  },
  {
    id: 'adicionais',
    label: 'Funcionalidades adicionais',
    modules: [
      { id: 'galeria', label: 'Galeria / Portfólio avançado', price: 250, unit: 'fixed' },
      { id: 'avaliacoes', label: 'Sistema de avaliações', price: 150, unit: 'fixed' },
      { id: 'mapa', label: 'Mapa / localização avançada', price: 150, unit: 'fixed' },
      { id: 'chat', label: 'Chat / Live Chat', price: 150, unit: 'fixed' },
      { id: 'redes-sociais', label: 'Integração de redes sociais', price: 100, unit: 'fixed' },
      { id: 'pesquisa-interna', label: 'Pesquisa interna', price: 250, unit: 'fixed' },
      { id: 'filtros', label: 'Filtros / pesquisa avançada', price: 400, unit: 'fixed' },
      { id: 'dashboard', label: 'Dashboard personalizado', price: 750, unit: 'fixed' },
      { id: 'funcionalidade-custom', label: 'Funcionalidade personalizada', price: 500, unit: 'fixed' },
    ],
  },
];

export interface MaintenancePlan {
  id: string;
  label: string;
  price: number;
  description: string;
  features: string[];
}

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'managed',
    label: 'Managed Website',
    price: 79,
    description: 'O essencial para manter o website seguro, atualizado e online.',
    features: [
      'Hosting',
      'SSL',
      'Backups',
      'Atualizações técnicas',
      'Monitorização',
      'Pequenas alterações incluídas',
      'Suporte',
    ],
  },
  {
    id: 'managed-plus',
    label: 'Managed Plus',
    price: 149,
    description: 'Mais acompanhamento para websites que estão em constante evolução.',
    features: [
      'Tudo do Managed Website',
      'Alterações regulares incluídas',
      'Monitorização avançada',
      'Otimização de performance',
      'SEO básico contínuo',
      'Melhorias contínuas',
    ],
  },
];
