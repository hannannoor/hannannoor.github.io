// Chapter headings and overlapping reading screens form the page destinations.
export function pageStops(sections,height,max){
 const stops=[0,max],step=Math.max(1,height*.92);
 for(const section of sections){
  const top=Math.max(0,section.top),end=Math.max(top,section.bottom-height);
  stops.push(top);
  for(let y=top+step;y<end-40;y+=step)stops.push(y);
  if(end>top+40)stops.push(end);
 }
 return [...new Set(stops.map(y=>Math.round(Math.max(0,Math.min(max,y)))))].sort((a,b)=>a-b);
}
export function nextPageStop(stops,y,direction){
 return direction>0?stops.find(s=>s>y+12)??null:[...stops].reverse().find(s=>s<y-12)??null;
}
export function createWheelGesture(){
 let last=-Infinity,amount=0,direction=0,consumed=false;
 return {feed(delta,now){
  const sign=Math.sign(delta);if(!sign)return 0;
  if(now-last>180||sign!==direction){amount=0;consumed=false;direction=sign;}
  last=now;if(consumed)return 0;
  amount+=Math.abs(delta);if(amount<18)return 0;
  consumed=true;return direction;
 }};
}
export function installSectionScroll({sections,header,reduced,blocked,onChange=()=>{}}){
 const gate=createWheelGesture();let frame=0,moving=false,destination=0,touch=null;
 const offset=()=>header.getBoundingClientRect().height;
 const maximum=()=>Math.max(0,document.documentElement.scrollHeight-innerHeight);
 const excluded=target=>target.closest('dialog,input,textarea,select,[contenteditable],[data-native-scroll],.connection-browser,.network-detail,.fullscreen');
 function stop(){cancelAnimationFrame(frame);frame=0;moving=false;document.documentElement.dataset.sectionMoving='false';}
 function stops(){return pageStops(sections.map(s=>{const r=s.getBoundingClientRect();return {top:r.top+scrollY-offset(),bottom:r.bottom+scrollY-offset()};}),innerHeight-offset(),maximum());}
 function snapTo(to){
  stop();if(blocked())return;
  const from=scrollY;destination=to;
  if(reduced.matches){scrollTo({top:to,behavior:'instant'});onChange();return;}
  // Cancel any browser-managed anchor animation before starting a page turn.
  scrollTo({top:from,behavior:'instant'});
  const start=performance.now(),duration=480;moving=true;document.documentElement.dataset.sectionMoving='true';
  function step(now){
   if(blocked()){stop();return;}
   const t=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-t,3);
   scrollTo({top:from+(destination-from)*ease,behavior:'instant'});
   if(t<1)frame=requestAnimationFrame(step);else{stop();onChange();}
  }
  frame=requestAnimationFrame(step);
 }
 function moveTo(element){
  stop();
  if(blocked())return;
  const top=Math.max(0,Math.min(maximum(),element.getBoundingClientRect().top+scrollY-offset()));
  scrollTo({top,behavior:reduced.matches?'instant':'smooth'});
 }
 addEventListener('wheel',e=>{
  if(blocked()||excluded(e.target)){stop();return;}
  if(e.ctrlKey||e.metaKey||!e.deltaY||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
  const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
  const direction=gate.feed(delta,performance.now());
  const base=moving&&Math.sign(destination-scrollY)===Math.sign(delta)?destination:scrollY;
  const next=nextPageStop(stops(),base,Math.sign(delta));
  if(next===null&&!moving)return;
  e.preventDefault();if(direction&&next!==null)snapTo(next);
 },{passive:false});
 addEventListener('keydown',e=>{if(['PageDown','PageUp','Home','End','ArrowDown','ArrowUp',' ','Escape','Tab'].includes(e.key))stop();});
 addEventListener('pointerdown',stop,{passive:true});
 addEventListener('resize',()=>{touch=null;stop();},{passive:true});
 // Native links retain normal focus, fragment URLs and Back-button history.
 document.addEventListener('click',stop,{capture:true});
 addEventListener('touchstart',e=>{
  stop();touch=!blocked()&&!excluded(e.target)&&e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY,from:scrollY,delta:0,handled:false}:null;
 },{passive:true});
 addEventListener('touchmove',e=>{
  if(!touch)return;if(e.touches.length!==1||blocked()){touch=null;return;}
  const dx=e.touches[0].clientX-touch.x,dy=e.touches[0].clientY-touch.y;
  if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>16){touch=null;return;}
  // Reserve the gesture from its first small move, before native scroll latches.
  if(e.cancelable){e.preventDefault();touch.delta=-dy;touch.handled=Math.abs(dy)>Math.abs(dx);}
 },{passive:false});
 addEventListener('touchend',()=>{
  if(touch?.handled&&Math.abs(touch.delta)>40){const next=nextPageStop(stops(),touch.from,Math.sign(touch.delta));if(next!==null)snapTo(next);}
  touch=null;
 },{passive:true});
 addEventListener('touchcancel',()=>{touch=null;},{passive:true});
 reduced.addEventListener?.('change',stop);
 return {moveTo,stop};
}
