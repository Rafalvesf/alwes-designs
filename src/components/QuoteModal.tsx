import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X, Minus, Plus, Send } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import {
  BASE_FEATURES,
  BASE_PRICE,
  CONTACT_EMAIL,
  MAINTENANCE_PLANS,
  MODULE_CATEGORIES,
} from '../data/pricing';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface SelectedModule {
  qty: number;
}

const MOCKUP_STYLES = [
  {
    id: 'minimal',
    label: 'Minimalista',
    description: 'Espaço em branco, tipografia limpa, foco no essencial.',
    preview: 'bg-gradient-to-br from-[#f5f4ee] to-[#dedbc8]',
  },
  {
    id: 'bold',
    label: 'Bold & Vibrante',
    description: 'Cores fortes, contraste alto, personalidade marcada.',
    preview: 'bg-gradient-to-br from-fuchsia-600 via-orange-500 to-amber-400',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    description: 'Sóbrio, profissional, direcionado a negócios.',
    preview: 'bg-gradient-to-br from-slate-700 to-blue-950',
  },
  {
    id: 'editorial',
    label: 'Editorial',
    description: 'Layout expressivo, tipografia forte, estilo de revista.',
    preview: 'bg-gradient-to-br from-stone-800 via-amber-800 to-stone-900',
  },
];

export default function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal();

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [needs, setNeeds] = useState('');
  const [selected, setSelected] = useState<Record<string, SelectedModule>>({});
  const [maintenanceId, setMaintenanceId] = useState<string | null>(null);
  const [mockupId, setMockupId] = useState<string | null>(null);
  const [customVision, setCustomVision] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const allModules = useMemo(() => MODULE_CATEGORIES.flatMap((c) => c.modules), []);

  const selectedList = useMemo(
    () =>
      Object.entries(selected)
        .map(([id, { qty }]) => {
          const module = allModules.find((m) => m.id === id);
          if (!module) return null;
          return { ...module, qty, total: module.price * qty };
        })
        .filter((m): m is NonNullable<typeof m> => m !== null),
    [selected, allModules]
  );

  const modulesTotal = selectedList.reduce((sum, m) => sum + m.total, 0);
  const estimatedTotal = BASE_PRICE + modulesTotal;
  const maintenancePlan = MAINTENANCE_PLANS.find((p) => p.id === maintenanceId) ?? null;

  const toggleModule = (id: string) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = { qty: 1 };
      }
      return next;
    });
  };

  const setQty = (id: string, qty: number) => {
    setSelected((prev) => ({ ...prev, [id]: { qty: Math.max(1, qty) } }));
  };

  const resetForm = () => {
    setCompanyName('');
    setContactName('');
    setNeeds('');
    setSelected({});
    setMaintenanceId(null);
    setMockupId(null);
    setCustomVision('');
  };

  const handleClose = () => {
    closeModal();
  };

  const canSubmit = companyName.trim() !== '' && contactName.trim() !== '';

  const handleSubmit = () => {
    if (!canSubmit) return;

    const subject = `Pedido de orçamento — ${companyName}`;

    const lines = [
      `Empresa: ${companyName}`,
      `Contacto: ${contactName}`,
      '',
      'O que procuram:',
      needs.trim() || '(não especificado)',
    ];

    if (mockupId === 'custom') {
      lines.push('', 'Estilo visual:', `Personalizado — ${customVision.trim() || '(não especificado)'}`);
    } else if (mockupId) {
      const style = MOCKUP_STYLES.find((s) => s.id === mockupId);
      if (style) lines.push('', 'Estilo visual:', style.label);
    }

    lines.push('', `Base website: ${BASE_PRICE}€`);

    if (selectedList.length > 0) {
      lines.push('', 'Módulos selecionados:');
      selectedList.forEach((m) => {
        const qtyLabel = m.unit !== 'fixed' && m.qty > 1 ? ` x${m.qty}` : '';
        lines.push(`- ${m.label}${qtyLabel}: ${m.total}€`);
      });
    }

    lines.push(
      '',
      maintenancePlan
        ? `Total estimado: ${estimatedTotal}€ pagamento único + ${maintenancePlan.price}€/mês em manutenção (${maintenancePlan.label}) — valores sujeitos a confirmação`
        : `Total estimado: ${estimatedTotal}€ pagamento único (valores sujeitos a confirmação)`
    );

    const body = lines.join('\n');
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    resetForm();
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onWheel={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

          <motion.div
            onWheel={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl md:rounded-[2rem] bg-[#101010] p-6 sm:p-10 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 flex items-center justify-center w-8 h-8 rounded-full bg-[#212121] text-white hover:bg-[#2a2a2a] transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest">
              Pedido de orçamento
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl text-white leading-tight">
              Vamos perceber o que precisa.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Preencha os dados abaixo. Se souber já quais os módulos que precisa, selecione-os
              para termos uma estimativa — os valores finais são sempre confirmados depois de
              percebermos o projeto.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs sm:text-sm text-gray-400" htmlFor="companyName">
                  Nome da empresa
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ex: Alwes Lda."
                  className="mt-1.5 w-full rounded-xl bg-[#212121] px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-400" htmlFor="contactName">
                  Com quem falo?
                </label>
                <input
                  id="contactName"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="O seu nome"
                  className="mt-1.5 w-full rounded-xl bg-[#212121] px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm text-gray-400" htmlFor="needs">
                  O que procuram?
                </label>
                <textarea
                  id="needs"
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                  rows={3}
                  placeholder="Conte-nos um pouco sobre o projeto e o que precisam."
                  className="mt-1.5 w-full rounded-xl bg-[#212121] px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                />
              </div>
            </div>

            <div className="mt-8">
              <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest">
                Estilo visual (opcional)
              </span>
              <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
                Escolha uma direção visual ou descreva a sua própria visão.
              </p>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MOCKUP_STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setMockupId(style.id)}
                    className={`text-left rounded-xl overflow-hidden bg-[#212121] border transition-colors ${
                      mockupId === style.id ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <div className={`h-16 sm:h-20 ${style.preview}`} />
                    <div className="p-2.5">
                      <span className="text-[11px] sm:text-xs text-white">{style.label}</span>
                      <p className="mt-0.5 text-[10px] sm:text-[11px] text-gray-500 leading-snug">
                        {style.description}
                      </p>
                    </div>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setMockupId('custom')}
                  className={`text-left rounded-xl overflow-hidden bg-[#212121] border transition-colors ${
                    mockupId === 'custom' ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <div className="h-16 sm:h-20 flex items-center justify-center border-b border-dashed border-gray-700">
                    <Plus className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="p-2.5">
                    <span className="text-[11px] sm:text-xs text-white">Personalizado</span>
                    <p className="mt-0.5 text-[10px] sm:text-[11px] text-gray-500 leading-snug">
                      Escreva a sua própria visão.
                    </p>
                  </div>
                </button>
              </div>

              {mockupId === 'custom' && (
                <textarea
                  value={customVision}
                  onChange={(e) => setCustomVision(e.target.value)}
                  rows={3}
                  placeholder="Descreva a visão que tem para o website: referências, cores, sensação que quer transmitir..."
                  className="mt-3 w-full rounded-xl bg-[#212121] px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                />
              )}
            </div>

            <div className="mt-8">
              <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest">
                Gerador de orçamento (opcional)
              </span>
              <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
                Website base — {BASE_PRICE}€. Selecione módulos adicionais para estimar o
                projeto.
              </p>

              <div className="mt-3 rounded-xl bg-[#212121] px-4 py-3">
                <span className="text-[11px] sm:text-xs text-gray-500">Já incluído na base:</span>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {BASE_FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-400"
                    >
                      <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-y-5">
                {MODULE_CATEGORIES.map((category) => (
                  <div key={category.id}>
                    <h4 className="text-xs sm:text-sm text-gray-400">{category.label}</h4>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {category.modules.map((module) => {
                        const isSelected = Boolean(selected[module.id]);
                        const qty = selected[module.id]?.qty ?? 1;
                        return (
                          <div
                            key={module.id}
                            className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm transition-colors cursor-pointer ${
                              isSelected ? 'bg-primary/10 text-white' : 'bg-[#212121] text-gray-400'
                            }`}
                            onClick={() => toggleModule(module.id)}
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <span
                                className={`shrink-0 w-3.5 h-3.5 rounded-sm border ${
                                  isSelected ? 'bg-primary border-primary' : 'border-gray-600'
                                }`}
                              />
                              <span className="truncate">{module.label}</span>
                            </span>

                            <span className="flex items-center gap-2 shrink-0">
                              {isSelected && module.unit !== 'fixed' && (
                                <span
                                  className="flex items-center gap-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    type="button"
                                    onClick={() => setQty(module.id, qty - 1)}
                                    className="flex items-center justify-center w-5 h-5 rounded bg-[#2a2a2a] text-gray-300 hover:text-white"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-4 text-center">{qty}</span>
                                  <button
                                    type="button"
                                    onClick={() => setQty(module.id, qty + 1)}
                                    className="flex items-center justify-center w-5 h-5 rounded bg-[#2a2a2a] text-gray-300 hover:text-white"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </span>
                              )}
                              <span className="text-gray-500 whitespace-nowrap">
                                +{module.price}€{module.unit === 'idioma' ? '/idioma' : ''}
                                {module.unit === 'pagina' ? '/página' : ''}
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest">
                Manutenção mensal (opcional)
              </span>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMaintenanceId(null)}
                  className={`text-left rounded-xl px-4 py-3 text-xs sm:text-sm transition-colors ${
                    maintenanceId === null
                      ? 'bg-primary/10 text-white'
                      : 'bg-[#212121] text-gray-400'
                  }`}
                >
                  Sem manutenção
                </button>
                {MAINTENANCE_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setMaintenanceId(plan.id)}
                    className={`text-left rounded-xl px-4 py-3 text-xs sm:text-sm transition-colors ${
                      maintenanceId === plan.id
                        ? 'bg-primary/10 text-white'
                        : 'bg-[#212121] text-gray-400'
                    }`}
                  >
                    <span className="block">
                      {plan.label} — {plan.price}€/mês
                    </span>
                    <span className="block mt-1 text-[11px] text-gray-500 leading-snug">
                      {plan.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-[#212121] px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-400">Estimativa do projeto</span>
                <span className="text-lg sm:text-xl text-white">
                  {estimatedTotal}€
                  {maintenancePlan && (
                    <span className="text-sm sm:text-base text-gray-400"> + {maintenancePlan.price}€/mês</span>
                  )}
                </span>
              </div>
              {maintenancePlan && (
                <p className="mt-2 pt-2 border-t border-white/10 text-[11px] sm:text-xs text-gray-500 text-right">
                  {estimatedTotal}€ pagamento único (website + módulos) + {maintenancePlan.price}€/mês em
                  manutenção ({maintenancePlan.label})
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="group mt-6 inline-flex items-center justify-center gap-2 bg-primary rounded-full pl-6 pr-2 py-2 w-full transition-all hover:gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="text-black font-medium text-sm sm:text-base">Enviar pedido</span>
              <span className="flex items-center justify-center bg-black rounded-full w-9 h-9 transition-transform group-hover:scale-110">
                <Send className="w-4 h-4 text-white" />
              </span>
            </button>
            {!canSubmit && (
              <p className="mt-2 text-[11px] text-gray-600 text-center">
                Preencha o nome da empresa e o seu nome para enviar.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
