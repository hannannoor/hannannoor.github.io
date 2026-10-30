export function pulsePosition(elapsed,pulseIndex,edgeCount){
 const time=Math.max(0,Number.isFinite(elapsed)?elapsed:0);
 return {index:(Math.floor(time/4)+pulseIndex*9)%edgeCount,phase:(time/4+pulseIndex*.5)%1};
}
