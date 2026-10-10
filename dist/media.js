'use strict';
(() => {
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const root='assets/project-images/';
  const media={
    dpickleball:{file:root+'dpickleball-competition.png',label:'Competition screenshot',alt:'Two dPickleBall paddle agents and a ball on the blue competition court',caption:'Competition screenshot supplied by Wilbert. Watch the linked recording to see the gameplay; the team result is reported in the project repository.',source:'https://www.youtube.com/live/CitFn9FK12s',width:1305,height:726},
    fer:{file:root+'fer-gradcam.webp',label:'Recorded Grad-CAM output',alt:'Facial expression images alongside CNN activation heatmaps from the FER2013 project',caption:'Actual CNN Grad-CAM result mosaic published in the FER2013 project repository.',source:'https://github.com/WAYTECHG/FER2013-Project/blob/main/result_images/gradcam_CNN.png',width:1164,height:1400},
    resucn:{file:root+'resucn-training.webp',label:'Recorded training history',alt:'Res UCN training and validation loss and accuracy curves from the project notebook',caption:'Actual loss and accuracy chart extracted from the published Res UCN notebook. This is recorded training history.',source:'https://github.com/WAYTECHG/Res_UCN-Resnet-Unified-Convolution-Network/blob/main/Res_UCN.ipynb',width:1165,height:547},
    alzheimer:{file:root+'alzheimer-evaluation.webp',label:'Recorded coursework evaluation',alt:'Random Forest confusion matrix from the Alzheimer classification coursework notebook',caption:'Actual Random Forest confusion matrix from the educational project notebook. This is coursework evaluation, not clinical validation.',source:'https://github.com/WAYTECHG/Alzheimer-Detection/blob/main/alzheimer_prediction.ipynb',width:533,height:460},
    objects:{file:root+'object-detection-validation.webp',label:'Real YOLO prediction output',alt:'Validation photograph mosaic with YOLO predicted object bounding boxes and labels',caption:'Actual annotated validation-batch predictions committed in the YOLO object detection repository.',source:'https://github.com/WAYTECHG/Object-Detection-Yolov8/blob/main/runs/detect/train4/val_batch0_pred.jpg',width:1400,height:1400},
    faces:{file:root+'face-eigenfaces.webp',label:'Recorded eigenface components',alt:'Grid of eigenface components from the face recognition project',caption:'Actual eigenface analysis visualization from the Face Recognition repository. These are learned components, not detected identities.',source:'https://github.com/WAYTECHG/Face-Recognition/blob/main/image/eigenface.png',width:1400,height:1103},
    ferMatrix:{file:root+'fer-confusion.webp',label:'Recorded FER evaluation',alt:'CNN confusion matrix for seven facial emotion classes',caption:'Actual CNN confusion matrix committed in the FER2013 repository.',source:'https://github.com/WAYTECHG/FER2013-Project/blob/main/result_images/confusion_CNN.png',width:797,height:701}
  };
  media.mri=media.alzheimer;
  const frontpages={
    fer:{file:root+'fer-frontpage.png',label:'Demo website front page',alt:'FER LAB website front page showing A face. Seven expressions. and a seven-class expression atlas',caption:'FER2013 demo website front page supplied by Wilbert. Explore the live interface, or use the gallery to inspect recorded Grad-CAM and evaluation outputs.',source:'https://fer2013-project.onrender.com/',width:1817,height:797},
    marine:{file:root+'marine-frontpage.webp',label:'Demo website front page',alt:'Marine Vision Lab front page with Intelligence Below the surface heading and underwater research preview',caption:'Marine Vision Lab website front page, from the screenshot supplied by Wilbert. This shows the demo interface, not a detection result.',source:'https://marine-object-detection.onrender.com',width:1600,height:834},
    paddy:{file:root+'paddy-frontpage.webp',label:'Demo website front page',alt:'PaddyLiteX detection studio front page with A closer look A clearer comparison heading',caption:'PaddyLiteX website front page, from the screenshot supplied by Wilbert. The leaf graphic belongs to the demo interface; it is not a model prediction.',source:'https://paddylitex.onrender.com/',width:1600,height:778},
  };
  Object.entries(frontpages).forEach(([id,m])=>{media[id+'Site']=m;});
  const missing={marine:{label:'Recorded research results',source:'https://github.com/WAYTECHG/GhostConv-and-SimSPPF-Integration-for-Marine-Organism-Detection'},paddy:{label:'Recorded thesis results',source:'https://github.com/WAYTECHG/PaddyLiteX-demo/blob/main/config/models.json'}};
  window.PortfolioMedia=media;
  window.projectMedia=id=>frontpages[id]||media[id]||missing[id];
  const photo=(m,context)=>`<img class="project-photo" src="${esc(m.file)}" alt="${esc(m.alt)}" width="${m.width}" height="${m.height}" loading="${context==='hero'?'eager':'lazy'}" decoding="async">`;
  window.projectVisual=function(id,context=''){
    if(frontpages[id]&&context!=='hero')return photo(frontpages[id],context);
    if(media[id])return photo(media[id],context);
    const p=window.PORTFOLIO_PROJECTS.find(p=>p.id===id);if(!p)return '';
    return `<div class="recorded-visual"><div class="result-orbit" aria-hidden="true"><i></i><i></i><i></i></div><span class="recorded-label">${id==='marine'?'URPC2020 / TEST RESULTS':'PADDYLITEX / TEST RESULTS'}</span><strong>${id==='marine'?'75.36':'82.26'}<small>% mAP@0.5</small></strong><div class="recorded-metrics"><span>${id==='marine'?'4.37M':'3.91M'}<small>parameters</small></span><span>${id==='marine'?'11.5':'16.3'}<small>GFLOPs</small></span></div><span class="recorded-note">${id==='marine'?'GhostConv + SimSPPF adaptation':'DenseLiteX + SPPF + C2PSA'}<br>Recorded results · demo linked below</span></div>`;
  };
  // Retained call signature keeps every existing project interaction working.
  window.projectIllustration=window.projectVisual;
  window.projectPhotoFigure=id=>{const m=frontpages[id]||media[id];return m?`<figure class="dialog-media">${photo(m,'dialog')}<figcaption>${esc(m.caption)} <a href="${esc(m.source)}" target="_blank" rel="noopener noreferrer">${id==='dpickleball'?'Watch competition':frontpages[id]?'Visit demo':'Original source'}</a></figcaption></figure>`:'';};
})();
