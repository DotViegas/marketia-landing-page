(() => {
const gallery=document.querySelector('.entrepreneur-gallery');if(!gallery)return;
const photos=[...gallery.querySelectorAll('.entrepreneur-photo')],buttons=[...gallery.querySelectorAll('[data-scene]')];
const pause=gallery.querySelector('.entrepreneur-pause'),caption=gallery.querySelector('#entrepreneur-caption'),category=gallery.querySelector('.entrepreneur-category');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const captions=['Quem abre as portas.','Quem faz acontecer.','Quem começa uma ideia.'];const categories=['COMÉRCIO LOCAL','SERVIÇOS','NEGÓCIO DIGITAL'];
let index=0,visible=false,paused=false,hover=false,focused=false,timer=0,closing=0;
function show(next){index=next;photos.forEach((p,i)=>{p.classList.toggle('is-active',i===index);p.setAttribute('aria-hidden',String(i!==index));});buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));caption.textContent=captions[index];category.textContent=categories[index];clearTimeout(closing);gallery.classList.toggle('is-changing',!reduced.matches);closing=setTimeout(()=>gallery.classList.remove('is-changing'),950);}
function sync(){clearTimeout(timer);if(visible&&!paused&&!hover&&!focused&&!document.hidden&&!reduced.matches)timer=setTimeout(()=>{show((index+1)%photos.length);sync();},5000);}
buttons.forEach((b,i)=>b.addEventListener('click',()=>{show(i);sync();}));pause.addEventListener('click',()=>{paused=!paused;pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Retomar movimento':'Pausar movimento';sync();});
gallery.addEventListener('mouseenter',()=>{hover=true;sync();});gallery.addEventListener('mouseleave',()=>{hover=false;sync();});gallery.addEventListener('focusin',()=>{focused=true;sync();});gallery.addEventListener('focusout',e=>{focused=gallery.contains(e.relatedTarget);sync();});document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',()=>{gallery.classList.remove('is-changing');sync();});
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.25}).observe(gallery);else{visible=true;sync();}
})();
