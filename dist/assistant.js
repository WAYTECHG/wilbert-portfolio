'use strict';
(() => {
  const projects=window.PORTFOLIO_PROJECTS;
  const email='wilbertyonathan@gmail.com';
  const normalize=s=>String(s).toLowerCase().normalize('NFKD').replace(/[–—]/g,' ').replace(/[^a-z0-9+.% ]/g,' ').replace(/\s+/g,' ').trim();
  const section=(id,label)=>({href:'#'+id,label});
  const projectLink=p=>({project:p.id,label:p.short+' case study'});
  const projectLinks=p=>[projectLink(p),{href:p.repository,label:'GitHub source'},...(p.demo?[{href:p.demo,label:'Open demo'}]:[]),...(p.video?[{href:p.video,label:'Watch competition'}]:[])];
  const profile="Wilbert Andrew Yonathan is a final-year AI Engineering student at Xiamen University Malaysia, based in Selangor. His current CGPA is 3.77 / 4.00, with expected graduation in 2027. He focuses on computer vision, efficient deep learning, visual anomaly inspection, evidence-grounded RAG, and usable AI applications.";
  const skills="Programming Languages: Python, C, C++, JavaScript, SQL.\n\nML & Computer Vision: TensorFlow/Keras, PyTorch, scikit-learn, OpenCV, YOLOv8, DINOv2, Reinforcement Learning.\n\nGenerative AI & NLP: LLMs, RAG, LangChain, LangGraph, LoRA/QLoRA, Qwen, Hugging Face Transformers.\n\nData & Databases: NumPy, pandas, SQLite, Supabase (PostgreSQL, Auth, RLS).\n\nWeb & APIs: FastAPI, React (React.js), HTML/CSS, Gradio, REST APIs, Formspree.\n\nCloud & Deployment: Amazon Lightsail, AWS Lambda, Amazon CloudWatch, AWS (SNS, IAM, Budgets), Docker, Docker Compose, Linux (Ubuntu), Caddy, GitHub Actions (CI/CD), Hugging Face Spaces (ZeroGPU), Render, Vercel.\n\nTools & Automation: Git, pytest, n8n, Webhooks, Resend.\n\nSpoken Languages: English (Professional Working), Mandarin (Conversational), Malay (Conversational), Indonesian (Native), Hokkien (Native).";
  const languages="Spoken Languages: English (Professional Working), Mandarin (Conversational), Malay (Conversational), Indonesian (Native), Hokkien (Native).";
  const coursework="Selected courses at Xiamen University Malaysia: Linear Algebra (use vectors, matrices, and transformations to understand neural networks, image features, and embeddings); Principle of AI (understand intelligent systems and problem-solving methods, then connect ai concepts to practical applications); Natural Language Processing (work with text representations and retrieval to support explanations grounded in reference material); Deep Learning (design and train neural networks; compare architectures, optimization choices, and model complexity); Advanced Machine Learning (compare baselines and model variants through controlled experiments and careful evaluation); Computer Vision (build image-processing, classification, and object-detection pipelines, then evaluate their predictions); Deep Reinforcement Learning (train agents to make sequential decisions using ppo, reward shaping, curriculum learning, and self-play); Advanced Data Analysis (clean and explore datasets, visualize patterns, and interpret results to support reliable model evaluation); Software Engineering (organize code, structure application components, and turn model pipelines into maintainable interfaces and services). These foundations support his model training, evaluation, and application development.";
  const awards="Academic recognition: XMUM Merit Scholarship for the four-year undergraduate programme (2023–2027), Dean's List for September 2024, April 2025 and September 2025, and a current CGPA of 3.77 / 4.00.\n\nCompetition: The dPickleball team placed 2nd among 13 teams in the AIT306 competition, as reported in the project repository.\n\nLeadership: Head of Photography & Videography for Love in Action (2026), scheduling 8 departments' filming and co-editing 200+ clips for a final video for 150+ participants; Head of General Affairs at XMUM AI Club (2025), managing RM1,000 of WPS sponsorship on 5+ event items and booking venues for a national AI tournament; General Affairs at AIESEC XMUM (2023–2024), followed by Assistant, General Affairs (2024–2025). Also supported the Bojio? Onz Lah!!! Malaysia Cultural Bazaar booth event on 25 June 2025.";
  const availability="Wilbert is seeking an AI/ML internship (computer vision, deep learning, generative AI) starting 29 March 2027, for 3–5 months. Malaysia is preferred, and he is also open to relevant part-time opportunities.\n\nContact: "+email;
  const aliases={defectrag:['defectrag','defect rag','anomaly','visual inspection','rag','retrieval','langchain','langgraph','bge','qwen','supabase','zerogpu','dinov2','visa','n8n','automation','workflow'],dpickleball:['dpickleball','dpickle ball','pickleball','pickle ball','ppo','reinforcement','reinforcement learning','self play','competition'],marine:['marine','underwater','organism','ghostconv','sim sppf','du mobileyolo','urpc','sea'],paddy:['paddy','paddylitex','leaf','leaves','agriculture','agricultural','rice','denselitex','thesis','final year project'],resucn:['resucn','res ucn','cifar','unified convolution'],fer:['fer2013','fer','emotion','emotions','facial expression','grad cam'],mri:['neuroinsight','alzheimer','mri','clinical','dementia']};
  const matchWord=(q,w)=>(' '+q+' ').includes(' '+w+' ');
  const has=(q,words)=>words.some(w=>matchWord(q,w));
  function answer(question,context={}){
    const q=normalize(question).slice(0,1000);
    const explicit=projects.filter(p=>(aliases[p.id]||[]).some(a=>matchWord(q,a)||a.length>5&&q.includes(a)));
    const about=has(q,['about','background','education','university','xmum','cgpa','gpa','graduation','nationality','who','introduce','intro','student','where']);
    const course=has(q,['course','courses','coursework','subjects','modules','studied']);
    const language=has(q,['language','languages','speak','spoken','english','mandarin','indonesian','malay','hokkien'])&&!has(q,['programming','python','c','c++','coding']);
    const skill=has(q,['skill','skills','tool','tools','toolkit','technology','technologies','tech','stack','language','languages','framework','frameworks','python','javascript','js','sql','pytorch','tensorflow','opencv','generative ai','llm','llms','langchain','langgraph','fastapi','react','aws','lightsail','ec2','lambda','cloudwatch','budgets','bedrock','cloud','deployment','linux','ubuntu','docker','webhooks']);
    const award=has(q,['award','awards','achievement','achievements','scholarship','scholarships','dean','deans','leadership','club','aiesec','milestone','milestones','volunteer','recognition']);
    const contact=has(q,['internship','internships','intern','available','availability','start','starting','contact','email','hire','hiring','resume','résumé','cv','part time','duration']);
    const all=has(q,['everything','overall','overview','summary','summarize','summarise','highlights','recruiter','suitable','fit'])||[about,skill,award,contact].filter(Boolean).length>2;
    const wantsProjects=has(q,['project','projects','work','portfolio','built','build','research','application','applications']);
    const demo=has(q,['video','youtube','recording','watch','demo','demos','try','live','link','links','source','code','github','repository','repositories']);
    if(has(q,['n8n','automation','automate','notifications','corrective','corrective action','corrective actions']))return {text:'DefectRAG connects Supabase cases and reviews to n8n corrective-action workflows for event validation, authorization checks, supervisor notifications and delivery receipts. Wilbert deployed n8n on AWS Lightsail using Docker Compose and a Caddy reverse proxy with HTTPS. DINOv2 handles visual features; BGE, Qwen, LangChain and LangGraph support cited RAG. n8n coordinates application events rather than performing visual inference.',links:[projectLink(projects.find(p=>p.id==='defectrag'))],projectIds:['defectrag']};
    if(has(q,['bedrock','amazon bedrock']))return {text:'Wilbert’s RAG project, DefectRAG, does not use Amazon Bedrock. Its documented cited-RAG pipeline uses Qwen3-4B for generation, BGE embeddings for retrieval, and LangChain/LangGraph for orchestration.',links:[section('skills','Generative AI skills'),projectLink(projects.find(p=>p.id==='defectrag'))],projectIds:[]};
    if(has(q,['aws','lightsail','ec2','lambda','cloudwatch','budgets','cloud','hosting','caddy','https','linux','ubuntu','docker']))return {text:'Cloud & Deployment skills: AWS Lightsail, EC2, Lambda, CloudWatch and Budgets; Docker, Docker Compose, Linux (Ubuntu), Git, Hugging Face Spaces, Render and Vercel. For DefectRAG, Wilbert deployed n8n on AWS Lightsail with Docker Compose and Caddy HTTPS, and deployed the visual inspection demo on Hugging Face ZeroGPU.',links:[section('skills','Cloud & deployment'),projectLink(projects.find(p=>p.id==='defectrag'))],projectIds:['defectrag']};
    if(language)return {text:(has(q,['skills','tools'])?skills+'\n\n':'')+languages,links:[section('languages','Language capabilities'),section('skills','Skills & tools')],projectIds:[]};
    if(course)return {text:coursework,links:[section('coursework','Explore relevant coursework'),section('projects','See the projects')],projectIds:[]};
    let selected=explicit;
    if(!selected.length&&context.projectIds?.length&&has(q,['it','its','this','that','those','them','these','more','result','results','metrics','contribution','contributions','tradeoff','tradeoffs','demo','source','tools','tech','stack']))selected=projects.filter(p=>context.projectIds.includes(p.id));
    if(selected.length){
      const parts=selected.slice(0,3).map(p=>{
        if(has(q,['date','dates','when','timeline','period','year','years']))return p.title+'\nProject period: '+p.year+'.';
        if(demo&&!has(q,['explain','summary','summarize','results']))return p.title+': '+(p.demo?'Use the demo link below to explore, or inspect the source repository.':'This project has a published source repository; '+(p.video?'watch the competition recording below.':'no live demo is listed in the portfolio.'));
        if(has(q,['contribution','contributions','contributed','role','did']))return p.title+'\n'+p.contributions.map(x=>'• '+x).join('\n');
        if(has(q,['learn','learned','learning']))return p.title+'\n'+p.learning;
        if(skill)return p.title+'\nTools: '+p.tags.join(', ')+'.\n'+p.description;
        return p.title+'\n'+p.description+'\n\nRecorded highlights: '+p.metrics.map(([value,label])=>value+' '+label).join(' · ')+'.\n\n'+p.outcome;
      });
      if(award)parts.push(awards);
      if(contact)parts.push(availability);
      return {text:parts.join('\n\n'),links:selected.slice(0,3).flatMap(projectLinks).concat(award?[section('milestones','Achievements')]:[],contact?[section('contact','Contact Wilbert')]:[]),projectIds:selected.slice(0,3).map(p=>p.id)};
    }
    if(all)return {text:profile+'\n\nSkills: Python, PyTorch, OpenCV, YOLO, DINOv2, LangChain, LangGraph, Qwen, React, FastAPI, Supabase, Hugging Face ZeroGPU, AWS Lightsail and Docker Compose, alongside n8n automation, PPO and Unity ML-Agents.\n\nFeatured work: DefectRAG (fine-tuned DINOv2 reaching 0.971 mean image AUROC on 12 VisA products and 0.992 on MVTec AD, scored on development data, with cited RAG, shared review and corrective-action workflows); PaddyLiteX (81.67% reported mAP@0.5, 2.88M parameters); marine detection (75.36% mAP@0.5, 4.37M parameters); and dPickleball (PPO agent training; team placed 2nd of 13). Also explore Res UCN, FER2013, and NeuroInsight Alzheimer’s classification.\n\n'+languages+'\n\n'+awards+'\n\n'+availability,links:[section('about','About Wilbert'),section('projects','Explore projects'),section('skills','Skills'),section('milestones','Achievements'),section('contact','Contact')],projectIds:[]};
    const parts=[],links=[];
    if(about){parts.push(profile);links.push(section('about','About & education'));}
    if(skill){parts.push(skills);links.push(section('skills','Explore the toolkit'),section('projects','See skills in projects'));}
    if(award){parts.push(awards);links.push(section('milestones','Awards & leadership'));}
    if(contact){parts.push(availability);links.push({href:'mailto:'+email,label:'Email Wilbert'},{href:'Wilbert_Yonathan_Resume.pdf',label:'Read résumé'});}
    if(wantsProjects||demo){parts.push(projects.length+' case studies: '+projects.map(p=>p.title).join('; ')+'.\n\nAsk about a project by name to explore its contribution, tools, results and trade-offs.');links.push(section('projects','Explore all projects'),...projects.slice(0,3).map(projectLink),{href:'https://github.com/WAYTECHG',label:'GitHub profile'});}
    if(parts.length)return {text:parts.join('\n\n'),links,projectIds:[]};
    if(has(q,['hi','hello','hey','help','thanks','thank you']))return {text:'Hi! These are pre-written answers about Wilbert’s background, skills, projects, awards and internship availability. Try “Summarize Wilbert”, “Compare marine and paddy”, or “What did he contribute to dPickleball?”',links:[section('projects','Browse projects')],projectIds:[]};
    return {text:'I don’t have a verified answer to that in this portfolio. I can summarize Wilbert’s skills, projects, education, awards and availability. For something personal or a detail not listed here, contact Wilbert directly.',links:[section('contact','Contact Wilbert')],projectIds:context.projectIds||[]};
  }
  window.PortfolioAssistant={answer};
  if(typeof document==='undefined')return;
  const $=s=>document.querySelector(s);
  const panel=$('#assistant-panel'),thread=$('#assistant-thread'),input=$('#assistant-input'),launcher=$('#assistant-launch');
  let context={},lastFocus=null;
  function append(role,text,links=[]){
    const message=document.createElement('div');message.className='chat-message '+role;
    const name=document.createElement('small');name.textContent=role==='user'?'YOU':'QUICK ANSWERS';message.append(name);
    const bubble=document.createElement('div');bubble.className='chat-bubble';bubble.textContent=text;message.append(bubble);
    if(links.length){const actions=document.createElement('div');actions.className='chat-links';links.forEach(link=>{let el;if(link.project){el=document.createElement('button');el.dataset.chatProject=link.project;}else{el=document.createElement('a');el.href=link.href;if(!link.href.startsWith('#')&&!link.href.startsWith('mailto:')){el.target='_blank';el.rel='noopener noreferrer';}}el.textContent=link.label;actions.append(el);});bubble.append(actions);}
    thread.append(message);while(thread.children.length>24)thread.firstElementChild.remove();thread.scrollTop=thread.scrollHeight;
    return message;
  }
  function reset(){thread.replaceChildren();context={};input.value='';append('assistant','Welcome! These are pre-written answers about Wilbert’s portfolio. Ask about his skills, a specific project, achievements or availability, and I’ll point you to the evidence.');}
  function open(){if(document.querySelector('dialog[open]'))return;lastFocus=document.activeElement;panel.hidden=false;launcher.setAttribute('aria-expanded','true');input.focus();}
  function close(){panel.hidden=true;launcher.setAttribute('aria-expanded','false');lastFocus?.focus();}
  function send(question){const text=String(question).trim().slice(0,1000);if(!text)return;append('user',text);const reply=answer(text,context);context={projectIds:reply.projectIds};append('assistant',reply.text,reply.links);input.value='';input.focus();}
  launcher.addEventListener('click',()=>panel.hidden?open():close());$('#assistant-close').addEventListener('click',close);
  $('#assistant-form').addEventListener('submit',e=>{e.preventDefault();send(input.value);});
  document.querySelectorAll('[data-chat-prompt]').forEach(b=>b.addEventListener('click',()=>send(b.dataset.chatPrompt)));
  $('#assistant-reset').addEventListener('click',()=>{reset();input.focus();});
  panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}});
  thread.addEventListener('click',e=>{const b=e.target.closest('[data-chat-project]');if(b){const id=b.dataset.chatProject;close();document.querySelector(`.project-card [data-project="${id}"]`)?.click();}else{const a=e.target.closest('a[href^="#"]');if(a){close();const sectionNode=document.querySelector(a.getAttribute('href'));const heading=sectionNode?.querySelector('h1,h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}}});
  reset();
})();
