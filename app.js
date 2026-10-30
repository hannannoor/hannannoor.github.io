import {installSectionScroll} from './section-scroll.js';
import {projects,nodes,events,certificates,collections,relatedNodes,shortestPath} from './content.js';
const $=s=>document.querySelector(s),escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const external='target="_blank" rel="noopener noreferrer"',motion=matchMedia('(prefers-reduced-motion: reduce)');
document.body.classList.add('js-ready');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.06});
function reveal(){document.querySelectorAll('.reveal:not(.visible)').forEach(el=>observer.observe(el));}
const total=projects.length;
$('#project-total').textContent=total;$('#work-total').textContent=`${total} PROJECTS`;$('#filter-total').textContent=total;
let activeFilter='all';
function card(p,index){return `<article class="project-card reveal" data-id="${p.id}" style="--order:${index}"><button class="project-visual" data-project="${p.id}" aria-label="Open ${escape(p.name)} case study"><img src="${p.image}" alt="${escape(p.imageAlt)}" loading="lazy" width="1000" height="740"><span class="visual-index">${p.number} / ${p.imageLabel||'PROJECT SCREENSHOT'}</span><span class="visual-open" aria-hidden="true">↗</span></button><div class="project-info"><div class="project-meta"><span>${p.type.toUpperCase()}</span><span>${p.year||'COURSEWORK'}</span></div><h3><button class="project-title" data-project="${p.id}">${p.name}</button></h3><p class="project-tagline">${p.tagline}</p><p class="project-stack">${p.stack.join(' / ')}</p><div class="project-links"><button data-project="${p.id}">View project ↗</button><a href="${p.repo}" ${external}>GitHub ↗</a>${p.demo?`<a href="${p.demo}" ${external}>${p.demoLabel||'Watch demo'} ↗</a>`:''}</div></div></article>`;}
function renderProjects(){
 const query=$('#project-search').value.trim().toLowerCase();
 const matches=p=>(activeFilter==='all'||p.category===activeFilter)&&(!query||[p.name,p.description,...p.stack].join(' ').toLowerCase().includes(query));
 const featured=projects.filter(p=>p.featured&&matches(p)),more=projects.filter(p=>!p.featured&&matches(p));
 $('#project-grid').classList.toggle('is-filtered',activeFilter!=='all'||!!query);$('#project-grid').innerHTML=featured.map(card).join('');
 $('#project-archive').innerHTML=more.map(p=>`<article class="archive-row reveal"><img class="archive-thumb" src="${p.image}" alt="${escape(p.imageAlt)}" loading="lazy"><span class="mono archive-number">${p.number}</span><div><button data-project="${p.id}" class="archive-title">${p.name}</button><p>${p.description}</p></div><span class="archive-stack">${p.stack.slice(0,3).join(' / ')}</span><button data-project="${p.id}" class="archive-open" aria-label="Open ${escape(p.name)}">↗</button></article>`).join('');
 $('#archive-heading').hidden=!more.length;$('#archive-empty').hidden=featured.length+more.length>0;
 $('#filter-status').textContent=`Showing ${featured.length+more.length} of ${total} projects`;reveal();
}
$('#project-search').addEventListener('input',renderProjects);
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});renderProjects();}));
renderProjects();
$('#project-collections').innerHTML=collections.map(c=>`<a href="${c.url}" ${external}>${c.name} ↗</a>`).join('')+'<a href="https://github.com/hannannoor/hannan-noor-repo" '+external+'>ChurnGuard deployment source ↗</a>';

const dialog=$('#project-dialog');let lastFocus=null;
function syncLock(){document.body.classList.toggle('body-locked',dialog.open||$('#network-zone').classList.contains('fullscreen'));}
function showDialog(content){lastFocus=document.activeElement;$('#dialog-content').innerHTML=content;if(!dialog.open)dialog.showModal();dialog.scrollTop=0;syncLock();$('#close-project').focus();}
function openProject(id){const p=projects.find(p=>p.id===id);if(!p)return;showDialog(`<div class="dialog-cover" data-project-cover="${p.id}"><img src="${p.image}" alt="${escape(p.imageAlt)}"></div><div class="dialog-body"><span class="mono">${p.number} / ${p.kind.toUpperCase()}${p.year?' / '+p.year:''}</span><h2 id="dialog-title">${p.name}</h2><p class="dialog-lead">${p.brief}</p><div class="dialog-columns"><div><div><h3>FOCUS</h3><p>${p.role}</p></div><div><h3>BUILT WITH</h3><p>${p.stack.join('<br>')}</p></div></div><div><h3>INSIDE THE PROJECT</h3><ul>${p.details.map(t=>`<li>${t}</li>`).join('')}</ul></div></div>${gallery(p.gallery,'project-gallery')}<p class="dialog-note">${p.note}</p><div class="dialog-links"><a href="${p.repo}" ${external}>Explore the source ↗</a>${p.demo?`<a href="${p.demo}" ${external}>${p.demoLabel||'Watch demonstration'} ↗</a>`:''}${(p.relatedRepos||[]).map(r=>`<a href="${r.url}" ${external}>${r.name} ↗</a>`).join('')}</div></div>`);}
function gallery(items,className='event-gallery'){return items?.length?`<div class="${className}">${items.map(i=>`<figure><img src="${i.src}" alt="${escape(i.caption)}" loading="lazy"><figcaption>${escape(i.caption)}</figcaption></figure>`).join('')}</div>`:'';}
function openEvent(id){const e=events.find(x=>x.id===id);if(!e)return;showDialog(`<div class="dialog-body event-dialog"><span class="mono">COMMUNITY & LEADERSHIP${e.year?' / '+e.year:''}</span><h2 id="dialog-title">${e.name}</h2><p class="dialog-lead">${e.description}</p><h3>${e.tagline}</h3><ul>${e.details.map(x=>`<li>${x}</li>`).join('')}</ul>${gallery(e.gallery)}${e.video?`<div class="event-video"><h3>The session, in action</h3><p>A video from the fitness and conditioning event I helped organise.</p><video controls playsinline preload="metadata" poster="${e.image}" aria-label="Men’s Kaki Club fitness event video"><source src="${e.video}" type="video/mp4">Your browser cannot play this video. <a href="${e.video}">Download the event video</a>.</video><a class="video-download" href="${e.video}" download>Download video ↓</a></div>`:''}</div>`);}
function openCertificate(id){const c=certificates.find(x=>x.id===id);if(!c)return;showDialog(`<div class="dialog-body"><span class="mono">CERTIFICATE / ${c.issuer}</span><h2 id="dialog-title">${c.name}</h2><p class="dialog-lead">${c.description}</p><p>${c.date}</p>${c.image?`<img class="certificate-full" src="${c.image}" alt="${escape(c.name)} certificate awarded to Mohammed Hannan Noor">`:''}<div class="dialog-links"><a href="${c.link}" ${external}>View credential ↗</a></div></div>`);}
document.addEventListener('click',e=>{const p=e.target.closest('[data-project]'),event=e.target.closest('[data-event]'),cert=e.target.closest('[data-certificate]');if(p)openProject(p.dataset.project);else if(event)openEvent(event.dataset.event);else if(cert)openCertificate(cert.dataset.certificate);});
$('#close-project').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{dialog.querySelectorAll('video').forEach(v=>v.pause());syncLock();lastFocus?.isConnected&&lastFocus.focus();});
$('#certificate-grid').innerHTML=certificates.map((c,i)=>`<article class="certificate-card reveal"><button data-certificate="${c.id}" class="certificate-preview" aria-label="Open ${escape(c.name)} certificate">${c.image?`<img src="${c.image}" alt="${escape(c.name)} certificate preview" loading="lazy">`:`<span class="certificate-placeholder"><span>↗</span>Windows 11<br>Security</span>`}<span class="certificate-expand">View certificate ↗</span></button><span class="mono">${c.issuer} · ${c.date}</span><h3><button data-certificate="${c.id}">${c.name}</button></h3><p>${c.description}</p><a href="${c.link}" ${external}>Verify credential ↗</a></article>`).join('');
$('#community-grid').innerHTML=events.filter(e=>e.id!=='mens-kaki-club').sort((a,b)=>['tabletop','poly-forum','tpla','sylp','nyaa','iitsc'].indexOf(a.id)-['tabletop','poly-forum','tpla','sylp','nyaa','iitsc'].indexOf(b.id)).map(e=>`<article class="community-card reveal" data-community="${e.id}">${e.image?`<img class="community-photo" src="${e.image}" alt="${escape(e.imageAlt||e.name)}" loading="lazy">`:''}<span class="mono">${e.tagline}</span><h3>${e.name}</h3><p>${e.description}</p><button data-event="${e.id}">More about this ↗</button></article>`).join('');

const menu=$('.menu-toggle'),nav=$('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
let graph=null,selectedNode='hannan';
const groupNames={core:'Start here',project:'Projects',skill:'Skills',event:'Community & leadership',certificate:'Certificates'};
$('#node-buttons').innerHTML=Object.entries(groupNames).map(([type,name])=>`<div class="node-group"><h3>${name}</h3><div>${nodes.filter(n=>n.type===type).map(n=>`<button data-node="${n.id}" aria-pressed="${n.id==='hannan'}">${n.label}</button>`).join('')}</div></div>`).join('');
$('#trace-to').innerHTML+=nodes.map(n=>`<option value="${n.id}">${n.label}</option>`).join('');
function selectNode(id,focusCamera=true){
 const node=nodes.find(n=>n.id===id);if(!node)return;selectedNode=id;
 const selectionPaused=id!=='hannan';$('#pause-network').disabled=selectionPaused;$('#pause-network').textContent=selectionPaused?'SELECTION PAUSED':$('#pause-network').getAttribute('aria-pressed')==='true'?'RESUME MOTION':'PAUSE MOTION';$('#network-hint').textContent=selectionPaused?'DRAG TO ORBIT · RESET TO RESUME MOTION':'AUTO-ROTATES · HOVER TO PAUSE · CLICK TO ENTER';
 const item=projects.find(x=>x.id===id)||events.find(x=>x.id===id)||certificates.find(x=>x.id===id),related=relatedNodes(id);
 $('#detail-type').textContent=node.type==='core'?'THE BIG PICTURE':node.type.toUpperCase();$('#detail-title').textContent=node.label;$('#detail-description').textContent=item?.description||node.description;
 $('#detail-links').innerHTML=node.type==='project'?`<button data-project="${id}">View project ↗</button><a href="${item.repo}" ${external}>GitHub ↗</a>`:node.type==='event'?`<button data-event="${id}">${item.video?'Watch event & read story':'Explore this activity'} ↗</button>`:node.type==='certificate'?`<button data-certificate="${id}">Open certificate ↗</button>`:[...related].filter(x=>x!==id&&x!=='hannan').map(x=>`<button data-select-node="${x}">${nodes.find(n=>n.id===x).label} ↗</button>`).join('');
 const image=$('#detail-image');image.hidden=!item?.image;if(item?.image){image.src=item.image;image.alt=item.imageAlt||item.name;}else image.removeAttribute('src');
 document.querySelectorAll('[data-node]').forEach(b=>{const active=b.dataset.node===id;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});graph?.select(id,focusCamera);
}
$('#node-buttons').addEventListener('click',e=>{const b=e.target.closest('[data-node]');if(b)selectNode(b.dataset.node);});$('#detail-links').addEventListener('click',e=>{const b=e.target.closest('[data-select-node]');if(b)selectNode(b.dataset.selectNode);});
$('#browse-toggle').addEventListener('click',()=>{const open=$('#browse-toggle').getAttribute('aria-expanded')!=='true';$('#browse-toggle').setAttribute('aria-expanded',String(open));$('#connection-browser').hidden=!open;});
$('#trace-button').addEventListener('click',()=>{const to=$('#trace-to').value;if(!to){$('#trace-result').textContent='Choose a destination.';return;}const path=shortestPath(selectedNode,to);$('#trace-result').textContent=path.map(id=>nodes.find(n=>n.id===id).label).join(' → ');graph?.trace(path);});
$('#reset-network').addEventListener('click',()=>{selectNode('hannan',false);graph?.reset();$('#trace-result').textContent='';});
$('#pause-network').addEventListener('click',()=>{const paused=$('#pause-network').getAttribute('aria-pressed')!=='true';$('#pause-network').setAttribute('aria-pressed',String(paused));$('#pause-network').textContent=paused?'RESUME MOTION':'PAUSE MOTION';graph?.pause(paused);});
$('#zoom-in').addEventListener('click',()=>graph?.zoom(.88));$('#zoom-out').addEventListener('click',()=>graph?.zoom(1.14));

let fullscreenFocus=null,placeholder=null,transitioning=false;
function lockBackground(value){document.querySelectorAll('.skip-link,.site-header,.hero-copy,.hero-kicker,.hero-rule,main>section:not(.hero),.site-footer,.section-pager').forEach(el=>el.inert=value);}
async function setFullscreen(open,id){
 const zone=$('#network-zone');if(transitioning||open===zone.classList.contains('fullscreen')){if(id)selectNode(id);return;}transitioning=true;
 const old=zone.getBoundingClientRect();
 if(open){
  fullscreenFocus=document.activeElement;placeholder=document.createElement('div');placeholder.className='network-placeholder';placeholder.style.height=old.height+'px';zone.before(placeholder);
  zone.classList.add('fullscreen');zone.setAttribute('role','dialog');zone.setAttribute('aria-modal','true');$('#close-network').hidden=false;$('#expand-network').setAttribute('aria-expanded','true');lockBackground(true);syncLock();
  const next=zone.getBoundingClientRect();graph?.expand(true,id);if(id)selectNode(id,false);
  if(!motion.matches)await zone.animate([{transform:`translate(${old.x-next.x}px,${old.y-next.y}px) scale(${old.width/next.width},${old.height/next.height})`,borderRadius:'8px'},{transform:'none',borderRadius:'0'}],{duration:780,easing:'cubic-bezier(.22,.8,.22,1)',transformOrigin:'top left'}).finished;
  $('#close-network').focus();
 }else{
  const next=placeholder.getBoundingClientRect();graph?.expand(false);
  if(!motion.matches)await zone.animate([{transform:'none'},{transform:`translate(${next.x-old.x}px,${next.y-old.y}px) scale(${next.width/old.width},${next.height/old.height})`}],{duration:650,easing:'cubic-bezier(.65,0,.35,1)',transformOrigin:'top left'}).finished;
  zone.classList.remove('fullscreen');zone.removeAttribute('role');zone.removeAttribute('aria-modal');placeholder.remove();placeholder=null;$('#close-network').hidden=true;$('#expand-network').setAttribute('aria-expanded','false');lockBackground(false);syncLock();selectNode('hannan',false);graph?.resize();fullscreenFocus?.isConnected&&fullscreenFocus.focus();
 }transitioning=false;
}
$('#expand-network').addEventListener('click',()=>setFullscreen(!$('#network-zone').classList.contains('fullscreen')));$('#close-network').addEventListener('click',()=>setFullscreen(false));
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&!dialog.open){if($('#network-zone').classList.contains('fullscreen'))setFullscreen(false);else closeMenu();}
 if(e.key==='Tab'&&$('#network-zone').classList.contains('fullscreen')&&!dialog.open){const items=[...$('#network-zone').querySelectorAll('button,a,select')].filter(x=>x.getClientRects().length),first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
});
function fallback(message){$('#network-fallback').textContent=message||'Explore every project and connection using the list below.';$('#network-fallback').hidden=false;$('#network-hint').hidden=true;$('#connection-browser').hidden=false;$('#browse-toggle').setAttribute('aria-expanded','true');['#pause-network','#zoom-in','#zoom-out'].forEach(s=>$(s).hidden=true);$('#node-labels').hidden=true;$('#network-canvas').hidden=true;}
$('#network-canvas').addEventListener('network-unavailable',()=>fallback());
if(new URLSearchParams(location.search).get('view')==='static')fallback('A lighter way to connect the dots. Browse all projects, skills and activities below.');
else import('./network.js').then(async({createNetwork})=>{graph=await createNetwork($('#network-canvas'),$('#node-labels'),id=>{if(!$('#network-zone').classList.contains('fullscreen'))setFullscreen(true,id);else selectNode(id);});graph.pause($('#pause-network').getAttribute('aria-pressed')==='true');if($('#network-zone').classList.contains('fullscreen'))graph.expand(true,selectedNode);else if(selectedNode!=='hannan')graph.select(selectedNode,false);}).catch(e=>{console.warn('Network unavailable:',e.message);fallback();});

const sections=[...document.querySelectorAll('main>section')];let currentSection=0;
function updatePager(){const mid=innerHeight*.35;let i=0;sections.forEach((s,j)=>{if(s.getBoundingClientRect().top<=mid)i=j;});currentSection=i;$('#section-count').textContent=`${String(i+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`;$('#section-previous').disabled=i===0;$('#section-next').disabled=i===sections.length-1;}
const sectionScroll=installSectionScroll({sections,header:$('.site-header'),reduced:motion,blocked:()=>dialog.open||$('#network-zone').classList.contains('fullscreen'),onChange:updatePager});
$('#section-previous').addEventListener('click',()=>sectionScroll.moveTo(sections[Math.max(0,currentSection-1)]));$('#section-next').addEventListener('click',()=>sectionScroll.moveTo(sections[Math.min(sections.length-1,currentSection+1)]));
let scheduled=false;addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{scheduled=false;updatePager();});}},{passive:true});updatePager();reveal();
