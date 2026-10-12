'use strict';
(() => {
  const opening=document.getElementById('way-opening');
  if(!opening)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  // Deep links go straight to the requested project or section.
  if(reduced.matches||window.location.hash||document.hidden)return;
  const paths=Array.from(opening.querySelectorAll('.way-ink'));
  let lengths;
  try{lengths=paths.map(path=>path.getTotalLength());}catch{return;}
  const skip=opening.querySelector('.way-skip');
  const beam=opening.querySelector('.way-laser');
  const focusBefore=document.activeElement;
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
    reduced.removeEventListener('change',onPreference);
    window.removeEventListener('pagehide',finish);
    if(document.activeElement===skip){skip.blur();if(focusBefore&&focusBefore!==document.body)focusBefore.focus({preventScroll:true});}
  }
  function reveal(){
    if(finished||revealing)return;
    revealing=true;cancelAnimationFrame(frame);beam.style.opacity='0';
    opening.dataset.phase='open';releaseTimer=setTimeout(finish,650);
  }
  function onKey(event){if(event.key==='Escape'){event.preventDefault();finish();}}
  function onVisibility(){if(document.hidden)finish();}
  function onPreference(event){if(event.matches)finish();}
  paths.forEach((path,i)=>{path.style.strokeDasharray=String(lengths[i]);path.style.strokeDashoffset=String(lengths[i]);});
  const durations=[500,480,130,360,170];
  const start=performance.now();
  function draw(now){
    if(finished||revealing)return;
    try{
      let elapsed=Math.max(0,now-start-150),remaining=elapsed,active=-1,progress=0;
      paths.forEach((path,i)=>{
        const fraction=Math.min(1,Math.max(0,remaining/durations[i]));
        path.style.strokeDashoffset=String(lengths[i]*(1-fraction));
        if(remaining>=0&&remaining<durations[i]){active=i;progress=fraction;}
        remaining-=durations[i];
      });
      if(active>=0&&now-start>=150){const point=paths[active].getPointAtLength(lengths[active]*progress);beam.setAttribute('transform',`translate(${point.x} ${point.y})`);beam.style.opacity='1';}else beam.style.opacity='0';
      if(elapsed>=1800){reveal();return;}
      frame=requestAnimationFrame(draw);
    }catch{finish();}
  }
  surfaces.forEach(([node])=>node.setAttribute('inert',''));
  document.documentElement.classList.add('way-opening-active');
  opening.dataset.phase='draw';opening.hidden=false;
  skip.addEventListener('click',finish,{once:true});skip.focus({preventScroll:true});
  document.addEventListener('keydown',onKey);
  document.addEventListener('visibilitychange',onVisibility);
  reduced.addEventListener('change',onPreference);
  window.addEventListener('pagehide',finish);
  // A delayed frame or unsupported SVG never leaves the page covered.
  watchdog=setTimeout(finish,3000);frame=requestAnimationFrame(draw);
})();
