'use strict';
(() => {
  const $=s=>document.querySelector(s);
  const $$=s=>Array.from(document.querySelectorAll(s));
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const moving=()=>!document.documentElement.classList.contains('no-motion')&&!reduced.matches&&!document.hidden;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const phrases=['lightweight detectors','visual inspection tools','interactive AI applications','models worth exploring'];
  let wordIndex=0,wordTimer=0,wordAnimation=null;
  const word=$('#build-word');
  function stopWords(){clearTimeout(wordTimer);wordTimer=0;if(wordAnimation){wordAnimation.cancel();wordAnimation=null;}}
  function scheduleWord(){stopWords();if(moving())wordTimer=setTimeout(changeWord,3400);}
  function changeWord(){
    if(!moving())return;
    const next=(wordIndex+1)%phrases.length;
    if(!word.animate){wordIndex=next;word.textContent=phrases[next];scheduleWord();return;}
    wordAnimation=word.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-18px)',filter:'blur(3px)'}],{duration:200,easing:'ease-in',fill:'forwards'});
    wordAnimation.onfinish=()=>{
      wordIndex=next;word.textContent=phrases[next];wordAnimation.cancel();
      wordAnimation=word.animate([{opacity:0,transform:'translateY(18px)',filter:'blur(3px)'},{opacity:1,transform:'translateY(0)',filter:'blur(0)'}],{duration:350,easing:'cubic-bezier(.2,.7,.2,1)'});
      wordAnimation.onfinish=()=>{wordAnimation=null;scheduleWord();};
    };
  }
  document.addEventListener('portfolio:motion',scheduleWord);
  document.addEventListener('visibilitychange',scheduleWord);
  reduced.addEventListener('change',scheduleWord);scheduleWord();

  const featured=['marine','paddy','defectrag'];
  const projects=featured.map(id=>window.PORTFOLIO_PROJECTS.find(p=>p.id===id));
  const stage=$('#deck-stage');
  stage.innerHTML=projects.map((p,i)=>`<button class="deck-card" data-deck="${p.id}" aria-pressed="${i===0}" aria-label="Select ${escape(p.title)}"><span class="deck-card-top"><span>${String(i+1).padStart(2,'0')} / ${escape(p.category)}</span><span aria-hidden="true">↗</span></span><span class="deck-art">${window.projectIllustration(p.id,'orbit')}</span><span class="deck-card-copy"><span class="project-kicker">${escape(p.status)}</span><strong>${escape(p.title)}</strong><span class="deck-description">${escape(p.description)}</span><span class="deck-tags">${p.tags.slice(0,3).map(escape).join(' · ')}</span><span class="deck-visual-note">Concept illustration · explore the real code below</span></span></button>`).join('');
  let selected=0;
  function syncDeck(id){
    const index=featured.indexOf(id);if(index<0)return;selected=index;
    $$('[data-deck]').forEach((card,i)=>{
      const offset=(i-selected+featured.length)%featured.length;
      card.dataset.position=offset===0?'center':offset===1?'right':'left';
      card.setAttribute('aria-pressed',i===selected?'true':'false');
    });
    $('#deck-status').textContent=`${projects[selected].short} · ${selected+1} of ${featured.length}`;
  }
  function selectIndex(index){const next=(index+featured.length)%featured.length;window.PortfolioFeatured.select(featured[next]);}
  $$('[data-deck]').forEach(card=>card.addEventListener('click',e=>{if(suppressClick){e.preventDefault();suppressClick=false;return;}window.PortfolioFeatured.select(card.dataset.deck);}));
  $('#deck-prev').addEventListener('click',()=>selectIndex(selected-1));
  $('#deck-next').addEventListener('click',()=>selectIndex(selected+1));
  stage.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'){e.preventDefault();selectIndex(selected+1);}
    else if(e.key==='ArrowLeft'){e.preventDefault();selectIndex(selected-1);}
    else if(e.key==='Home'){e.preventDefault();selectIndex(0);}
    else if(e.key==='End'){e.preventDefault();selectIndex(featured.length-1);}
  });
  document.addEventListener('portfolio:featured',e=>syncDeck(e.detail.id));
  let start=null,suppressClick=false;
  stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;suppressClick=false;start={x:e.clientX,y:e.clientY,id:e.pointerId};});
  stage.addEventListener('pointerup',e=>{
    if(!start||start.id!==e.pointerId)return;
    const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;
    if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.35){suppressClick=true;selectIndex(selected+(dx<0?1:-1));setTimeout(()=>{suppressClick=false;},0);}
  });
  stage.addEventListener('pointercancel',()=>{start=null;suppressClick=false;});
  stage.addEventListener('pointerleave',()=>{start=null;suppressClick=false;});
  syncDeck(window.PortfolioFeatured.current());

  let tiltFrame=0,pendingTilt=null;
  function resetTilt(){pendingTilt=null;if(tiltFrame){cancelAnimationFrame(tiltFrame);tiltFrame=0;}$$('.card-art,.feature-art,.vision-lab').forEach(el=>{el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg');});}
  document.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch'||!moving())return;
    const el=e.target.closest('.card-art,.feature-art,.vision-lab');if(!el)return;
    pendingTilt={el,x:e.clientX,y:e.clientY};
    if(!tiltFrame)tiltFrame=requestAnimationFrame(()=>{tiltFrame=0;const p=pendingTilt;if(!p||!moving())return;const r=p.el.getBoundingClientRect();if(!r.width||!r.height)return;p.el.style.setProperty('--tilt-x',(-((p.y-r.top)/r.height-.5)*4).toFixed(2)+'deg');p.el.style.setProperty('--tilt-y',(((p.x-r.left)/r.width-.5)*5).toFixed(2)+'deg');});
  },{passive:true});
  document.addEventListener('pointerout',e=>{const el=e.target.closest?.('.card-art,.feature-art,.vision-lab');if(el&&!el.contains(e.relatedTarget)){el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg');}});
  document.addEventListener('portfolio:motion',()=>{resetTilt();$$('#featured-panel,#lab-art').forEach(el=>el.getAnimations?.().forEach(a=>a.cancel()));});
  document.addEventListener('visibilitychange',resetTilt);
})();
