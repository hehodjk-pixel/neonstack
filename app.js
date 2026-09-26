// NEONSTACK landing page: packages, cart, checkout and the AI demo chat.

// 5 categories x 3 tiers = 15 packages.
const PACKAGES = [
  {
    name: 'AI Integration', icon: '🤖', tagline: 'OpenAI • Groq • RAG • Agents', color: 'cyan',
    tiers: [
      { id: 'ai-starter', name: 'AI Starter', price: 1899, days: 7, features: ['One LLM feature added to your app', 'Prompt design and evaluation', 'Deployment and docs'] },
      { id: 'ai-pro', name: 'AI Pro', price: 3499, days: 14, features: ['RAG over your docs or database', 'Vector store setup', 'Usage and cost dashboard'] },
      { id: 'ai-agents', name: 'AI Agents', price: 6999, days: 28, features: ['Multi-step agents with tool use', 'Integrations with your stack', 'Guardrails and monitoring'] },
    ],
  },
  {
    name: 'Full-Stack Apps', icon: '🚀', tagline: 'Next.js • React • Postgres', color: 'purple',
    tiers: [
      { id: 'fs-landing', name: 'Launch Site', price: 1499, days: 5, features: ['Responsive marketing site', 'CMS or markdown content', 'SEO and analytics'] },
      { id: 'fs-mvp', name: 'SaaS MVP', price: 4999, days: 21, features: ['Auth, billing and dashboard', 'Postgres + API', 'CI/CD and hosting'] },
      { id: 'fs-scale', name: 'Scale Build', price: 8999, days: 42, features: ['Multi-tenant architecture', 'Admin tools and roles', 'Load testing and observability'] },
    ],
  },
  {
    name: 'AI Chatbots', icon: '💬', tagline: 'Support • Sales • WhatsApp', color: 'pink',
    tiers: [
      { id: 'bot-lite', name: 'Chatbot Lite', price: 1499, days: 5, features: ['Website chat widget', 'Trained on your FAQ', 'Lead capture to email'] },
      { id: 'bot-pro', name: 'Chatbot Pro', price: 2999, days: 10, features: ['Knowledge-base answers with sources', 'Human hand-off', 'CRM integration'] },
      { id: 'bot-omni', name: 'Omnichannel Bot', price: 5499, days: 21, features: ['Web, WhatsApp and Slack', 'Booking and payments', 'Conversation analytics'] },
    ],
  },
  {
    name: 'Python Automation', icon: '⚙️', tagline: 'Scraping • Workflows • Bots', color: 'emerald',
    tiers: [
      { id: 'py-script', name: 'Automation Script', price: 1399, days: 4, features: ['One workflow automated', 'Scheduled runs', 'Error alerts'] },
      { id: 'py-pipeline', name: 'Data Pipeline', price: 2799, days: 10, features: ['Scraping or ETL pipeline', 'Clean data to Sheets or a DB', 'Retry and logging'] },
      { id: 'py-ops', name: 'Ops Suite', price: 4999, days: 21, features: ['Up to 5 connected workflows', 'Admin panel', 'Hand-off training'] },
    ],
  },
  {
    name: 'Backend & APIs', icon: '🔌', tagline: 'FastAPI • Node • Integrations', color: 'amber',
    tiers: [
      { id: 'api-starter', name: 'API Starter', price: 1599, days: 5, features: ['REST API with up to 8 endpoints', 'OpenAPI docs', 'Tests and deploy'] },
      { id: 'api-pro', name: 'API Pro', price: 3299, days: 14, features: ['Auth, rate limits and webhooks', 'Third-party integrations', 'Background jobs'] },
      { id: 'api-platform', name: 'API Platform', price: 6499, days: 30, features: ['Microservices or modular monolith', 'Event queue', 'Monitoring and runbooks'] },
    ],
  },
];

const TIERS = PACKAGES.flatMap((cat, catIndex) => cat.tiers.map(t => ({ ...t, category: cat.name, catIndex })));
const findTier = id => TIERS.find(t => t.id === id);
const money = n => '$' + n.toLocaleString('en-US');
const $ = id => document.getElementById(id);
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- Packages ----------

function renderServices() {
  $('services-grid').innerHTML = PACKAGES.map((cat, i) => {
    const from = Math.min(...cat.tiers.map(t => t.price));
    return `
      <div onclick="showService(${i})" class="card bg-zinc-950 border border-zinc-700 hover:border-cyan-400 neon-border rounded-3xl p-8 cursor-pointer" role="button" tabindex="0" onkeydown="if(event.key==='Enter')showService(${i})">
        <div class="text-7xl mb-8">${cat.icon}</div>
        <h3 class="text-3xl title font-bold">${cat.name}</h3>
        <p class="text-zinc-400">${cat.tagline}</p>
        <div class="mt-10 text-4xl font-bold text-cyan-400">${money(from)}<span class="text-xs align-super ml-1">from</span></div>
        <div class="text-xs text-zinc-500 mt-2">${cat.tiers.length} packages</div>
      </div>`;
  }).join('');
}

function showService(i) {
  const cat = PACKAGES[i];
  if (!cat) return;
  $('service-modal-body').innerHTML = `
    <div class="text-6xl mb-4">${cat.icon}</div>
    <h3 class="text-4xl md:text-5xl title font-bold neon-cyan mb-2">${cat.name}</h3>
    <p class="text-zinc-400 mb-10">${cat.tagline}</p>
    <div class="grid md:grid-cols-3 gap-6">
      ${cat.tiers.map((t, j) => `
        <div class="glass rounded-3xl p-6 flex flex-col ${j === 1 ? 'border-cyan-400/60' : ''}">
          ${j === 1 ? '<div class="text-xs uppercase tracking-widest text-cyan-400 mb-2">Most popular</div>' : ''}
          <h4 class="text-2xl title font-bold">${t.name}</h4>
          <div class="text-4xl font-bold text-cyan-400 my-4">${money(t.price)}</div>
          <div class="text-sm text-zinc-400 mb-4"><i class="fas fa-clock mr-2"></i>${t.days}-day delivery</div>
          <ul class="space-y-2 text-sm text-zinc-300 flex-1">
            ${t.features.map(f => `<li><i class="fas fa-check text-emerald-400 mr-2"></i>${f}</li>`).join('')}
          </ul>
          <button data-add="${t.id}" class="mt-6 w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold rounded-2xl">Add to Cart</button>
        </div>`).join('')}
    </div>`;
  $('service-modal').classList.remove('hidden');
  refreshAddButtons();
}

function closeService() {
  $('service-modal').classList.add('hidden');
}

// ---------- Cart ----------

let cart = loadCart();

function loadCart() {
  try {
    const ids = JSON.parse(localStorage.getItem('neonstack-cart') || '[]');
    return Array.isArray(ids) ? ids.filter(findTier) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try { localStorage.setItem('neonstack-cart', JSON.stringify(cart)); } catch { /* storage unavailable */ }
}

function addToCart(id) {
  const tier = findTier(id);
  if (!tier) return;
  if (cart.includes(id)) {
    toast(`${tier.name} is already in your cart`);
    return;
  }
  cart.push(id);
  saveCart();
  renderCart();
  toast(`Added ${tier.name} to your cart`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x !== id);
  saveCart();
  renderCart();
}

function cartTotal() {
  return cart.reduce((sum, id) => sum + findTier(id).price, 0);
}

function renderCart() {
  $('cart-count').textContent = cart.length;
  $('cart-total').textContent = money(cartTotal());
  $('checkout-btn').disabled = cart.length === 0;
  $('cart-items').innerHTML = cart.length === 0
    ? `<div class="text-center text-zinc-500 py-16">
         <i class="fas fa-cart-shopping text-5xl mb-4"></i>
         <p>Your cart is empty.</p>
         <button onclick="toggleCart(false);document.getElementById('services').scrollIntoView({behavior:'smooth'})" class="mt-6 text-cyan-400 hover:underline">Browse packages →</button>
       </div>`
    : cart.map(id => {
        const t = findTier(id);
        return `
          <div class="glass rounded-2xl p-4 flex justify-between items-center gap-4">
            <div>
              <div class="font-semibold">${t.name}</div>
              <div class="text-xs text-zinc-400">${t.category} • ${t.days}-day delivery</div>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-bold text-cyan-400">${money(t.price)}</span>
              <button data-remove="${id}" class="text-zinc-500 hover:text-pink-400" aria-label="Remove ${t.name}"><i class="fas fa-trash"></i></button>
            </div>
          </div>`;
      }).join('');
  refreshAddButtons();
}

function refreshAddButtons() {
  document.querySelectorAll('[data-add]').forEach(btn => {
    const inCart = cart.includes(btn.dataset.add);
    btn.textContent = inCart ? 'In Cart ✓' : 'Add to Cart';
    btn.classList.toggle('opacity-60', inCart);
  });
}

function toggleCart(force) {
  const drawer = $('cart-drawer');
  const open = typeof force === 'boolean' ? force : drawer.classList.contains('translate-x-full');
  drawer.classList.toggle('translate-x-full', !open);
  $('cart-overlay').classList.toggle('hidden', !open);
  if (open) closeService();
}

// ---------- Checkout ----------

function checkout() {
  if (cart.length === 0) return;
  $('checkout-summary').innerHTML =
    cart.map(id => { const t = findTier(id); return `<div class="flex justify-between"><span>${t.name}</span><span>${money(t.price)}</span></div>`; }).join('') +
    `<div class="flex justify-between font-bold text-white border-t border-zinc-800 pt-2 mt-2"><span>Total</span><span>${money(cartTotal())}</span></div>`;
  toggleCart(false);
  $('checkout-modal').classList.remove('hidden');
}

function closeCheckout() {
  $('checkout-modal').classList.add('hidden');
}

function placeOrder(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const ref = 'NS-' + Date.now().toString(36).toUpperCase().slice(-6);
  $('success-text').innerHTML =
    `Thanks, ${escapeHtml(data.get('name'))}! Order <b>${ref}</b> for ${money(cartTotal())} is in. ` +
    `A scope call invite will go to <b>${escapeHtml(data.get('email'))}</b> within 24 hours.`;
  cart = [];
  saveCart();
  renderCart();
  e.target.reset();
  closeCheckout();
  $('success-modal').classList.remove('hidden');
}

function closeSuccess() {
  $('success-modal').classList.add('hidden');
}

// ---------- AI demo chat ----------
// Runs entirely in the browser: answers are matched from PACKAGES, no API calls.

const CHIPS = ['Show all packages', 'Cheapest option?', 'I need a chatbot', 'How fast can you deliver?', 'Money-back guarantee?'];
let chatStarted = false;

function openChat() {
  $('chat-panel').classList.remove('hidden');
  $('chat-fab').classList.add('hidden');
  if (!chatStarted) {
    chatStarted = true;
    botSay("Hi! I'm the NEONSTACK demo assistant. Ask me about the 15 packages, prices or delivery times, and I can add one to your cart.");
    $('chat-chips').innerHTML = CHIPS.map(c => `<button data-chip="${c}" class="shrink-0 px-3 py-1.5 rounded-full border border-cyan-400/40 hover:bg-cyan-400/10">${c}</button>`).join('');
  }
  $('chat-input').focus();
}

function closeChat() {
  $('chat-panel').classList.add('hidden');
  $('chat-fab').classList.remove('hidden');
}

function addBubble(html, who) {
  const el = document.createElement('div');
  el.className = who === 'user'
    ? 'ml-auto max-w-[85%] bg-cyan-400 text-black rounded-2xl rounded-br-sm px-4 py-2'
    : 'max-w-[85%] glass rounded-2xl rounded-bl-sm px-4 py-2';
  el.innerHTML = html;
  $('chat-messages').appendChild(el);
  $('chat-messages').scrollTop = $('chat-messages').scrollHeight;
  return el;
}

function botSay(html) {
  addBubble(html, 'bot');
}

function userAsk(text) {
  text = text.trim();
  if (!text) return;
  addBubble(escapeHtml(text), 'user');
  const typing = addBubble('<i class="fas fa-ellipsis fa-beat"></i>', 'bot');
  setTimeout(() => { typing.remove(); botSay(answer(text)); }, 500);
}

const tierLine = t => `<b>${t.name}</b> (${t.category}) ${money(t.price)}, ${t.days} days <button data-add="${t.id}" class="text-cyan-400 underline ml-1">Add to Cart</button>`;

function answer(q) {
  const s = q.toLowerCase();
  const has = (...words) => words.some(w => s.includes(w));

  // A specific package by name
  const tier = TIERS.find(t => s.includes(t.name.toLowerCase()));
  if (tier) return `${tierLine(tier)}<br><span class="text-zinc-400">Includes: ${tier.features.join(', ')}.</span>`;

  if (has('guarantee', 'refund', 'money back', 'money-back')) {
    return "Every package has a 14-day money-back guarantee: if the first milestone isn't what we agreed, you get a full refund.";
  }
  if (has('cheap', 'lowest', 'budget', 'affordable', 'smallest')) {
    const cheapest = [...TIERS].sort((a, b) => a.price - b.price).slice(0, 3);
    return 'The most affordable packages:<br>' + cheapest.map(tierLine).join('<br>');
  }
  if (has('fast', 'quick', 'deliver', 'timeline', 'how long', 'days', 'urgent')) {
    const fastest = [...TIERS].sort((a, b) => a.days - b.days).slice(0, 3);
    return 'Delivery runs from 4 to 42 days depending on the package. The fastest:<br>' + fastest.map(tierLine).join('<br>');
  }
  if (has('cart', 'checkout', 'buy', 'order')) {
    return cart.length
      ? `You have ${cart.length} package${cart.length > 1 ? 's' : ''} in your cart (${money(cartTotal())}). <button onclick="toggleCart(true)" class="text-cyan-400 underline">Open cart</button>`
      : 'Your cart is empty. Tell me what you need and I will suggest a package.';
  }

  // A category by keyword
  const categoryKeywords = [
    ['ai', 'llm', 'gpt', 'openai', 'groq', 'rag', 'agent', 'langchain', 'integration'],
    ['full-stack', 'full stack', 'website', 'web app', 'saas', 'mvp', 'next', 'react', 'site'],
    ['chatbot', 'chat bot', 'bot', 'support', 'whatsapp', 'customer'],
    ['python', 'automat', 'scrap', 'workflow', 'etl', 'pipeline', 'script'],
    ['api', 'backend', 'back-end', 'fastapi', 'node', 'webhook', 'server'],
  ];
  // Check chatbots before generic "ai" so "AI chatbot" lands on chatbots.
  for (const i of [2, 3, 4, 1, 0]) {
    if (categoryKeywords[i].some(k => new RegExp(`\\b${k}`).test(s))) {
      const cat = PACKAGES[i];
      return `${cat.icon} <b>${cat.name}</b> has three packages:<br>` +
        TIERS.filter(t => t.catIndex === i).map(tierLine).join('<br>') +
        `<br><button onclick="showService(${i})" class="text-cyan-400 underline mt-1">See full details</button>`;
    }
  }

  if (has('package', 'service', 'price', 'pricing', 'cost', 'all', 'offer', 'menu')) {
    return 'There are 15 packages across 5 categories:<br>' + PACKAGES.map((c, i) =>
      `${c.icon} <button onclick="showService(${i})" class="text-cyan-400 underline">${c.name}</button> from ${money(Math.min(...c.tiers.map(t => t.price)))}`
    ).join('<br>');
  }
  if (has('hi', 'hello', 'hey')) {
    return 'Hey! What are you looking to build? An AI feature, a chatbot, a web app, an automation or an API?';
  }
  return "I'm a demo assistant, so I stick to NEONSTACK's packages. Try asking about AI integration, chatbots, web apps, automation, APIs, prices or delivery times.";
}

// ---------- Shared UI ----------

let toastTimer;
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 2200);
}

document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) { addToCart(add.dataset.add); return; }
  const remove = e.target.closest('[data-remove]');
  if (remove) { removeFromCart(remove.dataset.remove); return; }
  const chip = e.target.closest('[data-chip]');
  if (chip) userAsk(chip.dataset.chip);
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeService();
  closeCheckout();
  closeSuccess();
  toggleCart(false);
  closeChat();
});

$('chat-form').addEventListener('submit', e => {
  e.preventDefault();
  userAsk($('chat-input').value);
  $('chat-input').value = '';
});

$('checkout-form').addEventListener('submit', placeOrder);

renderServices();
renderCart();
console.log('%cNEONSTACK loaded', 'color:#22d3ee;font-weight:bold;font-size:14px');
