
import React, { useState, useEffect } from 'react';
import FotoPersonal from "./assets/foto-personal.jpg";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  animate
} from 'framer-motion';
import { 
  Dumbbell,   
  Flame, 
  Target, 
  Users, 
  ChevronRight, 
  Instagram, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Menu,
  X
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Control background transparency/padding
      setIsScrolled(currentScrollY > 50);

      // Control Hide/Show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 w-full z-50 bg-dark border-b border-white/5 transition-all duration-300 ${isScrolled ? 'py-4 shadow-2xl shadow-brand/10' : 'py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center w-full">
        <a href="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Zap className="text-brand fill-brand" size={28} />
          IRON<span className="text-brand">GLOW</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest ml-auto">
          {['Sobre', 'Resultados', 'Planos', 'Galeria'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-brand transition-colors">
              {item}
            </a>
          ))}
          <a href="#contato" className="ml-4 px-7 py-3 border border-brand text-brand hover:bg-brand hover:text-dark transition-all duration-300 rounded-full uppercase tracking-wider text-xs font-bold shadow-[0_0_20px_rgba(57,255,20,0.15)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:scale-105">
            Agendar Agora
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-dark border-b border-white/10 flex flex-col overflow-hidden md:hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {['Sobre', 'Resultados', 'Planos', 'Galeria'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-lg font-bold uppercase tracking-widest hover:text-brand"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contato" 
                className="w-full text-center py-4 bg-brand text-dark font-black uppercase tracking-widest rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Agendar Agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;

  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.match(/[a-zA-Z%]+$/)?.[0] || '';

  const count = useMotionValue(0);

  const [display, setDisplay] = useState(0);

  useMotionValueEvent(count, "change", (latest) => {
    if (suffix === 'k' && value.includes('.')) {
      setDisplay(Number(latest.toFixed(1)));
    } else {
      setDisplay(Math.round(latest));
    }
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });

      return controls.stop;
    }
  }, [isInView]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
const StatItem = ({ label, value, icon: Icon }: { label: string, value: string, icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center p-6 glass rounded-xl text-center"
  >
    <Icon className="text-brand mb-4" size={32} />
    <span className="text-4xl font-black mb-1">
      <Counter value={value} />
    </span>
    <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">{label}</span>
  </motion.div>
);

const PlanCard = ({ title, price, features, highlighted = false }: { title: string, price: string, features: string[], highlighted?: boolean }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`p-8 rounded-2xl flex flex-col relative overflow-hidden transition-all duration-500 ring-1 ${highlighted ? 'bg-brand/5 ring-brand shadow-[0_0_40px_rgba(57,255,20,0.1)]' : 'bg-surface ring-white/10'}`}
  >
    {highlighted && (
      <div className="absolute top-4 -right-7.5 bg-brand text-dark text-[10px] font-black py-1 px-10 rotate-45 uppercase">
        Popular
      </div>
    )}
    <h3 className="text-2xl mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-xl text-brand font-bold">R$</span>
      <span className="text-5xl font-black">{price}</span>
      <span className="text-gray-500 text-sm">/mês</span>
    </div>
    <ul className="space-y-4 mb-10 grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
          <CheckCircle2 className="text-brand shrink-0" size={18} />
          {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 font-black uppercase text-xs tracking-widest transition-all ${highlighted ? 'bg-brand text-dark hover:scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}>
      Selecionar Plano
    </button>
  </motion.div>
);

// --- App Component ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Treino Intenso background"
            className="w-full h-full object-cover object-center opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette rather than heavy top/bottom cuts */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,13,13,0.4)_50%,rgba(13,13,13,0.9)_100%)]" />
          <div className="absolute inset-0 bg-linear-to-b from-dark/80 via-transparent to-dark" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1 border border-brand text-brand text-[10px] font-black tracking-widest uppercase mb-6 rounded-full">
              Elite Performance Coaching
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-7xl mb-8 leading-none max-w-4xl mx-auto">
              Transforme Seu <span className="text-brand">Corpo</span> e Sua <span className="italic">Mentalidade</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Descubra o treinamento que une ciência, disciplina e os melhores resultados do mercado fitness premium.
            </p>
            <motion.a 
              href="#contato"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-neon inline-flex items-center gap-3"
            >
              Começar Agora <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 p-2 border border-white/20 rounded-full"
        >
          <div className="w-1 h-3 bg-brand rounded-full mx-auto" />
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-dark relative border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatItem label="Alunos Transformados" value="+200" icon={Users} />
            <StatItem label="Anos de Experiência" value="+5" icon={Award} />
            <StatItem label="Satisfação Real" value="98%" icon={Target} />
            <StatItem label="Gordura Perdida (kg)" value="+1.5k" icon={Flame} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-32 bg-dark">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand/20 blur-[100px] -z-10" />
              <img 
                src={FotoPersonal} 
                alt="Personal Trainer"
                className="rounded-3xl shadow-2xl brightness-90 saturate-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-2xl hidden md:block">
                <span className="text-brand font-black text-2xl">MARCOS</span>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Head Coach & Founder</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand font-bold text-xs uppercase tracking-[0.4em] mb-4 block">A Mente por trás da Marca</span>
              <h2 className="text-4xl md:text-6xl mb-8">Forja de <span className="text-brand">Campeões</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Com mais de meia década dedicados ao alto rendimento, minha missão é elevar o padrão do seu treino. 
                Não trabalhamos apenas músculos; construímos resiliência, estética e saúde funcional.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Emagrecimento', desc: 'Protocolos de oxidação lipídica acelerada.' },
                  { title: 'Hipertrofia', desc: 'Sinalização hipertrófica baseada em ciência.' },
                  { title: 'Online Coaching', desc: 'Acompanhamento 24/7 de qualquer lugar do mundo.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                      <Target className="text-brand" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 uppercase">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="resultados" className="py-32 bg-surface">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl mb-4">Provas <span className="text-brand italic">Reais</span></h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs">Transformações que falam por si mesmas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                before: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2070&auto=format&fit=crop",
                after: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2070&auto=format&fit=crop",
                tag: "Definição Absurda",
                name: "Joanna S."
              },
              { 
                before: "https://images.unsplash.com/photo-1541534741688-6078c64b5913?q=80&w=2070&auto=format&fit=crop", 
                after: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2014&auto=format&fit=crop",
                tag: "Hipertrofia Elite",
                name: "Juliana M."
              },
              { 
                before: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop", 
                after: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
                tag: "Condicionamento",
                name: "Felipe T."
              }
            ].map((res, i) => (
              <motion.div 
                key={i} 
                className="group relative rounded-2xl overflow-hidden glass aspect-4/5"
                whileHover={{ y: -5 }}
              >
                <img 
                  src={res.after} 
                  alt={res.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-brand text-dark text-[10px] font-black px-3 py-1 rounded uppercase mb-2 inline-block">
                    {res.tag}
                  </span>
                  <h3 className="text-xl font-bold">{res.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-32 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-[150px] -z-10" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl mb-4">Escolha sua <span className="text-brand">Jornada</span></h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs">Invista no seu maior ativo: Você</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PlanCard 
              title="Presencial VIP" 
              price="850" 
              features={[
                'Treino individualizado presencial',
                'Avaliação antropométrica mensal',
                'Correção técnica em tempo real',
                'Kit boas-vindas IronGlow'
              ]} 
            />
            <PlanCard 
              title="Consultoria Elite" 
              price="299" 
              highlighted 
              features={[
                'Treinamento híbrido (App)',
                'Acompanhamento nutricional',
                'Check-in semanal via WhatsApp',
                'Acesso a comunidade exclusiva'
              ]} 
            />
            <PlanCard 
              title="Protocolo Force" 
              price="490" 
              features={[
                'Treino focado em força bruta',
                'Suplementação periodizada',
                'Consultas mensais em vídeo',
                'Guia de sono e recuperação'
              ]} 
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-32 bg-surface">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl">Vibe <span className="text-brand italic">Premium</span></h2>
              <p className="text-gray-500 uppercase tracking-widest text-xs mt-2">Bastidores e Estilo de Vida</p>
            </div>
            <a href="#" className="flex items-center gap-2 text-brand font-bold uppercase text-[10px] tracking-widest border-b border-brand/30 pb-1">
              Siga no Instagram <Instagram size={14} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1558017487-06bf9f82613a?q=80&w=2140&auto=format&fit=crop"
            ].map((img, i) => (
              <motion.div 
                key={i} 
                className={`overflow-hidden rounded-xl ${i % 3 === 0 ? 'row-span-2' : ''}`}
                whileHover={{ scale: 0.98 }}
              >
                <img 
                  src={img} 
                  className="w-full h-full object-cover aspect-square grayscale hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="py-40 bg-dark text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 relative z-10"
        >
          <p className="text-brand font-black text-6xl md:text-8xl mb-8 uppercase opacity-20 select-none">LIMITE ZERO</p>
          <blockquote className="text-4xl md:text-5xl font-black max-w-4xl mx-auto uppercase leading-tight">
            "Sua mente desistirá mil vezes antes do seu corpo. <span className="text-brand">Deseje mais.</span> Trabalhe mais."
          </blockquote>
        </motion.div>
      </section>

      {/* CTA Final */}
      <section id="contato" className="py-32 bg-brand text-dark">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9]">Pronto para o Próximo Nível?</h2>
          <p className="text-dark/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-bold uppercase tracking-tight">
            Vagas limitadas para consultoria premium este mês. Garanta seu lugar agora.
          </p>
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-dark text-white font-black text-xl md:text-2xl rounded-sm uppercase tracking-widest inline-flex items-center gap-4 shadow-2xl"
          >
            QUERO TRANSFORMAR MEU CORPO <MessageCircle className="fill-current" />
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-dark border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-black tracking-tighter text-white flex items-center gap-2 mb-6 md:justify-start justify-center">
                <Zap className="text-brand fill-brand" size={32} />
                IRON<span className="text-brand">GLOW</span>
              </div>
              <p className="text-gray-500 max-w-sm">
                O ápice do treinamento físico especializado. Transformando vidas através de métricas, suor e mentalidade inabalável.
              </p>
            </div>
            <div>
              <h5 className="text-brand font-bold text-xs uppercase tracking-widest mb-6">Social</h5>
              <div className="flex flex-col gap-4 text-sm font-bold uppercase">
                <a href="#" className="hover:text-brand transition-colors inline-flex items-center gap-2"><Instagram size={16} /> @iron.performance</a>
                <a href="#" className="hover:text-brand transition-colors inline-flex items-center gap-2"><MessageCircle size={16} /> WhatsApp Direct</a>
              </div>
            </div>
            <div>
              <h5 className="text-brand font-bold text-xs uppercase tracking-widest mb-6">Local</h5>
              <p className="text-sm font-bold text-gray-500 italic">
                Studio Private IronGlow<br />
                Av. Fitness Pro, 2026<br />
                São Paulo - SP
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
            <p className="text-xs text-gray-600 tracking-widest font-bold uppercase">
              © 2026 IRONGLOW PERFORMANCE. TODOS OS DIREITOS RESERVADOS.
            </p>
            <div className="flex gap-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-brand">Privacidade</a>
              <a href="#" className="hover:text-brand">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
