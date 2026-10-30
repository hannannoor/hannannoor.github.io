export function shouldRotate({paused=false,hovered=false,interacting=false,reduced=false,selected=false}){
 return !paused&&!hovered&&!interacting&&!reduced&&!selected;
}
export function cameraFocus(position,distance=20.5){
 const length=Math.hypot(...position),d=Math.max(19,distance);
 return {target:[0,0,0],position:length<.001?[.3,.5,d]:position.map(v=>v/length*d)};
}
export function orbitPosition(from,to,t){
 if(t<=0)return [...from];if(t>=1)return [...to];
 const ra=Math.hypot(...from)||1,rb=Math.hypot(...to)||1,a=from.map(v=>v/ra),b=to.map(v=>v/rb),dot=Math.max(-1,Math.min(1,a.reduce((s,v,i)=>s+v*b[i],0))),r=ra+(rb-ra)*t;
 let direction;
 if(dot>.9995){direction=a.map((v,i)=>v+(b[i]-v)*t);const len=Math.hypot(...direction);direction=direction.map(v=>v/len);}
 else if(dot<-.9995){const axis=Math.abs(a[0])<.9?[1,0,0]:[0,1,0],cross=[a[1]*axis[2]-a[2]*axis[1],a[2]*axis[0]-a[0]*axis[2],a[0]*axis[1]-a[1]*axis[0]],len=Math.hypot(...cross);direction=a.map((v,i)=>v*Math.cos(Math.PI*t)+cross[i]/len*Math.sin(Math.PI*t));}
 else{const angle=Math.acos(dot),sin=Math.sin(angle);direction=a.map((v,i)=>(v*Math.sin((1-t)*angle)+b[i]*Math.sin(t*angle))/sin);}
 return direction.map(v=>v*r);
}
export function sphericalPosition(index,count,radius){
 const y=1-2*(index+.5)/count,theta=index*Math.PI*(3-Math.sqrt(5));
 return [Math.cos(theta)*Math.sqrt(1-y*y)*radius,y*radius,Math.sin(theta)*Math.sqrt(1-y*y)*radius];
}
