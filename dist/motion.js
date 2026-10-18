'use strict';
(() => {
  const $=s=>document.querySelector(s);
  const $$=s=>Array.from(document.querySelectorAll(s));
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const moving=()=>!document.documentElement.classList.contains('no-motion')&&!reduced.matches&&!document.hidden;
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const phrases=['lightweight detectors','visual inspection tools','RAG applications','reinforcement learning agents'];
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
