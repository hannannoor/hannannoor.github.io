export function wheelPixels(delta,mode,height){return delta*(mode===1?16:mode===2?height:1);}

export function readingStops(sections,height){
 const stops=[];
 for(const s of sections){
  const top=Math.max(0,s.top),end=Math.max(top,s.bottom-height);stops.push(top);
  for(let y=top+height*.85;y<end-50;y+=height*.85)stops.push(Math.round(y));
  if(end-top>50)stops.push(end);
 }
 return [...new Set(stops)].sort((a,b)=>a-b);
}
export function nextReadingStop(stops,y,direction){return direction>0?stops.find(s=>s>y+28)??null:[...stops].reverse().find(s=>s<y-28)??null;}

export function sectionDestination({sections,y,height,direction}){
 let index=0;sections.forEach((s,i)=>{if(y>=s.top-28)index=i;});
 const section=sections[index],next=index+direction;
 if(next<0||next>=sections.length)return null;
 if(direction<0&&y<=section.top+28)return next;
 if(direction>0&&y+height>=section.bottom-28)return next;
 return null;
}

export function createGestureGate(){
 let last=-Infinity,amount=0,consumed=false,native=false,direction=0;
 return {feed(delta,now,boundary){
  const sign=Math.sign(delta);
  if(now-last>200){amount=0;consumed=false;native=!boundary;direction=sign;}
  last=now;
  if(consumed)return 'hold';
  if(native||!boundary){native=true;return 'native';}
  if(sign!==direction){amount=0;direction=sign;}
  amount+=Math.abs(delta);
  if(amount<28)return 'hold';
  consumed=true;return 'move';
 }};
}

export function installSectionScroll({sections,header,reduced,blocked,onChange}){
 const gate=createGestureGate();let frame=0,animating=false,animationUntil=0;
 const desktop=()=>matchMedia('(pointer:fine) and (min-width: 900px)').matches;
 const offset=()=>header.getBoundingClientRect().height;
 function stop(){cancelAnimationFrame(frame);animating=false;document.documentElement.dataset.sectionMoving='false';}
 function moveTo(element){
  stop();const from=scrollY,to=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,typeof element==='number'?element:element.getBoundingClientRect().top+scrollY-offset()));
  if(reduced.matches){scrollTo({top:to,behavior:'instant'});onChange();return;}
  const start=performance.now(),duration=Math.abs(to-from)>innerHeight*1.5?850:700;
  animating=true;animationUntil=start+duration;document.documentElement.dataset.sectionMoving='true';
  function step(now){
   if(blocked()){stop();return;}
   const t=Math.min(1,(now-start)/duration),ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
   scrollTo({top:from+(to-from)*ease,behavior:'instant'});
   if(t<1)frame=requestAnimationFrame(step);else{stop();onChange();}
  }
  frame=requestAnimationFrame(step);
 }
 addEventListener('wheel',event=>{
  if(!desktop()||reduced.matches||blocked()||event.ctrlKey||Math.abs(event.deltaX)>Math.abs(event.deltaY)||!event.deltaY)return;
  if(event.target.closest('dialog,input,textarea,select,[data-native-scroll]'))return;
  const delta=wheelPixels(event.deltaY,event.deltaMode,innerHeight),now=performance.now();
  const geometry=sections.map(s=>{const r=s.getBoundingClientRect();return {top:r.top+scrollY-offset(),bottom:r.bottom+scrollY-offset()};});
  const next=nextReadingStop(readingStops(geometry,innerHeight-offset()),scrollY,Math.sign(delta));
  const action=gate.feed(delta,now,next!==null||animating);
  if(animating&&now<=animationUntil||action==='hold'){event.preventDefault();return;}
  if(action==='move'&&next!==null){event.preventDefault();moveTo(next);}
 },{passive:false});
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');if(!link||blocked())return;
  const id=link.getAttribute('href').slice(1),target=document.getElementById(id);if(!target||!sections.includes(target))return;
  event.preventDefault();history.replaceState(null,'','#'+id);moveTo(target);
 });
 addEventListener('keydown',e=>{if(['PageDown','PageUp','Home','End','ArrowDown','ArrowUp',' '].includes(e.key)&&!blocked()&&!e.target.closest('input,textarea,select,button,a'))stop();});
 addEventListener('touchstart',()=>{if(animating)stop();},{passive:true});
 return {moveTo,stop};
}
