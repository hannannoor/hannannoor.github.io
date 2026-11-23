// Site-wide search across projects, skills, community activities and certificates.
// Open with the header button, "/" or Ctrl/Cmd+K. Enter opens the result; "Show in network"
// flies the 3D explorer to it.
import {projects,events,certificates,nodes} from './content.js?v=15';

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s??'').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/[’']/g,"'");

function buildIndex(){
 const items=[];
 for(const p of projects)items.push({id:p.id,kind:'project',label:'Project',title:p.name,sub:p.tagline||p.type,
  keys:[p.type,p.category,...(p.stack||[]),...(p.skills||[])].join(' '),text:[p.description,p.brief,...(p.details||[])].join(' '),thumb:p.thumb||p.image});
 for(const e of events)items.push({id:e.id,kind:'event',label:'Community',title:e.name,sub:e.tagline||e.type,
  keys:[e.type,e.role,e.year].join(' '),text:[e.description,...(e.details||[])].join(' '),thumb:e.image});
 for(const c of certificates)items.push({id:c.id,kind:'certificate',label:'Certificate',title:c.name,sub:`${c.issuer} · ${c.date}`,
  keys:[c.issuer,...(c.skills||[])].join(' '),text:c.description,thumb:c.image});
 for(const n of nodes.filter(n=>n.type==='skill')){
  const used=projects.filter(p=>(p.skills||[]).includes(n.id)).map(p=>p.name);
  items.push({id:n.id,kind:'skill',label:'Skill',title:n.label,sub:used.length?`Used in ${used.slice(0,3).join(', ')}${used.length>3?` +${used.length-3}`:''}`:'Skill',keys:used.join(' '),text:n.description});
 }
 const nodeIds=new Set(nodes.map(n=>n.id));
 for(const i of items){i.inNetwork=nodeIds.has(i.id);i._t=norm(i.title);i._k=norm(i.keys);i._x=norm(i.text);i._s=norm(i.sub);}
 return items;
}

// Every word must match somewhere; title matches rank highest.
export function score(item,words){
 let total=0;
 for(const w of words){
  let s=0;
  if(item._t.startsWith(w))s=100;else if(new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}`).test(item._t))s=70;else if(item._t.includes(w))s=50;
  else if(item._k.includes(w))s=35;else if(item._s.includes(w))s=25;else if(item._x.includes(w))s=12;
  if(!s)return 0;total+=s;
 }
 return total+({project:4,skill:3,event:2,certificate:1}[item.kind]||0);
}

function highlight(text,words){
 let out=esc(text);
 for(const w of words.filter(w=>w.length>1)){
  const re=new RegExp(`(${esc(w).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`,'ig');
  out=out.replace(/(<[^>]*>)|([^<]+)/g,(m,tag,txt)=>tag||txt.replace(re,'<mark>$1</mark>'));
 }
 return out;
}

export function installSearch({openItem,showInNetwork}){
 const index=buildIndex();
 const panel=document.getElementById('site-search'),input=document.getElementById('site-search-input'),list=document.getElementById('site-search-results'),status=document.getElementById('site-search-status');
 let results=[],active=0,returnFocus=null;
 const suggestions=['python','machine learning','flutter','automation','leadership','security'];

 function render(){
  const q=norm(input.value).trim(),words=q.split(/\s+/).filter(Boolean);
  if(!words.length){
   results=[];list.innerHTML='';
   status.innerHTML=`<span>Try</span>${suggestions.map(s=>`<button type="button" data-suggest="${s}">${s}</button>`).join('')}`;
   return;
  }
  results=index.map(i=>({i,s:score(i,words)})).filter(r=>r.s).sort((a,b)=>b.s-a.s).slice(0,12).map(r=>r.i);
  active=Math.min(active,Math.max(0,results.length-1));
  status.textContent=results.length?`${results.length} result${results.length>1?'s':''}`:`Nothing matches “${input.value.trim()}”. Try a skill like Python or a project name.`;
  list.innerHTML=results.map((r,n)=>`<li role="option" id="search-opt-${n}" aria-selected="${n===active}" class="search-result${n===active?' active':''}" data-index="${n}">
   <button type="button" class="search-main" data-index="${n}" tabindex="-1">
    ${r.thumb?`<img src="${esc(r.thumb)}" alt="" loading="lazy">`:`<span class="search-glyph" aria-hidden="true">${esc(r.title.slice(0,1))}</span>`}
    <span class="search-text"><span class="search-kind mono">${r.label}</span><span class="search-title">${highlight(r.title,words)}</span><span class="search-sub">${highlight(r.sub,words)}</span></span>
   </button>
   ${r.inNetwork?`<button type="button" class="search-network mono" data-network="${n}" tabindex="-1" aria-label="Show ${esc(r.title)} in the network">Show in network ✳</button>`:''}
  </li>`).join('');
  input.setAttribute('aria-activedescendant',results.length?`search-opt-${active}`:'');
 }
 function setActive(n){
  if(!results.length)return;active=(n+results.length)%results.length;
  list.querySelectorAll('.search-result').forEach((li,i)=>{li.classList.toggle('active',i===active);li.setAttribute('aria-selected',String(i===active));});
  list.children[active]?.scrollIntoView({block:'nearest'});input.setAttribute('aria-activedescendant',`search-opt-${active}`);
 }
 function choose(n,network=false){
  const r=results[n];if(!r)return;close(false);
  if(network||r.kind==='skill')showInNetwork(r.id);else openItem(r.kind,r.id);
 }
 function open(){
  if(!panel.hidden)return;returnFocus=document.activeElement;panel.hidden=false;document.body.classList.add('search-open');
  requestAnimationFrame(()=>panel.classList.add('visible'));input.focus();input.select();render();
 }
 function close(restore=true){
  if(panel.hidden)return;panel.classList.remove('visible');document.body.classList.remove('search-open');
  setTimeout(()=>{panel.hidden=true;},180);
  if(restore&&returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
 }

 input.addEventListener('input',()=>{active=0;render();});
 input.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'){e.preventDefault();setActive(active+1);}
  else if(e.key==='ArrowUp'){e.preventDefault();setActive(active-1);}
  else if(e.key==='Enter'){e.preventDefault();choose(active,e.shiftKey);}
  else if(e.key==='Escape'){e.preventDefault();e.stopPropagation();if(input.value){input.value='';render();}else close();}
 });
 list.addEventListener('click',e=>{const net=e.target.closest('[data-network]');if(net)return choose(+net.dataset.network,true);const b=e.target.closest('[data-index]');if(b)choose(+b.dataset.index);});
 list.addEventListener('mousemove',e=>{const li=e.target.closest('.search-result');if(li&&+li.dataset.index!==active)setActive(+li.dataset.index);});
 status.addEventListener('click',e=>{const b=e.target.closest('[data-suggest]');if(b){input.value=b.dataset.suggest;active=0;render();input.focus();}});
 panel.addEventListener('click',e=>{if(e.target===panel)close();});
 panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close();}if(e.key==='Tab'){e.preventDefault();input.focus();}});
 document.querySelectorAll('[data-open-search]').forEach(b=>b.addEventListener('click',open));
 document.addEventListener('keydown',e=>{
  const typing=e.target.closest?.('input,textarea,select,[contenteditable]');
  if((e.key==='k'&&(e.metaKey||e.ctrlKey))||(e.key==='/'&&!typing&&!e.metaKey&&!e.ctrlKey)){
   if(document.querySelector('dialog[open]'))return;e.preventDefault();panel.hidden?open():close();
  }
 });
 return {open,close};
}
