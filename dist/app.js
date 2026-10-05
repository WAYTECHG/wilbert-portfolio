'use strict';
(() => {
  const projects=window.PORTFOLIO_PROJECTS;
  const illustration=window.projectIllustration;
  const $=selector=>document.querySelector(selector);
  const $$=selector=>Array.from(document.querySelectorAll(selector));
  const escape=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tags=project=>`<div class="tags">${project.tags.map(tag=>`<span>${escape(tag)}</span>`).join('')}</div>`;
  const metrics=project=>`<div class="feature-metrics">${project.metrics.map(([value,label])=>`<div><strong>${escape(value)}</strong><small>${escape(label)}</small></div>`).join('')}</div>`;
  const projectById=id=>projects.find(p=>p.id===id);
  const grid=$('#project-grid');
  grid.innerHTML=projects.map((p,index)=>`<article class="project-card" data-category="${p.category}"><div class="card-art"><span class="visual-caption">CONCEPT VISUAL / ${String(index+1).padStart(2,'0')}</span>${illustration(p.id,'card')}</div><div class="card-content"><div class="project-kicker">${escape(p.kicker)}</div><h3>${escape(p.title)}</h3><p>${escape(p.description)}</p>${tags(p)}<div class="card-bottom"><span>${escape(p.year)}</span><button data-project="${p.id}" aria-label="Read case study: ${escape(p.title)}">Read story ↗</button></div></div></article>`).join('');
  const featuredTabs=$$('[data-featured]');
  function showFeatured(id){
    const p=projectById(id);
    featuredTabs.forEach(tab=>{const selected=tab.dataset.featured===id;tab.setAttribute('aria-selected',selected);tab.tabIndex=selected?0:-1;});
    $('#featured-panel').setAttribute('aria-labelledby','tab-'+id);
    $('#featured-panel').innerHTML=`<div class="featured-panel-inner"><div class="feature-art"><span class="visual-caption">${escape(p.short)} / CONCEPT VISUAL</span>${illustration(p.id,'featured')}<div class="visual-footer"><span>ILLUSTRATIVE SCHEMATIC</span><span>${escape(p.year)}</span></div></div><div class="feature-copy"><div class="project-kicker">${escape(p.kicker)}</div><h3>${escape(p.title)}</h3><p>${escape(p.description)}</p>${metrics(p)}<div class="feature-links"><button class="case-button" data-project="${p.id}">Explore case study ↗</button>${p.demo?`<a class="demo-link" href="${escape(p.demo)}" target="_blank" rel="noopener noreferrer">Open demo ↗</a>`:''}</div></div></div>`;
  }
  showFeatured('marine');
  featuredTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>showFeatured(tab.dataset.featured));
    tab.addEventListener('keydown',event=>{
      let next=index;
      if(event.key==='ArrowRight')next=(index+1)%featuredTabs.length;
      else if(event.key==='ArrowLeft')next=(index-1+featuredTabs.length)%featuredTabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=featuredTabs.length-1;
      else return;
      event.preventDefault();showFeatured(featuredTabs[next].dataset.featured);featuredTabs[next].focus();
    });
  });
  $$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    const category=button.dataset.filter;
    $$('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    let count=0;
    $$('.project-card').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;if(!card.hidden)count++;});
    $('#project-count').textContent=String(count).padStart(2,'0');
    $('.filter-status').textContent=`Showing ${count} ${category==='all'?'projects':category==='research'?'research projects':'applications'}.`;
  }));
  const dialog=$('#project-dialog');let lastFocus;
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-project]');if(!button)return;
    const p=projectById(button.dataset.project);if(!p)return;lastFocus=button;
    $('#dialog-content').innerHTML=`<div class="dialog-body"><div class="project-kicker">${escape(p.status)}</div><h2 id="dialog-title">${escape(p.title)}</h2>${tags(p)}<h3>The problem</h3><p class="dialog-summary">${escape(p.summary)}</p>${metrics(p)}<h3>My contribution</h3><ul>${p.contributions.map(item=>`<li>${escape(item)}</li>`).join('')}</ul><h3>Outcome & trade-offs</h3><p>${escape(p.outcome)}</p>${p.table?`<table class="dialog-table"><caption class="sr-only">URPC2020 test-set comparison, using the project split</caption><thead><tr>${p.table[0].map(cell=>`<th scope="col">${escape(cell)}</th>`).join('')}</tr></thead><tbody>${p.table.slice(1).map(row=>`<tr>${row.map((cell,index)=>index===0?`<th scope="row">${escape(cell)}</th>`:`<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`:''}<h3>What I learned</h3><p>${escape(p.learning)}</p><h3>Context & credits</h3><p class="dialog-note">${escape(p.credit)}${p.upstream?` <a class="demo-link" href="${escape(p.upstream)}" target="_blank" rel="noopener noreferrer">View upstream work ↗</a>`:''}</p><div class="feature-links">${p.demo?`<a class="case-button" href="${escape(p.demo)}" target="_blank" rel="noopener noreferrer">Open live demo ↗</a>`:''}<a class="demo-link" href="https://github.com/WAYTECHG" target="_blank" rel="noopener noreferrer">My GitHub ↗</a></div></div>`;
    dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';$('.dialog-close').focus();
  });
  $('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';lastFocus?.focus();});
  const menu=$('.menu-toggle');
  function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');$('#mobile-nav').hidden=true;}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#mobile-nav').hidden=!open;});
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
  let toastTimeout;
  function toast(message){const node=$('.toast');node.textContent=message;node.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>node.classList.remove('visible'),2800);}
  $('#copy-email').addEventListener('click',async()=>{
    const email='30587wilbertandrewtyonathan@gmail.com';
    try{if(!navigator.clipboard?.writeText)throw new Error('No clipboard');await navigator.clipboard.writeText(email);toast('Email copied. Let’s connect!');}
    catch{const range=document.createRange();range.selectNodeContents($('.email-address'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);toast('Email selected — press Ctrl/Cmd + C to copy.');}
  });
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduced.matches;
  try{const pref=localStorage.getItem('portfolio-motion');if(pref!==null)paused=pref==='paused';}catch{}
  const motionButton=$('.motion-toggle');
  function applyMotion(){document.documentElement.classList.toggle('no-motion',paused);motionButton.setAttribute('aria-pressed',paused);motionButton.setAttribute('aria-label',paused?'Enable animations':'Pause animations');motionButton.firstElementChild.textContent=paused?'▶':'Ⅱ';}
  applyMotion();
  motionButton.addEventListener('click',()=>{paused=!paused;applyMotion();try{localStorage.setItem('portfolio-motion',paused?'paused':'running');}catch{};toast(paused?'Animations paused.':'Animations enabled.');if(!paused)requestDraw();});
  reduced.addEventListener('change',event=>{paused=event.matches;applyMotion();if(!paused)requestDraw();});
  if('IntersectionObserver' in window){
    const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target);}}),{threshold:.08});
    $$('.reveal').forEach(el=>reveal.observe(el));document.documentElement.classList.add('js-reveal');
  }
  let ticking=false;
  function updateScroll(){
    const max=document.documentElement.scrollHeight-window.innerHeight;
    $('.scroll-progress').style.width=(max>0?Math.min(100,window.scrollY/max*100):0)+'%';
    const sections=$$('main section[id]');let current=sections[0].id;
    sections.forEach(s=>{if(s.getBoundingClientRect().top<=window.innerHeight*.35)current=s.id;});
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-30)current='contact';
    $$('.section-dots a,.desktop-nav a').forEach(a=>{const active=a.getAttribute('href')==='#'+current;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    ticking=false;
  }
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}},{passive:true});window.addEventListener('resize',updateScroll);updateScroll();
  const canvas=$('#particles');const ctx=canvas.getContext('2d');
  let dots=[],width=0,height=0,frame=0,raf=0;
  const pointer={x:-1000,y:-1000};
  function resizeCanvas(){width=window.innerWidth;height=window.innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx?.setTransform(dpr,0,0,dpr,0,0);dots=Array.from({length:Math.min(95,Math.floor(width*height/12000))},()=>({x:Math.random()*width,y:Math.random()*height,size:Math.random()>.95?2:Math.random()*.8+.3,speed:Math.random()*.15+.04,alpha:Math.random()*.35+.08}));}
  function draw(){raf=0;if(!ctx)return;ctx.clearRect(0,0,width,height);dots.forEach(p=>{if(!paused){p.y-=p.speed;if(p.y<0)p.y=height;}const dist=Math.hypot(p.x-pointer.x,p.y-pointer.y);ctx.fillStyle=`rgba(94,155,241,${Math.min(.85,p.alpha+(dist<170?(1-dist/170)*.45:0))})`;ctx.fillRect(p.x,p.y,p.size,p.size);if(dist<115&&!paused){ctx.strokeStyle=`rgba(81,149,244,${(1-dist/115)*.12})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke();}});frame++;if(!paused&&!document.hidden)requestDraw();}
  function requestDraw(){if(!raf&&ctx)raf=requestAnimationFrame(draw);}
  window.addEventListener('pointermove',event=>{pointer.x=event.clientX;pointer.y=event.clientY;},{passive:true});
  document.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;});
  window.addEventListener('resize',()=>{resizeCanvas();requestDraw();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)requestDraw();else if(raf){cancelAnimationFrame(raf);raf=0;}});
  resizeCanvas();requestDraw();
})();
