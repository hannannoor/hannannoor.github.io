// Site-wide motion: custom cursor, section transitions, scroll progress, word reveals,
// magnetic buttons, card tilt and dialog transitions. Everything is skipped when the
// visitor prefers reduced motion, and pointer effects only run with a real mouse.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
import {installCursorTrail} from './cursor-trail.js?v=16';

/* ---------- Section transitions ---------- */
function installCurtain({header}){
 const curtain=document.createElement('div');curtain.className='fx-curtain';curtain.setAttribute('aria-hidden','true');
 curtain.innerHTML='<div class="fx-curtain-inner"><span class="fx-curtain-index mono"></span><span class="fx-curtain-title"></span></div>';
 document.body.append(curtain);
 const idx=curtain.querySelector('.fx-curtain-index'),title=curtain.querySelector('.fx-curtain-title');
 const sections=[...document.querySelectorAll('main>section')];
 const names={home:'Home',work:'Work',about:'About',beyond:'Community',certificates:'Certificates',contact:'Say hello'};
 let busy=false;
 async function go(id){
  const target=document.getElementById(id);if(!target||busy)return;busy=true;
  const n=sections.indexOf(target);idx.textContent=n>=0?`${String(n+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`:'';
  title.textContent=names[id]||target.querySelector('h2')?.textContent||'';
  curtain.classList.remove('leave');curtain.classList.add('active');
  await curtain.animate([{transform:'translateY(100%)'},{transform:'translateY(0)'}],{duration:520,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'}).finished;
  const y=id==='home'?0:target.getBoundingClientRect().top+scrollY-header.getBoundingClientRect().height;
  document.documentElement.style.scrollBehavior='auto';scrollTo(0,Math.max(0,y));document.documentElement.style.scrollBehavior='';
  history.pushState(null,'',`#${id}`);
  target.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  await new Promise(r=>setTimeout(r,140));
  await curtain.animate([{transform:'translateY(0)'},{transform:'translateY(-100%)'}],{duration:560,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'}).finished;
  curtain.classList.remove('active');curtain.getAnimations().forEach(a=>a.cancel());busy=false;
  const focusTarget=target.querySelector('h1,h2');if(focusTarget){focusTarget.setAttribute('tabindex','-1');focusTarget.focus({preventScroll:true});}
 }
 document.addEventListener('click',e=>{
  const a=e.target.closest('.site-header a[href^="#"],.site-footer a[href^="#"],.hero a[href^="#"],.mobile-nav a[href^="#"]');
  if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey)return;
  const id=a.getAttribute('href').slice(1);if(!document.getElementById(id))return;
  e.preventDefault();e.stopPropagation();
  document.querySelector('.menu-toggle[aria-expanded=true]')?.click();
  go(id);
 },true);

 // A short intro the first time someone opens the site in a session.
 let seen=false;try{seen=sessionStorage.getItem('fx-intro')==='1';sessionStorage.setItem('fx-intro','1');}catch{}
 if(!seen&&!location.hash){
  const intro=document.createElement('div');intro.className='fx-intro';intro.setAttribute('aria-hidden','true');
  intro.innerHTML='<span class="fx-intro-mark">hn<b>.</b></span><span class="fx-intro-bar"><i></i></span>';
  document.body.append(intro);
  setTimeout(()=>{intro.animate([{transform:'translateY(0)'},{transform:'translateY(-100%)'}],{duration:760,easing:'cubic-bezier(.76,0,.24,1)',fill:'forwards'}).finished.then(()=>intro.remove());},900);
 }
}

/* ---------- Scroll progress ---------- */
function installProgress(){
 const bar=document.createElement('div');bar.className='fx-progress';bar.setAttribute('aria-hidden','true');document.body.append(bar);
 let ticking=false;
 const update=()=>{ticking=false;const max=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${max>0?scrollY/max:0})`;};
 addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});update();
}

/* ---------- Headings: words rise into place ---------- */
function splitWords(el){
 const walk=node=>{
  [...node.childNodes].forEach(child=>{
   if(child.nodeType===3){
    const parts=child.textContent.split(/(\s+)/);const frag=document.createDocumentFragment();
    parts.forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){frag.append(p);return;}const w=document.createElement('span');w.className='fx-word';const i=document.createElement('span');i.className='fx-word-inner';i.textContent=p;w.append(i);frag.append(w);});
    child.replaceWith(frag);
   }else if(child.nodeType===1&&!child.classList.contains('fx-word'))walk(child);
  });
 };
 if(!el.getAttribute('aria-label'))el.setAttribute('aria-label',(el.innerText||el.textContent).replace(/\s+/g,' ').trim());
 walk(el);
 el.querySelectorAll('.fx-word').forEach((w,i)=>{w.setAttribute('aria-hidden','true');w.firstChild.style.transitionDelay=`${i*45}ms`;});
 el.classList.add('fx-split');
}
function installHeadings(){
 const heads=[...document.querySelectorAll('main h2.display')];heads.forEach(splitWords);
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('fx-in');io.unobserve(e.target);}}),{threshold:.2,rootMargin:'0px 0px -8% 0px'});
 heads.forEach(h=>io.observe(h));
}

/* ---------- Magnetic buttons ---------- */
function installMagnetic(){
 const selector='.text-link,.search-trigger,.nav-contact,.section-pager button,.network-heading button,.dialog-links a,.contact-actions a,.case-study-actions a';
 let current=null;
 document.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse')return;
  const el=e.target.closest?.(selector);
  if(current&&current!==el){current.style.transform='';current.classList.remove('fx-magnet');current=null;}
  if(!el)return;current=el;el.classList.add('fx-magnet');
  const r=el.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))/r.width,dy=(e.clientY-(r.top+r.height/2))/r.height;
  el.style.transform=`translate(${dx*10}px,${dy*8}px)`;
 },{passive:true});
}

/* ---------- Project cards: tilt + light ---------- */
function installTilt(){
 let active=null,frame=0,last=null;
 const apply=()=>{frame=0;if(!active||!last)return;const r=active.getBoundingClientRect(),x=(last.clientX-r.left)/r.width,y=(last.clientY-r.top)/r.height;
  active.style.setProperty('--fx-rx',`${(.5-y)*7}deg`);active.style.setProperty('--fx-ry',`${(x-.5)*9}deg`);
  active.style.setProperty('--fx-lx',`${x*100}%`);active.style.setProperty('--fx-ly',`${y*100}%`);};
 document.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse')return;
  const el=e.target.closest?.('.project-visual');
  if(active&&active!==el){active.classList.remove('fx-tilting');['--fx-rx','--fx-ry'].forEach(p=>active.style.setProperty(p,'0deg'));active=null;}
  if(!el)return;active=el;el.classList.add('fx-tilting');last=e;if(!frame)frame=requestAnimationFrame(apply);
 },{passive:true});
}

/* ---------- Dialogs ---------- */
function installDialogMotion(){
 document.querySelectorAll('dialog').forEach(d=>{
  const close=d.close.bind(d);
  d.close=function(value){
   if(!d.open||d.classList.contains('fx-closing'))return;
   d.classList.add('fx-closing');
   setTimeout(()=>{d.classList.remove('fx-closing');close(value);},260);
  };
  d.addEventListener('cancel',e=>{e.preventDefault();d.close();});
 });
}

export function installFx({header}){
 document.documentElement.classList.add('fx');
 installProgress();installHeadings();
 if(reduced.matches)return;
 installCurtain({header});installDialogMotion();
 if(finePointer.matches){
  installCursorTrail({
   isLink:t=>!!t.closest?.('a,button,label,summary,[role=button]')&&!t.closest('.project-visual'),
   labelFor:t=>t.closest?.('.project-visual,.archive-row')?'View project':t.closest?.('.event-card,.certificate-card,.gallery-item')?'Open':''
  });
  installMagnetic();installTilt();
 }
}
