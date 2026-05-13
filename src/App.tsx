import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'

// Brand colors
// Navy: #1C2B5A  Gold: #C9A555  Light gold: #E8C97A  Dark navy: #111827

// ─── AVA Logo SVG ─────────────────────────────────────────────────────────────
function AvaLogo({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 280 90"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AVA Properties Home Buyers"
    >
      {/* Left A — roofline */}
      <polygon points="20,65 55,10 70,65" fill="none" stroke="#1C2B5A" strokeWidth="5" strokeLinejoin="round"/>
      <rect x="32" y="48" width="9" height="9" fill="#C9A555"/>
      {/* V — gold center */}
      <polygon points="55,10 85,65 115,10" fill="none" stroke="#C9A555" strokeWidth="5" strokeLinejoin="round"/>
      {/* Right A — roofline */}
      <polygon points="100,10 115,65 150,10" fill="none" stroke="#1C2B5A" strokeWidth="5" strokeLinejoin="round"/>
      <rect x="125" y="48" width="9" height="9" fill="#C9A555"/>
      {!compact && (
        <>
          {/* AVA PROPERTIES text */}
          <text x="5" y="82" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="13" fontWeight="700" letterSpacing="3" fill="#1C2B5A">AVA</text>
          <text x="38" y="82" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="13" fontWeight="700" letterSpacing="3" fill="#C9A555"> PROPERTIES</text>
          {/* HOME BUYERS line */}
          <line x1="5" y1="87" x2="55" y2="87" stroke="#C9A555" strokeWidth="0.8"/>
          <text x="60" y="90" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="8" fontWeight="600" letterSpacing="4" fill="#1C2B5A">HOME BUYERS</text>
          <line x1="155" y1="87" x2="210" y2="87" stroke="#C9A555" strokeWidth="0.8"/>
        </>
      )}
    </svg>
  )
}

// ─── FadeUp utility ───────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const shadow = useTransform(scrollY, [0, 60], ['0 0 0 0 rgba(0,0,0,0)', '0 4px 24px rgba(0,0,0,0.12)'])
  const bg = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.98)'])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <motion.header
      style={{ backgroundColor: bg, boxShadow: shadow }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" aria-label="AVA Properties Home Buyers">
          <AvaLogo className="h-10 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm font-semibold tracking-wide text-slate-600 hover:text-[#1C2B5A] transition-colors"
            >{l.label}</a>
          ))}
          <a href="tel:5599776959"
            className="bg-[#1C2B5A] text-white px-5 py-2 rounded text-sm font-bold hover:bg-[#243470] transition-colors"
          >(559) 977-6959</a>
        </nav>
        <button className="md:hidden p-2 text-[#1C2B5A]" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span animate={open ? { rotate: 45, y: 8 } : {}} className="block h-0.5 bg-current" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block h-0.5 bg-current" />
            <motion.span animate={open ? { rotate: -45, y: -8 } : {}} className="block h-0.5 bg-current" />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="text-slate-700 font-semibold hover:text-[#1C2B5A]">{l.label}</a>
              ))}
              <a href="tel:5599776959"
                className="bg-[#1C2B5A] text-white text-center py-3 rounded font-bold hover:bg-[#243470] transition-colors"
              >Call (559) 977-6959</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Lead Form ────────────────────────────────────────────────────────────────
function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '' })

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md border border-slate-100">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-5xl mb-4">🏡</div>
            <h3 className="text-2xl font-bold text-[#1C2B5A] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              We'll Be in Touch!
            </h3>
            <p className="text-slate-500 text-sm mb-4">Expect a call within 24 hours with your no-obligation cash offer.</p>
            <a href="tel:5599776959" className="text-[#C9A555] font-bold hover:text-[#b8942e]">(559) 977-6959</a>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
            className="flex flex-col gap-4"
          >
            <div className="border-b border-[#C9A555] pb-3 mb-1">
              <h3 className="text-xl font-bold text-[#1C2B5A]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Get Your Cash Offer
              </h3>
              <p className="text-slate-400 text-xs mt-1">No repairs · No fees · No obligation</p>
            </div>
            {[
              { key: 'name', placeholder: 'Your Name', type: 'text' },
              { key: 'phone', placeholder: 'Phone Number', type: 'tel' },
              { key: 'address', placeholder: 'Property Address', type: 'text' },
            ].map(({ key, placeholder, type }) => (
              <input key={key} type={type} placeholder={placeholder} required
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-[#1C2B5A] transition-colors"
              />
            ))}
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="bg-[#1C2B5A] text-white font-bold py-3.5 rounded-lg hover:bg-[#243470] transition-colors text-sm tracking-wide mt-1"
            >
              GET MY CASH OFFER →
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e1a3a] via-[#1C2B5A] to-[#0a1228]" />
        {/* Subtle texture dots */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A555 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </motion.div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A555] to-transparent" />
      <div className="absolute top-32 right-0 w-64 h-64 bg-[#C9A555]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#C9A555]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div style={{ opacity }} className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-14 items-center w-full">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-[#C9A555]/50 rounded-full px-4 py-1.5 mb-7"
          >
            <span className="w-2 h-2 bg-[#C9A555] rounded-full animate-pulse" />
            <span className="text-[#C9A555] text-xs font-semibold tracking-widest uppercase">Fresno & Clovis, CA</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-5"
          >
            <AvaLogo className="h-14 w-auto" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            We Buy Houses
            <br />
            <span className="text-[#C9A555]">Fast for Cash.</span>
            <br />
            Any Condition.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
            className="text-slate-300 text-lg mb-8 leading-relaxed"
          >
            Skip the repairs, skip the agents, skip the stress. We make fair cash
            offers on Fresno and Clovis homes — and close in as little as{' '}
            <strong className="text-white">14 days</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
            className="grid grid-cols-2 gap-2 mb-9 max-w-sm"
          >
            {['No repairs needed', 'No agent fees', 'Close in 14 days', 'Any condition'].map((b) => (
              <span key={b} className="flex items-center gap-2 text-slate-300 text-sm">
                <span className="text-[#C9A555] font-bold">✓</span> {b}
              </span>
            ))}
          </motion.div>

          <motion.a
            href="tel:5599776959"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.48 }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-[#C9A555] text-[#1C2B5A] font-black px-8 py-4 rounded-lg text-lg hover:bg-[#e8c97a] transition-colors shadow-lg"
          >
            📞 (559) 977-6959
          </motion.a>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center md:justify-end"
        >
          <LeadForm />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  { num: '01', title: 'Tell Us About Your Home', desc: 'Call us or fill out the form. Address, condition, timeline — that\'s all we need to get started.' },
  { num: '02', title: 'Receive a Fair Cash Offer', desc: 'We evaluate your property and deliver a no-obligation cash offer within 24 hours.' },
  { num: '03', title: 'Close On Your Schedule', desc: 'Choose a closing date that fits your life — as fast as 14 days or on your own timetable.' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-[#C9A555] text-sm font-bold uppercase tracking-widest mb-3">Simple Process</p>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-bold text-[#1C2B5A]">3 Steps to Sold</h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.15}>
              <div className="relative p-8 bg-white rounded-2xl border border-slate-100 shadow-sm h-full group hover:shadow-md hover:border-[#C9A555]/30 transition-all">
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1C2B5A] flex items-center justify-center">
                  <span className="text-[#C9A555] text-xs font-black">{s.num}</span>
                </div>
                <div className="w-12 h-1 bg-[#C9A555] mb-5 rounded" />
                <h3 className="text-[#1C2B5A] font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  { icon: '🔨', title: 'No Repairs Required', desc: 'Sell as-is. Leaky roof, foundation cracks, outdated kitchen — we handle everything after closing.' },
  { icon: '💸', title: 'Zero Fees or Commissions', desc: 'No agent cuts, no closing costs charged to you. Our offer is exactly what you walk away with.' },
  { icon: '📅', title: 'Close in 14 Days', desc: 'Need speed? We can close in as little as two weeks — or slower if that fits your plan.' },
  { icon: '🤝', title: 'No Obligation Offer', desc: 'Our cash offer is completely free. Take your time, ask questions, say no — no pressure ever.' },
  { icon: '📋', title: 'Skip the Showings', desc: 'No open houses, no strangers touring your home, no weekend disruptions.' },
  { icon: '🏠', title: 'Any Situation Welcome', desc: 'Foreclosure, divorce, estate, relocation, or just ready to move on — we buy in any circumstance.' },
]

function Benefits() {
  return (
    <section id="benefits" className="bg-[#1C2B5A] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-[#C9A555] text-sm font-bold uppercase tracking-widest mb-3">Why AVA Properties</p>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-bold text-white">Selling Made Simple</h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <FadeUp key={b.title} delay={i * 0.08}>
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C9A555]/40 transition-all group h-full">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#C9A555] transition-colors">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { quote: 'We needed to sell fast after my father passed. AVA Properties was compassionate, fair, and closed in 11 days. We couldn\'t have asked for better.', name: 'Maria R.', location: 'Fresno, CA', stars: 5 },
  { quote: 'I was behind on payments and didn\'t know what to do. They gave me a fair offer with no pressure and helped me avoid foreclosure. Truly grateful.', name: 'James T.', location: 'Clovis, CA', stars: 5 },
  { quote: 'Sold a rental that needed a ton of work. Got a solid offer, no repairs, closed on my schedule. Would absolutely use AVA Properties again.', name: 'Sandra K.', location: 'Fresno, CA', stars: 5 },
]

function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-[#C9A555] text-sm font-bold uppercase tracking-widest mb-3">Real Stories</p>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-bold text-[#1C2B5A]">Homeowners Trust Us</h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.15}>
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 h-full flex flex-col hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j} className="text-[#C9A555] text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 flex-1 italic text-sm">"{t.quote}"</p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-[#1C2B5A] font-bold">{t.name}</p>
                  <p className="text-slate-400 text-sm">{t.location}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'How fast can you close?', a: 'We can typically close in as little as 14 days. If you need more time, we work around your schedule.' },
  { q: 'Do I need to make repairs before selling?', a: 'No. We buy homes in any condition. You don\'t need to lift a finger — we handle everything.' },
  { q: 'Are there any fees or commissions?', a: 'None. We cover all closing costs. No agent fees, no hidden charges. Our offer is your take-home amount.' },
  { q: 'How do you determine your offer price?', a: 'We look at the property location, condition, and recent comparable sales. Our goal is always a fair, win-win offer.' },
  { q: 'What areas do you serve?', a: 'We primarily serve Fresno and Clovis, CA and surrounding communities. Call us to confirm your address.' },
  { q: 'Is there any obligation after I get an offer?', a: 'Absolutely not. Our offer is 100% free with zero pressure. You can decline — no hard feelings whatsoever.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-[#C9A555] text-sm font-bold uppercase tracking-widest mb-3">Got Questions?</p>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-bold text-[#1C2B5A]">Frequently Asked</h2>
        </FadeUp>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-[#C9A555]/40 transition-colors shadow-sm">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-[#1C2B5A] font-semibold hover:text-[#C9A555] transition-colors"
                >
                  <span>{f.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="text-[#C9A555] text-2xl flex-shrink-0 ml-4 leading-none">+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div key="content"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }} className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-slate-500 leading-relaxed text-sm">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative bg-[#1C2B5A] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A555] to-transparent" />
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #C9A555 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="flex justify-center mb-8">
            <AvaLogo className="h-16 w-auto brightness-200" />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-black text-white mb-6">Ready for Your Cash Offer?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            No repairs. No fees. No pressure. Call us today or submit the form
            and we'll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a href="tel:5599776959"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="bg-[#C9A555] text-[#1C2B5A] font-black px-10 py-4 rounded-lg text-lg hover:bg-[#e8c97a] transition-colors shadow-lg"
            >📞 (559) 977-6959</motion.a>
            <motion.a href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="border-2 border-[#C9A555]/60 text-white font-bold px-10 py-4 rounded-lg text-lg hover:border-[#C9A555] hover:bg-[#C9A555]/10 transition-all"
            >Get My Cash Offer</motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0e1a3a] border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <AvaLogo className="h-10 w-auto mb-2" />
          <p className="text-slate-500 text-sm">Fresno & Clovis, CA · (559) 977-6959</p>
        </div>
        <div className="text-slate-600 text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} AVA Properties Home Buyers. All rights reserved.</p>
          <p className="mt-1">Cash home buyers serving Fresno and Clovis, California.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="antialiased">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
