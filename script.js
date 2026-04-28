/* ============================================================
   PRISM — script.js

   Sections:
   1. Color & Card Data
   2. Feeling Keywords (Path 2)
   3. State
   4. Initialization
   5. Screen Navigation
   6. Path 1 — Color Orbs
   7. Path 1 — Two Card Pick
   8. Reading Render (shared)
   9. Path 2 — Feeling / Keyword Match
   10. Helpers
   ============================================================ */


/* ══════════════════════════════════════════════════════════
   1. COLOR & CARD DATA
   9 colors, 2 cards each. Each card has its own shade,
   name, whisper (short line), and reading lines.
   ══════════════════════════════════════════════════════════ */

const COLORS = {
  red: {
    label: 'Red',
    cards: [
      {
        name: 'Ignite',
        shade: '#FF2400',
        whisper: '"something in you is ready"',
        lines: [
          'This is the energy at your root — primal, alive, and present. Ignite speaks to the fire before action, the surge that signals your boundaries, the excitement that has not yet found its direction.',
          'You are not too much. You are activated.',
        ],
      },
      {
        name: 'Wound',
        shade: '#8B0000',
        whisper: '"some things take time to close"',
        lines: [
          'Deep crimson holds pain that has been carried quietly. Wound is not weakness — it is the honest record of what you have survived.',
          'Something tender lives here. You are allowed to acknowledge it without rushing past it.',
        ],
      },
    ],
  },
  orange: {
    label: 'Orange',
    cards: [
      {
        name: 'Bloom',
        shade: '#FF7F00',
        whisper: '"the day is opening for you"',
        lines: [
          'Bloom is the feeling of waking up and wanting something. It is joy with direction — warmth that has a destination.',
          'Something in you is ready to move toward what matters. Let this color carry you forward.',
        ],
      },
      {
        name: 'Drift',
        shade: '#FFAB76',
        whisper: '"you don\'t have to go anywhere right now"',
        lines: [
          'Drift is warmth without urgency. The afternoon that asks nothing of you.',
          'A gentle reminder that being unhurried is not the same as being lost. You are allowed to simply exist in this moment.',
        ],
      },
    ],
  },
  yellow: {
    label: 'Yellow',
    cards: [
      {
        name: 'Radiance',
        shade: '#FFD700',
        whisper: '"you are the light you\'ve been looking for"',
        lines: [
          'Radiance connects to your solar plexus — the second brain, the seat of inner knowing. This is confidence not borrowed from others, but grown from within.',
          'You carry a divinity that doesn\'t need permission.',
        ],
      },
      {
        name: 'Static',
        shade: '#F0E68C',
        whisper: '"your nervous system is trying to protect you"',
        lines: [
          'Static is the signal breaking. The overthinking, the alarm in your body that won\'t settle.',
          'Yellow in this form is not failure — it is your system working hard to keep you safe. You can slow down now.',
        ],
      },
    ],
  },
  green: {
    label: 'Green',
    cards: [
      {
        name: 'Tender',
        shade: '#4CAF50',
        whisper: '"your heart is braver than you think"',
        lines: [
          'Tender lives in the heart center. It is the openness of genuine care — for another, for yourself, for something small and growing.',
          'This is love without conditions, the green of new leaves, the feeling of being safe enough to be soft.',
        ],
      },
      {
        name: 'Ache',
        shade: '#2D6A4F',
        whisper: '"wanting is its own kind of love"',
        lines: [
          'Ache is the shadow side of the heart — longing that looks outward, desire tinted with comparison.',
          'It is not a flaw to feel this. It is proof that you know what beauty is. The ache points toward something real in you.',
        ],
      },
    ],
  },
  blue: {
    label: 'Blue',
    cards: [
      {
        name: 'Current',
        shade: '#1E90FF',
        whisper: '"you are allowed to move through this"',
        lines: [
          'Current is water in motion — cleansing, transitional, alive. Something is shifting in you or around you.',
          'You do not have to hold everything still. Emotional depth is not a place to drown; it is a place to pass through.',
        ],
      },
      {
        name: 'Still',
        shade: '#4682B4',
        whisper: '"truth settles like water"',
        lines: [
          'Still is the calm after saying the true thing. The throat cleared, the honest word finally spoken.',
          'Sometimes the most powerful communication is the quiet that follows understanding.',
        ],
      },
    ],
  },
  violet: {
    label: 'Purple',
    cards: [
      {
        name: 'Veil',
        shade: '#6A0DAD',
        whisper: '"trust what you sense before you understand it"',
        lines: [
          'Veil is standing at the threshold of knowing — something is being felt before it can be named.',
          'You don\'t need to explain this feeling. You just need to honor it.',
        ],
      },
      {
        name: 'Awaken',
        shade: '#BF5FFF',
        whisper: '"something larger is trying to reach you"',
        lines: [
          'Awaken is the crown opening — creative energy, expanded awareness, the feeling of being connected to something beyond the ordinary.',
          'Intuition is sharpened here. Pay attention to what finds you in the next few days.',
        ],
      },
    ],
  },
  rose: {
    label: 'Pink',
    cards: [
      {
        name: 'Soft',
        shade: '#FFB6C1',
        whisper: '"you are safe to be this gentle"',
        lines: [
          'Soft is the gentle kind of love — the nurturing, the sweetness, the care that asks for nothing in return.',
          'You deserve the same softness you offer others.',
        ],
      },
      {
        name: 'Pulse',
        shade: '#FF1493',
        whisper: '"desire is not something to apologize for"',
        lines: [
          'Pulse is magenta — vibrant, drawn forward, alive with want.',
          'Your desire is information. Follow it honestly.',
        ],
      },
    ],
  },
  white: {
    label: 'White',
    cards: [
      {
        name: 'Surrender',
        shade: '#E8E0D5',
        whisper: '"letting go is not losing"',
        lines: [
          'Surrender is the peace that arrives after resistance ends. White holds all colors — it is not empty, it is complete.',
          'Something in you is ready to release a grip you\'ve held for too long. This is not defeat. This is rest.',
        ],
      },
      {
        name: 'Hollow',
        shade: '#C0C0C0',
        whisper: '"emptiness is just space waiting to be felt"',
        lines: [
          'Hollow is the quiet that feels like absence. Not sad, not broken — simply unfilled.',
          'Sometimes the hollow is where the new thing will grow.',
        ],
      },
    ],
  },
  black: {
    label: 'Black',
    cards: [
      {
        name: 'Shield',
        shade: '#3a3a5c',
        whisper: '"you get to choose what enters"',
        lines: [
          'Shield is intentional protection. Black absorbs and contains — it does not let everything through, and that is a power, not a flaw.',
          'You are allowed to protect your energy. Boundaries are not walls; they are wisdom.',
        ],
      },
      {
        name: 'Depth',
        shade: '#6a6a6a',
        whisper: '"the dark is not always something to escape"',
        lines: [
          'Depth is sitting in darkness without fear. The unknown as a place of rest, not threat.',
          'You do not need to illuminate everything right now. Some things reveal themselves in their own time.',
        ],
      },
    ],
  },
};

const COLOR_KEYS = Object.keys(COLORS);


/* ══════════════════════════════════════════════════════════
   2. FEELING KEYWORDS (Path 2)
   ══════════════════════════════════════════════════════════ */

const FEELING_KEYWORDS = {
  red:    ['angry','anger','rage','furious','frustrated','irritated','desire','craving','jealous','resent','resentful','fed up','boundary','boundaries','stuck','trapped'],
  orange: ['restless','antsy','excited','energized','curious','brave','bold','change','shifting','moving','risk','adventure'],
  yellow: ['hope','hopeful','optimistic','bright','happy','joy','joyful','grateful','gratitude','confident','light'],
  green:  ['healing','heal','grow','growth','grounded','steady','calm','peace','peaceful','patient','patience','balance','nature','renew','regrow'],
  blue:   ['sad','sadness','blue','lonely','alone','tired','exhausted','still','quiet','numb','overwhelmed','deep'],
  violet: ['anxious','anxiety','uncertain','confused','lost','fear','afraid','dream','dreamy','intuition','intuitive','spiritual','mystery', 'psychic'],
  rose:   ['love','loved','loving','tender','soft','softness','heart','hurt','missing','yearning','affection'],
  white:  ['empty','hollow','blank','nothing','void','letting go','release','surrender','peace','accept','exhale','done','relief', 'dead'],
  black:  ['protect','guard','defensive','withdrawn','closed','careful','shadow','depth','unknown','alone','dark'],
};


/* ══════════════════════════════════════════════════════════
   3. STATE
   ══════════════════════════════════════════════════════════ */

let selectedColorKey = null;


/* ══════════════════════════════════════════════════════════
   4. INITIALIZATION
   ══════════════════════════════════════════════════════════ */

function init() {
  generateStars();
  buildColorOrbs();
  bindNavigation();
  bindFeelingForm();
}

function generateStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top  = Math.random() * 70  + '%';
    star.style.setProperty('--dur',    (3 + Math.random() * 6) + 's');
    star.style.setProperty('--max-op', (0.3 + Math.random() * 0.7).toFixed(2));
    star.style.animationDelay = Math.random() * 8 + 's';
    container.appendChild(star);
  }
}


/* ══════════════════════════════════════════════════════════
   5. SCREEN NAVIGATION
   showScreen() hides all screens and shows the target one.
   CSS handles the opacity fade.
   ══════════════════════════════════════════════════════════ */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(el => {
    const on = el.id === id;
    el.classList.toggle('active', on);
    el.setAttribute('aria-hidden', on ? 'false' : 'true');
  });

  if (id === 'screen-landing') {
    const bg = document.getElementById('bgLayer');
    if (bg) bg.style.background = '';
  }

  if (id === 'screen-colors') {
    const row = document.getElementById('pickRow');
    if (row) row.innerHTML = '';
  }
}

function bindNavigation() {
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-goto');
      if (id) showScreen(id);
    });
  });

  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-back');
      if (id) showScreen(id);
    });
  });

  const again = document.getElementById('reading-again');
  if (again) {
    again.addEventListener('click', () => showScreen('screen-landing'));
  }
}


/* ══════════════════════════════════════════════════════════
   6. PATH 1 — COLOR ORBS
   Builds 9 clickable orbs. Each blends both card shades.
   Clicking one goes to the two-card pick screen.
   ══════════════════════════════════════════════════════════ */

function buildColorOrbs() {
  const grid = document.getElementById('colorOrbGrid');
  if (!grid) return;

  COLOR_KEYS.forEach(key => {
    const color = COLORS[key];

    const orb = document.createElement('button');
    orb.type = 'button';
    orb.className = 'color-orb';
    orb.setAttribute('aria-label', color.label);
    orb.setAttribute('data-label', color.label);

    // Blend both card shades into one radial gradient
    orb.style.background = `radial-gradient(circle at 35% 35%, ${color.cards[0].shade}cc, ${color.cards[0].shade} 55%, ${color.cards[1].shade})`;
    orb.style.boxShadow  = `0 0 18px ${hexToRgba(color.cards[0].shade, 0.3)}`;

    orb.addEventListener('click', () => pickColor(key));
    grid.appendChild(orb);
  });
}

function pickColor(key) {
  selectedColorKey = key;
  const color = COLORS[key];

  setBackgroundTint(color.cards[0].shade, 0.12);
  buildCardPicks(color);
  showScreen('screen-pick');
}


/* ══════════════════════════════════════════════════════════
   7. PATH 1 — TWO CARD PICK
   Two boxes appear. First click reveals the card inside,
   second click goes to the reading screen.
   ══════════════════════════════════════════════════════════ */

function buildCardPicks(color) {
  const row = document.getElementById('pickRow');
  if (!row) return;
  row.innerHTML = '';

  const familyGlow = midHex(color.cards[0].shade, color.cards[1].shade);

  color.cards.forEach(card => {
    const box = document.createElement('button');
    box.type = 'button';
    box.className = 'card-box';
    box.style.setProperty('--card-glow', familyGlow);
    box.setAttribute('aria-label', 'A face-down card. Click to reveal.');
    box.innerHTML = `
      <span class="card-box-back" aria-hidden="true">
        <img src="card-back.svg" alt="" width="800" height="1100" decoding="async" />
      </span>`;

    // First click: reveal. Second click: go to reading.
    box.addEventListener('click', () => {
      if (!box.classList.contains('is-revealed')) {
        row.querySelectorAll('.card-box.is-revealed').forEach(el => el.classList.remove('is-revealed'));
        box.classList.add('is-revealed');
        box.setAttribute('aria-label', `${card.name} — ${card.whisper}. Click to read.`);
        box.innerHTML = `
          <span class="card-box-dot" style="background:${card.shade}; box-shadow:0 0 28px ${hexToRgba(card.shade, 0.55)}"></span>
          <span class="card-box-name">${card.name}</span>
          <span class="card-box-whisper">${card.whisper}</span>`;
        setBackgroundTint(card.shade, 0.16);
      } else {
        renderReading(card, selectedColorKey);
      }
    });

    row.appendChild(box);
  });
}


/* ══════════════════════════════════════════════════════════
   8. READING RENDER (shared by both paths)
   Populates and shows the reading screen.
   ══════════════════════════════════════════════════════════ */

function renderReading(card, colorKey) {
  const color = COLORS[colorKey];

  const kicker = document.getElementById('readingKicker');
  const hue    = document.getElementById('readingHue');
  const body   = document.getElementById('readingBody');
  const accent = document.getElementById('readingAccent');

  if (kicker) kicker.textContent = color.label;

  if (hue) {
    hue.textContent = card.name;
    hue.style.color = card.shade;
  }

  if (body) {
    const otherCard = color.cards.find(c => c.name !== card.name);
    body.innerHTML = `
      <p class="reading-whisper">${card.whisper}</p>
      ${card.lines.map(l => `<p>${l}</p>`).join('')}
      <p class="reading-duality">${card.name} found you today — and somewhere in this color, ${otherCard?.name || ''} lives too.</p>`;
  }

  if (accent) accent.style.background = card.shade;

  setBackgroundTint(card.shade, 0.14);
  showScreen('screen-reading');
}


/* ══════════════════════════════════════════════════════════
   9. PATH 2 — FEELING / KEYWORD MATCH
   ══════════════════════════════════════════════════════════ */

function bindFeelingForm() {
  const form  = document.getElementById('feelingForm');
  const input = document.getElementById('feelingInput');
  const hint  = document.getElementById('feelingHint');
  if (!form || !input) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value || '';
    const { colorKey, confidence } = matchFeelingToColor(text);
    const color = COLORS[colorKey];

    if (hint) {
      hint.textContent = confidence > 0
        ? `Matched to ${color.label}.`
        : `No exact match — drawing one for you.`;
    }

    // Pick randomly between the two cards for this color
    const card = color.cards[Math.floor(Math.random() * color.cards.length)];
    renderReading(card, colorKey);
  });
}

function matchFeelingToColor(text) {
  const t = normalizeText(text);
  if (!t) return { colorKey: pickRandom(COLOR_KEYS), confidence: 0 };

  const tokens = new Set(t.split(' ').filter(Boolean));
  const scores = {};
  COLOR_KEYS.forEach(k => { scores[k] = 0; });

  COLOR_KEYS.forEach(key => {
    (FEELING_KEYWORDS[key] || []).forEach(kw => {
      const k = normalizeText(kw);
      if (!k) return;
      if (tokens.has(k))                    scores[key] += 2;
      if (k.includes(' ') && t.includes(k)) scores[key] += 3;
    });
  });

  const ranked = COLOR_KEYS
    .map(key => ({ key, score: scores[key] }))
    .sort((a, b) => b.score - a.score);

  if (ranked[0].score <= 0) return { colorKey: pickRandom(COLOR_KEYS), confidence: 0 };

  const top         = ranked[0];
  const secondScore = ranked[1]?.score ?? 0;
  const confidence  = Math.max(0, Math.min(1, (top.score - secondScore) / 6));

  return { colorKey: top.key, confidence };
}


/* ══════════════════════════════════════════════════════════
   10. HELPERS
   ══════════════════════════════════════════════════════════ */

function setBackgroundTint(hex, opacity) {
  const bg = document.getElementById('bgLayer');
  if (!bg) return;
  bg.style.background = `radial-gradient(ellipse 90% 70% at 50% 75%, ${hexToRgba(hex, opacity ?? 0.12)} 0%, transparent 65%)`;
}

function parseHex(hex) {
  const n = hex.replace('#', '');
  const v = n.length === 3 ? n.split('').map(c => c + c).join('') : n;
  return parseInt(v, 16);
}

function midHex(hexA, hexB) {
  const a = parseHex(hexA);
  const b = parseHex(hexB);
  const r = Math.round(((a >> 16) + (b >> 16)) / 2);
  const g = Math.round((((a >> 8) & 255) + ((b >> 8) & 255)) / 2);
  const bl = Math.round(((a & 255) + (b & 255)) / 2);
  return `#${[r, g, bl].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

function hexToRgba(hex, a) {
  const num = parseHex(hex);
  return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${a})`;
}

function normalizeText(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim();
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


/* ── START ── */
init();