'use strict';
/* neo.js - theme switcher, numbered project rows, skill chips, experience list, back-to-top.
   Everything degrades gracefully: without JavaScript the page keeps its default (cream) theme
   and the original project grid, skills text and timeline. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Theme switcher ---------- */
  const THEMES = [
    ['cream', 'Cream', '#F7F5EE'],
    ['mocha', 'Mocha', '#1E1E2E'],
    ['navy', 'Navy', '#0B1628']
  ];
  const root = document.documentElement;
  const metaColor = $('meta[name="theme-color"]');

  function applyTheme(id, save) {
    const t = THEMES.find(x => x[0] === id) || THEMES[0];
    root.dataset.theme = t[0];
    if (metaColor) metaColor.setAttribute('content', t[2]);
    if (save) { try { localStorage.setItem('wy-theme', t[0]); } catch (e) { /* storage unavailable */ } }
    $$('#theme-menu [data-theme-choice]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.themeChoice === t[0])));
  }

  function initTheme() {
    const toggle = $('#theme-toggle'), menu = $('#theme-menu');
    applyTheme(root.dataset.theme, false);
    if (!toggle || !menu) return;
    const close = (focus) => { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); if (focus) toggle.focus(); };
    const open = () => { menu.hidden = false; toggle.setAttribute('aria-expanded', 'true'); const cur = $('[aria-checked="true"]', menu) || $('button', menu); cur && cur.focus(); };
    toggle.addEventListener('click', () => (menu.hidden ? open() : close(false)));
    menu.addEventListener('click', e => {
      const b = e.target.closest('[data-theme-choice]'); if (!b) return;
      applyTheme(b.dataset.themeChoice, true); close(true);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !menu.hidden) { e.preventDefault(); close(true); }
      if (!menu.hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const items = $$('button', menu), i = items.indexOf(document.activeElement);
        items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus();
      }
    });
    document.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('.theme-wrap')) close(false); });
  }

  /* ---------- Numbered project rows ---------- */
  function buildProjects() {
    const host = $('#neo-projects'), data = window.PORTFOLIO_PROJECTS;
    if (!host || !Array.isArray(data) || !data.length) return;
    host.innerHTML = data.map((p, i) => {
      const n = String(i + 1).padStart(2, '0');
      const media = (typeof window.projectMedia === 'function' && window.projectMedia(p.id)) || {};
      const kind = p.category === 'research' ? 'Research' : 'Application';
      const metrics = (p.metrics || []).slice(0, 2).map(m => `<li><strong>${esc(m[0])}</strong><span>${esc(m[1])}</span></li>`).join('');
      const tags = (p.tags || []).slice(0, 5).map(t => `<li>${esc(t)}</li>`).join('');
      const demo = p.demo ? `<a class="neo-btn neo-btn-ghost" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a>` : '';
      const repo = p.repository ? `<a class="neo-btn neo-btn-ghost" href="${esc(p.repository)}" target="_blank" rel="noopener noreferrer">Source <span aria-hidden="true">↗</span></a>` : '';
      const img = media.file ? `<img src="${esc(media.file)}" alt="${esc(media.alt || p.short + ' screenshot')}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async"${media.width ? ` width="${esc(media.width)}" height="${esc(media.height)}"` : ''}>` : '';
      return `<article class="neo-row" aria-labelledby="neo-p-${esc(p.id)}">
        <div class="neo-row-copy">
          <p class="neo-row-meta">${n} / ${esc(p.year)} · ${kind}</p>
          <h3 id="neo-p-${esc(p.id)}">${esc(p.short || p.title)}</h3>
          <p class="neo-row-desc">${esc(p.description)}</p>
          <ul class="neo-metrics" aria-label="Key results">${metrics}</ul>
          <ul class="neo-tags" aria-label="Technologies">${tags}</ul>
          <div class="neo-row-actions">
            <button class="neo-btn" type="button" data-project="${esc(p.id)}">Read the case study <span aria-hidden="true">→</span></button>${demo}${repo}
          </div>
        </div>
        <figure class="neo-row-media">${img}</figure>
      </article>`;
    }).join('');
  }

  /* ---------- Skill chips (split a list on commas outside parentheses) ---------- */
  function splitTop(s) {
    const out = []; let depth = 0, cur = '';
    for (const ch of s) {
      if (ch === '(') depth++;
      if (ch === ')') depth = Math.max(0, depth - 1);
      if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  function buildChips() {
    $$('#skills .skills-plain dd').forEach(dd => {
      if (dd.querySelector('.neo-chips')) return;
      dd.setAttribute('aria-label', dd.textContent.trim());
      dd.innerHTML = '<ul class="neo-chips">' + splitTop(dd.textContent).map(t => `<li>${esc(t)}</li>`).join('') + '</ul>';
    });
  }

  /* ---------- Achievements: sticky list that follows the cards ---------- */
  function buildExperience() {
    const intro = $('#milestones .milestone-intro'), items = $$('#milestones .timeline-item');
    if (!intro || items.length < 2 || $('.neo-exp-nav', intro)) return;
    const nav = document.createElement('ol');
    nav.className = 'neo-exp-nav';
    nav.setAttribute('aria-label', 'Jump to an entry');
    items.forEach((it, i) => {
      if (!it.id) it.id = 'exp-' + i;
      const title = ($('h3', it) || {}).textContent || 'Entry';
      const date = ($('.timeline-date', it) || {}).textContent || '';
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${it.id}">${esc(title.trim())}<small>${esc(date.trim())}</small></a>`;
      nav.append(li);
    });
    intro.append(nav);
    const links = $$('a', nav);
    nav.addEventListener('click', e => {
      const a = e.target.closest('a'); if (!a) return;
      e.preventDefault();
      const target = $(a.getAttribute('href')); if (!target) return;
      target.scrollIntoView({behavior: reduced.matches ? 'auto' : 'smooth', block: 'center'});
    });
    if (!('IntersectionObserver' in window)) return;
    const mark = id => links.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + id)));
    mark(items[0].id);
    const io = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) mark(visible.target.id);
    }, {rootMargin: '-35% 0px -45% 0px', threshold: [0, .25, .5, 1]});
    items.forEach(it => io.observe(it));
  }

  /* ---------- Back to top ---------- */
  function initTop() {
    const b = document.createElement('button');
    b.className = 'neo-top'; b.type = 'button'; b.setAttribute('aria-label', 'Back to top'); b.textContent = '↑';
    b.addEventListener('click', () => window.scrollTo({top: 0, behavior: reduced.matches ? 'auto' : 'smooth'}));
    document.body.append(b);
    let ticking = false;
    const update = () => { b.classList.toggle('is-visible', window.scrollY > 700); ticking = false; };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, {passive: true});
    update();
  }

  /* The achievements archive is built by another script; show it open so the sticky list is visible. */
  function openArchive() { const a = $('.journey-archive'); if (a) a.open = true; }

  function init() { initTheme(); buildProjects(); buildChips(); openArchive(); buildExperience(); initTop(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
