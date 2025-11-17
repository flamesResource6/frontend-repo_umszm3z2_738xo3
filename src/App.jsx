import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion'
import { Shield, Wallet, Brain, LineChart, Sparkles, Globe2, Lock, Zap, ArrowRight, Play, ExternalLink, CheckCircle2, Cpu, Network, BarChart3, Layers, Timer, Activity } from 'lucide-react'
import Spline from '@splinetool/react-spline'

function useCounter(to, duration = 1600, delay = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = performance.now() + delay
    const end = start + duration
    let raf
    const tick = (t) => {
      if (t < start) {
        raf = requestAnimationFrame(tick)
        return
      }
      const progress = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * to))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration, delay])
  return value
}

const Container = ({ children }) => (
  <div className="relative min-h-screen overflow-hidden bg-[#070b12] text-white">
    {/* subtle gradient glow */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(88,101,242,0.15),transparent_55%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,255,255,0.09),transparent_40%)]" />
    <div className="relative z-10">{children}</div>
  </div>
)

const Glass = ({ children, className = '' }) => (
  <div className={`backdrop-blur-md/30 bg-white/5 border border-white/10 ${className}`}>{children}</div>
)

const GradientButton = ({ children, variant = 'primary' }) => {
  const base = 'relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300'
  if (variant === 'primary') {
    return (
      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
        className={`${base} text-white shadow-[0_0_24px_rgba(56,189,248,0.35)]`}
        style={{
          background: 'linear-gradient(90deg, rgba(56,189,248,1), rgba(168,85,247,1))',
        }}>
        {children}
      </motion.button>
    )
  }
  return (
    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
      className={`${base} text-cyan-300/90 hover:text-white border border-cyan-400/30 bg-cyan-400/5`}>{children}</motion.button>
  )
}

const Navbar = () => {
  const { scrollY } = useScroll()
  const height = useTransform(scrollY, [0, 100], [80, 62])
  const bg = useTransform(scrollY, [0, 100], [0.1, 0.4])
  const blur = useTransform(scrollY, [0, 100], [6, 12])
  const box = useTransform(scrollY, [0, 100], [0, 0.15])

  return (
    <motion.nav style={{ height }} className="fixed inset-x-0 top-0 z-40">
      <motion.div
        style={{ backgroundColor: `rgba(8,12,20,${bg.get()})`, backdropFilter: `saturate(180%) blur(${blur.get()}px)`, boxShadow: `0 10px 30px rgba(0,0,0,${box.get()})` }}
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 rounded-b-2xl border-b border-white/10 bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 shadow-[0_0_24px_rgba(99,102,241,0.45)]">
            <span className="text-sm font-black tracking-wider">HTA</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm tracking-widest text-white/80">Hyper Trading Automation</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
          {['Platform','Web3','Security','Pricing','Docs'].map((i)=> (
            <a key={i} href={`#${i.toLowerCase()}`} className="hover:text-white transition-colors">{i}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <GradientButton>Launch App <ArrowRight className="h-4 w-4" /></GradientButton>
          <GradientButton variant="ghost">View Docs <ExternalLink className="h-4 w-4" /></GradientButton>
        </div>
      </motion.div>
    </motion.nav>
  )
}

const Hero = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-200, 200], [10, -10])
  const rotateY = useTransform(x, [-200, 200], [-10, 10])

  const onMouseMove = (e) => {
    const { innerWidth, innerHeight } = window
    x.set(e.clientX - innerWidth / 2)
    y.set(e.clientY - innerHeight / 2)
  }

  return (
    <section className="relative flex min-h-[92vh] items-center pt-24" onMouseMove={onMouseMove}>
      {/* 3D Spline background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vi0ijCQQJTRFc8LA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* gradient overlay to increase contrast, do not block pointer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#070b12]/40 via-[#070b12]/30 to-[#070b12]/80" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
          >
            Hyper Trading Automation for Web3 Markets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="mt-5 max-w-xl text-base text-white/70 sm:text-lg"
          >
            AI-driven, non-custodial trading automations that plug into wallets and exchanges, executing across crypto and traditional markets with institutional-grade risk controls.
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <GradientButton>
              <Wallet className="h-4 w-4" />
              Connect Wallet & Start
            </GradientButton>
            <GradientButton variant="ghost">
              <Play className="h-4 w-4" />
              Watch Strategy Demo
            </GradientButton>
          </div>
          <div className="mt-8 flex items-center gap-6 text-white/70">
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-cyan-300" /><span>Non-custodial</span></div>
            <div className="flex items-center gap-2"><Brain className="h-4 w-4 text-fuchsia-300" /><span>AI-Optimized</span></div>
            <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-violet-300" /><span>Low Latency</span></div>
          </div>
        </div>

        {/* Dashboard mockup */}
        <motion.div style={{ rotateX, rotateY }}
          className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/60 via-fuchsia-500/60 to-violet-500/60 blur-xl opacity-50" />
          <div className="relative rounded-2xl border border-white/10 bg-[#0b1220]/80 p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-white/80 text-sm">Live P&L</div>
              <div className="text-emerald-400 font-semibold">+$2,483.12</div>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-2">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="col-span-1 h-16 overflow-hidden rounded bg-white/5">
                  <div className="h-full w-full origin-bottom bg-gradient-to-t from-cyan-400 to-fuchsia-400" style={{ transform: `scaleY(${(Math.sin(i/2)+1)/2})` }} />
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { name: 'Momentum', on: true },
                { name: 'Market-Neutral', on: true },
                { name: 'Delta-Hedge', on: false },
              ].map((s) => (
                <div key={s.name} className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${s.on ? 'border-cyan-400/40 bg-cyan-400/5' : 'border-white/10 bg-white/5'}`}>
                  <span>{s.name}</span>
                  <span className={`h-2.5 w-2.5 rounded-full ${s.on ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]' : 'bg-white/30'}`} />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="mb-2 text-white/70 text-sm">Recent Executions</div>
              <div className="space-y-2">
                {[
                  { t: 'ETH-USD', a: 'BUY', p: '3,245.12', q: '1.2' },
                  { t: 'BTC-USD', a: 'SELL', p: '64,120.44', q: '0.05' },
                  { t: 'SOL-USD', a: 'BUY', p: '178.20', q: '10' },
                ].map((o, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white/80">{o.t}</span>
                      <span className={`rounded px-2 py-0.5 text-xs ${o.a === 'BUY' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-400/15 text-rose-300'}`}>{o.a}</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/70">
                      <span>${o.p}</span>
                      <span>{o.q}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl"
  >
    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/30 via-fuchsia-400/30 to-violet-400/30 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative z-10">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20">
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-white/70 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
)

const Features = () => (
  <section id="platform" className="relative py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Why Hyper Trading</h2>
        <p className="mt-3 text-white/70">Engineered for performance, compliance, and scale.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard icon={Brain} title="AI-Optimized Strategies" desc="Ensemble models, robust backtests, and real-time risk controls deliver adaptive execution across regimes." />
        <FeatureCard icon={Wallet} title="Non-Custodial Web3" desc="Connect with MetaMask, WalletConnect, or Ledger. You maintain control of keys; we automate execution." />
        <FeatureCard icon={Shield} title="Risk Engine" desc="Institutional-grade guardrails: max drawdown, position limits, pre-trade checks, and kill-switch." />
        <FeatureCard icon={LineChart} title="Real-Time Analytics" desc="Latency, slippage, and portfolio metrics streamed live with granular insights." />
      </div>
    </div>
  </section>
)

const Integrations = () => (
  <section id="web3" className="relative py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold">Web3 Integration</h3>
          <p className="mt-3 text-white/70">Non-custodial by design. One-click wallet connect and permissioned smart-contract execution for strategies.</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-white/70">
            {['Ethereum','Polygon','Arbitrum','Solana','Avalanche','BSC'].map((n)=> (
              <div key={n} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center">{n}</div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-400/40 to-fuchsia-400/40 blur-xl" />
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <DiagramItem icon={Wallet} title="Wallet" />
              <DiagramItem icon={Cpu} title="Strategy Engine" />
              <DiagramItem icon={Network} title="DEX/CEX" />
              <DiagramItem icon={CheckCircle2} title="Payout to Wallet" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const DiagramItem = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b1220]/60 p-4">
    <Icon className="h-5 w-5 text-cyan-300" />
    <span className="text-sm">{title}</span>
  </div>
)

const Steps = () => (
  <section className="relative py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold">How it works</h3>
          <div className="mt-6 space-y-6">
            {[
              { n: 1, t: 'Connect your wallet or exchange API' },
              { n: 2, t: 'Choose or customize a strategy (risk, leverage, assets)' },
              { n: 3, t: 'Monitor live P&L and let automation execute 24/7' },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 text-cyan-300 font-bold">{s.n}</div>
                <p className="pt-1 text-white/80">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-cyan-400/30 via-fuchsia-400/30 to-violet-400/30 blur-lg" />
          <div className="relative rounded-xl border border-white/10 bg-[#0b1220]/80 p-4">
            <div className="mb-3 text-sm text-white/70">strategy.yaml</div>
            <pre className="overflow-auto rounded-lg bg-black/40 p-4 text-xs leading-relaxed text-cyan-100">
{`strategy: momentum_v3\nassets: [BTC-USD, ETH-USD, SOL-USD]\nrisk:\n  max_drawdown: 0.12\n  position_limit: 0.2\nexecution:\n  venue: auto\n  slippage_bps: 5\n  latency_target_ms: 120\nwallet:\n  type: metamask\n  network: arbitrum`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Metrics = () => {
  const volume = useCounter(128_400_000, 1800)
  const strategies = useCounter(842, 1600, 200)
  const drawdown = useCounter(9, 1400, 400)
  const latency = useCounter(99, 1400, 600)
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <StatCard icon={Activity} label="Total Volume" value={`$${(volume/1_000_000).toFixed(1)}M`} />
          <StatCard icon={Layers} label="Strategies Running" value={`${strategies}`} />
          <StatCard icon={Timer} label="Max Monthly Drawdown" value={`-${drawdown}%`} />
          <StatCard icon={BarChart3} label="Uptime (30d)" value={`${latency}.${Math.floor(Math.random()*9)}%`} />
        </div>
        <div className="mt-10">
          <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="absolute inset-0 opacity-60">
              <NeonGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
    <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20">
      <Icon className="h-5 w-5 text-cyan-300" />
    </div>
    <div className="text-2xl font-semibold">{value}</div>
    <div className="mt-1 text-xs text-white/70">{label}</div>
  </div>
)

const NeonGrid = () => (
  <svg className="h-full w-full" viewBox="0 0 600 200" preserveAspectRatio="none">
    {[...Array(12)].map((_, r) => (
      <g key={r}>
        <line x1="0" y1={r*16} x2="600" y2={r*16} stroke="url(#g)" strokeWidth="1" />
      </g>
    ))}
    {[...Array(20)].map((_, c) => (
      <g key={c}>
        <line x1={c*30} y1="0" x2={c*30} y2="200" stroke="url(#g)" strokeWidth="1" />
      </g>
    ))}
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4"/>
        <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4"/>
      </linearGradient>
    </defs>
  </svg>
)

const Security = () => (
  <section id="security" className="relative py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1322] to-[#0b0f1a] p-8">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20">
              <Shield className="h-6 w-6 text-cyan-300" />
            </div>
            <h3 className="text-2xl font-semibold">Security & Compliance</h3>
            <ul className="mt-4 space-y-3 text-white/80">
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300"/> Non-custodial: funds stay in your wallet</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300"/> Permissioned smart contracts & audited execution paths</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300"/> Granular risk limits and kill-switch for all strategies</li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400/40 to-violet-400/40 blur-xl" />
            <div className="relative grid place-items-center rounded-2xl border border-white/10 bg-[#0b1220]/80 p-8">
              <Lock className="h-20 w-20 text-cyan-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => (
  <section id="pricing" className="relative py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="text-3xl font-bold">Pricing</h3>
        <p className="mt-2 text-white/70">Choose a model that fits your volume and strategy.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PriceCard name="Starter" price="$0/mo" note="0.15% of automated volume" cta="Get Started" />
        <PriceCard name="Pro" price="$99/mo" note="0.10% volume + 5% performance fee" cta="Upgrade" featured />
        <PriceCard name="Institutional" price="Talk to us" note="Custom SLAs, dedicated routing, private strategies" cta="Contact Sales" />
      </div>
    </div>
  </section>
)

const PriceCard = ({ name, price, note, cta, featured }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className={`relative overflow-hidden rounded-2xl border p-6 ${featured ? 'border-cyan-400/40 bg-cyan-400/5 shadow-[0_0_40px_rgba(34,211,238,0.15)]' : 'border-white/10 bg-white/5'}`}
  >
    {featured && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/5 to-transparent" />}
    <div className="relative z-10">
      <div className="text-sm text-white/70">{name}</div>
      <div className="mt-2 text-3xl font-semibold">{price}</div>
      <div className="mt-2 text-sm text-white/70">{note}</div>
      <div className="mt-6">
        <GradientButton>{cta}</GradientButton>
      </div>
    </div>
  </motion.div>
)

const FAQ = () => (
  <section className="relative py-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <h3 className="text-2xl font-semibold">FAQ</h3>
      <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
        {[
          { q: 'Is this non-custodial?', a: 'Yes. You retain control of your funds and keys. Smart contracts handle permissioned execution.' },
          { q: 'Which chains and exchanges are supported?', a: 'Major EVM chains and leading CEX/DEX venues. Additional integrations ship continuously.' },
          { q: 'Can I create my own strategy?', a: 'Yes. Compose parameters or deploy private strategies with custom routing and risk limits.' },
          { q: 'What are the risks?', a: 'Markets carry risk. Use risk limits, test with paper or small size, and monitor drawdowns.' },
          { q: 'How is performance measured?', a: 'We report live P&L, realized slippage, latency, and attribution across strategies.' },
          { q: 'Do you take fees?', a: 'We offer tiered volume and optional performance fees depending on your plan.' },
          { q: 'Is this compliant?', a: 'We design with compliance in mind and offer features for institutional governance and reporting.' },
          { q: 'Can I disconnect anytime?', a: 'Yes. Stop or pause strategies instantly with a global kill-switch.' },
        ].map((item, i) => (
          <details key={i} className="group px-6 py-4 open:bg-white/5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-white/90">
              {item.q}
              <span className="ml-4 text-cyan-300 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm text-white/70">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)

const FinalCTA = () => (
  <section className="relative py-24">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
      <h3 className="text-3xl font-bold sm:text-4xl">Automate your Web3 trading in minutes.</h3>
      <p className="mx-auto mt-3 max-w-2xl text-white/70">Connect your wallet, choose a strategy, and let AI execute around the clock with full transparency and control.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <GradientButton>Launch App <ArrowRight className="h-4 w-4" /></GradientButton>
        <GradientButton variant="ghost">Talk to Us <ExternalLink className="h-4 w-4" /></GradientButton>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="relative border-t border-white/10 py-10">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-white/70 sm:flex-row sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600">
          <span className="text-[10px] font-black">HTA</span>
        </div>
        <span>© {new Date().getFullYear()} Hyper Trading Automation</span>
      </div>
      <div className="flex items-center gap-6">
        {['Docs','API','Discord','Twitter','Email'].map((l)=> (
          <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
        ))}
      </div>
    </div>
  </footer>
)

function App() {
  return (
    <Container>
      <Navbar />
      <Hero />
      <Features />
      <Integrations />
      <Steps />
      <Metrics />
      <Security />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </Container>
  )
}

export default App
