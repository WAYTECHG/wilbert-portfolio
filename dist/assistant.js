'use strict';
(() => {
  const projects=window.PORTFOLIO_PROJECTS;
  const email='30587wilbertandrewtyonathan@gmail.com';
  const normalize=s=>String(s).toLowerCase().normalize('NFKD').replace(/[–—]/g,' ').replace(/[^a-z0-9+.% ]/g,' ').replace(/\s+/g,' ').trim();
  const section=(id,label)=>({href:'#'+id,label});
  const projectLink=p=>({project:p.id,label:p.short+' case study'});
  const projectLinks=p=>[projectLink(p),{href:p.repository,label:'GitHub source ↗'},...(p.demo?[{href:p.demo,label:'Open demo ↗'}]:[])];
  const profile="Wilbert Andrew Yonathan is an Indonesian fourth-year AI Engineering student at Xiamen University Malaysia, based in Selangor. His current CGPA is 3.77 / 4.00, with expected graduation in 2027. He focuses on computer vision, efficient deep learning, careful model evaluation, and usable AI applications.";
  const skills="His toolkit covers Python, PyTorch, TensorFlow/Keras, OpenCV, YOLO, CNNs, DenseNet and ResNet; NumPy, Pandas, scikit-learn, Matplotlib, C/C++ and Git; and applications with FastAPI, Streamlit, Gradio, Docker, Hugging Face, Neo4j and retrieval-augmented generation. The strongest evidence is in the project repositories and case studies.";
  const awards="Academic recognition: XMUM Merit Scholarship for three consecutive years (2023–2025), Dean's List, and a current CGPA of 3.77 / 4.00.\n\nLeadership: Head of Photography & Videography for Love in Action (2026); Head of General Affairs at XMUM AI Club (2025), coordinating logistics and collaborators for a national-level AI event; General Affairs member at AIESEC XMUM (2024).";
  const availability="Wilbert is seeking an AI Engineering or Computer Vision internship starting 29 March 2027, for 3–6 months. Malaysia is preferred, and he is also open to relevant part-time opportunities.\n\nContact: "+email;
  const aliases={marine:['marine','underwater','organism','ghostconv','sim sppf','du mobileyolo','urpc','sea'],paddy:['paddy','paddylitex','leaf','leaves','agriculture','agricultural','rice','denselitex','thesis','final year project'],defectrag:['defectrag','defect rag','inspection','anomaly','anomalies','industrial','rag','dino','qwen'],resucn:['resucn','res ucn','cifar','unified convolution'],fer:['fer2013','fer','emotion','emotions','facial expression','grad cam'],mri:['alzheimer','mri','clinical','dementia']};
  const matchWord=(q,w)=>(' '+q+' ').includes(' '+w+' ');
  const has=(q,words)=>words.some(w=>matchWord(q,w));
  function answer(question,context={}){
    const q=normalize(question).slice(0,1000);
    const explicit=projects.filter(p=>aliases[p.id].some(a=>matchWord(q,a)||a.length>5&&q.includes(a)));
    const about=has(q,['about','background','education','university','xmum','cgpa','gpa','graduation','nationality','who','introduce','intro','student','where']);
    const skill=has(q,['skill','skills','tool','tools','toolkit','technology','technologies','tech','stack','language','languages','framework','frameworks','python','pytorch','tensorflow','opencv']);
    const award=has(q,['award','awards','achievement','achievements','scholarship','scholarships','dean','deans','leadership','club','aiesec','milestone','milestones','volunteer','recognition']);
    const contact=has(q,['internship','internships','intern','available','availability','start','starting','contact','email','hire','hiring','resume','résumé','cv','part time','duration']);
    const all=has(q,['everything','overall','overview','summary','summarize','summarise','highlights','recruiter','suitable','fit'])||[about,skill,award,contact].filter(Boolean).length>2;
    const wantsProjects=has(q,['project','projects','work','portfolio','built','build','research','application','applications']);
    const demo=has(q,['demo','demos','try','live','link','links','source','code','github','repository','repositories']);
    let selected=explicit;
    if(!selected.length&&context.projectIds?.length&&has(q,['it','its','this','that','those','them','these','more','result','results','metrics','contribution','contributions','tradeoff','tradeoffs','demo','source','tools','tech','stack']))selected=projects.filter(p=>context.projectIds.includes(p.id));
    if(selected.length){
      const parts=selected.slice(0,3).map(p=>{
        if(demo&&!has(q,['explain','summary','summarize','results']))return p.title+': '+(p.demo?'Use the demo link below to explore, or inspect the source repository.':'This project has a published source repository; no live demo is listed in the portfolio.');
        if(has(q,['contribution','contributions','contributed','role','did']))return p.title+'\n'+p.contributions.map(x=>'• '+x).join('\n');
        if(has(q,['learn','learned','learning']))return p.title+'\n'+p.learning;
        if(skill)return p.title+'\nTools: '+p.tags.join(', ')+'.\n'+p.description;
        return p.title+'\n'+p.description+'\n\nRecorded highlights: '+p.metrics.map(([value,label])=>value+' '+label).join(' · ')+'.\n\n'+p.outcome;
      });
      if(award)parts.push(awards);
      if(contact)parts.push(availability);
      return {text:parts.join('\n\n'),links:selected.slice(0,3).flatMap(projectLinks).concat(award?[section('milestones','Achievements')]:[],contact?[section('contact','Contact Wilbert')]:[]),projectIds:selected.slice(0,3).map(p=>p.id)};
    }
    if(all)return {text:profile+'\n\nSkills: Python, PyTorch, TensorFlow, OpenCV, YOLO, experiment design and AI interfaces.\n\nFeatured work: marine detection (75.36% mAP@0.5, 4.37M parameters); PaddyLiteX (82.26% reported mAP@0.5, 3.91M parameters); and DefectRAG, an evolving anomaly-inspection and reference-memory workflow. Also explore Res UCN, FER2013, and educational Alzheimer classification.\n\n'+awards+'\n\n'+availability,links:[section('about','About Wilbert'),section('projects','Explore projects'),section('skills','Skills'),section('milestones','Achievements'),section('contact','Contact')],projectIds:[]};
    const parts=[],links=[];
    if(about){parts.push(profile);links.push(section('about','About & education'));}
    if(skill){parts.push(skills);links.push(section('skills','Explore the toolkit'),section('projects','See skills in projects'));}
    if(award){parts.push(awards);links.push(section('milestones','Awards & leadership'));}
    if(contact){parts.push(availability);links.push({href:'mailto:'+email,label:'Email Wilbert ↗'},{href:'Wilbert_Yonathan_Resume.pdf',label:'Read résumé ↗'});}
    if(wantsProjects||demo){parts.push('Six case studies: '+projects.map(p=>p.title).join('; ')+'.\n\nThe portfolio also links to Eigenfaces/Fisherfaces, YOLO webcam detection, grammar checking, news classification and forecasting experiments on GitHub. Ask about a project by name to explore its contribution, tools, results and trade-offs.');links.push(section('projects','Explore all projects'),...projects.slice(0,3).map(projectLink),{href:'https://github.com/WAYTECHG',label:'GitHub profile ↗'});}
    if(parts.length)return {text:parts.join('\n\n'),links,projectIds:[]};
    if(has(q,['hi','hello','hey','help','thanks','thank you']))return {text:'Hi! I can help you explore Wilbert’s background, skills, projects, awards and internship availability. Try “Summarize Wilbert”, “Compare marine and paddy”, or “What did he contribute to DefectRAG?”',links:[section('projects','Browse projects')],projectIds:[]};
    return {text:'I don’t have a verified answer to that in this portfolio. I can summarize Wilbert’s skills, projects, education, awards and availability. For something personal or a detail not listed here, contact Wilbert directly.',links:[section('contact','Contact Wilbert')],projectIds:context.projectIds||[]};
  }
  window.PortfolioAssistant={answer};
  if(typeof document==='undefined')return;
  const $=s=>document.querySelector(s);
  const panel=$('#assistant-panel'),thread=$('#assistant-thread'),input=$('#assistant-input'),launcher=$('#assistant-launch');
  let context={},lastFocus=null;
  function append(role,text,links=[]){
    const message=document.createElement('div');message.className='chat-message '+role;
    const name=document.createElement('small');name.textContent=role==='user'?'YOU':'PORTFOLIO GUIDE';message.append(name);
    const bubble=document.createElement('div');bubble.className='chat-bubble';bubble.textContent=text;message.append(bubble);
    if(links.length){const actions=document.createElement('div');actions.className='chat-links';links.forEach(link=>{let el;if(link.project){el=document.createElement('button');el.dataset.chatProject=link.project;}else{el=document.createElement('a');el.href=link.href;if(!link.href.startsWith('#')&&!link.href.startsWith('mailto:')){el.target='_blank';el.rel='noopener noreferrer';}}el.textContent=link.label;actions.append(el);});bubble.append(actions);}
    thread.append(message);while(thread.children.length>24)thread.firstElementChild.remove();thread.scrollTop=thread.scrollHeight;
    return message;
  }
  function reset(){thread.replaceChildren();context={};input.value='';append('assistant','Welcome! I’m your guide to Wilbert’s portfolio. Ask about his skills, a specific project, achievements, or availability — I’ll point you to the evidence.');}
  function open(){if(document.querySelector('dialog[open]'))return;lastFocus=document.activeElement;panel.hidden=false;launcher.setAttribute('aria-expanded','true');input.focus();}
  function close(){panel.hidden=true;launcher.setAttribute('aria-expanded','false');lastFocus?.focus();}
  function send(question){const text=String(question).trim().slice(0,1000);if(!text)return;append('user',text);const reply=answer(text,context);context={projectIds:reply.projectIds};append('assistant',reply.text,reply.links);input.value='';input.focus();}
  launcher.addEventListener('click',()=>panel.hidden?open():close());$('#assistant-close').addEventListener('click',close);
  $('#assistant-form').addEventListener('submit',e=>{e.preventDefault();send(input.value);});
  document.querySelectorAll('[data-chat-prompt]').forEach(b=>b.addEventListener('click',()=>send(b.dataset.chatPrompt)));
  $('#assistant-reset').addEventListener('click',()=>{reset();input.focus();});
  panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}});
  thread.addEventListener('click',e=>{const b=e.target.closest('[data-chat-project]');if(b){const id=b.dataset.chatProject;close();document.querySelector(`.project-card [data-project="${id}"]`)?.click();}else{const a=e.target.closest('a[href^="#"]');if(a){close();const sectionNode=document.querySelector(a.getAttribute('href'));const heading=sectionNode?.querySelector('h1,h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}}});
  document.addEventListener('portfolio:intro-open',()=>{if(!panel.hidden)close();});
  reset();
})();
