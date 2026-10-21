import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const BUY_URL = 'https://getnightshift.tech/buy/leadnest/64efeb32-ff92-4f26-9ab9-101dea01a110';

type IconName = 'arrow' | 'check' | 'roof' | 'plumbing' | 'hvac' | 'property' | 'plus';

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    roof: <><path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6M16 6V3h3v6" /></>,
    plumbing: <><path d="M5 3v8a3 3 0 0 0 3 3h8a3 3 0 0 1 3 3v4M9 3v6a1 1 0 0 0 1 1h6a7 7 0 0 1 7 7v4M3 3h8M17 21h6M8 10v5M15 10v4" /></>,
    hvac: <><circle cx="12" cy="12" r="2" /><path d="M10 10C4 8 5 2 9 3c3 0 4 4 3 7M14 10c2-6 8-5 7-1 0 3-4 4-7 3M14 14c6 2 5 8 1 7-3 0-4-4-3-7M10 14c-2 6-8 5-7 1 0-3 4-4 7-3" /></>,
    property: <><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-6h6v6M8 10h1M15 10h1" /></>,
    plus: <path d="M5 12h14M12 5v14" />,
  };
  return <svg className={`icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function NestMark({ className = '' }: { className?: string }) {
  return <svg className={`nest-mark ${className}`} width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="m5 20 15-14 15 14M5 28l15-14 15 14M5 36l15-14 15 14" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" /></svg>;
}

function BuyLink({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  return <a className={`${compact ? 'button button-outline' : 'button button-primary'} ${className}`} href={BUY_URL}>
    <span>Get the Playbook{!compact && <span className="button-price"> · $9.00</span>}</span><Icon name="arrow" />
  </a>;
}

function BookArtwork() {
  return <figure className="book-scene" aria-label="LeadNest The Playbook, a digital guide for service contractors. Illustrative cover.">
    <svg className="scene-lines" viewBox="0 0 580 580" fill="none" aria-hidden="true"><circle cx="290" cy="290" r="250" /><circle cx="290" cy="290" r="185" /><path d="M0 290h580M290 0v580" /><path d="M40 40h500v500H40z" strokeDasharray="3 8" /></svg>
    <div className="book" aria-hidden="true">
      <div className="book-spine" />
      <div className="book-cover">
        <div className="cover-brand"><NestMark /><span>LeadNest</span></div>
        <div className="cover-title">The<br />Playbook<span className="cover-dot">.</span></div>
        <svg className="cover-art" viewBox="0 0 300 220" fill="none" aria-hidden="true"><path d="m-20 160 170-150 170 150M-20 205 150 55l170 150M-20 250 150 100l170 150" stroke="currentColor" strokeWidth="25" /><path d="m70 230 80-70 80 70" stroke="currentColor" strokeWidth="25" /></svg>
        <div className="cover-bottom"><span>Built for the trades.</span><span>01</span></div>
      </div>
      <div className="book-pages" />
    </div>
    <figcaption><span className="caption-line" />Digital playbook. Real-world ambition.</figcaption>
  </figure>;
}

const trades: { name: string; icon: IconName; detail: string }[] = [
  { name: 'Roofing', icon: 'roof', detail: 'From repair to replacement' },
  { name: 'Plumbing', icon: 'plumbing', detail: 'Keep the right calls coming' },
  { name: 'HVAC', icon: 'hvac', detail: 'Demand beyond the busy season' },
  { name: 'Property services', icon: 'property', detail: 'More work in your service area' },
];

const steps = [
  { title: 'Reach the right people', body: 'Connect with homeowners who need your trade, in your service area.' },
  { title: 'Make the next step easy', body: 'Turn interest into a qualified enquiry, ready for an appointment.' },
  { title: 'Focus on closing the job', body: 'Put your time into good-fit opportunities and the work you do best.' },
];

const faqs = [
  { question: 'Who is LeadNest for?', answer: 'Roofing, plumbing, HVAC and property service contractors who want more qualified opportunities. Our lead-generation service is for businesses investing $500–$1,500 per month in automated lead generation.' },
  { question: 'What am I buying for $9.00?', answer: 'LeadNest — The Playbook is the introductory guide to our approach to lead generation for service contractors. The $9.00 purchase is for the Playbook; an ongoing lead-generation service is separate.' },
  { question: 'Is the Playbook a monthly subscription?', answer: 'No. The Playbook is a one-time $9.00 purchase. It does not enroll you in the monthly lead-generation service.' },
  { question: 'How do I buy the Playbook?', answer: 'Select “Get the Playbook” to open our checkout at getnightshift.tech. You can review the purchase and complete payment there.' },
  { question: 'Does the Playbook guarantee new jobs?', answer: 'No. The Playbook is a guide, and results depend on your business, market and how you put the approach into practice.' },
];

function App() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header wrap">
      <a className="brand" href="#" aria-label="LeadNest home"><NestMark /><span>LeadNest</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#approach">The approach</a><a href="#playbook">The Playbook</a><a href="#faq">FAQs</a>
      </nav>
      <a className="mobile-faq" href="#faq">FAQs</a>
      <BuyLink compact className="header-buy" />
    </header>

    <main id="main" tabIndex={-1}>
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">More jobs.<br /><span>Less chasing.</span></h1>
          <p className="hero-description">Qualified, appointment-ready leads, 24/7.<br className="desktop-break" /> Built for the trades.</p>
          <div className="hero-product" id="playbook">
            <h2>LeadNest — The Playbook</h2>
            <p>A practical starting point for better lead generation.</p>
            <BuyLink />
            <p className="purchase-note"><Icon name="check" />One-time purchase, no subscription.</p>
          </div>
        </div>
        <BookArtwork />
        <div className="hero-footnote"><span>More time on the tools, less on the phone.</span><a href="#trades">Built for businesses like yours<Icon name="arrow" /></a></div>
      </section>

      <section className="trades-section" id="trades" aria-labelledby="trades-title">
        <div className="wrap">
          <div className="section-heading trades-heading"><h2 id="trades-title">Built for the work you do.</h2><p>For contractors investing $500–$1,500/mo<br className="desktop-break" /> in automated lead generation.</p></div>
          <ul className="trades-grid">{trades.map(trade => <li key={trade.name}><Icon name={trade.icon} /><h3>{trade.name}</h3><p>{trade.detail}</p></li>)}</ul>
        </div>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title">
        <div className="wrap approach-layout">
          <div className="approach-intro"><h2 id="approach-title">Let the leads come to you.</h2><p>We deliver qualified, appointment-ready leads 24/7 so you close more high-value jobs.</p><a className="text-link" href="#playbook">Start with the Playbook<Icon name="arrow" /></a></div>
          <ol className="steps">{steps.map((step, i) => <li key={step.title}><span className="step-number">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="faq-section wrap" id="faq" aria-labelledby="faq-title">
        <div className="faq-intro"><h2 id="faq-title">Good questions.<br />Straight answers.</h2><p>A little clarity before<br className="desktop-break" /> your next move.</p></div>
        <div className="faq-list">{faqs.map(faq => <details key={faq.question}><summary><span>{faq.question}</span><Icon name="plus" /></summary><div className="faq-answer"><p>{faq.answer}</p></div></details>)}</div>
      </section>

      <section className="closing-section wrap" aria-labelledby="closing-title">
        <div className="closing-copy"><NestMark /><div><h2 id="closing-title">Make room for your next job.</h2><p>Start with the Playbook. Put the approach to work.</p></div></div><BuyLink />
      </section>
    </main>

    <footer className="site-footer wrap"><a className="brand" href="#" aria-label="LeadNest home"><NestMark /><span>LeadNest</span></a><p>Built for the trades. Ready for what’s next.</p><a href="#faq">Questions? Read the FAQs<Icon name="arrow" /></a></footer>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
