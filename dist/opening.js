'use strict';
(() => {
  const opening=document.getElementById('way-opening');
  if(!opening)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  // Deep links go straight to the requested project or section.
  if(reduced.matches||document.documentElement.classList.contains('no-motion')||window.location.hash||document.hidden)return;
  const paths=Array.from(opening.querySelectorAll('.way-ink'));
  let lengths;
  try{lengths=paths.map(path=>path.getTotalLength());}catch{return;}
  const beam=opening.querySelector('.way-laser');
  const surfaces=Array.from(document.body.children).filter(node=>node!==opening&&!['SCRIPT','STYLE'].includes(node.tagName)).map(node=>[node,node.hasAttribute('inert')]);
  let frame=0,watchdog=0,releaseTimer=0,finished=false,revealing=false;
  function finish(){
    if(finished)return;
    finished=true;cancelAnimationFrame(frame);clearTimeout(watchdog);clearTimeout(releaseTimer);
    opening.hidden=true;
    document.documentElement.classList.remove('way-opening-active');
    surfaces.forEach(([node,wasInert])=>{if(!wasInert)node.removeAttribute('inert');});
    document.removeEventListener('keydown',onKey);
    document.removeEventListener('visibilitychange',onVisibility);
    document.removeEventListener('portfolio:motion',onMotion);
    reduced.removeEventListener('change',onPreference);
    window.removeEventListener('pagehide',finish);
  }
  function reveal(){
    if(finished||revealing)return;
    revealing=true;cancelAnimationFrame(frame);beam.style.opacity='0';
    opening.dataset.phase='open';releaseTimer=setTimeout(finish,420);
  }
  function onKey(event){if(event.key==='Escape'){event.preventDefault();finish();}}
  function onVisibility(){if(document.hidden)finish();}
  function onMotion(){if(document.documentElement.classList.contains('no-motion'))finish();}
  function onPreference(event){if(event.matches)finish();}
  paths.forEach((path,i)=>{path.style.strokeDasharray=String(lengths[i]);path.style.strokeDashoffset=String(lengths[i]);});
  const durations=[300,290,80,220,100];
  const start=performance.now();
  function draw(now){
    if(finished||revealing)return;
    try{
      let elapsed=Math.max(0,now-start-80),remaining=elapsed,active=-1,progress=0;
      paths.forEach((path,i)=>{
        const fraction=Math.min(1,Math.max(0,remaining/durations[i]));
        path.style.strokeDashoffset=String(lengths[i]*(1-fraction));
        if(remaining>=0&&remaining<durations[i]){active=i;progress=fraction;}
        remaining-=durations[i];
      });
      if(active>=0&&now-start>=80){const point=paths[active].getPointAtLength(lengths[active]*progress);beam.setAttribute('transform',`translate(${point.x} ${point.y})`);beam.style.opacity='1';}else beam.style.opacity='0';
      if(elapsed>=1100){reveal();return;}
      frame=requestAnimationFrame(draw);
    }catch{finish();}
  }
  surfaces.forEach(([node])=>node.setAttribute('inert',''));
  document.documentElement.classList.add('way-opening-active');
  opening.dataset.phase='draw';opening.hidden=false;
  document.addEventListener('keydown',onKey);
  document.addEventListener('visibilitychange',onVisibility);
  document.addEventListener('portfolio:motion',onMotion);
  reduced.addEventListener('change',onPreference);
  window.addEventListener('pagehide',finish);
  // A delayed frame or unsupported SVG never leaves the page covered.
  watchdog=setTimeout(finish,2100);frame=requestAnimationFrame(draw);
})();
