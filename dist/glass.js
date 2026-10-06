'use strict';
(() => {
  // Reveal optional content before following an anchor into it.
  function revealAnchor(hash){
    if(!hash||hash==='#')return;
    let id;try{id=decodeURIComponent(hash.slice(1));}catch{return;}
    const target=document.getElementById(id);if(!target)return;
    let parent=target.parentElement;
    while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');if(link)revealAnchor(link.getAttribute('href'));
  });
  window.addEventListener('hashchange',()=>revealAnchor(window.location.hash));
  revealAnchor(window.location.hash);
})();
