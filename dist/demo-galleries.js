'use strict';
(() => {
  const INTERVAL=1500;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const moving=()=>!reduced.matches&&!document.hidden&&!document.documentElement.classList.contains('no-motion');
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const media=window.PortfolioMedia,galleries=window.PortfolioDemoGalleries;
  const controllers=new Set();
  function gallery(host,ids,{dialog=false,card=false}={}){
    if(!host||ids.length<2)return null;
    let index=0,timer=0,animation=null,version=0,onscreen=false,destroyed=false;
    ids.forEach(id=>{const img=new Image();img.src=media[id].file;});
    host.classList.add('screenshot-gallery');host.setAttribute('aria-label',dialog?'Project screenshot tour':'Project preview screenshots');
    function render(next,animate=true){
      ++version;clearTimeout(timer);animation?.cancel();const token=version;
      index=(next+ids.length)%ids.length;
      const m=media[ids[index]];
      if(card){host.innerHTML=`<img class="project-photo" src="${esc(m.file)}" alt="${esc(m.alt)}" width="${m.width}" height="${m.height}" loading="lazy"><span class="gallery-card-label">${esc(m.label)} <small>${index+1} / ${ids.length}</small></span>`;}
      else{host.innerHTML=`<figure class="dialog-media"><div class="gallery-image-stage"><img src="${esc(m.file)}" alt="${esc(m.alt)}" width="${m.width}" height="${m.height}" decoding="async"></div><figcaption><span>${esc(m.label)} · ${index+1} / ${ids.length}</span><p>${esc(m.caption)}</p><a href="${esc(m.source)}" target="_blank" rel="noopener noreferrer">View source ↗</a></figcaption></figure>`;
        document.querySelectorAll('[data-story-photo]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.storyPhoto===ids[index])));
      }
      host.dataset.screenshotId=ids[index];
      const image=host.querySelector('img');
      // Decode before revealing the incoming image, avoiding a blank flash on first use.
      const reveal=()=>{if(token!==version||destroyed)return;if(animate&&moving()&&image.animate)animation=image.animate([{transform:'translateX(16px)',opacity:.75},{transform:'translateX(0)',opacity:1}],{duration:420,easing:'cubic-bezier(.22,.61,.36,1)'});};
      if(image.complete)reveal();else image.addEventListener('load',reveal,{once:true});
      schedule();
    }
    function schedule(){clearTimeout(timer);if(!destroyed&&moving()&&onscreen&&(!dialog||document.querySelector('#project-dialog').open)&&(!card||(!host.closest('[hidden]')&&!document.querySelector('dialog[open]'))))timer=setTimeout(()=>render(index+1),INTERVAL);}
    const io=new IntersectionObserver(entries=>{onscreen=entries[0].isIntersecting;schedule();},{threshold:.15});io.observe(host);
    const controller={host,ids,show:id=>{const i=ids.indexOf(id);if(i>=0)render(i);},refresh:()=>{if(!moving())animation?.cancel();schedule();},destroy(){destroyed=true;clearTimeout(timer);animation?.cancel();io.disconnect();controllers.delete(controller);}};
    controllers.add(controller);render(0,false);return controller;
  }
  Object.entries(galleries).forEach(([id,ids])=>{
    const card=document.querySelector(`.project-card[data-project-id="${id}"] .card-art`);
    if(card){const host=document.createElement('div');host.className='card-screenshot-tour';card.querySelector('.project-photo')?.remove();card.append(host);gallery(host,ids,{card:true});}
  });
  let active=null;
  function attach(){active?.destroy();active=null;const id=window.PortfolioReader?.current();const ids=galleries[id];if(!ids)return;
    const buttons=Array.from(document.querySelectorAll('[data-story-photo]'));const all=buttons.map(b=>b.dataset.storyPhoto).filter(id=>media[id]);
    active=gallery(document.getElementById('story-photo'),all,{dialog:true});
  }
  window.PortfolioScreenshotGallery={};
  const content=document.getElementById('dialog-content'),dialog=document.getElementById('project-dialog');
  if(content)new MutationObserver(attach).observe(content,{childList:true});
  if(dialog){dialog.addEventListener('click',e=>{const b=e.target.closest('[data-story-photo]');if(!b)return;if(active)active.show(b.dataset.storyPhoto);else{const m=media[b.dataset.storyPhoto];if(m)document.getElementById('story-photo').innerHTML=`<figure class="dialog-media"><img src="${esc(m.file)}" alt="${esc(m.alt)}"><figcaption>${esc(m.caption)}</figcaption></figure>`;}});dialog.addEventListener('close',()=>{active?.destroy();active=null;controllers.forEach(c=>c.refresh());});new MutationObserver(()=>controllers.forEach(c=>c.refresh())).observe(dialog,{attributes:true,attributeFilter:['open']});}
  function refresh(){controllers.forEach(c=>c.refresh());}
  reduced.addEventListener('change',refresh);document.addEventListener('visibilitychange',refresh);document.addEventListener('portfolio:motion',refresh);
  const grid=document.getElementById('project-grid');if(grid)new MutationObserver(refresh).observe(grid,{subtree:true,attributes:true,attributeFilter:['hidden']});
  window.addEventListener('pagehide',()=>Array.from(controllers).forEach(c=>c.destroy()));
  if(dialog?.open)attach();
})();
