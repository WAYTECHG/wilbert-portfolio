'use strict';
(() => {
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const root='assets/project-images/';
  const media={
    defectrag:{file:root+'defectrag-reference.webp',label:'Real reference photograph',alt:'Breakfast box with cereal, fruit and a drink, from the DefectRAG normal reference bank',caption:'A real normal reference photo included in DefectRAG’s MVTec LOCO reference bank. This is a sample input, not a model prediction.',source:'https://github.com/WAYTECHG/DefectRAG/blob/main/cloud/references/breakfast_box/normal_reference_01.jpg',width:1200,height:960},
    fer:{file:root+'fer-gradcam.webp',label:'Recorded Grad-CAM output',alt:'Facial expression images alongside CNN activation heatmaps from the FER2013 project',caption:'Actual CNN Grad-CAM result mosaic published in the FER2013 project repository.',source:'https://github.com/WAYTECHG/FER2013-Project/blob/main/result_images/gradcam_CNN.png',width:1164,height:1400},
    resucn:{file:root+'resucn-training.webp',label:'Recorded training history',alt:'Res UCN training and validation loss and accuracy curves from the project notebook',caption:'Actual loss and accuracy chart extracted from the published Res UCN notebook. This is recorded training history.',source:'https://github.com/WAYTECHG/Res_UCN-Resnet-Unified-Convolution-Network/blob/main/Res_UCN.ipynb',width:1165,height:547},
    alzheimer:{file:root+'alzheimer-evaluation.webp',label:'Recorded coursework evaluation',alt:'Random Forest confusion matrix from the Alzheimer classification coursework notebook',caption:'Actual Random Forest confusion matrix from the educational project notebook. This is coursework evaluation, not clinical validation.',source:'https://github.com/WAYTECHG/Alzheimer-Detection/blob/main/alzheimer_prediction.ipynb',width:533,height:460},
    objects:{file:root+'object-detection-validation.webp',label:'Real YOLO prediction output',alt:'Validation photograph mosaic with YOLO predicted object bounding boxes and labels',caption:'Actual annotated validation-batch predictions committed in the YOLO object detection repository.',source:'https://github.com/WAYTECHG/Object-Detection-Yolov8/blob/main/runs/detect/train4/val_batch0_pred.jpg',width:1400,height:1400},
    faces:{file:root+'face-eigenfaces.webp',label:'Recorded eigenface components',alt:'Grid of eigenface components from the face recognition project',caption:'Actual eigenface analysis visualization from the Face Recognition repository. These are learned components, not detected identities.',source:'https://github.com/WAYTECHG/Face-Recognition/blob/main/image/eigenface.png',width:1400,height:1103},
    ferMatrix:{file:root+'fer-confusion.webp',label:'Recorded FER evaluation',alt:'CNN confusion matrix for seven facial emotion classes',caption:'Actual CNN confusion matrix committed in the FER2013 repository.',source:'https://github.com/WAYTECHG/FER2013-Project/blob/main/result_images/confusion_CNN.png',width:797,height:701}
  };
  media.mri=media.alzheimer;
  const missing={marine:{label:'Recorded research results',source:'https://github.com/WAYTECHG/GhostConv-and-SimSPPF-Integration-for-Marine-Organism-Detection'},paddy:{label:'Recorded thesis results',source:'https://github.com/WAYTECHG/PaddyLiteX-demo/blob/main/config/models.json'}};
  window.PortfolioMedia=media;
  window.projectMedia=id=>media[id]||missing[id];
  const photo=(m,context)=>`<img class="project-photo" src="${esc(m.file)}" alt="${esc(m.alt)}" width="${m.width}" height="${m.height}" loading="${context==='hero'?'eager':'lazy'}" decoding="async">`;
  window.projectVisual=function(id,context=''){
    if(media[id])return photo(media[id],context);
    const p=window.PORTFOLIO_PROJECTS.find(p=>p.id===id);if(!p)return '';
    return `<div class="recorded-visual"><div class="result-orbit" aria-hidden="true"><i></i><i></i><i></i></div><span class="recorded-label">${id==='marine'?'URPC2020 / TEST RESULTS':'PADDYLITEX / TEST RESULTS'}</span><strong>${id==='marine'?'75.36':'82.26'}<small>% mAP@0.5</small></strong><div class="recorded-metrics"><span>${id==='marine'?'4.37M':'3.91M'}<small>parameters</small></span><span>${id==='marine'?'11.5':'16.3'}<small>GFLOPs</small></span></div><span class="recorded-note">${id==='marine'?'GhostConv + SimSPPF adaptation':'DenseLiteX + SPPF + C2PSA'}<br>Recorded results · demo linked below</span></div>`;
  };
  // Retained call signature keeps every existing project interaction working.
  window.projectIllustration=window.projectVisual;
  window.projectPhotoFigure=id=>{const m=media[id];return m?`<figure class="dialog-media">${photo(m,'dialog')}<figcaption>${esc(m.caption)} <a href="${esc(m.source)}" target="_blank" rel="noopener noreferrer">Original source ↗</a></figcaption></figure>`:'';};
  const gallery=[['objects','YOLO, in the frame'],['fer','What the CNN sees'],['defectrag','The normal reference'],['resucn','Following the training'],['faces','Faces, decomposed'],['alzheimer','Evaluating a classifier'],['ferMatrix','Beyond overall accuracy']];
  if(typeof document==='undefined')return;
  const $=s=>document.querySelector(s);
  $('#evidence-gallery').innerHTML=gallery.map(([id,title])=>{const m=media[id];return `<button class="evidence-card" data-evidence="${id}" aria-label="Enlarge ${esc(title)}"><span class="evidence-image">${photo(m,'gallery')}</span><span class="evidence-copy"><span>${esc(m.label)}</span><strong>${esc(title)} <i aria-hidden="true">↗</i></strong></span></button>`;}).join('');
  const dialog=$('#media-dialog');let current=0,focus=null;
  function render(){const [id,title]=gallery[current],m=media[id];$('#media-title').textContent=title;$('#media-content').innerHTML=photo(m,'dialog');$('#media-caption').textContent=m.caption;$('#media-source').href=m.source;$('#media-position').textContent=`${current+1} / ${gallery.length}`;}
  function select(i){current=(i+gallery.length)%gallery.length;render();}
  document.querySelectorAll('[data-evidence]').forEach(b=>b.addEventListener('click',()=>{current=gallery.findIndex(([id])=>id===b.dataset.evidence);focus=b;render();dialog.showModal();document.body.style.overflow='hidden';$('#media-close').focus();}));
  $('#media-close').addEventListener('click',()=>dialog.close());$('#media-prev').addEventListener('click',()=>select(current-1));$('#media-next').addEventListener('click',()=>select(current+1));
  dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();select(current+1);}else if(e.key==='ArrowLeft'){e.preventDefault();select(current-1);}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';focus?.focus();});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
})();
