'use strict';
(() => {
  const rail=document.getElementById('project-grid');if(!rail)return;
  const originals=Array.from(rail.querySelectorAll('.project-card'));
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const SPEED=14; // Automatic drift in pixels per second. Lower = slower.
  let frame=0,last=0,visible=false,hover=false,drag=null,blockedUntil=0,suppressClick=false,direction=1,carry=0;
  rail.classList.add('project-rail');rail.tabIndex=0;rail.setAttribute('role','region');rail.setAttribute('aria-label','Project collection, swipe or drag to explore');
  originals.forEach(c=>c.querySelectorAll('img').forEach(img=>img.draggable=false));
  const controls=document.createElement('div');controls.className='rail-navigation';controls.innerHTML='<p><span aria-hidden="true">↔</span> Swipe or drag to explore</p><div><button type="button" data-rail-prev aria-label="Previous projects">←</button><button type="button" data-rail-next aria-label="Next projects">→</button></div>';rail.before(controls);
  const available=()=>Array.from(rail.children).filter(c=>c.classList.contains('project-card')&&!c.hidden);
  const gap=()=>parseFloat(getComputedStyle(rail).columnGap)||22;
  const step=c=>c.getBoundingClientRect().width+gap();
  function hold(ms=4500){blockedUntil=performance.now()+ms;last=0;}
  function recycle(){
    const cards=available();if(cards.length<2)return;
    const size=step(cards[0]);
    if(rail.scrollWidth-rail.clientWidth<size+1)return;
    if(rail.scrollLeft>=size){const offset=rail.scrollLeft-size;rail.append(cards[0]);rail.scrollLeft=offset;}
  }
  function enabled(){return visible&&!document.hidden&&!reduced.matches&&!document.documentElement.classList.contains('no-motion');}
  function tick(now){
    frame=0;if(!enabled()){last=0;return;}
    const dt=last?Math.min((now-last)/1000,.05):0;last=now;
    const cards=available(),max=rail.scrollWidth-rail.clientWidth;
    if(max>1&&cards.length>1&&!hover&&!drag&&!rail.contains(document.activeElement)&&!document.querySelector('dialog[open]')&&now>=blockedUntil){
      if(max<step(cards[0])+1){if(rail.scrollLeft>=max-1)direction=-1;else if(rail.scrollLeft<=1)direction=1;}
      else{direction=1;recycle();}
      carry+=SPEED*dt;const pixels=Math.floor(carry);carry-=pixels;rail.scrollLeft+=pixels*direction;
    }
    frame=requestAnimationFrame(tick);
  }
  function refresh(){cancelAnimationFrame(frame);frame=0;last=0;if(enabled())frame=requestAnimationFrame(tick);}
  function move(amount){
    hold(6000);const cards=available();if(cards.length<2)return;const size=step(cards[0]);
    if(amount<0&&rail.scrollLeft<=1&&rail.scrollWidth-rail.clientWidth>=size+1){rail.prepend(cards[cards.length-1]);rail.scrollLeft+=size;}
    if(amount>0)recycle();
    rail.scrollBy({left:amount*size,behavior:reduced.matches?'auto':'smooth'});
  }
  controls.querySelector('[data-rail-prev]').addEventListener('click',()=>move(-1));
  controls.querySelector('[data-rail-next]').addEventListener('click',()=>move(1));
  rail.addEventListener('keydown',e=>{
    if(e.target!==rail)return;
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}
    if(e.key==='Home'||e.key==='End'){e.preventDefault();hold(6000);originals.forEach(c=>rail.append(c));rail.scrollTo({left:e.key==='Home'?0:rail.scrollWidth,behavior:reduced.matches?'auto':'smooth'});}
  });
  rail.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;hold();}});
  rail.addEventListener('pointerleave',()=>{hover=false;hold(2500);});
  rail.addEventListener('pointerdown',e=>{
    hold(6500);if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('input,select,textarea'))return;
    drag={id:e.pointerId,x:e.clientX,start:rail.scrollLeft,moved:false};
  });
  window.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    const delta=e.clientX-drag.x;
    if(!drag.moved&&Math.abs(delta)>6){drag.moved=true;rail.setPointerCapture?.(e.pointerId);rail.classList.add('is-dragging');}
    if(drag.moved){e.preventDefault();rail.scrollLeft=drag.start-delta;}
  },{passive:false});
  function end(e){if(!drag||e.pointerId!==drag.id)return;suppressClick=drag.moved;drag=null;rail.classList.remove('is-dragging');hold(5000);setTimeout(()=>{suppressClick=false;},0);}
  window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
  rail.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopImmediatePropagation();}},{capture:true});
  rail.addEventListener('dragstart',e=>e.preventDefault());
  rail.addEventListener('wheel',()=>hold(),{passive:true});
  rail.addEventListener('touchstart',()=>hold(6500),{passive:true});rail.addEventListener('touchend',()=>hold(5000),{passive:true});
  rail.addEventListener('focusin',()=>hold());rail.addEventListener('focusout',()=>hold(2500));
  // Existing filters retain their original card objects, including shortlist and gallery state.
  new MutationObserver(()=>{originals.forEach(c=>rail.append(c));rail.scrollLeft=0;direction=1;hold(1800);const count=available().length;controls.hidden=count<2;refresh();}).observe(rail,{subtree:true,attributes:true,attributeFilter:['hidden']});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;refresh();},{threshold:.08}).observe(rail);
  document.addEventListener('visibilitychange',refresh);document.addEventListener('portfolio:motion',refresh);reduced.addEventListener('change',refresh);
  new ResizeObserver(()=>{hold(1000);refresh();}).observe(rail);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));
})();

(() => {
  const thread=document.getElementById('assistant-thread');if(!thread)return;
  function welcome(){if(thread.children.length!==1)return;const bubble=thread.querySelector('.assistant .chat-bubble');if(bubble&&bubble.textContent.startsWith('Welcome!'))bubble.textContent="Hi! These are pre-written answers about Wilbert’s work. Pick a question below or type your own about a project, his skills or his internship availability.";}
  new MutationObserver(welcome).observe(thread,{childList:true});welcome();
})();
