import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'

// ─── AVA Logo SVG ─────────────────────────────────────────────────────────────
// light=true → white strokes (for dark navy backgrounds)
// light=false (default) → navy strokes (for white/light backgrounds)
function AvaLogo({ className = '', light = false }: { className?: string; light?: boolean }) {
  const primary = light ? "#FFFFFF" : "#1C2B5A"
  const gold = "#C9A555"
  const sw = 8
  return (
    <svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="AVA Properties Home Buyers">
      {/* ── LEFT A ── */}
      <line x1="8"   y1="210" x2="130" y2="12"  stroke={primary} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="82"  y1="12"  x2="130" y2="12"  stroke={primary} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="130" y1="12"  x2="192" y2="210" stroke={primary} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="48"  y1="148" x2="169" y2="148" stroke={primary} strokeWidth={sw} strokeLinecap="square"/>
      {/* ── V (always gold) ── */}
      <line x1="130" y1="12"  x2="240" y2="176" stroke={gold} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="240" y1="176" x2="350" y2="12"  stroke={gold} strokeWidth={sw} strokeLinecap="square"/>
      {/* ── RIGHT A ── */}
      <line x1="350" y1="12"  x2="288" y2="210" stroke={primary} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="350" y1="12"  x2="398" y2="12"  stroke={primary} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="350" y1="12"  x2="472" y2="210" stroke={primary} strokeWidth={sw} strokeLinecap="square"/>
      <line x1="311" y1="148" x2="432" y2="148" stroke={primary} strokeWidth={sw} strokeLinecap="square"/>
      {/* ── LEFT WINDOW ── gold squares */}
      <rect x="90"  y="160" width="14" height="14" fill={gold}/>
      <rect x="108" y="160" width="14" height="14" fill={gold}/>
      <rect x="90"  y="178" width="14" height="14" fill={gold}/>
      <rect x="108" y="178" width="14" height="14" fill={gold}/>
      {/* ── RIGHT WINDOW ── gold squares */}
      <rect x="358" y="160" width="14" height="14" fill={gold}/>
      <rect x="376" y="160" width="14" height="14" fill={gold}/>
      <rect x="358" y="178" width="14" height="14" fill={gold}/>
      <rect x="376" y="178" width="14" height="14" fill={gold}/>
      {/* ── AVA PROPERTIES text ── */}
      <text fontFamily="Cormorant Garamond, Georgia, serif" fontSize="38" fontWeight="700" letterSpacing="4">
        <tspan x="52" y="256" fill={primary}>AVA</tspan>
        <tspan fill={gold}> PROPERTIES</tspan>
      </text>
      {/* ── HOME BUYERS row ── */}
      <line x1="52"  y1="270" x2="148" y2="270" stroke={gold} strokeWidth="1.2"/>
      <text x="156" y="274" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="20" fontWeight="600" letterSpacing="6" fill={primary}>HOME BUYERS</text>
      <line x1="388" y1="270" x2="430" y2="270" stroke={gold} strokeWidth="1.2"/>
    </svg>
  )
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >{children}</motion.div>
  )
}

// ─── NavLogo: always show real logo ──────────────────────────────────────────
function NavLogo() {
  return <img src="/ava-logo.svg" alt="AVA Properties Home Buyers" className="h-14 w-auto" />
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Situations', href: '#situations' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ]
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#">
          {/* Light logo when over dark hero, navy logo when navbar goes white */}
          <NavLogo />
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-slate-600 hover:text-[#1C2B5A] transition-colors">{l.label}</a>
          ))}
          <a href="tel:5599776959" className="bg-[#1C2B5A] text-white px-5 py-2 rounded font-bold text-sm hover:bg-[#243470] transition-colors">(559) 977-6959</a>
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
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100">
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-slate-700 font-semibold hover:text-[#1C2B5A]">{l.label}</a>)}
              <a href="tel:5599776959" className="bg-[#1C2B5A] text-white text-center py-3 rounded font-bold hover:bg-[#243470] transition-colors">Call (559) 977-6959</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── Lead Form ────────────────────────────────────────────────────────────────
const WEBHOOK_URL = 'https://0f89c2fb-2caf-43b7-9cc6-3c9e5a224688-00-3vxba6sddw5r0.riker.replit.dev/api/webhook/website-lead/45c8635d-2329-49c8-9293-2656caa7bc01'
const WEB3FORMS_KEY = 'd9a02a22-6ec0-4ed3-a163-318967180ad5'

function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', address: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const payload = {
      source: 'AVA Properties Website',
      name: form.name,
      phone: form.phone,
      address: form.address,
      submitted_at: new Date().toISOString(),
    }
    try {
      await Promise.all([
        // Pipeline webhook
        fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }),
        // Email to Patrick + Alex
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: '🏡 New Lead — AVA Properties Home Buyers',
            from_name: 'AVA Properties Website',
            cc: 'info@avahomebuyer.com',
            name: form.name,
            phone: form.phone,
            address: form.address,
            source: 'AVA Properties Website',
            submitted_at: new Date().toISOString(),
          }),
        }),
      ])
    } catch (_) {
      // Show success regardless — never block the user
    }
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md border border-slate-100">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-5xl mb-4">🏡</div>
            <h3 className="text-2xl font-bold text-[#1C2B5A] mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>We'll Be in Touch!</h3>
            <p className="text-slate-500 text-sm mb-4">Expect a call within 24 hours with your no-obligation cash offer.</p>
            <a href="tel:5599776959" className="text-[#C9A555] font-bold hover:text-[#b8942e]">(559) 977-6959</a>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="border-b border-[#C9A555]/40 pb-3 mb-1">
              <h3 className="text-xl font-bold text-[#1C2B5A]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Get Your Cash Offer</h3>
              <p className="text-slate-400 text-xs mt-1">No repairs · No fees · No obligation · 24-hour response</p>
            </div>
            {[{ key: 'name', placeholder: 'Your Name', type: 'text' }, { key: 'phone', placeholder: 'Phone Number', type: 'tel' }, { key: 'address', placeholder: 'Property Address in Fresno or Clovis', type: 'text' }].map(({ key, placeholder, type }) => (
              <input key={key} type={type} placeholder={placeholder} required
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-[#1C2B5A] transition-colors"
              />
            ))}
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
              className="bg-[#1C2B5A] text-white font-bold py-3.5 rounded-lg hover:bg-[#243470] transition-colors text-sm tracking-wider mt-1 disabled:opacity-60">
              {loading ? 'SENDING...' : 'GET MY CASH OFFER →'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Hero — H1 keyword-optimized per SEO report ───────────────────────────────
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <section ref={ref} className="relative flex items-center overflow-hidden pt-16">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e1a3a] via-[#1C2B5A] to-[#0a1228]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #C9A555 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </motion.div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A555] to-transparent" />
      <div className="absolute top-32 right-0 w-80 h-80 bg-[#C9A555]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 pt-6 pb-8 md:pt-24 md:pb-16 grid md:grid-cols-2 gap-6 md:gap-12 items-center w-full">
        <div>
          {/* Trust signal bar */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-7">
            <span className="inline-flex items-center gap-2 border border-[#C9A555]/50 rounded-full px-3 py-1">
              <span className="w-2 h-2 bg-[#C9A555] rounded-full animate-pulse" />
              <span className="text-[#C9A555] text-xs font-semibold tracking-widest uppercase">Fresno & Clovis, CA</span>
            </span>
            <span className="text-[#C9A555] text-xs font-semibold">★★★★★ 47 Reviews</span>
          </motion.div>

          {/* H1 — keyword-optimized */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-3xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-tight mb-3">
            Sell Your House Fast<br />for Cash in Fresno, CA
          </motion.h1>
          {/* H2 — supporting keyword */}
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            className="text-[#C9A555] text-xl font-semibold mb-5" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Trusted Local Cash Home Buyer — Fresno & Clovis
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.30 }}
            className="text-slate-300 text-base leading-relaxed mb-7">
            We buy houses in Fresno and Clovis in any condition — foreclosure, divorce, probate, repairs needed, or just ready to move on.
            No agent fees, no commissions, no repairs. Get a fair cash offer within <strong className="text-white">24 hours</strong> and close in as little as <strong className="text-white">14 days</strong>.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
            className="grid grid-cols-2 gap-y-2 gap-x-4 mb-8 max-w-sm">
            {['No repairs needed', 'No agent commissions', 'Offer in 24 hours', 'Close in 14 days', 'Any condition', 'Any situation'].map((b) => (
              <span key={b} className="flex items-center gap-2 text-slate-300 text-sm">
                <span className="text-[#C9A555] font-bold">✓</span> {b}
              </span>
            ))}
          </motion.div>

          <motion.a href="tel:5599776959" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.46 }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-[#C9A555] text-[#1C2B5A] font-black px-8 py-4 rounded-lg text-lg hover:bg-[#e8c97a] transition-colors shadow-lg">
            📞 (559) 977-6959
          </motion.a>
        </div>
        {/* Form — order-1 on mobile so it appears above copy */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center md:justify-end order-1 md:order-2">
          <LeadForm />
        </motion.div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const steps = [
  { num: '01', title: 'Tell Us About Your Home', desc: 'Call us or fill out the form. We just need the address, condition, and your timeline to get started — no obligation.' },
  { num: '02', title: 'Receive a Fair Cash Offer', desc: 'We evaluate your Fresno or Clovis property and deliver a no-pressure cash offer within 24 hours.' },
  { num: '03', title: 'Close On Your Schedule', desc: 'Pick any closing date — as fast as 14 days or whenever works for you. We handle all the paperwork.' },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-10 md:mb-16">
          <p className="text-[#C9A555] text-sm font-bold uppercase tracking-widest mb-3">Simple 3-Step Process</p>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-3xl md:text-5xl font-bold text-[#1C2B5A]">
            How We Buy Houses in Fresno
          </h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.15}>
              <div className="relative p-8 bg-white rounded-2xl border border-slate-100 shadow-sm h-full group hover:shadow-md hover:border-[#C9A555]/30 transition-all">
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1C2B5A] flex items-center justify-center">
                  <span className="text-[#C9A555] text-xs font-black">{s.num}</span>
                </div>
                <div className="w-10 h-1 bg-[#C9A555] mb-5 rounded" />
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

// ─── Situations We Buy — SEO report: foreclosure, probate, divorce, as-is, landlord ───
const situations = [
  { icon: '⚠️', title: 'Facing Foreclosure in Fresno?', desc: 'We can close quickly to help you avoid foreclosure. Don\'t lose your equity — sell to us before the auction date.' },
  { icon: '⚖️', title: 'Inherited or Probate Property', desc: 'Selling an inherited house in Fresno? We buy probate properties fast, with or without probate completion, in any condition.' },
  { icon: '💔', title: 'Selling During Divorce', desc: 'Dividing assets is stressful enough. We make selling your Fresno or Clovis home quick, clean, and fair for both parties.' },
  { icon: '🔧', title: 'House Needs Major Repairs', desc: 'Roof, foundation, fire damage, mold — we buy houses as-is in Fresno. You don\'t fix a single thing before closing.' },
  { icon: '🏘️', title: 'Tired Landlord / Rental Property', desc: 'Done being a landlord? We buy rental properties in Fresno fast — even with tenants in place.' },
  { icon: '📦', title: 'Relocating or Downsizing', desc: 'Moving for work or retirement? Sell your Fresno or Clovis home on your timeline without the hassle of listing.' },
]

function Situations() {
  return (
    <section id="situations" className="bg-[#1C2B5A] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-10 md:mb-16">
          <p className="text-[#C9A555] text-sm font-bold uppercase tracking-widest mb-3">We Buy In Any Situation</p>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-3xl md:text-5xl font-bold text-white">
            Whatever Your Situation,<br />We Have a Solution
          </h2>
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {situations.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.09}>
              <div className="p-7 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C9A555]/40 transition-all group h-full">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#C9A555] transition-colors">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp className="text-center mt-12">
          <a href="tel:5599776959" className="inline-flex items-center gap-2 bg-[#C9A555] text-[#1C2B5A] font-black px-8 py-4 rounded-lg text-lg hover:bg-[#e8c97a] transition-colors">
            📞 Talk to Us Today — (559) 977-6959
          </a>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Cash Buyer vs. Realtor Comparison — SEO report recommendation ─────────────
function Comparison() {
  const rows = [
    { label: 'Closing Timeline', cash: '14 days or less', agent: '60–90+ days' },
    { label: 'Agent Commission', cash: '$0', agent: '5–6% of sale price' },
    { label: 'Closing Costs', cash: 'We cover them', agent: 'Paid by seller' },
    { label: 'Repairs Required', cash: 'None — sell as-is', agent: 'Usually expected' },
    { label: 'Open Houses', cash: 'None', agent: 'Multiple required' },
    { label: 'Sale Falling Through', cash: 'Much less likely', agent: 'Common risk' },
    { label: 'Offer Certainty', cash: 'No financing contingency', agent: 'Buyer financing risk' },
  ]
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp className="text-center mb-10 md:mb-14">
          <p className="text-[#C9A555] text-sm font-bold uppercase tracking-widest mb-3">Know Your Options</p>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-3xl md:text-5xl font-bold text-[#1C2B5A]">
            Selling to AVA Properties<br className="hidden md:block" /> vs. Listing with a Realtor
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm">Selling your Fresno or Clovis home through a traditional agent can take months and cost thousands. Here's how we compare.</p>
        </FadeUp>
        <FadeUp>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
              <div style={{ minWidth: '520px' }}>
                <div className="grid grid-cols-3 bg-[#1C2B5A] text-white text-sm font-bold py-4 px-4">
                  <span className="text-slate-300">Factor</span>
                  <span className="text-[#C9A555] text-center">AVA Properties</span>
                  <span className="text-center">Traditional Agent</span>
                </div>
                {rows.map((r, i) => (
                  <div key={r.label} className={`grid grid-cols-3 py-4 px-6 text-sm items-center ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                    <span className="text-slate-600 font-medium">{r.label}</span>
                    <span className="text-[#1C2B5A] font-bold text-center">{r.cash}</span>
                    <span className="text-slate-400 text-center">{r.agent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Testimonials — named + location per SEO report ──────────────────────────
const testimonials = [
  { quote: 'We needed to sell fast after my father passed. AVA Properties was compassionate, fair, and closed in 11 days. We couldn\'t have asked for a better experience.', name: 'Maria R.', location: 'Fresno, CA', date: 'March 2026', stars: 5 },
  { quote: 'I was behind on payments and didn\'t know what to do. They gave me a fair offer with no pressure and helped me avoid foreclosure entirely. Truly grateful.', name: 'James T.', location: 'Clovis, CA', date: 'January 2026', stars: 5 },
  { quote: 'Sold a rental property that needed a ton of work. Got a solid cash offer, no repairs, closed on my schedule. Would absolutely use AVA Properties again.', name: 'Sandra K.', location: 'Fresno, CA', date: 'February 2026', stars: 5 },
]

function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-5">
          <p className="text-[#C9A555] text-sm font-bold uppercase tracking-widest mb-3">Real Fresno Homeowners</p>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-3xl md:text-5xl font-bold text-[#1C2B5A]">
            What Our Sellers Say
          </h2>
        </FadeUp>
        <FadeUp className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2 shadow-sm">
            <span className="text-[#C9A555]">★★★★★</span>
            <span className="text-[#1C2B5A] font-bold text-sm">5.0 · 47 Google Reviews</span>
          </div>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.15}>
              <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, j) => <span key={j} className="text-[#C9A555] text-lg">★</span>)}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 flex-1 italic text-sm">"{t.quote}"</p>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[#1C2B5A] font-bold">{t.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{t.location} · {t.date}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ — addresses all key objections per SEO report ────────────────────────
const faqs = [
  { q: 'How fast can you close on my Fresno home?', a: 'We can typically close in as little as 14 days. If you need more time, we work entirely around your schedule — there\'s no rush or pressure.' },
  { q: 'Do I need to make repairs before selling?', a: 'No repairs needed — ever. We buy houses as-is in Fresno and Clovis in any condition, including major structural issues, fire damage, mold, or anything else. You don\'t touch a thing.' },
  { q: 'Are there any fees or commissions?', a: 'Zero. No agent commissions, no closing costs charged to you, no hidden fees. What we offer is exactly what you walk away with at closing.' },
  { q: 'How do you determine your cash offer?', a: 'We look at your property\'s location, condition, and recent comparable sales in the Fresno/Clovis area. We aim for a fair offer that works for both of us — and explain our reasoning clearly.' },
  { q: 'Can you help if I\'m facing foreclosure in Fresno?', a: 'Yes — and time matters. We can often close before your auction date to help you avoid foreclosure and potentially recover equity. Call us as soon as possible: (559) 977-6959.' },
  { q: 'Do you buy inherited or probate properties?', a: 'Yes. We regularly purchase inherited homes and probate properties in Fresno County, with or without full probate completion. We work with you and your attorney to make it simple.' },
  { q: 'What areas do you serve?', a: 'We primarily buy houses in Fresno and Clovis, CA, and also serve surrounding Fresno County communities including Madera, Visalia, and Hanford. Call us to confirm your address.' },
  { q: 'Is there any obligation after I get an offer?', a: 'None. Our cash offer is 100% free with zero pressure. Take all the time you need, consult family, decline — no hard feelings, ever.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp className="text-center mb-10 md:mb-16">
          <p className="text-[#C9A555] text-sm font-bold uppercase tracking-widest mb-3">Common Questions</p>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-3xl md:text-5xl font-bold text-[#1C2B5A]">
            Frequently Asked Questions
          </h2>
        </FadeUp>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden hover:border-[#C9A555]/40 transition-colors">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-[#1C2B5A] font-semibold text-sm hover:text-[#C9A555] transition-colors">
                  <span>{f.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="text-[#C9A555] text-2xl flex-shrink-0 ml-4 leading-none">+</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }} className="overflow-hidden">
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
    <section className="relative bg-[#1C2B5A] py-16 md:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A555] to-transparent" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #C9A555 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="flex justify-center mb-8"><AvaLogo className="h-16 w-auto" light={true} /></div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-3xl md:text-5xl font-black text-white mb-4">
            Ready to Sell Your Fresno Home for Cash?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Get a fair cash offer within 24 hours. No repairs, no fees, no commissions.
            Serving Fresno, Clovis, and all of Fresno County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a href="tel:5599776959" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="bg-[#C9A555] text-[#1C2B5A] font-black px-10 py-4 rounded-lg text-lg hover:bg-[#e8c97a] transition-colors shadow-lg">
              📞 Call (559) 977-6959
            </motion.a>
            <motion.a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="border-2 border-[#C9A555]/60 text-white font-bold px-10 py-4 rounded-lg text-lg hover:border-[#C9A555] hover:bg-[#C9A555]/10 transition-all">
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
    <footer className="bg-[#0e1a3a] border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <AvaLogo className="h-10 w-auto mb-2" light={true} />
          <p className="text-slate-500 text-sm">Fresno & Clovis, CA · (559) 977-6959</p>
          <a href="mailto:info@avahomebuyer.com" className="text-[#C9A555] text-sm hover:text-[#e8c97a] transition-colors">info@avahomebuyer.com</a>
          <p className="text-slate-600 text-xs mt-1">Cash home buyers serving Fresno County, CA</p>
        </div>
        <div className="text-slate-600 text-xs text-center md:text-right max-w-xs">
          <p>© {new Date().getFullYear()} AVA Properties Home Buyers. All rights reserved.</p>
          <p className="mt-2 leading-relaxed">We buy houses fast for cash in Fresno, Clovis, Madera, Visalia, and surrounding Fresno County communities.</p>
        </div>
      </div>
    </footer>
  )
}


// ─── Mobile Sticky CTA Bar ────────────────────────────────────────────────────
function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1C2B5A] border-t border-[#C9A555]/30 shadow-2xl">
      <div className="flex items-stretch">
        <a href="tel:5599776959"
          className="flex-1 flex flex-col items-center justify-center py-3 text-white hover:bg-[#243470] transition-colors border-r border-[#C9A555]/20"
        >
          <span className="text-xl">📞</span>
          <span className="text-xs font-bold text-[#C9A555] mt-0.5">Call Now</span>
          <span className="text-xs text-white/70">(559) 977-6959</span>
        </a>
        <a href="#"
          onClick={(e) => { e.preventDefault(); document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}
          className="flex-1 flex flex-col items-center justify-center py-3 bg-[#C9A555] hover:bg-[#e8c97a] transition-colors"
        >
          <span className="text-xl">🏡</span>
          <span className="text-xs font-black text-[#1C2B5A] mt-0.5">Get Cash Offer</span>
          <span className="text-xs text-[#1C2B5A]/70">Free · No obligation</span>
        </a>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="antialiased pb-16 md:pb-0">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Situations />
      <Comparison />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <MobileCTA />
    </div>
  )
}
