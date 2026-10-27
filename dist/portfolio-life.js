'use strict';
(() => {
  const root=document.documentElement;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const moving=()=>!reduced.matches&&!root.classList.contains('no-motion')&&!document.hidden&&!root.classList.contains('way-opening-active');
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const showcase=document.querySelector('.hero-showcase');
  const slide=document.getElementById('showcase-slide');
  const projects=window.PORTFOLIO_PROJECTS;
  const details={
    defectrag:{label:'VISUAL INSPECTION & RAG',copy:'Visual inspection, cited explanations and corrective-action workflows.',note:'Retrospective comparison · 12 VisA products',metrics:[0,1]},
    paddy:{label:'FINAL-YEAR THESIS',copy:'A compact backbone for paddy disease detection.',note:'803 test images · One run per model',metrics:[0,2]},
    marine:{label:'COMPUTER VISION PROJECT',copy:'Lightweight detection for life below the surface.',note:'Recorded results · URPC2020',metrics:[0,1]},
    dpickleball:{label:'DEEP REINFORCEMENT LEARNING',copy:'Self-play agents trained for competitive pickleball.',note:'Team result · Final class competition',metrics:[0,1]},
    resucn:{label:'ADVANCED MACHINE LEARNING',copy:'An efficient take on residual image classification.',note:'Recorded evaluation · CIFAR-10',metrics:[0,1]},
    fer:{label:'DEEP LEARNING PROJECT',copy:'Comparing models for seven facial expressions.',note:'Recorded coursework evaluation · FER2013',metrics:[0,1]},
    mri:{label:'PRINCIPLE OF AI PROJECT',copy:'Exploring MRI and clinical data classification.',note:'Coursework results · Not clinical validation',metrics:[0,2]}
  };
  if(!showcase||!slide||!projects?.length)return;
  let index=Math.max(0,projects.findIndex(p=>p.id==='paddy'));
  let timer=0,animation=null,revision=0,visible=false;
  const dots=showcase.querySelector('.showcase-dots');
  projects.forEach((p,i)=>{
    const button=document.createElement('button');button.type='button';
    button.className='showcase-dot';button.setAttribute('aria-label','Show '+p.short);
    button.addEventListener('click',()=>show(i,true));dots.append(button);
    const image=new Image();image.src=window.projectMedia(p.id).file;
  });
  function render(){
    const p=projects[index],config=details[p.id],media=window.projectMedia(p.id);
    const metrics=config.metrics.map(i=>p.metrics[i]);
    slide.dataset.projectId=p.id;
    slide.innerHTML=`<div class="snapshot-window"><img src="${escape(media.file)}" width="${media.width}" height="${media.height}" alt="${escape(media.alt)}" decoding="async"></div><div class="snapshot-caption"><div><span class="snapshot-kicker">${config.label}</span><h3>${escape(p.short)}</h3><p>${escape(config.copy)}</p></div><button type="button" data-project="${p.id}" class="snapshot-open">View project</button></div><div class="snapshot-metrics">${metrics.map(([value,label])=>`<div><strong>${escape(value)}</strong><small>${escape(label)}</small></div>`).join('')}<span class="snapshot-note">${escape(config.note)}</span></div>`;
    showcase.querySelector('.showcase-index').textContent=String(index+1).padStart(2,'0')+' / '+String(projects.length).padStart(2,'0');
    Array.from(dots.children).forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  }
  function stop(){clearTimeout(timer);timer=0;}
  function cancelAnimation(){if(animation){animation.cancel();animation=null;}}
  function schedule(){
    stop();
    if(moving()&&visible&&!slide.contains(document.activeElement)&&!document.querySelector('dialog[open]'))timer=setTimeout(()=>show(index+1),3000);
  }
  async function show(next,manual=false){
    const token=++revision;stop();cancelAnimation();
    const previous=index;index=(next+projects.length)%projects.length;
    // Update state immediately so fast clicks always use the latest requested index.
    render();schedule();
    if(manual)showcase.querySelector('.showcase-status').textContent=projects[index].short+', project '+(index+1)+' of '+projects.length;
    if(previous!==index&&moving()&&slide.animate){
      const direction=next>=previous?1:-1;
      animation=slide.animate([
        {opacity:.75,transform:`translateX(${direction*18}px)`},
        {opacity:1,transform:'translateX(0)'}
      ],{duration:420,easing:'cubic-bezier(.2,.75,.25,1)'});
      try{await animation.finished;}catch{}
      if(token!==revision)return;
      animation=null;
    }
  }
  showcase.querySelector('.showcase-prev').addEventListener('click',()=>show(index-1,true));
  showcase.querySelector('.showcase-next').addEventListener('click',()=>show(index+1,true));
  showcase.addEventListener('keydown',event=>{
    if(!event.target.closest('.showcase-controls'))return;
    if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(index+(event.key==='ArrowRight'?1:-1),true);}
    if(event.key==='Home'){event.preventDefault();show(0,true);}
    if(event.key==='End'){event.preventDefault();show(projects.length-1,true);}
  });
  showcase.addEventListener('focusin',schedule);
  showcase.addEventListener('focusout',()=>queueMicrotask(schedule));
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.2}).observe(showcase);
  new MutationObserver(schedule).observe(document.body,{attributes:true,attributeFilter:['open'],subtree:true});
  render();

  // One visible card at a time: a quiet lift, a blue rim and emphasis on its result.
  const cards=Array.from(document.querySelectorAll('.project-card'));
  const inView=new Set();let cardTimer=0,spotlight=null,held=null;
  function clearSpotlight(){cards.forEach(card=>card.classList.remove('is-spotlit'));spotlight=null;}
  function setSpotlight(card){if(spotlight===card)return;clearSpotlight();if(card){spotlight=card;card.classList.add('is-spotlit');}}
  function candidates(){return cards.filter(card=>!card.hidden&&inView.has(card));}
  function scheduleCards(){
    clearTimeout(cardTimer);
    if(!moving()){clearSpotlight();return;}
    const available=candidates();
    if(!available.length){clearSpotlight();return;}
    if(held&&available.includes(held)){setSpotlight(held);return;}
    if(!available.includes(spotlight))setSpotlight(available[0]);
    if(available.length>1)cardTimer=setTimeout(()=>{const next=available[(available.indexOf(spotlight)+1)%available.length];setSpotlight(next);scheduleCards();},4200);
  }
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)inView.add(entry.target);else inView.delete(entry.target);});scheduleCards();},{threshold:.25});
  cards.forEach(card=>{
    observer.observe(card);
    card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){held=card;scheduleCards();}});
    card.addEventListener('pointerleave',()=>{held=card.contains(document.activeElement)?card:null;scheduleCards();});
    card.addEventListener('focusin',()=>{held=card;scheduleCards();});
    card.addEventListener('focusout',()=>queueMicrotask(()=>{held=card.matches(':hover')?card:null;scheduleCards();}));
  });
  const grid=document.getElementById('project-grid');
  if(grid)new MutationObserver(scheduleCards).observe(grid,{subtree:true,attributes:true,attributeFilter:['hidden']});
  function refresh(){if(!moving()){++revision;cancelAnimation();}schedule();scheduleCards();}
  document.addEventListener('portfolio:motion',refresh);
  document.addEventListener('visibilitychange',refresh);
  reduced.addEventListener('change',refresh);
  new MutationObserver(refresh).observe(root,{attributes:true,attributeFilter:['class']});
  window.addEventListener('pagehide',()=>{stop();clearTimeout(cardTimer);cancelAnimation();});
})();
