'use strict';
(() => {
  const projects=window.PORTFOLIO_PROJECTS;
  const email='30587wilbertandrewtyonathan@gmail.com';
  const escape=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const knownIds=new Set(projects.map(p=>p.id));
  const validSaved=values=>new Set(Array.isArray(values)?values.filter(id=>knownIds.has(id)):[]);
  function filterProjects({category='all',query='',savedOnly=false,saved=[]}={}){
    const words=String(query).toLowerCase().trim().split(/\s+/).filter(Boolean);
    const savedIds=validSaved(Array.from(saved));
    return projects.filter(p=>{
      if(category!=='all'&&p.category!==category)return false;
      if(savedOnly&&!savedIds.has(p.id))return false;
      const text=[p.title,p.short,p.description,p.summary,p.status,...p.tags].join(' ').toLowerCase();
      return words.every(word=>text.includes(word));
    });
  }
  const metrics={map50:{row:1,label:'mAP@0.5',unit:'%',kind:'accuracy',better:'higher'},map5095:{row:2,label:'mAP@0.5:0.95',unit:'%',kind:'accuracy',better:'higher'},params:{row:3,label:'Parameters',unit:'M',kind:'cost',better:'lower'},gflops:{row:4,label:'GFLOPs',unit:'',kind:'cost',better:'lower'},precision:{row:5,label:'Precision',unit:'%',kind:'accuracy',better:'higher'},recall:{row:6,label:'Recall',unit:'%',kind:'accuracy',better:'higher'}};
  function benchmarkInfo(key){
    if(!Object.hasOwn(metrics,key))key='map50';
    const metric=metrics[key];const row=projects.find(p=>p.id==='marine').table[metric.row];
    const baseline=parseFloat(row[1]);const proposed=parseFloat(row[2]);const delta=proposed-baseline;
    const axisMax=metric.kind==='accuracy'?100:Math.ceil(Math.max(baseline,proposed)*1.16*10)/10;
    let insight;
    if(metric.kind==='accuracy')insight=`${Math.abs(delta).toFixed(2)} percentage points ${delta>=0?'higher':'lower'} ${metric.label} than the retrained baseline. ${delta>=0?'An improvement on this metric.':'A trade-off to consider alongside efficiency.'}`;
    else insight=`${((baseline-proposed)/baseline*100).toFixed(1)}% fewer ${key==='params'?'parameters':'GFLOPs'} than the retrained baseline. ${metric.label} decrease from ${row[1]} to ${row[2]}.`;
    return {...metric,baseline,proposed,baselineText:row[1],proposedText:row[2],axisMax,baselineWidth:baseline/axisMax*100,proposedWidth:proposed/axisMax*100,insight};
  }
  function shortlistMail(ids){
    const selected=projects.filter(p=>validSaved(Array.from(ids)).has(p.id));
    if(!selected.length)return null;
    const body=`Hi Wilbert,\n\nI explored your portfolio and would like to discuss:\n\n${selected.map(p=>'• '+p.title).join('\n')}\n\nPlease let me know your availability for a conversation.\n\nBest regards,\n`;
    return 'mailto:'+email+'?subject='+encodeURIComponent('Let’s discuss your portfolio projects')+'&body='+encodeURIComponent(body);
  }
  const sections=[['home','Start here','Introduction & availability'],['about','About Wilbert','Background & education'],['projects','Project collection','Research & applications'],['skills','Skills & tools','Vision, code & deployment'],['milestones','Milestones','Scholarship & leadership'],['contact','Get in touch','Internships & part-time opportunities']];
  function commandEntries(query=''){
    const q=String(query).toLowerCase().trim();
    return [...sections.map(([id,title,detail])=>({type:'section',id,title,detail})),...projects.map(p=>({type:'project',id:p.id,title:p.title,detail:p.tags.join(' · ')}))].filter(item=>!q||(item.title+' '+item.detail).toLowerCase().includes(q));
  }
  window.PortfolioTools={filterProjects,benchmarkInfo,shortlistMail,commandEntries,validSaved};
  if(typeof document==='undefined')return;
  const $=selector=>document.querySelector(selector);
  const $$=selector=>Array.from(document.querySelectorAll(selector));
  let saved=new Set();let savedOnly=false;let category='all';
  try{saved=validSaved(JSON.parse(localStorage.getItem('wilbert-project-shortlist')||'[]'));}catch{}
  const cards=$$('.project-card');
  cards.forEach((card,index)=>{const id=projects[index].id;card.dataset.projectId=id;card.querySelector('.card-bottom').insertAdjacentHTML('afterbegin',`<button class="save-project" data-save="${id}" aria-label="Save ${escape(projects[index].title)} to shortlist" aria-pressed="false">☆</button>`);});
  function applyFilters(){
    const visible=new Set(filterProjects({category,query:$('#project-search').value,savedOnly,saved}).map(p=>p.id));
    cards.forEach(card=>{card.hidden=!visible.has(card.dataset.projectId);});
    $('#project-count').textContent=String(visible.size).padStart(2,'0');
    $('#project-empty').hidden=visible.size>0;
    $('.filter-status').textContent=`Showing ${visible.size} ${savedOnly?'shortlisted ':''}projects${$('#project-search').value?' matching '+$('#project-search').value:''}.`;
  }
  function updateSaved(){
    $$('[data-save]').forEach(button=>{const active=saved.has(button.dataset.save);button.setAttribute('aria-pressed',active);button.textContent=active?'★':'☆';const p=projects.find(p=>p.id===button.dataset.save);button.setAttribute('aria-label',`${active?'Remove':'Save'} ${p.title} ${active?'from':'to'} shortlist`);});
    $('#saved-count').textContent=saved.size;
    $('#share-shortlist').disabled=saved.size===0;
    try{localStorage.setItem('wilbert-project-shortlist',JSON.stringify(Array.from(saved)));}catch{}
    applyFilters();
  }
  document.addEventListener('click',event=>{const b=event.target.closest('[data-save]');if(!b)return;const id=b.dataset.save;if(saved.has(id))saved.delete(id);else saved.add(id);updateSaved();});
  $('#project-search').addEventListener('input',applyFilters);
  $$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;applyFilters();}));
  $('#saved-filter').addEventListener('click',()=>{savedOnly=!savedOnly;$('#saved-filter').setAttribute('aria-pressed',savedOnly);applyFilters();});
  function resetFilters(){category='all';savedOnly=false;$('#project-search').value='';$('#saved-filter').setAttribute('aria-pressed','false');$$('[data-filter]').forEach(b=>{const active=b.dataset.filter==='all';b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});applyFilters();}
  $('#reset-search').addEventListener('click',resetFilters);
  $('#share-shortlist').addEventListener('click',()=>{const href=shortlistMail(saved);if(href)window.location.href=href;});
  updateSaved();
  $$('.skill-card .tags span').forEach(tag=>{
    const text=tag.textContent;const button=document.createElement('button');button.textContent=text;button.className='skill-tag';button.setAttribute('aria-label','Find projects mentioning '+text);
    button.addEventListener('click',()=>{resetFilters();$('#project-search').value=text;applyFilters();$('#projects').scrollIntoView({behavior:document.documentElement.classList.contains('no-motion')?'instant':'smooth'});});
    tag.replaceWith(button);
  });
  function showBenchmark(key){const b=benchmarkInfo(key);$('#benchmark-chart').setAttribute('aria-label',`${b.label}: DU-MobileYOLO baseline ${b.baselineText}, GhostConv + SimSPPF ${b.proposedText}. ${b.better} is better.`);$('#benchmark-chart').innerHTML=`<div class="benchmark-row"><div><span>DU-MobileYOLO baseline</span><strong>${escape(b.baselineText)}</strong></div><div class="bar-track"><div class="bar-baseline" style="width:${b.baselineWidth}%"></div></div></div><div class="benchmark-row"><div><span>GhostConv + SimSPPF</span><strong>${escape(b.proposedText)}</strong></div><div class="bar-track"><div class="bar-proposed" style="width:${b.proposedWidth}%"></div></div></div><div class="benchmark-axis"><span>0</span><span>${b.axisMax}${escape(b.unit)} · ${b.better} is better</span></div>`;$('#benchmark-insight').textContent=b.insight;}
  $('#benchmark-metric').addEventListener('change',event=>showBenchmark(event.target.value));showBenchmark('map50');
  const labDescriptions={marine:'Marine detection — adapting lightweight models to underwater imagery.',paddy:'Paddy research — exploring efficient backbones for agricultural vision.',defectrag:'DefectRAG — connecting visual anomalies with reference-backed context.'};
  function switchLab(id){$('#lab-art').innerHTML=window.projectIllustration(id,'hero');$('#lab-note').textContent=labDescriptions[id];$$('[data-lab]').forEach(b=>{const active=b.dataset.lab===id;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});}
  $$('[data-lab]').forEach(b=>b.addEventListener('click',()=>switchLab(b.dataset.lab)));switchLab('marine');
  const lab=$('#lab-preview');lab.addEventListener('pointermove',event=>{const r=lab.getBoundingClientRect();lab.style.setProperty('--pointer-x',(event.clientX-r.left)+'px');lab.style.setProperty('--pointer-y',(event.clientY-r.top)+'px');lab.classList.add('pointer-active');},{passive:true});lab.addEventListener('pointerleave',()=>lab.classList.remove('pointer-active'));
  const quick=$('#quick-dialog');const recruiter=$('#recruiter-dialog');let quickFocus,recruiterFocus;
  function renderCommands(){const entries=commandEntries($('#quick-search').value);$('#quick-results').innerHTML=entries.length?entries.map(item=>`<button class="quick-result" data-command-type="${item.type}" data-command-id="${item.id}"><span class="command-symbol" aria-hidden="true">${item.type==='section'?'↳':'◇'}</span><span>${escape(item.title)}<small>${escape(item.detail)}</small></span><span aria-hidden="true">↗</span></button>`).join(''):'<p class="command-empty">No matches. Try a project name or a skill.</p>';}
  function openQuick(){if($('#project-dialog').open||recruiter.open)return;quickFocus=document.activeElement;$('#quick-search').value='';renderCommands();quick.showModal();document.body.style.overflow='hidden';$('#quick-search').focus();}
  $('.quick-open').addEventListener('click',openQuick);$('#quick-close').addEventListener('click',()=>quick.close());$('#quick-search').addEventListener('input',renderCommands);
  $('#quick-search').addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();$('.quick-result')?.focus();}if(e.key==='Enter'){e.preventDefault();$('.quick-result')?.click();}});
  quick.addEventListener('click',event=>{const b=event.target.closest('[data-command-id]');if(!b)return;quick.close();if(b.dataset.commandType==='project'){document.querySelector(`.project-card [data-project="${b.dataset.commandId}"]`)?.click();}else{$('#'+b.dataset.commandId).scrollIntoView({behavior:document.documentElement.classList.contains('no-motion')?'instant':'smooth'});const heading=$('#'+b.dataset.commandId+' h1, #'+b.dataset.commandId+' h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}});
  quick.addEventListener('close',()=>{document.body.style.overflow='';quickFocus?.focus();});
  document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(quick.open)quick.close();else openQuick();}});
  $('#recruiter-open').addEventListener('click',()=>{recruiterFocus=document.activeElement;recruiter.showModal();document.body.style.overflow='hidden';$('#recruiter-close').focus();});
  $('#recruiter-close').addEventListener('click',()=>recruiter.close());
  recruiter.addEventListener('close',()=>{document.body.style.overflow='';recruiterFocus?.focus();});
  $$('[data-recruiter-project]').forEach(b=>b.addEventListener('click',()=>{recruiter.close();document.querySelector(`.project-card [data-project="${b.dataset.recruiterProject}"]`)?.click();}));
  [quick,recruiter].forEach(d=>d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}));
})();
