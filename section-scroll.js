// Native, continuous scrolling with a gentle "settle" onto section starts.
// Nothing intercepts the wheel or trackpad. Only after the user stops scrolling,
// and only if a section's start is close by, the page glides the last bit onto it.
// Inside long sections there is never any pull, so content is always reachable.

// Pure decision function (kept separate so it can be reasoned about and tested).
// tops: section start positions in scroll coordinates; y: current scroll position;
// view: visible height below the header; direction: last scroll direction (+1 down, -1 up).
export function settleTarget(tops,y,view,direction,maxScroll){
 if(y<=2||y>=maxScroll-2)return null;          // at the very top or bottom: leave it
 const ahead=view*.28,behind=view*.12;          // reach forward further than back
 let best=null;
 for(const top of tops){
  const d=top-y;                                // >0: section starts below the header line
  if(Math.abs(d)<4)return null;                 // already aligned
  const ok=direction>=0?(d>0&&d<=ahead)||(d<0&&-d<=behind):(d<0&&-d<=ahead)||(d>0&&d<=behind);
  if(ok&&(best===null||Math.abs(d)<Math.abs(best-y)))best=top;
 }
 return best===null?null:Math.min(best,maxScroll);
}

export function installSectionScroll({sections,header,reduced,blocked}){
 const offset=()=>header.getBoundingClientRect().height;
 const maxScroll=()=>document.documentElement.scrollHeight-innerHeight;
 let moving=false,lastY=scrollY,direction=0,pointerDown=false,timer=0;

 function move(top){
  top=Math.max(0,Math.min(maxScroll(),top));if(Math.abs(top-scrollY)<2)return;
  moving=true;
  scrollTo({top,behavior:reduced.matches?'instant':'smooth'});
 }
 function moveTo(element){
  if(blocked())return;
  move(element.getBoundingClientRect().top+scrollY-offset());
 }
 function settle(){
  if(moving){moving=false;return;}              // our own glide just finished
  if(pointerDown||reduced.matches||blocked())return;
  if(document.activeElement?.closest?.('input,textarea,select,[contenteditable]'))return;
  const tops=sections.map(s=>Math.max(0,s.getBoundingClientRect().top+scrollY-offset()));
  const target=settleTarget(tops,scrollY,innerHeight-offset(),direction,maxScroll());
  if(target!==null)move(target);
 }

 addEventListener('scroll',()=>{
  const y=scrollY;if(y!==lastY)direction=Math.sign(y-lastY);lastY=y;
  clearTimeout(timer);timer=setTimeout(settle,180); // fallback where 'scrollend' is missing
 },{passive:true});
 if('onscrollend' in window)addEventListener('scrollend',()=>{clearTimeout(timer);settle();});
 // Don't fight a scrollbar drag or a finger still on the screen.
 addEventListener('pointerdown',()=>{pointerDown=true;},{passive:true});
 addEventListener('pointerup',()=>{pointerDown=false;},{passive:true});
 addEventListener('touchstart',()=>{pointerDown=true;},{passive:true});
 addEventListener('touchend',()=>{pointerDown=false;},{passive:true});

 return {moveTo};
}
