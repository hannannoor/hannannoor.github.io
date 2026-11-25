// LAB effects: living background, decoding labels, ticker bands, glowing cards,
// floating project previews, big section numbers, count-up stats and image parallax.
// Effects that move things are skipped for reduced motion; pointer effects need a mouse.
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
const onVisible=(els,fn,opts={threshold:.35})=>{
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);fn(e.target);}}),opts);
 els.forEach(el=>io.observe(el));
};

/* ---------- Background ---------- */
function background(){
 const bg=document.createElement('div');bg.className='lab-bg';bg.setAttribute('aria-hidden','true');
 bg.innerHTML='<div class="aurora a1"></div><div class="aurora a2"></div><div class="aurora a3"></div><div class="spot"></div><div class="noise"></div>';
 document.body.prepend(bg);
 if(!fine||reduced)return;
 const spot=bg.querySelector('.spot');let x=-999,y=-999,raf=0;
 addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(()=>{raf=0;spot.style.setProperty('--mx',x+'px');spot.style.setProperty('--my',y+'px');});},{passive:true});
}

/* ---------- Decoding text ---------- */
const GLYPHS='!<>-_\\/[]{}=+*^?#01ABCDEFXYZ';
export function decode(el,{duration=900}={}){
 if(el.dataset.labDone)return;el.dataset.labDone='1';
 // Only decode plain text nodes, so links, icons and nested markup stay intact.
 const nodes=[];const walk=n=>n.childNodes.forEach(c=>{if(c.nodeType===3&&c.textContent.trim())nodes.push(c);else if(c.nodeType===1&&!c.matches('svg,img,.status-dot'))walk(c);});walk(el);
 if(!nodes.length)return;
 const finals=nodes.map(n=>n.textContent);el.classList.add('lab-decode');
 const start=performance.now();
 (function frame(now){
  const t=Math.min(1,(now-start)/duration);
  nodes.forEach((n,i)=>{const f=finals[i];const shown=Math.floor(f.length*t);let out=f.slice(0,shown);
   for(let k=shown;k<f.length;k++)out+=/\s/.test(f[k])?f[k]:(Math.random()<.5?GLYPHS[(Math.random()*GLYPHS.length)|0]:f[k]);
   n.textContent=out;});
  if(t<1)requestAnimationFrame(frame);else nodes.forEach((n,i)=>n.textContent=finals[i]);
 })(start);
}
function decoders(){
 const sel='.hero-kicker,.hero-bottom span,.section-top>span,.section-top .mono,.contact-top>span,.network-heading>span,.detail-index,.hero-rule .mono,.project-meta,.mono.eyebrow';
 const els=[...document.querySelectorAll(sel)].filter(el=>el.textContent.trim().length>2&&el.textContent.length<90);
 onVisible(els,el=>decode(el,{duration:700+Math.min(600,el.textContent.length*14)}),{threshold:.6});
}

/* ---------- Ticker bands ---------- */
function tickers(){
 const bands=[
  {after:'#home',items:['Machine learning','Flutter','AWS','Python','UiPath','Computer vision','SQL','Firebase','Power BI','Node.js'],dur:46},
  {after:'#about',items:['Leadership','Hackathons','Community','Orientation','Ambassador','Robotics','Events','Mentoring'],dur:40,reverse:true},
  {after:'#certificates',items:['Open to internships','Let’s build something','Applied AI','Singapore'],dur:34}
 ];
 for(const b of bands){
  const anchor=document.querySelector(b.after);if(!anchor)continue;
  const el=document.createElement('div');el.className='lab-ticker'+(b.reverse?' reverse':'');el.setAttribute('aria-hidden','true');el.style.setProperty('--dur',b.dur+'s');
  const row=b.items.map(t=>`<span>${t}<i>✳</i></span>`).join('');
  el.innerHTML=`<div class="lab-ticker-track">${row}${row}</div>`;
  anchor.after(el);
 }
}

/* ---------- Glowing borders ---------- */
function glow(){
 if(!fine)return;
 const sel='.project-visual,.event-card,.certificate-card,.credential-card,.featured-event,.about-card,.skill-card';
 const mark=()=>document.querySelectorAll(sel).forEach(el=>el.classList.add('lab-glow'));mark();
 new MutationObserver(mark).observe(document.querySelector('main'),{childList:true,subtree:true});
 let raf=0,ev=null;
 document.addEventListener('pointermove',e=>{ev=e;if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const el=ev.target.closest?.('.lab-glow');if(!el)return;
  const r=el.getBoundingClientRect();el.style.setProperty('--gx',(ev.clientX-r.left)+'px');el.style.setProperty('--gy',(ev.clientY-r.top)+'px');});},{passive:true});
}

/* ---------- Floating preview over the project list ---------- */
function floatPreview(){
 if(!fine||reduced)return;
 const box=document.createElement('div');box.className='lab-float';box.setAttribute('aria-hidden','true');box.innerHTML='<img alt="">';document.body.append(box);
 const img=box.firstChild;let tx=0,ty=0,x=0,y=0,on=false,raf=0;
 const loop=()=>{x+=(tx-x)*.18;y+=(ty-y)*.18;box.style.transform=`translate(${x+48}px,${y-150}px) rotate(${Math.max(-6,Math.min(6,(tx-x)*.05))}deg)`;raf=on||Math.abs(tx-x)>.5?requestAnimationFrame(loop):0;};
 document.addEventListener('pointermove',e=>{
  const row=e.target.closest?.('.archive-row');tx=e.clientX;ty=e.clientY;
  const src=row?.querySelector('.archive-thumb')?.getAttribute('src');
  if(row&&src){if(!on){x=tx;y=ty;}on=true;if(img.getAttribute('src')!==src)img.src=src;box.classList.add('on');}
  else if(on){on=false;box.classList.remove('on');}
  if(!raf)raf=requestAnimationFrame(loop);
 },{passive:true});
 addEventListener('scroll',()=>{if(on){on=false;box.classList.remove('on');}},{passive:true});
}

/* ---------- Big outlined section numbers ---------- */
function numbers(){
 [...document.querySelectorAll('main>section')].forEach((s,i)=>{if(s.id==='home')return;
  const n=document.createElement('span');n.className='lab-num';n.setAttribute('aria-hidden','true');n.textContent=String(i+1).padStart(2,'0');s.prepend(n);});
}

/* ---------- Count-up numbers ---------- */
function counters(){
 const els=[...document.querySelectorAll('main *')].filter(el=>el.children.length===0&&/^\s*\d+(\.\d+)?\s*$/.test(el.textContent)&&!el.closest('.lab-num,.section-pager,dialog,.archive-row,.project-meta,time'));
 if(reduced)return;
 // The big GPA keeps its "/4.00" in a child span, so count its leading text node.
 const gpa=document.querySelector('.gpa strong');const gpaText=gpa&&[...gpa.childNodes].find(n=>n.nodeType===3&&/^\s*\d+(\.\d+)?\s*$/.test(n.textContent));
 if(gpaText)els.push(gpa);
 const textOf=el=>el===gpa?gpaText:el;
 els.forEach(el=>{el.dataset.labFinal=textOf(el).textContent;});
 onVisible(els,el=>{
  const node=textOf(el),f=el.dataset.labFinal.trim(),dec=(f.split('.')[1]||'').length,target=parseFloat(f),start=performance.now(),dur=1400;
  (function frame(now){const t=Math.min(1,(now-start)/dur),k=1-Math.pow(1-t,4);node.textContent=(target*k).toFixed(dec);if(t<1)requestAnimationFrame(frame);else node.textContent=f;})(start);
 },{threshold:.8});
}

/* ---------- Subtle parallax on large images ---------- */
function parallax(){
 if(reduced)return;
 const imgs=()=>[...document.querySelectorAll('.event-card img,.featured-event img,.credential-section img')].filter(i=>i.getBoundingClientRect().height>160);
 let list=[],raf=0;
 const update=()=>{raf=0;const vh=innerHeight;for(const i of list){const r=i.getBoundingClientRect();if(r.bottom<0||r.top>vh)continue;const p=(r.top+r.height/2-vh/2)/vh;i.style.transform=`translateY(${p*-18}px) scale(1.06)`;}};
 setTimeout(()=>{list=imgs();list.forEach(i=>i.classList.add('lab-parallax'));update();},1500);
 addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update);},{passive:true});
}

/* ---------- Hero name: scramble in, then a light sweep ---------- */
function heroName(){
 const parts=[...document.querySelectorAll('#hero-name .lab3d-face .name-line>span, #hero-name:not(.lab3d) .name-line>span')];
 parts[0]?.classList.add('lab-shine');
 if(reduced)return;
 const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@';
 parts.forEach((span,i)=>{
  const text=[...span.childNodes].find(n=>n.nodeType===3);if(!text)return;
  const final=text.textContent;const start=performance.now()+200+i*180,dur=900;
  (function frame(now){const t=Math.max(0,Math.min(1,(now-start)/dur));const shown=Math.floor(final.length*t);
   text.textContent=final.slice(0,shown)+[...final.slice(shown)].map(()=>letters[(Math.random()*letters.length)|0]).join('');
   if(t<1)requestAnimationFrame(frame);else text.textContent=final;})(performance.now());
 });
}

/* ---------- 3D name that turns to look at the mouse ---------- */
// The real heading text stays the front face. Copies of it are stacked behind it in 3D
// to give the letters depth; the whole block tilts toward the pointer.
function hero3d(){
 const h1=document.getElementById('hero-name');if(!h1)return;
 const face=document.createElement('span');face.className='lab3d-face';face.append(...h1.childNodes);h1.append(face);
 h1.classList.add('lab3d');
 const DEPTH=18,layers=[];
 for(let i=1;i<=DEPTH;i++){
  const l=face.cloneNode(true);l.className='lab3d-layer';l.setAttribute('aria-hidden','true');
  l.querySelectorAll('[class]').forEach(el=>el.classList.remove('lab-shine'));
  // Draw the copies' letters with CSS so the name isn't repeated in the page text.
  const texts=[];const w=document.createTreeWalker(l,NodeFilter.SHOW_TEXT);while(w.nextNode())texts.push(w.currentNode);
  texts.forEach(t=>{if(!t.textContent.trim())return;const g=document.createElement('i');g.className='lab3d-t';g.dataset.t=t.textContent;t.replaceWith(g);});
  l.style.setProperty('--z',(-i*1.6)+'px');l.style.setProperty('--k',(i/DEPTH).toFixed(3));
  h1.insertBefore(l,face);layers.push(l);
 }
 // Copies take the final text, so let them appear once the name has finished scrambling in.
 setTimeout(()=>h1.classList.add('lab3d-ready'),reduced?0:1300);
 if(reduced)return;
 let tx=0,ty=0,rx=0,ry=0,raf=0;
 const loop=()=>{rx+=(tx-rx)*.08;ry+=(ty-ry)*.08;
  h1.style.transform=`rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  raf=Math.abs(tx-rx)+Math.abs(ty-ry)>.02?requestAnimationFrame(loop):0;};
 const aim=(x,y)=>{const r=h1.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  ty=Math.max(-28,Math.min(28,(x-cx)/innerWidth*55));tx=Math.max(-22,Math.min(22,-(y-cy)/innerHeight*45));
  if(!raf)raf=requestAnimationFrame(loop);};
 if(fine)addEventListener('pointermove',e=>{if(e.pointerType==='mouse')aim(e.clientX,e.clientY);},{passive:true});
 else{ // touch: a slow sway so phones still see the depth
  const t0=performance.now();(function sway(now){const t=(now-t0)/1000;tx=Math.sin(t*.7)*8;ty=Math.sin(t*.5)*16;rx=tx;ry=ty;
   h1.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;requestAnimationFrame(sway);})(t0);
 }
 aim(innerWidth*.7,innerHeight*.45);
}

export function installLab(){
 document.documentElement.classList.add('lab');
 background();hero3d();heroName();tickers();numbers();glow();floatPreview();counters();parallax();
 if(!reduced)decoders();
}
