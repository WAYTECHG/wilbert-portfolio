'use strict';
(() => {
  const projects=window.PORTFOLIO_PROJECTS;
  const email='wilbertyonathan@gmail.com';
  const escape=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const knownIds=new Set(projects.map(p=>p.id));
  const validSaved=values=>new Set(Array.isArray(values)?values.filter(id=>knownIds.has(id)):[]);
  function filterProjects({category='all',query='',savedOnly=false,saved=[]}={}){
    const words=String(query).toLowerCase().trim().split(/\s+/).filter(Boolean);
    const savedIds=validSaved(Array.from(saved));
    return projects.filter(p=>{
      if(category!=='all'&&p.category!==category)return false;
      if(savedOnly&&!savedIds.has(p.id))return false;
      const text=[p.title,p.short,p.description,p.summary,p.status,...p.tags,...(p.searchTerms||[])].join(' ').toLowerCase();
      return words.every(word=>text.includes(word));
    });
  }
  function shortlistMail(ids){
    const selected=projects.filter(p=>validSaved(Array.from(ids)).has(p.id));
    if(!selected.length)return null;
    const body=`Hi Wilbert,\n\nI explored your portfolio and would like to discuss:\n\n${selected.map(p=>'• '+p.title).join('\n')}\n\nPlease let me know your availability for a conversation.\n\nBest regards,\n`;
    return 'mailto:'+email+'?subject='+encodeURIComponent('Let’s discuss your portfolio projects')+'&body='+encodeURIComponent(body);
  }
  const sections=[['home','Start here','Introduction & availability'],['projects','Projects','Research & applications'],['about','About Wilbert','Background & education'],['coursework','Relevant coursework','Courses taken at XMUM'],['skills','Skills','Programming, machine learning, generative AI, web APIs & platforms'],['languages','Spoken languages','English, Mandarin, Indonesian, Malay & Hokkien'],['milestones','Milestones','Scholarship & leadership'],['contact','Get in touch','Internships & part-time opportunities']];
  function commandEntries(query=''){
    const q=String(query).toLowerCase().trim();
    return [...sections.map(([id,title,detail])=>({type:'section',id,title,detail})),...projects.map(p=>({type:'project',id:p.id,title:p.title,detail:p.tags.join(' · ')}))].filter(item=>!q||(item.title+' '+item.detail).toLowerCase().includes(q));
  }
  window.PortfolioTools={filterProjects,shortlistMail,commandEntries,validSaved};
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
  $$('.skill-card .tags > span:not([data-static])').forEach(tag=>{
    const text=tag.textContent;const query=tag.dataset.query||text;const button=document.createElement('button');button.textContent=text;button.className='skill-tag';button.setAttribute('aria-label','Find projects mentioning '+text);
    button.addEventListener('click',()=>{resetFilters();$('#project-search').value=query;applyFilters();$('#projects').scrollIntoView({behavior:document.documentElement.classList.contains('no-motion')?'instant':'smooth'});});
    tag.replaceWith(button);
  });
  const quick=$('#quick-dialog');const recruiter=$('#recruiter-dialog');let quickFocus,recruiterFocus;
  function renderCommands(){const entries=commandEntries($('#quick-search').value);$('#quick-results').innerHTML=entries.length?entries.map(item=>`<button class="quick-result" data-command-type="${item.type}" data-command-id="${item.id}"><span class="command-symbol" aria-hidden="true">${item.type==='section'?'↳':'◇'}</span><span>${escape(item.title)}<small>${escape(item.detail)}</small></span><span aria-hidden="true">↗</span></button>`).join(''):'<p class="command-empty">No matches. Try a project name or a skill.</p>';}
  function openQuick(){if(document.querySelector('dialog[open]'))return;quickFocus=document.activeElement;$('#quick-search').value='';renderCommands();quick.showModal();document.body.style.overflow='hidden';$('#quick-search').focus();}
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
