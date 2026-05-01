"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";
import { Card } from "@/components/Card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, UserCheck, MessageSquare, CalendarCheck, TrendingUp, CheckCircle2, ShieldCheck, Download, Smartphone, CalendarDays, Lock, Users, AlertTriangle } from "lucide-react";

type Option = { text: string; points: number; isHardReject?: boolean };
type Question = { title: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    title: "¿Cuántos pacientes potenciales recibiste el último mes?",
    options: [
      { text: "Menos de 30", points: 0, isHardReject: true },
      { text: "30–70", points: 5 },
      { text: "70–150", points: 15 },
      { text: "150+", points: 25 },
    ]
  },
  {
    title: "La última vez que un paciente escribió… ¿en cuánto tiempo le respondieron?",
    options: [
      { text: "< 5 min", points: 0 },
      { text: "5–15 min", points: 5 },
      { text: "15–60 min", points: 10 },
      { text: "Horas después", points: 20 },
      { text: "No respondieron", points: 25 },
    ]
  },
  {
    title: "El último paciente que NO asistió… ¿qué hizo tu equipo después?",
    options: [
      { text: "Lo reagendó el mismo día", points: 0 },
      { text: "Lo contactó después", points: 5 },
      { text: "No hizo seguimiento", points: 15 },
      { text: "No hay proceso", points: 20 },
    ]
  },
  {
    title: "Cuando un paciente pregunta precio y desaparece… ¿qué suele pasar?",
    options: [
      { text: "Seguimiento claro", points: 0 },
      { text: "1 intento", points: 5 },
      { text: "2–3 intentos", points: 10 },
      { text: "Se pierde", points: 20 },
    ]
  },
  {
    title: "¿Cuánto genera en promedio un paciente nuevo?",
    options: [
      { text: "< S/ 250", points: 0, isHardReject: true },
      { text: "S/ 250 – S/ 500", points: 10 },
      { text: "S/ 500 – S/ 1000", points: 20 },
      { text: "S/ 1000+", points: 30 },
    ]
  },
  {
    title: "¿Actualmente inviertes en publicidad todos los meses?",
    options: [
      { text: "Sí, todos los meses", points: 20 },
      { text: "A veces", points: 10 },
      { text: "No", points: 0, isHardReject: true },
    ]
  },
  {
    title: "La última semana… ¿quedaron espacios vacíos en la agenda?",
    options: [
      { text: "No", points: 0 },
      { text: "1–2 espacios", points: 5 },
      { text: "3–5 espacios", points: 10 },
      { text: "Más de 5", points: 15 },
    ]
  },
  {
    title: "Si detectamos pérdida de ingresos… ¿puedes implementar una solución?",
    options: [
      { text: "Sí, yo decido", points: 20 },
      { text: "Decido con socio", points: 10 },
      { text: "Depende de otro", points: 0, isHardReject: true },
      { text: "No", points: 0, isHardReject: true },
    ]
  }
];

export default function Home() {
  const [flowState, setFlowState] = useState<'landing' | 'form' | 'analyzing' | 'high' | 'mid' | 'low' | 'calendar'>('landing');
  const [score, setScore] = useState(0);
  const [hasHardReject, setHasHardReject] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [analyzingText, setAnalyzingText] = useState("Analizando tu operación...");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnswer = (option: Option) => {
    const newScore = score + option.points;
    setScore(newScore);
    
    if (option.isHardReject) {
      setHasHardReject(true);
    }

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Transition to Analyzing screen
      setFlowState('analyzing');
    }
  };

  useEffect(() => {
    if (flowState === 'analyzing') {
      const texts = [
        "Analizando tu operación...",
        "Detectando fugas de ingresos...",
        "Calculando impacto real..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i < texts.length) {
          setAnalyzingText(texts[i]);
        }
      }, 700);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        
        // Final logic evaluation
        if (hasHardReject || score < 90) {
          setFlowState('low');
        } else if (score >= 90 && score <= 119) {
          setFlowState('mid');
        } else {
          setFlowState('high');
        }
      }, 2500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [flowState, hasHardReject, score]);

  return (
    <AnimatePresence mode="wait">
      {flowState === 'landing' && (
        <motion.div 
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -100 }}
          className="h-full w-full overflow-y-hidden touch-none snap-y snap-mandatory hide-scrollbar relative"
        >
          {/* SECTION 1: HERO */}
          <Section id="hero" className="bg-gradient-to-b from-[#e8f5e9] to-[#ffffff]">
            <div className="absolute top-8 w-full text-center">
              <span className="font-extrabold text-gray-900 tracking-tight text-xl">QUANT <span className="text-primary">PARTNERS</span></span>
            </div>
            
            <div className="text-center mt-10 w-full">
              <p className="text-sm font-bold tracking-wider text-primary mb-4 uppercase">Auditoría de Ingresos</p>
              
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
                Pierdes entre <span className="text-primary">S/ 5,000 y S/ 15,000 al mes</span> en pacientes que no llegan a consulta
              </h1>
              
              <p className="text-gray-600 text-lg font-bold mb-6">
                Te conseguimos pacientes para tus tratamientos de alto valor<br/>
                <span className="font-medium text-gray-500">y los convertimos en citas pagadas antes de llegar a consulta.</span>
              </p>

              <div className="bg-red-50 border border-red-100 rounded-xl p-4 mx-2">
                <p className="text-sm text-red-800 font-semibold mb-1">
                  Un implante en Perú vale S/ 2,500 – S/ 4,500.
                </p>
                <p className="text-xs text-red-600 font-medium">
                  Perder 2–4 pacientes al mes = S/ 5,000 – S/ 15,000 perdidos.
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-10 w-full px-6">
              <CTAButton onClick={() => scrollTo("funnel")} delay={3}>
                Ver dónde se fuga mi dinero <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </Section>

          {/* SECTION 2: PROBLEM VISUAL */}
          <Section id="funnel" className="bg-white">
            <div className="w-full">
              <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-900 leading-tight">Aquí se están perdiendo <br/>tus pacientes</h2>
              <p className="text-center text-gray-500 mb-6 font-medium">El problema no es conseguir leads.<br/>Es que no llegan a la consulta.</p>
              
              <div className="flex flex-col gap-2 relative">
                <div className="absolute left-[38px] top-6 bottom-6 w-0.5 bg-gray-100 z-0"></div>
                
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <Card className="flex items-center gap-4 relative z-10 p-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Leads (100%)</h3>
                      <p className="text-xs text-gray-500 font-medium">Pagas por cada uno</p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <Card className="flex items-center gap-4 relative z-10 border-red-100 p-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-500">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">Responden (40–60%)</h3>
                      <p className="text-xs text-red-500 font-medium">Muchos no reciben respuesta a tiempo</p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                  <Card className="flex items-center gap-4 relative z-10 border-red-100 p-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-500">
                      <CalendarCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">Agendan (20–40%)</h3>
                      <p className="text-xs text-red-500 font-medium">Interesados que no reservan</p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                  <Card className="flex items-center gap-4 relative z-10 border-red-100 p-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-500">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">Asisten (50–70%)</h3>
                      <p className="text-xs text-red-500 font-medium">30%–50% no llega</p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <div className="text-center mt-5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-sm font-bold text-gray-900">De cada 10 pacientes interesados:</p>
                <p className="text-sm text-red-600 font-bold">solo 2–3 terminan en silla.</p>
              </div>
            </div>

            <div className="absolute bottom-10 w-full px-6">
              <CTAButton onClick={() => scrollTo("impact")} delay={3}>
                Calcular mi pérdida <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </Section>

          {/* SECTION 3: IMPACT */}
          <Section id="impact" className="bg-[#111827] text-white">
            <div className="text-center w-full">
              <h2 className="text-4xl font-extrabold text-white mb-2 leading-tight">Este dinero <br/><span className="text-accent">ya es tuyo</span></h2>
              <p className="text-gray-300 text-lg mb-8 font-medium">Pero se pierde antes de cobrarlo</p>
              
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
                  <motion.circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="8"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    whileInView={{ strokeDashoffset: 99 }} 
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-accent mb-1" />
                  <span className="text-2xl font-bold">60-75%</span>
                  <span className="text-xs text-gray-400 font-medium uppercase mt-1 text-center leading-tight">Fuga<br/>Real</span>
                </div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                <p className="text-accent text-sm mb-4 uppercase font-bold tracking-widest">Esto ocurre TODOS los meses</p>
                
                <div className="flex flex-col gap-4 mb-8 text-left max-w-[280px] mx-auto bg-white/5 p-5 rounded-2xl border border-white/10">
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-gray-400 text-sm font-bold mb-1">Perder 2 implantes al mes:</p>
                    <p className="text-3xl font-extrabold text-white leading-none mb-2">≈ S/ 6,000 <span className="text-sm font-medium text-gray-500">/ mes</span></p>
                    <p className="text-lg text-red-400 font-bold leading-none">S/ 72,000 <span className="text-sm font-medium text-red-400/80">/ año en fuga</span></p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-bold mb-1">Perder 4 implantes al mes:</p>
                    <p className="text-3xl font-extrabold text-white leading-none mb-2">≈ S/ 12,000 <span className="text-sm font-medium text-gray-500">/ mes</span></p>
                    <p className="text-lg text-red-400 font-bold leading-none">S/ 144,000 <span className="text-sm font-medium text-red-400/80">/ año en fuga</span></p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 font-medium px-4 mb-3">Ese dinero ya lo pagaste en publicidad, tiempo y personal.</p>
              </motion.div>
            </div>

            <div className="absolute bottom-10 w-full px-6">
              <CTAButton onClick={() => scrollTo("solution")} delay={3}>
                Cómo recuperarlo <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </Section>

          {/* SECTION 4: SOLUTION */}
          <Section id="solution" className="bg-gray-50">
            <div className="w-full">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center leading-tight">Sistema de recuperación <br/>de ingresos</h2>
              <p className="text-center text-gray-500 mb-8 font-medium">Convierte interés en pacientes que sí pagan</p>
              
              <div className="flex flex-col gap-3">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Card className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Seguimiento</h3>
                      <p className="text-sm text-gray-600 font-medium">Responde en &lt;60 segundos</p>
                      <p className="text-xs font-bold text-primary mt-1">(+20%–40% más contactos efectivos)</p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <Card className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Confirmaciones</h3>
                      <p className="text-sm text-gray-600 font-medium">Reduce ausencias</p>
                      <p className="text-xs font-bold text-primary mt-1">(-20%–40% no-shows)</p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <Card className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Reactivación</h3>
                      <p className="text-sm text-gray-600 font-medium">Recupera pacientes interesados</p>
                      <p className="text-xs font-bold text-primary mt-1">(+10%–25% citas extra)</p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm font-bold text-gray-900 bg-white inline-block px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-3">
                  Sin contratar más personal<br/>
                  <span className="text-gray-500">Sin subir inversión en ads</span>
                </p>
                
                <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                  <p className="text-xs text-primary font-bold">
                    Recuperar solo 2 pacientes de alto valor puede sumar S/ 5,000 – S/ 10,000 al mes.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 w-full px-6">
              <CTAButton onClick={() => scrollTo("final")} delay={3}>
                Evaluar mi clínica <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </Section>

          {/* SECTION 5: FINAL CTA */}
          <Section id="final" className="bg-primary text-white">
            <div className="text-center w-full">
              <motion.div 
                initial={{ scale: 0 }} 
                whileInView={{ scale: 1 }} 
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <ShieldCheck className="w-12 h-12 text-accent" />
              </motion.div>
              
              <h2 className="text-4xl font-extrabold mb-4 leading-tight">
                ¿Tu clínica está perdiendo ingresos?
              </h2>
              <p className="text-[#a7f3d0] text-xl font-bold mb-6">Descúbrelo en menos de 60 segundos</p>
              
              <div className="bg-black/20 p-5 rounded-xl border border-white/10 text-left">
                <p className="text-sm text-white/90 font-bold mb-3 text-center">Si calificas, te mostramos exactamente:</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> cuánto pierdes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> dónde se pierde</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> cómo recuperarlo</li>
                </ul>
              </div>
            </div>

            <div className="absolute bottom-10 w-full px-6">
              <CTAButton onClick={() => setFlowState('form')} delay={0}>
                Ver si califico <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </Section>
        </motion.div>
      )}

      {flowState === 'form' && (
        <motion.div 
          key="form"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="h-full w-full bg-gray-50 flex flex-col absolute inset-0 z-50"
        >
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 fixed top-0 left-0 z-50 max-w-[420px] mx-auto sm:rounded-t-[32px] overflow-hidden">
            <motion.div 
              className="h-full bg-primary" 
              initial={{ width: `${(currentQuestionIndex / QUESTIONS.length) * 100}%` }}
              animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="pt-6 px-6 text-center">
            <p className="text-xs font-bold tracking-wider text-primary uppercase">Evaluación de ingresos</p>
            <p className="text-sm text-gray-500 font-medium mt-1">Detectamos si estás perdiendo más de S/ 5,000 al mes</p>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
              >
                <span className="text-xs font-bold text-gray-400 mb-4 block uppercase tracking-wider">
                  Paso {currentQuestionIndex + 1} de {QUESTIONS.length}
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 leading-tight mb-6">
                  {QUESTIONS[currentQuestionIndex].title}
                </h2>

                <div className="flex flex-col gap-3">
                  {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 text-left font-bold text-gray-700 hover:border-primary hover:bg-green-50 hover:text-primary active:scale-95 transition-all"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {flowState === 'analyzing' && (
        <motion.div 
          key="analyzing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full bg-[#111827] flex flex-col justify-center items-center absolute inset-0 z-50 text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/10 border-t-accent rounded-full mb-8"
          />
          <h2 className="text-2xl font-extrabold text-white animate-pulse">
            {analyzingText}
          </h2>
        </motion.div>
      )}

      {flowState === 'high' && (
        <motion.div
          key="high"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full bg-[#111827] flex flex-col justify-center items-center px-6 absolute inset-0 z-50 text-white text-center"
        >
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Tu clínica <span className="text-red-400">está perdiendo ingresos</span>
          </h2>
          
          <Card className="bg-white/5 border-white/10 mb-6 backdrop-blur-sm w-full p-6">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest text-center">Estimado</p>
            <p className="text-4xl font-extrabold text-white text-center text-red-400">S/ 5,000 – S/ 12,000 <span className="text-lg text-gray-400">/ mes</span></p>
          </Card>

          <p className="text-white font-bold text-lg mb-8 bg-white/10 px-6 py-3 rounded-full border border-white/20">
            Esto es recuperable en 30–60 días
          </p>

          <div className="w-full border-t border-gray-800 pt-8 mt-2">
            <CTAButton onClick={() => setFlowState('calendar')} delay={1}>
              Reservar auditoría <ArrowRight className="w-5 h-5" />
            </CTAButton>
            <p className="text-gray-400 text-sm mt-4 font-medium">S/ 97 <span className="font-normal">(se descuenta si trabajamos juntos)</span></p>
          </div>
        </motion.div>
      )}

      {flowState === 'mid' && (
        <motion.div
          key="mid"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full bg-white flex flex-col justify-center items-center px-6 absolute inset-0 z-50 text-center"
        >
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
            Hay oportunidad, pero falta estructura
          </h2>
          <p className="text-gray-600 text-lg mb-8 font-medium">
            Primero debes ordenar tu proceso comercial antes de implementar automatizaciones avanzadas.
          </p>

          <div className="w-full mt-4">
            <CTAButton onClick={() => window.location.href = "https://health.thequantpartners.com"} delay={1}>
              Unirme al grupo privado
            </CTAButton>
          </div>
        </motion.div>
      )}

      {flowState === 'low' && (
        <motion.div
          key="low"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full bg-white flex flex-col justify-center items-center px-6 absolute inset-0 z-50 text-center"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <UserCheck className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Aún no tienes suficiente volumen
          </h2>
          <p className="text-gray-600 text-lg mb-8 font-medium">
            Necesitas más flujo o ticket. Te recomendamos estudiar estas estrategias base primero.
          </p>

          <div className="w-full mt-4">
            <CTAButton onClick={() => window.location.href = "https://health.thequantpartners.com"} delay={1}>
              Acceder a recursos gratuitos
            </CTAButton>
          </div>
        </motion.div>
      )}

      {flowState === 'calendar' && (
        <motion.div
          key="calendar"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full w-full bg-gray-50 flex flex-col absolute inset-0 z-50"
        >
          <div className="pt-10 pb-6 px-6 text-center bg-white shadow-sm z-10">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Reserva tu auditoría</h2>
            <p className="text-gray-500 font-medium">S/ 97 PEN (se descuenta de la implementación)</p>
          </div>
          
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <Card className="h-[400px] w-full flex flex-col items-center justify-center border-dashed border-2 border-gray-300 bg-white shadow-sm">
              <CalendarDays className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">[Payment / Calendly Embed]</p>
            </Card>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
