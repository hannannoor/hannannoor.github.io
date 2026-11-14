// Native, continuous scrolling everywhere. The wheel and trackpad are left to the
// browser; this module only handles explicit jumps (the section pager buttons).
export function installSectionScroll({header,reduced,blocked}){
 function moveTo(element){
  if(blocked())return;
  const offset=header.getBoundingClientRect().height;
  const destination=element.getBoundingClientRect().top+scrollY-offset;
  const top=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,destination));
  scrollTo({top,behavior:reduced.matches?'instant':'smooth'});
 }
 return {moveTo};
}
