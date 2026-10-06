'use strict';
(() => {
  const $=s=>document.querySelector(s);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const moving=()=>!reduced.matches&&!document.documentElement.classList.contains('no-motion')&&!document.hidden;
  // Slowly cycle the vision desk; manual exploration gets a longer pause.
  const fields=['objects','fer','defectrag'];let labTimer=0,manualUntil=0,hovered=false;
  function scheduleLab(){clearTimeout(labTimer);if(moving())labTimer=setTimeout(()=>{if(!moving())return;const disclosure=$('.vision-lab').closest('details');if((!disclosure||disclosure.open)&&!hovered&&!$('.vision-lab').contains(document.activeElement)&&Date.now()>manualUntil){const current=document.querySelector('[data-lab].active')?.dataset.lab;const next=fields[(fields.indexOf(current)+1)%fields.length];document.querySelector(`[data-lab="${next}"]`)?.click();}scheduleLab();},6800);}
  $('.vision-lab').addEventListener('pointerenter',()=>{hovered=true;});$('.vision-lab').addEventListener('pointerleave',()=>{hovered=false;});
  document.querySelectorAll('[data-lab]').forEach(b=>b.addEventListener('click',e=>{if(e.isTrusted)manualUntil=Date.now()+20000;}));
  document.addEventListener('portfolio:motion',scheduleLab);document.addEventListener('visibilitychange',()=>{document.documentElement.classList.toggle('tab-hidden',document.hidden);scheduleLab();});reduced.addEventListener('change',scheduleLab);scheduleLab();
})();
