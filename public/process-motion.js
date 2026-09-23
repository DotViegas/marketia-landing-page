(() => {
const section=document.querySelector('#como-funciona');if(!section)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const stages=['pm-start','pm-build','pm-image','pm-text','pm-sign','pm-spread','pm-done'];
const times=[0,1700,2300,3000,3600,4400,6000];
const rows=[...section.querySelectorAll('.process-copy li')];
const pause=section.querySelector('#pm-pause');let elapsed=0,last=0,frame=0,started=false,visible=false,paused=false;
function render(){stages.forEach((s,i)=>section.classList.toggle(s,elapsed>=times[i]));rows.forEach((r,i)=>r.classList.toggle('pm-current',i===(elapsed<1700?0:elapsed<4400?1:2)));}
function tick(now){if(last)elapsed=Math.min(6000,elapsed+now-last);last=now;render();if(elapsed<6000)frame=requestAnimationFrame(tick);else frame=0;}
function sync(){cancelAnimationFrame(frame);frame=0;last=0;section.classList.toggle('pm-visible',visible&&!document.hidden);section.classList.toggle('pm-paused',paused);if(reduced.matches){elapsed=6000;render();return;}if(started&&visible&&!document.hidden&&!paused&&elapsed<6000)frame=requestAnimationFrame(tick);}
pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Retomar movimento':'Pausar movimento';pause.setAttribute('aria-pressed',String(paused));sync();});
section.querySelector('#pm-replay').addEventListener('click',()=>{elapsed=0;started=true;paused=false;pause.textContent='Pausar movimento';pause.setAttribute('aria-pressed','false');render();sync();});
reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)started=true;sync();},{threshold:.2}).observe(section.querySelector('.process-art'));else{visible=started=true;sync();}
if(reduced.matches){elapsed=6000;render();}
})();
