(() => {
 const section=document.querySelector('.team');if(!section)return;
 const steps=[...section.querySelectorAll('.team-step')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const mobile=matchMedia('(max-width: 600px)');
 let observer;let timers=[];let complete=false;
 const finish=()=>{timers.forEach(clearTimeout);timers=[];steps.forEach(s=>s.classList.add('is-active'));section.classList.add('team-sequence');complete=true;observer?.disconnect()};
 function configure(){observer?.disconnect();timers.forEach(clearTimeout);timers=[];
  if(complete||reduced.matches){finish();return;}
  if(mobile.matches){observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-active');observer.unobserve(e.target);}});if(steps.every(s=>s.classList.contains('is-active')))finish()},{threshold:.45});steps.forEach(s=>observer.observe(s));}
  else{observer=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();section.classList.add('team-sequence');steps.forEach((s,i)=>timers.push(setTimeout(()=>{s.classList.add('is-active');if(i===steps.length-1)complete=true},i*1550)));},{threshold:.35});observer.observe(section.querySelector('.roles'));}
 }
 configure();mobile.addEventListener('change',configure);reduced.addEventListener('change',configure);
})();