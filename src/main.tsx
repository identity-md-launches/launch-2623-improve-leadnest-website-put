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

type Product = { name: string; price: string; buyUrl: string; outcome: string };

// The catalogue, in page order. The first product leads the page; any others list below it.
const products: Product[] = [
  { name: 'LeadNest — The Playbook', price: '$9.00', buyUrl: BUY_URL, outcome: 'Launch an AI lead-capture service for contractors and get your first client live in 7 days.' },
];
const [featured, ...otherProducts] = products;

function BuyLink({ compact = false, className = '', product = featured }: { compact?: boolean; className?: string; product?: Product }) {
  const label = product === featured ? 'Get the Playbook' : `Get ${product.name}`;
  return <a className={`${compact ? 'button button-outline' : 'button button-primary'} ${className}`} href={product.buyUrl}>
    <span>{label}{!compact && <span className="button-price"> · {product.price}</span>}</span><Icon name="arrow" />
  </a>;
}

// Taken from the report's public preview at getnightshift.tech (outline and opening).
const contents: { number?: number; title: string }[] = [
  { number: 1, title: 'The short answer' },
  { number: 2, title: 'What you are selling' },
  { number: 3, title: 'Pick one niche today' },
  { number: 4, title: 'Same-day action plan (Day 0)' },
  { number: 5, title: 'Build checklist: first client live in 7 days' },
  { number: 6, title: 'Unit economics: what one client costs and earns' },
  { title: 'The ROI pitch to the contractor (use their numbers)' },
  { number: 7, title: 'Finding the first 10 customers' },
  { number: 8, title: 'Compliance: do not skip this section' },
  { number: 9, title: 'Metrics, budget and cash rules' },
];

function Sample() {
  return <section className="sample" id="sample" aria-labelledby="sample-title">
    <div className="sample-heading"><h2 id="sample-title">Look inside</h2><p>From the report’s free preview</p></div>
    <ol className="sample-contents">{contents.map(item => <li key={item.title} className={item.number ? '' : 'sample-sub'}>
      <span className="sample-number">{item.number ? String(item.number).padStart(2, '0') : ''}</span><span>{item.title}</span>
    </li>)}</ol>
    <blockquote className="sample-quote">
      <p>“Getting started with an AI lead-capture and follow-up service for roofing, plumbing, HVAC and property-service contractors, priced at $500–$1,500/month plus $500–$2,000 setup.”</p>
    </blockquote>
    <p className="sample-more">The full report has 17 sections. Research dated 20 October 2026.</p>
  </section>;
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
  { question: 'Who is the Playbook for?', answer: 'Anyone starting an AI lead-capture and follow-up service for roofing, plumbing, HVAC and property-service contractors: the businesses that pay $500–$1,500/mo for automated lead generation.' },
  { question: 'What do I get for $9.00?', answer: 'A 3,567-word Markdown report in 17 sections. It covers what you are selling, picking a niche, a same-day action plan, a 7-day build checklist, unit economics and the ROI pitch, finding your first 10 customers, compliance, and metrics and cash rules.' },
  { question: 'Is it a subscription?', answer: 'No. The Playbook is a one-time $9.00 purchase, with nothing to renew or cancel.' },
  { question: 'How do I buy and download it?', answer: 'Select “Get the Playbook” to open the checkout at getnightshift.tech. Payment is $9.00 in USDC on Base. Once it settles you get a download link for the report, valid for 7 days.' },
  { question: 'Are the numbers in it guaranteed?', answer: 'No. It is a researched guide, dated 20 October 2026. Prices, laws and vendor terms change, so the report marks each figure to re-check with [verify] before you quote it to a client.' },
];

function App() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header wrap">
      <a className="brand" href="#" aria-label="LeadNest home"><NestMark /><span>LeadNest</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#sample">Look inside</a><a href="#trades">The trades</a><a href="#faq">FAQs</a>
      </nav>
      <a className="mobile-faq" href="#faq">FAQs</a>
      <BuyLink compact className="header-buy" />
    </header>

    <main id="main" tabIndex={-1}>
      <section className="hero wrap" id="playbook" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title"><span>LeadNest —</span> The Playbook</h1>
          <p className="hero-outcome">{featured.outcome}</p>
          <div className="hero-buy">
            <BuyLink />
            <p className="purchase-note"><Icon name="check" />One-time {featured.price}. Download right after payment.</p>
          </div>
          <ul className="hero-facts" aria-label="What you get">
            <li><strong>3,567</strong> words</li><li><strong>17</strong> sections</li><li><strong>7-day</strong> launch checklist</li>
          </ul>
        </div>
        <Sample />
      </section>

      {otherProducts.length > 0 && <section className="more-products wrap" id="products" aria-labelledby="products-title">
        <h2 id="products-title">More from LeadNest</h2>
        <ul className="product-list">{otherProducts.map(product => <li key={product.name}><div><h3>{product.name}</h3><p>{product.outcome}</p></div><BuyLink product={product} /></li>)}</ul>
      </section>}

      <section className="trades-section" id="trades" aria-labelledby="trades-title">
        <div className="wrap">
          <div className="section-heading trades-heading"><h2 id="trades-title">Built for the work you do.</h2><p>For contractors investing $500–$1,500/mo<br className="desktop-break" /> in automated lead generation.</p></div>
          <ul className="trades-grid">{trades.map(trade => <li key={trade.name}><Icon name={trade.icon} /><h3>{trade.name}</h3><p>{trade.detail}</p></li>)}</ul>
        </div>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title">
        <div className="wrap approach-layout">
          <div className="approach-intro"><h2 id="approach-title">Let the leads come to you.</h2><p>We deliver qualified, appointment-ready leads 24/7 so you close more high-value jobs.</p><BuyLink className="approach-buy" /></div>
          <ol className="steps">{steps.map((step, i) => <li key={step.title}><span className="step-number">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="faq-section wrap" id="faq" aria-labelledby="faq-title">
        <div className="faq-intro"><h2 id="faq-title">Good questions.<br />Straight answers.</h2><p>A little clarity before<br className="desktop-break" /> your next move.</p></div>
        <div className="faq-list">{faqs.map(faq => <details key={faq.question}><summary><span>{faq.question}</span><Icon name="plus" /></summary><div className="faq-answer"><p>{faq.answer}</p></div></details>)}</div>
      </section>

      <section className="closing-section wrap" aria-labelledby="closing-title">
        <div className="closing-copy"><NestMark /><div><h2 id="closing-title">Start your lead service this week.</h2><p>One report, 17 sections, {featured.price} once.</p></div></div><BuyLink />
      </section>
    </main>

    <footer className="site-footer wrap"><a className="brand" href="#" aria-label="LeadNest home"><NestMark /><span>LeadNest</span></a><p>Built for the trades. Ready for what’s next.</p><a href="#faq">Questions? Read the FAQs<Icon name="arrow" /></a></footer>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
