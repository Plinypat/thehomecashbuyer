import { useEffect, useRef, useState } from 'react'
import './index.css'

const FORMSPREE = 'https://formspree.io/f/placeholder' // Patrick: swap with Alex's Formspree endpoint

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) { dotRef.current.style.left = mx + 'px'; dotRef.current.style.top = my + 'px' }
    }
    const loop = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px' }
      requestAnimationFrame(loop)
    }
    document.addEventListener('mousemove', onMove)
    loop()
    const hoverEls = () => document.querySelectorAll<HTMLElement>('a,button,input,select,.bc')
    const addH = () => hoverEls().forEach(el => {
      el.addEventListener('mouseenter', () => { dotRef.current?.classList.add('h'); ringRef.current?.classList.add('h') })
      el.addEventListener('mouseleave', () => { dotRef.current?.classList.remove('h'); ringRef.current?.classList.remove('h') })
    })
    addH()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])
  return (<><div className="cur" ref={dotRef} /><div className="cur-ring" ref={ringRef} /></>)
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') })
    }, { threshold: 0.08, rootMargin: '-30px' })
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ─── Counter ─────────────────────────────────────────────────────────────────
function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        if (target === 0) { if (ref.current) ref.current.textContent = '0'; obs.unobserve(e.target); return }
        const start = performance.now(), dur = 1800
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 4)
          if (ref.current) ref.current.textContent = Math.round(ease * target).toString()
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.unobserve(e.target)
      })
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>0</span>
}

// ─── Tilt Card ────────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    const cx = r.width / 2, cy = r.height / 2
    const rX = ((y - cy) / cy) * -9, rY = ((x - cx) / cx) * 9
    el.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(8px)`
    el.style.boxShadow = `${-rY * 2}px ${rX * 2}px 32px rgba(0,0,0,.1)`
  }
  const onLeave = () => {
    const el = ref.current; if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)'
    el.style.boxShadow = 'none'
  }
  return <div ref={ref} className={`bc ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
}

// ─── Magnetic Button ─────────────────────────────────────────────────────────
function MagBtn({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transform = `translate(${x * 0.22}px,${y * 0.22}px)`
  }
  const onLeave = () => {
    const el = ref.current; if (!el) return
    el.style.transition = 'transform .45s cubic-bezier(.16,1,.3,1)'
    el.style.transform = ''
    setTimeout(() => { if (el) el.style.transition = '' }, 450)
  }
  return <a ref={ref} href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</a>
}

// ─── Lead Form ────────────────────────────────────────────────────────────────
function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Cash Offer Request — ${form.name}`,
          name: form.name,
          phone: form.phone,
          address: form.address,
        }),
      })
      const data = await res.json()
      if (data.ok) setStatus('sent')
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'sent') return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
      <div className="ft">We'll be in touch!</div>
      <p className="fs" style={{ marginTop: 8 }}>Expect a call within 24 hours.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className="fg"><input required type="text" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
      <div className="fg"><input required type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
      <div className="fg"><input required type="text" placeholder="Property Address in Fresno or Clovis" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /></div>
      <button type="submit" className="btn-p" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Get My Free Cash Offer →'}
      </button>
      {status === 'error' && <p style={{ color: '#e55', fontSize: 12, marginTop: 8, textAlign: 'center' }}>Something went wrong. Please call (559) 977-6959.</p>}
      <div className="fn">No obligation · 100% confidential</div>
    </form>
  )
}

// ─── Marquee Items ────────────────────────────────────────────────────────────
const MQ_ITEMS = ['No Repairs Needed','Close in 14 Days','Zero Commissions','Cash Offer in 24 Hours','Any Condition','Fresno County Local','Trusted & Transparent','47 Five-Star Reviews']

export default function App() {
  useScrollReveal()

  return (
    <>
      <Cursor />

      {/* Nav */}
      <nav>
        <div className="nl">
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 900, color: '#0A0A0A', lineHeight: 1, letterSpacing: '-.3px' }}>
            AVA <span style={{ color: '#C9A555' }}>Properties</span>
          </div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#999', marginTop: 3 }}>Home Buyers</div>
        </div>
        <div className="nr">
          <a href="#how">How It Works</a>
          <a href="#benefits">Why Us</a>
          <a href="#reviews">Reviews</a>
          <MagBtn href="tel:5599776959" className="ncta">(559) 977-6959</MagBtn>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div>
          <div className="eyebrow"><div className="edot" /><span>Fresno &amp; Clovis, CA · ★★★★★ 47 Reviews</span></div>
          <h1 className="hh">
            <span className="rl"><span>Sell Your House</span></span>
            <span className="rl"><span>Fast for <span className="gold">Cash.</span></span></span>
            <span className="rl"><span>No Hassle.</span></span>
          </h1>
          <p className="hsub">We buy houses in Fresno and Clovis in any condition. No agent fees, no commissions, no repairs. Cash offer in 24 hours — close in as little as 14 days.</p>
          <div className="badges">
            <span className="badge">No Repairs Needed</span>
            <span className="badge">Zero Commissions</span>
            <span className="badge">Close in 14 Days</span>
            <span className="badge">Any Condition</span>
          </div>
          <MagBtn href="tel:5599776959" className="hphone">📞 (559) 977-6959</MagBtn>
        </div>
        <div className="hform">
          <div className="ft">Get Your Cash Offer</div>
          <div className="fs">Free · No obligation · Response within 24 hours</div>
          <LeadForm />
        </div>
      </section>

      {/* Marquee */}
      <div className="mq">
        <div className="mq-t">
          {[...MQ_ITEMS, ...MQ_ITEMS].map((item, i) => (
            <span key={i} className="mq-i"><span className="mq-d" />{item}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="stats">
        <div className="sg">
          <div className="sc rv"><div className="sn"><Counter target={14} /><span className="su">d</span></div><div className="sl">Average Close Time</div></div>
          <div className="sc rv d1"><div className="sn"><Counter target={24} /><span className="su">h</span></div><div className="sl">Cash Offer Turnaround</div></div>
          <div className="sc rv d2"><div className="sn">$<Counter target={0} /></div><div className="sl">Fees &amp; Commissions</div></div>
          <div className="sc rv d3"><div className="sn"><Counter target={47} /><span className="su">+</span></div><div className="sl">Five-Star Reviews</div></div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="how">
        <div className="how-hd rv"><div className="slabel">Simple Process</div><h2 className="stitle lt">How It Works</h2><div className="div c" /></div>
        <div className="how-g">
          <div className="sc2 rv d1"><div className="snum">01</div><div className="stit">Tell Us About Your Home</div><div className="sdesc">Call or fill out our quick form. No lengthy paperwork, no agent appointments. Just a 5-minute conversation.</div></div>
          <div className="sc2 rv d2"><div className="snum">02</div><div className="stit">Receive Your Cash Offer</div><div className="sdesc">We evaluate your property and present a fair, no-obligation cash offer — usually within 24 hours.</div></div>
          <div className="sc2 rv d3"><div className="snum">03</div><div className="stit">Choose Your Closing Date</div><div className="sdesc">You pick the date that works for you. We can close in as little as 14 days or on your timeline.</div></div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="bens">
        <div className="bens-hd rv"><div className="slabel">Why Choose Us</div><h2 className="stitle">The AVA Difference</h2><div className="div" /></div>
        <div className="bg">
          <TiltCard className="rv"><div className="bi">⚡</div><div className="bt">Close in 14 Days</div><div className="bd">No waiting for bank approvals or buyer financing to fall through. We move on your timeline.</div></TiltCard>
          <TiltCard className="rv d1"><div className="bi">🔨</div><div className="bt">Sell As-Is</div><div className="bd">No repairs, no staging, no cleaning. We buy homes in any condition — period.</div></TiltCard>
          <TiltCard className="rv d2"><div className="bi">💰</div><div className="bt">Zero Fees</div><div className="bd">Keep 100% of your offer. No agent fees, no closing costs. What we offer is what you get.</div></TiltCard>
          <TiltCard className="rv d1"><div className="bi">📋</div><div className="bt">No Obligation</div><div className="bd">Our offer is completely free. You decide if it works — zero pressure, zero strings.</div></TiltCard>
          <TiltCard className="rv d2"><div className="bi">🏠</div><div className="bt">Local Fresno Experts</div><div className="bd">We know the Fresno and Clovis market inside and out. Fair offers every time.</div></TiltCard>
          <TiltCard className="rv d3"><div className="bi">🤝</div><div className="bt">Trusted &amp; Transparent</div><div className="bd">Clear process, honest communication, and a team you can count on from day one.</div></TiltCard>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="testi">
        <div className="testi-hd rv"><div className="slabel">Real Fresno Homeowners</div><h2 className="stitle lt">What Our Sellers Say</h2><div className="div c" /></div>
        <div className="tg">
          <div className="tc rv d1"><div className="stars">★★★★★</div><div className="tq">"We needed to sell fast after my father passed. AVA Properties was compassionate, fair, and closed in 11 days. We couldn't have asked for a better experience."</div><div className="ta">Maria R.</div><div className="tl">Fresno, CA · March 2026</div></div>
          <div className="tc rv d2"><div className="stars">★★★★★</div><div className="tq">"I was behind on payments and didn't know what to do. They gave me a fair offer with no pressure and helped me avoid foreclosure entirely. Truly grateful."</div><div className="ta">James T.</div><div className="tl">Clovis, CA · January 2026</div></div>
          <div className="tc rv d3"><div className="stars">★★★★★</div><div className="tq">"Sold a rental property that needed a ton of work. Got a solid cash offer, no repairs, closed on my schedule. Would absolutely use AVA Properties again."</div><div className="ta">Sandra K.</div><div className="tl">Fresno, CA · February 2026</div></div>
        </div>
      </section>

      {/* CTA */}
      <section className="ctas">
        <div className="cte rv">Ready When You Are</div>
        <h2 className="ctt rv d1">Ready to Sell Your<br />Fresno Home for Cash?</h2>
        <p className="cts rv d2">Serving Fresno, Clovis, and all of Fresno County.</p>
        <div className="ctb rv d3">
          <MagBtn href="tel:5599776959" className="bg2">📞 Call (559) 977-6959</MagBtn>
          <MagBtn href="#" className="bo2">Get My Cash Offer →</MagBtn>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="fl">
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 900, color: 'rgba(255,255,255,.9)', lineHeight: 1, letterSpacing: '-.3px' }}>
              AVA <span style={{ color: '#C9A555' }}>Properties</span>
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginTop: 4 }}>Home Buyers</div>
          </div>
          <p>Fresno &amp; Clovis, CA · (559) 977-6959</p>
          <p style={{ marginTop: 3 }}>info@avahomebuyer.com</p>
          <div className="fsoc">
            <a className="si" href="#">f</a>
            <a className="si" href="#">in</a>
            <a className="si" href="#">G</a>
          </div>
        </div>
        <div className="fr">
          <p>© 2026 AVA Properties Home Buyers. All rights reserved.</p>
          <p style={{ marginTop: 8 }}>Cash home buyers serving Fresno, Clovis, Madera, Visalia, and surrounding Fresno County communities.</p>
        </div>
      </footer>
    </>
  )
}
