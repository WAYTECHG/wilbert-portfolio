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
  let activeFeatured='marine';
  function showFeatured(id){
    const p=projectById(id);
    if(!p)return;
    const previous=activeFeatured;
    activeFeatured=id;
    featuredTabs.forEach(tab=>{const selected=tab.dataset.featured===id;tab.setAttribute('aria-selected',selected);tab.tabIndex=selected?0:-1;});
    $('#featured-panel').setAttribute('aria-labelledby','tab-'+id);
    $('#featured-panel').innerHTML=`<div class="featured-panel-inner"><div class="feature-art"><span class="visual-caption">${escape(p.short)} / CONCEPT VISUAL</span>${illustration(p.id,'featured')}<div class="visual-footer"><span>ILLUSTRATIVE SCHEMATIC</span><span>${escape(p.year)}</span></div></div><div class="feature-copy"><div class="project-kicker">${escape(p.kicker)}</div><h3>${escape(p.title)}</h3><p>${escape(p.description)}</p>${metrics(p)}<div class="feature-links"><button class="case-button" data-project="${p.id}">Explore case study ↗</button>${p.demo?`<a class="demo-link" href="${escape(p.demo)}" target="_blank" rel="noopener noreferrer">Open demo ↗</a>`:''}<a class="demo-link repository-link" href="${escape(p.repository)}" target="_blank" rel="noopener noreferrer">Source code ↗</a></div></div></div>`;
    const panel=$('#featured-panel');
    if(previous!==id&&!document.documentElement.classList.contains('no-motion')&&panel.animate){
      const direction=featuredTabs.findIndex(t=>t.dataset.featured===id)>=featuredTabs.findIndex(t=>t.dataset.featured===previous)?1:-1;
      panel.animate([{opacity:.25,transform:`translateX(${direction*26}px)`},{opacity:1,transform:'translateX(0)'}],{duration:420,easing:'cubic-bezier(.2,.7,.2,1)'});
    }
    document.dispatchEvent(new CustomEvent('portfolio:featured',{detail:{id}}));
  }
  window.PortfolioFeatured={select:showFeatured,current:()=>activeFeatured};
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
    $('#dialog-content').innerHTML=`<div class="dialog-body"><div class="project-kicker">${escape(p.status)}</div><h2 id="dialog-title">${escape(p.title)}</h2>${tags(p)}<h3>The problem</h3><p class="dialog-summary">${escape(p.summary)}</p>${metrics(p)}<h3>My contribution</h3><ul>${p.contributions.map(item=>`<li>${escape(item)}</li>`).join('')}</ul><h3>Outcome & trade-offs</h3><p>${escape(p.outcome)}</p>${p.table?`<table class="dialog-table"><caption class="sr-only">${escape(p.tableCaption||'URPC2020 test-set comparison, using the project split')}</caption><thead><tr>${p.table[0].map(cell=>`<th scope="col">${escape(cell)}</th>`).join('')}</tr></thead><tbody>${p.table.slice(1).map(row=>`<tr>${row.map((cell,index)=>index===0?`<th scope="row">${escape(cell)}</th>`:`<td>${escape(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`:''}<h3>What I learned</h3><p>${escape(p.learning)}</p><h3>Context & credits</h3><p class="dialog-note">${escape(p.credit)}${p.upstream?` <a class="demo-link" href="${escape(p.upstream)}" target="_blank" rel="noopener noreferrer">View upstream work ↗</a>`:''}</p><div class="feature-links">${p.demo?`<a class="case-button" href="${escape(p.demo)}" target="_blank" rel="noopener noreferrer">Open live demo ↗</a>`:''}<a class="demo-link repository-link" href="${escape(p.repository)}" target="_blank" rel="noopener noreferrer">View project repository ↗</a></div></div>`;
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
  try{const pref=localStorage.getItem('portfolio-motion');if(pref==='paused')paused=true;}catch{}
  const motionButton=$('.motion-toggle');
  function applyMotion(){document.documentElement.classList.toggle('no-motion',paused);motionButton.setAttribute('aria-pressed',paused);motionButton.setAttribute('aria-label',paused?'Enable animations':'Pause animations');motionButton.firstElementChild.textContent=paused?'▶':'Ⅱ';document.dispatchEvent(new CustomEvent('portfolio:motion',{detail:{paused}}));}
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
  let dots=[],width=0,height=0,raf=0,lastFrame=0;
  const pointer={x:0,y:0,active:false,sx:0,sy:0};
  function resizeCanvas(){
    width=window.innerWidth;height=window.innerHeight;
    const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx?.setTransform(dpr,0,0,dpr,0,0);
    dots=Array.from({length:Math.min(190,Math.max(45,Math.floor(width*height/7500)))},()=>({x:Math.random()*width,y:Math.random()*height,depth:Math.random(),size:Math.random()>.94?1.9:Math.random()*.9+.35,speed:Math.random()*.15+.03,alpha:Math.random()*.55+.16,phase:Math.random()*Math.PI*2}));
  }
  function draw(time=0){
    raf=0;if(!ctx)return;
    if(!paused&&time-lastFrame<32){requestDraw();return;}
    const step=lastFrame?Math.min((time-lastFrame)/16.67,3):1;lastFrame=time;
    const tx=pointer.active?(pointer.x-width/2)/width:0,ty=pointer.active?(pointer.y-height/2)/height:0;
    if(!paused){pointer.sx+=(tx-pointer.sx)*.045*step;pointer.sy+=(ty-pointer.sy)*.045*step;}
    document.documentElement.style.setProperty('--space-x',paused?'0px':pointer.sx*55+'px');
    document.documentElement.style.setProperty('--space-y',paused?'0px':pointer.sy*45+'px');
    ctx.clearRect(0,0,width,height);
    dots.forEach(p=>{
      if(!paused){p.y-=p.speed*step;p.x+=.015*step;if(p.y<0)p.y=height;if(p.x>width)p.x=0;}
      const x=(p.x+pointer.sx*(16+p.depth*55)+width)%width,y=(p.y+pointer.sy*(16+p.depth*55)+height)%height;
      const dist=pointer.active?Math.hypot(x-pointer.x,y-pointer.y):1000;
      const sparkle=paused?1:.85+Math.sin(time/1800+p.phase)*.15;
      ctx.fillStyle=`rgba(129,187,255,${Math.min(.95,p.alpha*sparkle+(dist<170?(1-dist/170)*.28:0))})`;
      ctx.beginPath();ctx.arc(x,y,p.size,0,Math.PI*2);ctx.fill();
      if(p.size>1.7){ctx.strokeStyle='rgba(116,189,255,.18)';ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();}
      if(dist<125&&!paused&&pointer.active){ctx.strokeStyle=`rgba(98,173,255,${(1-dist/125)*.18})`;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke();}
    });
    if(!paused&&!document.hidden)requestDraw();
  }
  function requestDraw(){if(!raf&&ctx)raf=requestAnimationFrame(draw);}
  window.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||paused)return;pointer.x=event.clientX;pointer.y=event.clientY;pointer.active=true;},{passive:true});
  document.addEventListener('pointerleave',()=>{pointer.active=false;});
  window.addEventListener('resize',()=>{resizeCanvas();requestDraw();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){lastFrame=0;requestDraw();}else if(raf){cancelAnimationFrame(raf);raf=0;}});
  document.addEventListener('portfolio:motion',()=>{pointer.active=false;pointer.sx=0;pointer.sy=0;lastFrame=0;requestDraw();});
  resizeCanvas();requestDraw();
})();
