'use strict';
(() => {
  const reticle=document.getElementById('navigation-reticle');
  const name=document.getElementById('hero-title');
  if(!reticle||!name)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const moving=()=>!reduced.matches&&!document.hidden&&!document.documentElement.classList.contains('no-motion')&&!document.documentElement.classList.contains('way-opening-active');
  let frame=0,endTimer=0,hideTimer=0,lastDraw=0;
  function stop(){
    cancelAnimationFrame(frame);clearTimeout(endTimer);clearTimeout(hideTimer);
    frame=endTimer=hideTimer=0;reticle.hidden=true;reticle.classList.remove('is-leaving');
  }
  function fade(){cancelAnimationFrame(frame);frame=0;reticle.classList.add('is-leaving');hideTimer=setTimeout(stop,180);}
  function position(node,destination=false){
    const r=node.getBoundingClientRect();
    if(!r.width||!r.height||r.bottom<0||r.top>window.innerHeight)return false;
    const size=destination?76:Math.min(110,Math.max(56,r.width+18,r.height+18));
    // Section locks sit in the heading's gutter, keeping the title readable.
    const x=destination?r.left-36:r.left+r.width/2;
    const y=destination?r.top+Math.min(r.height/2,24):r.top+r.height/2;
    const cx=Math.max(size/2+4,Math.min(window.innerWidth-size/2-4,x));
    const cy=Math.max(size/2+4,Math.min(window.innerHeight-size/2-4,y));
    reticle.style.width=reticle.style.height=size+'px';
    reticle.style.transform=`translate3d(${cx-size/2}px,${cy-size/2}px,0)`;
    return true;
  }
  function acquire(node){
    if(!moving())return;
    stop();if(!position(node))return;
    reticle.dataset.mode='acquire';reticle.hidden=false;endTimer=setTimeout(fade,750);
  }
  function findLink(event){
    const link=event.target.closest?.('a[href^="#"]');
    if(!link||link.closest('[inert]')||!link.getAttribute('href').slice(1))return null;
    let id;try{id=decodeURIComponent(link.getAttribute('href').slice(1));}catch{return null;}
    const target=document.getElementById(id);
    return target&&target.closest('main')?{link,target}:null;
  }
  document.addEventListener('pointerover',event=>{
    if(event.pointerType==='touch')return;
    const found=findLink(event);if(!found||found.link.contains(event.relatedTarget))return;
    // Hover stays local to the site's navigation and section shortcuts.
    if(found.link.closest('.header,.section-dots,.hero-cta,.skip-link'))acquire(found.link);
  });
  document.addEventListener('focusin',event=>{const found=findLink(event);if(found)acquire(found.link);});
  document.addEventListener('click',event=>{
    if(event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||(event.button!==undefined&&event.button!==0)||!moving())return;
    const found=findLink(event);if(!found)return;
    stop();position(found.link);reticle.hidden=false;reticle.dataset.mode='locate';
    const heading=found.target.matches('h1,h2,h3')?found.target:found.target.querySelector('h1,h2,h3')||found.target;
    lastDraw=-Infinity;
    function follow(now){
      if(!moving()){stop();return;}
      if(now-lastDraw>=32){if(position(heading,true))reticle.dataset.mode='locked';lastDraw=now;}
      frame=requestAnimationFrame(follow);
    }
    frame=requestAnimationFrame(follow);endTimer=setTimeout(fade,1900);
    // Native anchor scrolling, URL hashes and keyboard focus stay unchanged.
  });
  window.addEventListener('resize',stop);
  window.addEventListener('pagehide',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  document.addEventListener('portfolio:motion',()=>{if(!moving())stop();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')stop();});
  reduced.addEventListener('change',()=>{if(reduced.matches)stop();});
  if('IntersectionObserver' in window){
    const observer=new window.IntersectionObserver(entries=>{entries.forEach(entry=>name.classList.toggle('name-scan-paused',!entry.isIntersecting));},{rootMargin:'40px'});
    observer.observe(name);
  }
})();
