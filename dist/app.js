'use strict';
(() => {
  const projects=window.PORTFOLIO_PROJECTS;
  const illustration=window.projectVisual;
  const $=selector=>document.querySelector(selector);
  const $$=selector=>Array.from(document.querySelectorAll(selector));
  const escape=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const tags=project=>`<div class="tags">${project.tags.map(tag=>`<span>${escape(tag)}</span>`).join('')}</div>`;
  const metrics=project=>`<div class="feature-metrics">${project.metrics.map(([value,label],i)=>`<div>${i===0&&['marine','paddy'].includes(project.id)?'<span class="metric-orbit" aria-hidden="true"><i></i><i></i></span>':''}<strong>${escape(value)}</strong><small>${escape(label)}</small></div>`).join('')}</div>`;
  const projectById=id=>projects.find(p=>p.id===id);
  const previews={
    defectrag:{title:'DefectRAG',role:'Personal AI engineering project',description:'Visual inspection, cited RAG and corrective-action workflows, with n8n on AWS Lightsail.',result:'95.13%',label:'Mean image AUROC · retrospective VisA comparison'},
    dpickleball:{title:'dPickleball',role:'Deep reinforcement learning project',description:'PPO agent training, reward shaping and competitive self-play in Unity.',result:'2nd place',label:'Team competition finish · AIT306 coursework'},
    marine:{title:'Marine detection',role:'Computer vision project',description:'GhostConv + SimSPPF for lightweight underwater organism detection.',result:'75.36%',label:'mAP@0.5 · +1.13 percentage points versus baseline'},
    paddy:{title:'PaddyLiteX',role:'Final-year thesis',description:'A compact DenseLiteX backbone for paddy disease detection.',result:'81.67%',label:'mAP@0.5 · 803 test images · one run per model'},
    resucn:{title:'Res UCN',role:'Advanced machine learning project',description:'An efficient residual network explored through custom convolution and normalization.',result:'91.45%',label:'CIFAR-10 accuracy · completed group coursework'},
    fer:{title:'FER2013',role:'Deep learning project',description:'Comparing CNN models for seven emotion classes, with Grad-CAM explanations.',result:'65.62%',label:'Recorded CNN test accuracy · FER2013'},
    mri:{title:'NeuroInsight',role:'Principle of AI project',description:'MRI and clinical-data classification in Streamlit.',result:'91% MRI accuracy',label:'Reported coursework result'}
  };
  const grid=$('#project-grid');
  grid.innerHTML=projects.map((p,index)=>{const preview=previews[p.id];return `<article class="project-card" data-category="${p.category}"><div class="card-art"><span class="visual-caption">${escape(window.projectMedia(p.id).label)} / ${String(index+1).padStart(2,'0')}</span>${illustration(p.id,'card')}</div><div class="card-content"><div class="project-kicker">${escape(preview.role)}</div><h3>${escape(preview.title)}</h3><p>${escape(preview.description)}</p><div class="card-result"><strong>${escape(preview.result)}</strong><small>${escape(preview.label)}</small></div>${tags({...p,tags:p.tags.slice(0,3)})}<div class="card-links">${p.video?`<a class="demo-link" href="${escape(p.video)}" target="_blank" rel="noopener noreferrer">Watch competition</a>`:''}${p.demo && p.id!=='dpickleball'?`<a class="demo-link" href="${escape(p.demo)}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>`:''}${p.repository?`<a class="demo-link" href="${escape(p.repository)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`:''}</div><div class="card-bottom"><span>${escape(p.year)}</span><button data-project="${p.id}" aria-label="Read case study: ${escape(p.title)}">Case study</button></div></div></article>`;}).join('');
  $$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    const category=button.dataset.filter;
    $$('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    let count=0;
    $$('.project-card').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;if(!card.hidden)count++;});
    $('#project-count').textContent=String(count).padStart(2,'0');
    $('.filter-status').textContent=`Showing ${count} ${category==='all'?'projects':category==='research'?'research projects':'applications'}.`;
  }));
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-project]');if(!button)return;
    window.PortfolioReader.open(button.dataset.project,button);
  });
  const menu=$('.menu-toggle');
  function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');$('#mobile-nav').hidden=true;}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#mobile-nav').hidden=!open;});
  $$('#mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
  let toastTimeout;
  function toast(message){const node=$('.toast');node.textContent=message;node.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>node.classList.remove('visible'),2800);}
  $('#copy-email').addEventListener('click',async()=>{
    const email='wilbertyonathan@gmail.com';
    try{if(!navigator.clipboard?.writeText)throw new Error('No clipboard');await navigator.clipboard.writeText(email);toast('Email copied. Let’s connect!');}
    catch{const range=document.createRange();range.selectNodeContents($('.email-address'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);toast('Email selected — press Ctrl/Cmd + C to copy.');}
  });
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduced.matches;
  try{localStorage.removeItem('portfolio-motion');}catch{}
  function applyMotion(){document.documentElement.classList.toggle('no-motion',paused);document.dispatchEvent(new CustomEvent('portfolio:motion',{detail:{paused}}));}
  applyMotion();
  reduced.addEventListener('change',event=>{paused=event.matches;applyMotion();if(!paused)requestDraw();});
  if('IntersectionObserver' in window){
    const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target);}}),{threshold:.08});
    $$('.reveal').forEach(el=>reveal.observe(el));document.documentElement.classList.add('js-reveal');
  }
  const navigationSections=$$('main section[id]');
  const sectionById=new Map(navigationSections.map(section=>[section.id,section]));
  const navigationLinks=$$('.section-dots a,.desktop-nav a,#mobile-nav a');
  let ticking=false,navigation=null,navigationFrame=0;
  const number=value=>parseFloat(value)||0;
  function setActiveSection(id){
    navigationLinks.forEach(link=>{
      const active=link.getAttribute('href')==='#'+id;
      link.classList.toggle('active',active);
      if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
  }
  function sectionPosition(section){
    const padding=number(getComputedStyle(document.documentElement).scrollPaddingTop);
    const margin=number(getComputedStyle(section).scrollMarginTop);
    const max=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
    return Math.min(max,Math.max(0,window.scrollY+section.getBoundingClientRect().top-padding-margin));
  }
  function updateScroll(){
    const max=document.documentElement.scrollHeight-window.innerHeight;
    $('.scroll-progress').style.width=(max>0?Math.min(100,window.scrollY/max*100):0)+'%';
    let current=navigationSections[0]?.id;
    const padding=number(getComputedStyle(document.documentElement).scrollPaddingTop);
    const headerBottom=$('.header')?.getBoundingClientRect().bottom||0;
    navigationSections.forEach(section=>{
      const marker=Math.max(headerBottom+12,padding+number(getComputedStyle(section).scrollMarginTop)+2);
      if(section.getBoundingClientRect().top<=marker)current=section.id;
    });
    if(max>0&&window.scrollY>=max-2)current='contact';
    setActiveSection(navigation?.id||current);
    ticking=false;
  }
  function scheduleScrollUpdate(){
    if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}
  }
  function stopNavigation(){
    if(navigationFrame)cancelAnimationFrame(navigationFrame);
    navigationFrame=0;navigation=null;
  }
  function navigateTo(id,writeHistory=true){
    const section=sectionById.get(id);if(!section)return;
    stopNavigation();
    // Cancel any native smooth scroll before starting a single owned animation.
    window.scrollTo({top:window.scrollY,behavior:'instant'});
    const start=window.scrollY,target=sectionPosition(section),distance=target-start;
    const movement={id,start,target,distance,started:performance.now(),duration:Math.min(650,Math.max(220,Math.abs(distance)*.15))};
    navigation=movement;setActiveSection(id);
    if(writeHistory&&location.hash!=='#'+id)history.pushState(null,'','#'+id);
    if(document.documentElement.classList.contains('no-motion')||Math.abs(distance)<2){
      window.scrollTo({top:target,behavior:'instant'});stopNavigation();updateScroll();return;
    }
    function step(now){
      if(navigation!==movement)return;
      const progress=Math.min(1,Math.max(0,(now-movement.started)/movement.duration));
      const eased=1-Math.pow(1-progress,3);
      window.scrollTo({top:movement.start+movement.distance*eased,behavior:'instant'});
      updateScroll();
      if(progress<1)navigationFrame=requestAnimationFrame(step);
      else{stopNavigation();updateScroll();}
    }
    navigationFrame=requestAnimationFrame(step);
  }
  document.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const link=event.target.closest('a[href^="#"]');
    const id=link?.getAttribute('href').slice(1);
    if(!sectionById.has(id))return;
    event.preventDefault();navigateTo(id);
  });
  function interruptNavigation(){
    if(!navigation)return;
    stopNavigation();scheduleScrollUpdate();
  }
  window.addEventListener('wheel',interruptNavigation,{passive:true});
  window.addEventListener('touchstart',interruptNavigation,{passive:true});
  window.addEventListener('pointerdown',interruptNavigation,{passive:true});
  window.addEventListener('keydown',event=>{
    if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))interruptNavigation();
  });
  window.addEventListener('scroll',scheduleScrollUpdate,{passive:true});
  window.addEventListener('resize',()=>{stopNavigation();scheduleScrollUpdate();});
  window.addEventListener('popstate',()=>{stopNavigation();navigateTo(location.hash.slice(1),false);});
  document.addEventListener('portfolio:motion',()=>{
    if(navigation&&document.documentElement.classList.contains('no-motion'))navigateTo(navigation.id,false);
  });
  updateScroll();
  const canvas=$('#particles');const ctx=canvas.getContext('2d');
  let dots=[],width=0,height=0,raf=0,lastFrame=0;
  const pointer={x:0,y:0,active:false,sx:0,sy:0};
  function resizeCanvas(){
    width=window.innerWidth;height=window.innerHeight;
    const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx?.setTransform(dpr,0,0,dpr,0,0);
    dots=Array.from({length:Math.min(650,Math.max(90,Math.floor(width*height/1800)))},()=>{
      const depth=Math.random(),bright=Math.random()>.965;
      return {x:Math.random()*width,y:Math.random()*height,depth,size:bright?1.3+depth*.75:.25+depth*.75,speed:.025+depth*.1,alpha:bright?.65:Math.random()*.34+.13,phase:Math.random()*Math.PI*2,period:2200+Math.random()*4200,warm:Math.random()<.07,bright};
    });
  }
  function draw(time=0){
    raf=0;if(!ctx||document.hidden)return;
    if(!paused&&time-lastFrame<32){requestDraw();return;}
    const step=lastFrame?Math.min((time-lastFrame)/16.67,3):1;lastFrame=time;
    const tx=pointer.active?(pointer.x-width/2)/width:0,ty=pointer.active?(pointer.y-height/2)/height:0;
    if(!paused){pointer.sx+=(tx-pointer.sx)*.045*step;pointer.sy+=(ty-pointer.sy)*.045*step;}
    document.documentElement.style.setProperty('--space-x',paused?'0px':pointer.sx*55+'px');
    document.documentElement.style.setProperty('--space-y',paused?'0px':pointer.sy*45+'px');
    ctx.clearRect(0,0,width,height);
    dots.forEach(p=>{
      if(!paused){
        p.x+=(p.x-width*.5)*.000045*(.4+p.depth)*step;
        p.y+=((p.y-height*.5)*.000045*(.4+p.depth)-p.speed)*step;
        if(p.x<0)p.x=width;if(p.x>width)p.x=0;if(p.y<0)p.y=height;if(p.y>height)p.y=0;
      }
      const x=(p.x+pointer.sx*(10+p.depth*60)+width)%width,y=(p.y+pointer.sy*(10+p.depth*60)+height)%height;
      const dist=pointer.active?Math.hypot(x-pointer.x,y-pointer.y):1000;
      const sparkle=paused?.8:.68+Math.sin(time/p.period+p.phase)*.32;
      const alpha=Math.min(.82,p.alpha*sparkle+(dist<160?(1-dist/160)*.12:0));
      const color=p.warm?'245,154,87':p.depth>.65?'244,247,252':'229,237,248';
      if(p.bright){ctx.fillStyle=`rgba(${color},${alpha*.09})`;ctx.beginPath();ctx.arc(x,y,p.size*3.2,0,Math.PI*2);ctx.fill();}
      ctx.fillStyle=`rgba(${color},${alpha})`;
      ctx.beginPath();ctx.arc(x,y,p.size,0,Math.PI*2);ctx.fill();
      if(p.depth>.78){
        const angle=Math.atan2(y-height*.5,x-width*.5),length=.5+p.depth*1.4;
        ctx.strokeStyle=`rgba(${color},${alpha*.28})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-Math.cos(angle)*length,y-Math.sin(angle)*length);ctx.stroke();
      }
    });
    if(!paused&&!document.hidden)requestDraw();
  }
  function requestDraw(){if(!raf&&ctx&&!document.hidden)raf=requestAnimationFrame(draw);}
  window.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||paused)return;pointer.x=event.clientX;pointer.y=event.clientY;pointer.active=true;},{passive:true});
  document.addEventListener('pointerleave',()=>{pointer.active=false;});
  window.addEventListener('resize',()=>{resizeCanvas();requestDraw();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){lastFrame=0;requestDraw();}else if(raf){cancelAnimationFrame(raf);raf=0;}});
  document.addEventListener('portfolio:motion',()=>{pointer.active=false;pointer.sx=0;pointer.sy=0;lastFrame=0;requestDraw();});
  resizeCanvas();requestDraw();
})();
