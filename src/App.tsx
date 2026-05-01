import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'

// ─── Utility: FadeUp on scroll ───────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 60], ['rgba(12,10,9,0)', 'rgba(12,10,9,0.97)'])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-amber-400 text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
            The Home Cash Buyer
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-stone-300 hover:text-amber-400 text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:5599776959"
            className="bg-amber-400 text-stone-950 px-5 py-2 rounded text-sm font-bold hover:bg-amber-300 transition-colors"
          >
            (559) 977-6959
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-stone-300 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 bg-current transition-all"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 bg-current transition-all"
            />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-stone-950 border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-stone-300 hover:text-amber-400 font-medium transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:5599776959"
                className="bg-amber-400 text-stone-950 px-5 py-3 rounded text-center font-bold hover:bg-amber-300 transition-colors"
              >
                Call (559) 977-6959
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Lead Capture Form ────────────────────────────────────────────────────────
function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm w-full max-w-md">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="text-5xl mb-4">🏡</div>
            <h3 className="text-xl font-bold text-white mb-2">We'll be in touch!</h3>
            <p className="text-stone-300 text-sm">
              Expect a call within 24 hours with your no-obligation cash offer.
            </p>
            <a
              href="tel:5599776959"
              className="mt-4 inline-block text-amber-400 font-semibold hover:text-amber-300"
            >
              Or call us now: (559) 977-6959
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <h3 className="text-lg font-bold text-white mb-1">Get Your Cash Offer</h3>
            <p className="text-stone-400 text-xs mb-2">No repairs. No fees. No obligation.</p>
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
            <input
              type="text"
              placeholder="Property Address"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-amber-400 text-stone-950 font-bold py-3 rounded hover:bg-amber-300 transition-colors text-sm mt-1"
            >
              Get My Cash Offer →
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
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-stone-950">
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-black"
      />

      {/* Decorative amber glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs font-semibold tracking-wide uppercase">
              Fresno & Clovis, CA
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            Sell Your House
            <br />
            <span className="text-amber-400">Fast for Cash.</span>
            <br />
            No Hassle.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-stone-300 text-lg mb-8 leading-relaxed"
          >
            We buy homes in any condition across Fresno and Clovis. Skip the repairs,
            skip the agents, skip the stress. Get a fair cash offer and close in as
            little as <strong className="text-white">14 days</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            {['No repairs needed', 'No agent commissions', 'Close in 14 days', 'Any condition'].map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-stone-300 text-sm">
                <span className="text-amber-400">✓</span> {b}
              </span>
            ))}
          </motion.div>

          <motion.a
            href="tel:5599776959"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-amber-400 text-stone-950 font-bold px-8 py-4 rounded text-lg hover:bg-amber-300 transition-colors"
          >
            📞 Call (559) 977-6959
          </motion.a>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center md:justify-end"
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  {
    num: '01',
    title: 'Tell Us About Your Home',
    desc: 'Call us or fill out the form. We just need the basics — address, condition, and your timeline.',
  },
  {
    num: '02',
    title: 'Get a Fair Cash Offer',
    desc: 'We evaluate your property and present a no-obligation cash offer, usually within 24 hours.',
  },
  {
    num: '03',
    title: 'Close On Your Schedule',
    desc: 'Pick the closing date that works for you — as fast as 14 days or on your own timeline.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-stone-900 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Simple Process</p>
          <h2
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            3 Steps to Sold
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.15}>
              <div className="relative p-8 bg-stone-950 rounded-xl border border-white/10 h-full group hover:border-amber-400/40 transition-colors">
                <div
                  className="text-6xl font-black text-amber-400/20 group-hover:text-amber-400/40 transition-colors mb-4 leading-none"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {s.num}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-stone-400 leading-relaxed">{s.desc}</p>
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
  { icon: '🔨', title: 'No Repairs Required', desc: 'Sell as-is. We handle everything after closing — leaks, foundation issues, whatever the condition.' },
  { icon: '💸', title: 'Zero Agent Fees', desc: 'No commissions, no closing costs charged to you. What we offer is what you pocket.' },
  { icon: '📅', title: 'Close in 14 Days', desc: 'Need to move fast? We can close in as little as two weeks — or slower if that works better.' },
  { icon: '🤝', title: 'No Obligation Offer', desc: 'Our cash offer is free and comes with zero pressure. You decide if and when to move forward.' },
  { icon: '📋', title: 'Skip the Showings', desc: 'No open houses, no staging, no strangers walking through your home on weekends.' },
  { icon: '🏠', title: 'Any Situation', desc: 'Foreclosure, divorce, estate sale, relocating, or just ready to move on — we buy in any circumstance.' },
]

function Benefits() {
  return (
    <section id="benefits" className="bg-stone-950 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Why Us</p>
          <h2
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Selling Made Simple
          </h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <FadeUp key={b.title} delay={i * 0.1}>
              <div className="p-6 rounded-xl border border-white/10 bg-white/3 hover:border-amber-400/30 hover:bg-white/5 transition-all group h-full">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                  {b.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">{b.desc}</p>
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
  {
    quote:
      'We needed to sell fast after my father passed. The Home Cash Buyer was compassionate, fair, and closed in 11 days. We couldn\'t have asked for a better experience.',
    name: 'Maria R.',
    location: 'Fresno, CA',
    stars: 5,
  },
  {
    quote:
      'I was behind on payments and didn\'t know what to do. They gave me a fair offer with no pressure and helped me avoid foreclosure. Truly grateful.',
    name: 'James T.',
    location: 'Clovis, CA',
    stars: 5,
  },
  {
    quote:
      'Sold a rental property that needed a ton of work. Got a solid offer, no repairs, and closed on my schedule. Would absolutely use them again.',
    name: 'Sandra K.',
    location: 'Fresno, CA',
    stars: 5,
  },
]

function Testimonials() {
  return (
    <section id="testimonials" className="bg-stone-900 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Real Stories</p>
          <h2
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Homeowners Trust Us
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.15}>
              <div className="p-8 bg-stone-950 rounded-xl border border-white/10 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-stone-300 leading-relaxed mb-6 flex-1 italic">"{t.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-stone-500 text-sm">{t.location}</p>
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
  {
    q: 'How fast can you close?',
    a: 'We can typically close in as little as 14 days. If you need more time, we work around your schedule — there\'s no rush.',
  },
  {
    q: 'Do I need to make any repairs before selling?',
    a: 'No. We buy homes in any condition — move-in ready or major fixer-upper. You don\'t need to lift a finger.',
  },
  {
    q: 'Are there any fees or commissions?',
    a: 'None. We cover all closing costs. No agent fees, no hidden charges. Our offer is your take-home amount.',
  },
  {
    q: 'How do you determine your offer price?',
    a: 'We look at the property\'s location, condition, and recent comparable sales in your area. Our goal is a fair offer that works for both of us.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We primarily serve Fresno and Clovis, CA and surrounding communities. Call us to confirm your specific address.',
  },
  {
    q: 'Is there any obligation after I get an offer?',
    a: 'Absolutely not. Our offer is 100% free with zero pressure. You can take time to think it over or decline — no hard feelings.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-stone-950 py-24">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Got Questions?</p>
          <h2
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Frequently Asked
          </h2>
        </FadeUp>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div
                className="border border-white/10 rounded-xl overflow-hidden hover:border-amber-400/30 transition-colors"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-white font-semibold hover:text-amber-400 transition-colors"
                >
                  <span>{f.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-amber-400 text-xl flex-shrink-0 ml-4"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-stone-400 leading-relaxed">{f.a}</p>
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
    <section className="bg-amber-400 py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-4xl md:text-5xl font-black text-stone-950 mb-6"
          >
            Ready to Get Your Cash Offer?
          </h2>
          <p className="text-stone-800 text-lg mb-10 max-w-xl mx-auto">
            No repairs. No fees. No pressure. Call us today or fill out the form
            and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:5599776959"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-stone-950 text-white font-bold px-10 py-4 rounded text-lg hover:bg-stone-800 transition-colors"
            >
              📞 (559) 977-6959
            </motion.a>
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/30 text-stone-950 font-bold px-10 py-4 rounded text-lg hover:bg-white/50 transition-colors border-2 border-stone-950/20"
            >
              Get My Cash Offer
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p
            className="text-amber-400 font-bold text-lg"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            The Home Cash Buyer
          </p>
          <p className="text-stone-500 text-sm mt-1">Fresno & Clovis, CA · (559) 977-6959</p>
        </div>
        <div className="text-stone-600 text-sm text-center md:text-right">
          <p>© {new Date().getFullYear()} The Home Cash Buyer. All rights reserved.</p>
          <p className="mt-1">We buy houses for cash in Fresno and Clovis, California.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-stone-950 text-white">
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
