(() => {
 const section=document.querySelector('.ecosystem');
 if(!section)return;
 const stage=section.querySelector('.eco-stage');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const pause=document.getElementById('eco-pause');
 let started=false,visible=false,paused=false,startTimer,runTimer;
 function sync(){section.classList.toggle('eco-paused',paused||!visible||document.hidden||reduced.matches)}
 function begin(){clearTimeout(startTimer);clearTimeout(runTimer);section.classList.remove('eco-expanded','eco-running');started=true;
  startTimer=setTimeout(()=>{section.classList.add('eco-expanded');runTimer=setTimeout(()=>{section.classList.add('eco-running');sync()},2200)},reduced.matches?0:450);
 }
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!started)begin();sync()},{threshold:.28}).observe(stage);
 document.getElementById('eco-replay').addEventListener('click',begin);
 pause.addEventListener('click',()=>{paused=!paused;pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Retomar movimento':'Pausar movimento';sync()});
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
})();