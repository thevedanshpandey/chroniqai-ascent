/**
 * Pre-rendering Script for ChroniqAI Resources
 * Generates static HTML fallbacks with complete SEO tags and semantic markup
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const RESOURCES_DIR = path.resolve(PUBLIC_DIR, 'resources');

// Sample authoritative posts for offline pre-rendering
const STATIC_POSTS = [
  {
    slug: 'b2b-linkedin-client-acquisition-guide-2026',
    title: 'The 2026 Guide to B2B LinkedIn Client Acquisition for High-Ticket Founders',
    metaDescription: 'Learn how B2B founders generate qualified high-ticket meetings on LinkedIn in 2026 without pitch-slapping, using trigger signals and the Gravity pull system.',
    category: 'Acquisition Playbooks',
    publishDate: '2026-07-20',
    tldr: 'LinkedIn client acquisition for high-ticket B2B in 2026 requires abandoning pitch-slapping and generic InMails. High-ticket founders win by combining 3 elements: account safety infrastructure, buyer intent trigger detection, and hyper-personalized 1-to-1 conversation starters.',
  },
  {
    slug: 'b2b-linkedin-account-safety-limits-2026',
    title: 'LinkedIn Account Safety & Daily Action Limits: The 2026 Founder Guide',
    metaDescription: 'The definitive guide to LinkedIn daily safety caps, browser fingerprinting, residential proxies, and keeping your founder profile in good standing.',
    category: 'Account Safety',
    publishDate: '2026-07-15',
    tldr: 'Never exceed 20-25 connection requests per day. Enforce 45-120s humanized random delays, run on dedicated static residential proxies, and isolate browser fingerprints.',
  },
  {
    slug: 'executive-buyer-intent-signals-playbook',
    title: 'Buyer Intent Signals & Account Triggers: How to Reach Prospects at the Perfect Moment',
    metaDescription: 'Stop guessing who wants your product. Learn how to monitor hiring spikes, technology migrations, and funding rounds to contact buyers during active purchase cycles.',
    category: 'Strategy & Intent',
    publishDate: '2026-07-10',
    tldr: 'Reach B2B accounts at peak receptive windows: 14-45 days after key leadership hires, during major cloud migrations, or following growth funding rounds.',
  }
];

export function generateStaticFallbacks() {
  if (!fs.existsSync(RESOURCES_DIR)) {
    fs.mkdirSync(RESOURCES_DIR, { recursive: true });
  }

  STATIC_POSTS.forEach((post) => {
    const postDir = path.resolve(RESOURCES_DIR, post.slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${post.title} — ChroniqAI Resources</title>
  <meta name="description" content="${post.metaDescription}" />
  <link rel="canonical" href="https://chroniqai.com/resources/${post.slug}" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.metaDescription}" />
  <meta property="og:url" content="https://chroniqai.com/resources/${post.slug}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${post.metaDescription}" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${post.title}",
    "description": "${post.metaDescription}",
    "author": {
      "@type": "Person",
      "name": "Ved",
      "jobTitle": "Founder of ChroniqAI"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChroniqAI",
      "url": "https://chroniqai.com"
    }
  }
  </script>
</head>
<body style="background:#030712;color:#f8fafc;font-family:system-ui,sans-serif;padding:30px;">
  <article style="max-width:800px;margin:0 auto;">
    <a href="/resources" style="color:#38bdf8;">&larr; Back to Resources</a>
    <h1 style="font-size:2.2rem;margin-top:20px;">${post.title}</h1>
    <p style="color:#94a3b8;font-size:0.9rem;">By Ved, Founder of ChroniqAI | Published ${post.publishDate}</p>
    <div style="background:rgba(30,41,59,0.8);border:1px solid rgba(255,255,255,0.1);padding:20px;border-radius:10px;margin:25px 0;">
      <h3 style="margin-top:0;color:#38bdf8;font-size:1rem;">Executive Summary (TL;DR)</h3>
      <p style="margin-bottom:0;color:#e2e8f0;line-height:1.6;">${post.tldr}</p>
    </div>
    <p><a href="/gravity" style="color:#38bdf8;font-weight:bold;">Explore ChroniqAI Gravity Platform &rarr;</a></p>
  </article>
  <script>
    // Seamless client-side SPA redirect if visited in modern browser
    if (window.location.pathname.startsWith('/resources/')) {
      // Allow browser React app to take over
    }
  </script>
</body>
</html>`;

    fs.writeFileSync(path.resolve(postDir, 'index.html'), htmlContent, 'utf-8');
  });

  console.log(`[SSR] Generated ${STATIC_POSTS.length} static pre-rendered fallback post directories.`);
}

generateStaticFallbacks();
