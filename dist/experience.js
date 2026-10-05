'use strict';
(() => {
  const $=s=>document.querySelector(s);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const moving=()=>!reduced.matches&&!document.documentElement.classList.contains('no-motion')&&!document.hidden;
  const intro=$('#detection-intro'),canvas=$('#intro-canvas'),ctx=canvas.getContext('2d');
  const progress=$('#intro-progress'),status=$('#intro-status');
  let frame=0,started=0,hiddenAt=0,active=false,lastFocus=null,safety=0,scene=null,tiles=[],introImages=[];
  const load=src=>new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=src;});
  Promise.all(['assets/project-images/fer-gradcam.webp','assets/project-images/object-detection-validation.webp'].map(load)).then(images=>{introImages=images;});
  function shape(c,x,y,w,h,type){
    c.save();c.translate(x,y);c.strokeStyle='#2563EB';c.fillStyle='#E5EDF8';c.lineWidth=2;
    if(type==='marine'){
      c.fillStyle='#E5EDF8';c.fillRect(0,0,w,h);c.strokeStyle='#CAD7E8';
      for(let k=0;k<4;k++){c.beginPath();c.moveTo(0,h*(.2+k*.2));c.bezierCurveTo(w*.3,h*(.05+k*.2),w*.65,h*(.35+k*.2),w,h*(.2+k*.2));c.stroke();}
      c.translate(w*.5,h*.5);c.fillStyle='#F59A57';c.strokeStyle='#172D49';c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=(i%2? .11:.26)*Math.min(w,h);const px=Math.cos(a)*r,py=Math.sin(a)*r;i?c.lineTo(px,py):c.moveTo(px,py);}c.closePath();c.fill();c.stroke();
    }else{
      c.fillStyle='#E5EDF8';c.fillRect(0,0,w,h);c.translate(w*.5,h*.78);c.rotate(-.3);c.fillStyle='#CAD7E8';c.strokeStyle='#2563EB';c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-w*.27,-h*.3,-w*.14,-h*.55,0,-h*.67);c.bezierCurveTo(w*.2,-h*.46,w*.22,-h*.23,0,0);c.fill();c.stroke();c.beginPath();c.moveTo(0,15);c.lineTo(0,-h*.57);c.stroke();for(let k=1;k<5;k++){const yy=-h*.11*k;c.beginPath();c.moveTo(0,yy);c.lineTo(w*.11,yy-h*.085);c.moveTo(0,yy);c.lineTo(-w*.09,yy-h*.08);c.stroke();}
    }c.restore();
  }
  function photo(c,img,x,y,w,h){const scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale;c.drawImage(img,(img.width-sw)/2,(img.height-sh)/2,sw,sh,x,y,w,h);}
  function renderScene(c,time=0){
    const w=scene.width,h=scene.height,mobile=canvas.getBoundingClientRect().width<600,cols=mobile?2:4,rows=mobile?2:1,gap=14,pad=14,pw=(w-pad*2-gap*(cols-1))/cols,ph=(h-pad*2-gap*(rows-1))/rows;
    c.clearRect(0,0,w,h);c.fillStyle='#12233B';c.fillRect(0,0,w,h);
    const labels=['FACE / FER2013','OBJECTS / YOLO','MARINE VISION','LEAVES / PADDYLITEX'];
    for(let i=0;i<4;i++){
      const x=pad+(i%cols)*(pw+gap),y=pad+Math.floor(i/cols)*(ph+gap);
      if(i<2&&introImages[i])photo(c,introImages[i],x,y,pw,ph);else shape(c,x,y,pw,ph,i===2?'marine':'leaf');
      c.strokeStyle='#2A4160';c.lineWidth=1;c.strokeRect(x,y,pw,ph);
      const phase=Math.min(1,Math.max(0,(time-i*.13)/.55)),bx=x+pw*.2+Math.sin(time*1.6+i)*pw*.01,by=y+ph*.18,bw=pw*.62,bh=ph*.63;
      c.globalAlpha=phase;c.strokeStyle=i%2?'#F59A57':'#2563EB';c.lineWidth=2;c.strokeRect(bx,by,bw,bh);
      c.lineWidth=4;const k=12;c.beginPath();[[bx,by,1,1],[bx+bw,by,-1,1],[bx,by+bh,1,-1],[bx+bw,by+bh,-1,-1]].forEach(([cx,cy,sx,sy])=>{c.moveTo(cx,cy+sy*k);c.lineTo(cx,cy);c.lineTo(cx+sx*k,cy);});c.stroke();
      c.fillStyle='#12233B';c.fillRect(x+7,y+7,Math.min(pw-14,160),22);c.fillStyle='#F4F7FC';c.font='10px monospace';c.fillText(labels[i],x+13,y+22);
      const scanY=by+((time*.3+i*.18)%1)*bh;c.lineWidth=1;c.globalAlpha=.35*phase;c.beginPath();c.moveTo(bx,scanY);c.lineTo(bx+bw,scanY);c.stroke();c.globalAlpha=1;
    }
  }
  function setup(){
    const r=canvas.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,1.5),w=Math.max(320,Math.round(r.width*dpr)),h=Math.max(180,Math.round(r.height*dpr));
    canvas.width=w;canvas.height=h;scene=document.createElement('canvas');scene.width=w;scene.height=h;
    tiles=[];const cols=w<600?18:32,rows=Math.max(7,Math.round(cols*h/w)),tw=w/cols,th=h/rows;
    for(let row=0;row<rows;row++)for(let col=0;col<cols;col++)tiles.push({x:col*tw,y:row*th,w:tw+1,h:th+1,delay:((col/cols)*.3+Math.random()*.33),dx:(Math.random()-.5)*w*.17,dy:(Math.random()*.15+.035)*h,angle:(Math.random()-.5)*.36});
  }
  function finish(){
    if(!active)return;active=false;cancelAnimationFrame(frame);frame=0;clearTimeout(safety);intro.close();document.body.style.overflow='';lastFocus?.focus({preventScroll:true});
  }
  function draw(t){
    frame=0;if(!active)return;if(document.hidden)return;if(!moving()){finish();return;}if(!started)started=t;
    const seconds=(t-started)/1000;const total=5.15;
    progress.style.width=Math.min(100,seconds/total*100)+'%';
    if(seconds<2.2){renderScene(ctx,seconds);status.textContent=seconds<.8?'OBSERVE → LOCATE':'BOUNDARIES FOUND';}
    else{
      if(!scene.dataset.ready){renderScene(scene.getContext('2d'),2.2);scene.dataset.ready='1';}
      ctx.clearRect(0,0,canvas.width,canvas.height);status.textContent='EVERY FRAME, A NEW POSSIBILITY';
      tiles.forEach(tile=>{const u=Math.min(1,Math.max(0,(seconds-2.2-tile.delay)/2.45)),ease=u*u*(3-2*u);ctx.save();ctx.globalAlpha=1-ease;ctx.translate(tile.x+tile.w/2+tile.dx*ease,tile.y+tile.h/2+tile.dy*ease);ctx.rotate(tile.angle*ease);ctx.drawImage(scene,tile.x,tile.y,Math.min(tile.w,scene.width-tile.x),Math.min(tile.h,scene.height-tile.y),-tile.w/2,-tile.h/2,tile.w*(1-ease*.27),tile.h*(1-ease*.27));ctx.restore();});
    }
    if(seconds>=total){finish();return;}frame=requestAnimationFrame(draw);
  }
  function openIntro(auto=false){
    if(!ctx||!moving()||document.querySelector('dialog[open]'))return;
    if(auto){try{if(sessionStorage.getItem('wilbert-intro-v2'))return;sessionStorage.setItem('wilbert-intro-v2','seen');}catch{}}
    document.dispatchEvent(new CustomEvent('portfolio:intro-open'));lastFocus=auto?$('#hero-title'):document.activeElement;if(auto)lastFocus.tabIndex=-1;
    active=true;started=0;hiddenAt=0;intro.showModal();document.body.style.overflow='hidden';$('#intro-skip').focus();setup();frame=requestAnimationFrame(draw);
    safety=setTimeout(finish,8000);
  }
  $('#intro-skip').addEventListener('click',finish);$('#intro-replay').addEventListener('click',()=>openIntro());
  intro.addEventListener('cancel',e=>{e.preventDefault();finish();});intro.addEventListener('close',()=>{if(active){active=false;cancelAnimationFrame(frame);clearTimeout(safety);document.body.style.overflow='';}});
  reduced.addEventListener('change',()=>{if(reduced.matches)finish();});document.addEventListener('portfolio:motion',()=>{if(!moving())finish();});
  document.addEventListener('visibilitychange',()=>{document.documentElement.classList.toggle('tab-hidden',document.hidden);if(!active)return;if(document.hidden){hiddenAt=performance.now();cancelAnimationFrame(frame);frame=0;}else{if(hiddenAt&&started)started+=performance.now()-hiddenAt;hiddenAt=0;if(moving())frame=requestAnimationFrame(draw);else finish();}});
  if(document.readyState==='complete')openIntro(true);else window.addEventListener('load',()=>openIntro(true),{once:true});
  window.PortfolioIntro={open:openIntro,close:finish,isActive:()=>active};
  // Slowly cycle the vision desk; manual exploration gets a longer pause.
  const fields=['objects','fer','defectrag'];let labTimer=0,manualUntil=0,hovered=false;
  function scheduleLab(){clearTimeout(labTimer);if(moving())labTimer=setTimeout(()=>{if(!moving())return;if(!hovered&&!$('.vision-lab').contains(document.activeElement)&&Date.now()>manualUntil){const current=document.querySelector('[data-lab].active')?.dataset.lab;const next=fields[(fields.indexOf(current)+1)%fields.length];document.querySelector(`[data-lab="${next}"]`)?.click();}scheduleLab();},6800);}
  $('.vision-lab').addEventListener('pointerenter',()=>{hovered=true;});$('.vision-lab').addEventListener('pointerleave',()=>{hovered=false;});
  document.querySelectorAll('[data-lab]').forEach(b=>b.addEventListener('click',e=>{if(e.isTrusted)manualUntil=Date.now()+20000;}));
  document.addEventListener('portfolio:motion',scheduleLab);document.addEventListener('visibilitychange',scheduleLab);reduced.addEventListener('change',scheduleLab);scheduleLab();
})();
