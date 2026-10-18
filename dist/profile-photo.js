'use strict';
(() => {
  const image=document.querySelector('[data-profile-photo]');
  const frame=document.querySelector('[data-profile-frame]');
  const placeholder=document.querySelector('[data-profile-placeholder]');
  if(!image||!frame||!placeholder)return;
  function showPhoto(){
    if(!image.naturalWidth){showMonogram();return;}
    image.hidden=false;placeholder.hidden=true;frame.classList.add('has-photo');
  }
  function showMonogram(){
    image.hidden=true;placeholder.hidden=false;frame.classList.remove('has-photo');
  }
  image.addEventListener('load',showPhoto);
  image.addEventListener('error',showMonogram);
  if(image.complete){if(image.naturalWidth)showPhoto();else showMonogram();}
})();
