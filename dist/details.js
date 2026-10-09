'use strict';
(() => {
  const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const projects=window.PORTFOLIO_PROJECTS, dialog=$('#project-dialog');
  let current=null,lastFocus=null,returnHash='#projects';
  const mediaIds={marine:['marineSite'],paddy:['paddySite'],dpickleball:['dpickleball'],resucn:['resucn'],fer:['fer','ferMatrix'],mri:['mri']};
  const link=(url,label,primary=false)=>`<a class="${primary?'case-button':'demo-link'}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span></a>`;
  const nav=[['overview','Overview'],['work','My contribution'],['results','Results'],['evidence','Evidence'],['reflection','Lessons & credits']];
  function render(p){
    const index=projects.indexOf(p), photos=(mediaIds[p.id]||[]).filter(id=>window.PortfolioMedia[id]);
    $('#dialog-content').innerHTML=`<header class="reader-top"><span class="project-kicker">PROJECT ${String(index+1).padStart(2,'0')} / ${projects.length} · ${esc(p.short)}</span><button id="project-copy" aria-label="Copy project link">Copy link <span aria-hidden="true">⧉</span></button></header><div class="reader-shell"><nav class="reader-nav" aria-label="Project story"><small>INSIDE THE PROJECT</small>${nav.map(([id,title],i)=>`<button data-story-section="${id}" ${i===0?'aria-current="location"':''}>${title}</button>`).join('')}</nav><div class="reader-main"><section class="reader-section" id="story-overview"><span class="project-kicker">${esc(p.kicker)}</span><h2 id="dialog-title">${esc(p.title)}</h2><p class="reader-lead">${esc(p.description)}</p><div class="reader-meta"><span>${esc(p.year)}</span><span>${esc(p.status)}</span></div><div class="tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="reader-links">${p.demo?link(p.demo,'Open live demo',true):p.video?link(p.video,'Watch competition',true):''}${link(p.repository,'Source code')}</div><div id="story-photo">${window.projectPhotoFigure(p.id)}</div>${photos.length>1?`<div class="reader-gallery" aria-label="Project screenshots">${photos.map((id,i)=>{const m=window.PortfolioMedia[id];return `<button data-story-photo="${id}" aria-pressed="${i===0}"><img src="${esc(m.file)}" alt="" loading="lazy">${esc(m.label)}</button>`;}).join('')}</div>`:''}<h3 style="margin-top:28px">The problem</h3><p class="dialog-summary">${esc(p.summary)}</p></section><section class="reader-section" id="story-work"><span class="project-kicker">01 / OWNERSHIP</span><h3>My contribution</h3><ol class="contribution-list">${p.contributions.map(t=>`<li>${esc(t)}</li>`).join('')}</ol></section><section class="reader-section" id="story-results"><span class="project-kicker">02 / EVALUATION</span><h3>Results & trade-offs</h3><div class="feature-metrics">${p.metrics.map(([v,l])=>`<div><strong>${esc(v)}</strong><small>${esc(l)}</small></div>`).join('')}</div><p>${esc(p.outcome)}</p>${p.table?`<table class="dialog-table"><caption>${esc(p.tableCaption||'URPC2020 test-set comparison, using the project split')}</caption><thead><tr>${p.table[0].map(c=>`<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${p.table.slice(1).map(row=>`<tr>${row.map((c,i)=>i?`<td>${esc(c)}</td>`:`<th scope="row">${esc(c)}</th>`).join('')}</tr>`).join('')}</tbody></table>`:''}</section><section class="reader-section" id="story-evidence"><span class="project-kicker">03 / THE ORIGINAL WORK</span><h3>Explore the evidence</h3><p>${p.video?'The competition recording shows the agents in action. The repository describes training and the team’s final submission.':p.evidence?'Review the published evaluation record alongside the model comparisons above.':'The project repository contains the original code and documentation behind this case study.'}</p><div class="reader-links">${p.video?link(p.video,'Competition recording',true):''}${p.evidence?link(p.evidence,'Evaluation record',true):''}${link(p.repository,'Project repository')}${p.demo?link(p.demo,'Interactive demo'):''}</div></section><section class="reader-section" id="story-reflection"><span class="project-kicker">04 / REFLECTION</span><h3>What I learned</h3><p>${esc(p.learning)}</p><h3>Context & credits</h3><p class="dialog-note">${esc(p.credit)}</p>${p.upstream?link(p.upstream,'Original upstream work'):''}</section><div class="reader-bottom"><button data-story-project="${projects[(index-1+projects.length)%projects.length].id}">← ${esc(projects[(index-1+projects.length)%projects.length].short)}</button><button data-story-project="${projects[(index+1)%projects.length].id}">${esc(projects[(index+1)%projects.length].short)} →</button></div><p id="story-status" role="status" class="certificate-status"></p></div></div>`;
  }
  function open(id,focus,fromRoute=false){
    const p=projects.find(p=>p.id===id);if(!p)return;
    if(!dialog.open){lastFocus=focus||document.activeElement;returnHash=location.hash.startsWith('#project=')?'#projects':location.hash||'#projects';}
    current=p;render(p);
    if(!fromRoute){history.pushState(null,'','#project='+encodeURIComponent(id));}
    if(!dialog.open)dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';dialog.querySelector('.dialog-close').focus();
  }
  window.PortfolioReader={open,current:()=>current?.id};
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',async e=>{
    const section=e.target.closest('[data-story-section]');
    if(section){$('#story-'+section.dataset.storySection).scrollIntoView({behavior:document.documentElement.classList.contains('no-motion')?'auto':'smooth',block:'start'});dialog.querySelectorAll('[data-story-section]').forEach(b=>{if(b===section)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current');});}
    const photo=e.target.closest('[data-story-photo]');
    if(photo){const m=window.PortfolioMedia[photo.dataset.storyPhoto];$('#story-photo').innerHTML=`<figure class="dialog-media"><img src="${esc(m.file)}" alt="${esc(m.alt)}" width="${m.width}" height="${m.height}"><figcaption>${esc(m.caption)} ${link(m.source,'Original source')}</figcaption></figure>`;dialog.querySelectorAll('[data-story-photo]').forEach(b=>b.setAttribute('aria-pressed',b===photo));}
    const next=e.target.closest('[data-story-project]');if(next)open(next.dataset.storyProject,null);
    if(e.target.closest('#project-copy')){try{await navigator.clipboard.writeText(location.href);$('#story-status').textContent='Project link copied.';}catch{$('#story-status').textContent='Copy this project link from your address bar.';}}
    if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}
  });
  dialog.addEventListener('close',()=>{document.body.style.overflow='';if(location.hash.startsWith('#project='))history.replaceState(null,'',returnHash);lastFocus?.focus();});
  function route(){const match=location.hash.match(/^#project=([^&]+)/);if(match){let id;try{id=decodeURIComponent(match[1]);}catch{return;}open(id,null,true);}else if(dialog.open)dialog.close();}
  window.addEventListener('hashchange',route);window.addEventListener('popstate',route);route();

  const config=window.PORTFOLIO_CREDENTIALS, cd=$('#credential-dialog');
  let credential,attachmentIndex=0,certificateFocus,documentUrl=null;
  const fileIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>';
  function filesFor(item){return item.attachments.filter(a=>a&&/^[a-zA-Z0-9_./-]+\.(pdf|png|jpg|jpeg|webp)$/i.test(a.file)&&a.file.startsWith('assets/certificates/')&&!a.file.split('/').includes('..'));}
  config.items.forEach(item=>{
    const files=filesFor(item),holder=document.querySelector('[data-credential-entry="'+item.id+'"]');if(!holder||!files.length)return;
    const actions=document.createElement('div');actions.className='credential-actions';actions.innerHTML=`<button class="credential-button" data-credential="${item.id}" aria-label="View certificates: ${esc(item.title)}">${fileIcon}${files.length>1?'View certificates ('+files.length+')':'View certificate'} <span aria-hidden="true">↗</span></button>`;
    (holder.classList.contains('scholarship-note')?holder:holder.querySelector('div')).appendChild(actions);
  });
  function showFile(a){
    if(documentUrl){URL.revokeObjectURL(documentUrl);documentUrl=null;}
    const source=window.PORTFOLIO_EMBEDDED_CERTIFICATES?.[a.file]||a.file;
    let fullSource=source;
    if(source.startsWith('data:')){
      const [header,payload]=source.split(',');
      const bytes=Uint8Array.from(atob(payload),c=>c.charCodeAt(0));
      documentUrl=URL.createObjectURL(new Blob([bytes],{type:header.slice(5,header.indexOf(';'))}));
      fullSource=documentUrl;
    }
    const ext=a.file.split('.').pop().toLowerCase(),stage=$('#certificate-stage');
    stage.innerHTML=ext==='pdf'?`<iframe src="${esc(source)}" title="${esc(a.label)}"></iframe>`:`<img src="${esc(source)}" alt="${esc(a.label)}">`;
    $('#certificate-footer').innerHTML=`<a href="${esc(fullSource)}" target="_blank" rel="noopener noreferrer">Open full document ↗</a><a href="${esc(fullSource)}" download="${esc(a.file.split('/').pop())}">Download</a>`;
    $('#certificate-status').textContent='Original certificate · '+a.label;
  }
  function renderCredential(){
    const files=filesFor(credential);$('#credential-title').textContent=credential.title;$('#credential-meta').textContent=credential.kind+' · '+credential.period;
    $('#credential-tabs').innerHTML=files.map((a,i)=>`<button data-attachment="${i}" aria-pressed="${i===attachmentIndex}">${esc(a.label)}</button>`).join('');
    showFile(files[attachmentIndex]);
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-credential]');if(!b)return;credential=config.items.find(i=>i.id===b.dataset.credential);if(!credential||!filesFor(credential).length)return;certificateFocus=b;attachmentIndex=0;renderCredential();cd.showModal();document.body.style.overflow='hidden';$('#credential-close').focus();});
  $('#credential-close').addEventListener('click',()=>cd.close());cd.addEventListener('close',()=>{document.body.style.overflow='';certificateFocus?.focus();});
  window.addEventListener('pagehide',()=>{if(documentUrl)URL.revokeObjectURL(documentUrl);});
  cd.addEventListener('click',e=>{const b=e.target.closest('[data-attachment]');if(b){attachmentIndex=Number(b.dataset.attachment);renderCredential();}if(e.target===cd){const r=cd.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)cd.close();}});
})();
