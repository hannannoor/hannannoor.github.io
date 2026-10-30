// No viewport-sized reading stops: only whole-section edges are snap targets.
export function boundaryDestination(sections,y,height,direction){
 let index=0;sections.forEach((s,i)=>{if(y>=s.top-2)index=i;});
 const current=sections[index];if(!current)return null;
 if(direction>0&&index<sections.length-1&&y>=Math.max(current.top,current.bottom-height)-2)return sections[index+1].top;
 if(direction<0&&index>0&&y<=current.top+2){const previous=sections[index-1];return Math.max(previous.top,previous.bottom-height);}
 return null;
}
export function createBoundaryGesture(){
 let last=-Infinity,amount=0,direction=0,consumed=false,native=false;
 return {feed(delta,now,boundary){
  const sign=Math.sign(delta);
  if(now-last>180||sign!==direction){amount=0;consumed=false;direction=sign;native=!boundary;}
  last=now;if(native)return 'native';if(consumed)return 'hold';
  amount+=Math.abs(delta);if(amount<18)return 'hold';
  consumed=true;return direction;
 }};
}
export function installSectionScroll({sections,header,reduced,blocked}){
 const gate=createBoundaryGesture();
 const excluded=target=>target.closest('dialog,input,textarea,select,[contenteditable],[data-native-scroll],.connection-browser,.network-detail,.fullscreen');
 function move(top){scrollTo({top:Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,top)),behavior:reduced.matches?'instant':'smooth'});}
 function moveTo(element){
  if(blocked())return;
  const offset=header.getBoundingClientRect().height;
  const destination=element.getBoundingClientRect().top+scrollY-offset;
  const top=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,destination));
  move(top);
 }
 addEventListener('wheel',e=>{
  if(blocked()||excluded(e.target)||e.ctrlKey||e.metaKey||!e.deltaY||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
  const offset=header.getBoundingClientRect().height;
  const geometry=sections.map(s=>{const r=s.getBoundingClientRect();return {top:Math.max(0,r.top+scrollY-offset),bottom:r.bottom+scrollY-offset};});
  const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
  const target=boundaryDestination(geometry,scrollY,innerHeight-offset,Math.sign(delta));
  const action=gate.feed(delta,performance.now(),target!==null);
  if(action==='native')return;
  e.preventDefault();if(action!=='hold'&&target!==null)move(target);
 },{passive:false});
 return {moveTo};
}
