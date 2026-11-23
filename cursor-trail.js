// "Network trail" cursor: the normal cursor stays, and moving it leaves a short-lived web
// of nodes and links, like the neural network on the page. Links pulse, the cursor wires
// itself to nearby nodes, clicking sends out a burst, and hover targets get a halo or label.
// The canvas only animates while there is something to draw.
export function installCursorTrail({labelFor=()=>'',isLink=()=>false}={}){
 const canvas=document.createElement('canvas'),label=document.createElement('div');
 canvas.className='fx-trail';label.className='fx-trail-label mono';canvas.setAttribute('aria-hidden','true');label.setAttribute('aria-hidden','true');
 document.body.append(canvas,label);
 const ctx=canvas.getContext('2d');
 const BLUE='36,90,255',SOFT='140,172,255';
 const LIFE=1100,SPACING=24,LINK=95,HEAD_LINK=120,MAX=46;
 let dpr=1,W=0,H=0,nodes=[],pulses=[],mx=-999,my=-999,hx=-999,hy=-999,lastX=null,lastY=null,
  over='',halo=0,running=false,inside=false,dark=false,lastT=performance.now();

 function resize(){dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
 resize();addEventListener('resize',resize);

 function spawn(x,y,vx,vy,life=LIFE,big=false){
  nodes.push({x,y,vx,vy,born:performance.now(),life,r:big?2.6+Math.random()*1.6:1.6+Math.random()*1.8});
  if(nodes.length>MAX)nodes.splice(0,nodes.length-MAX);
 }
 function start(){if(!running){running=true;lastT=performance.now();requestAnimationFrame(frame);}}

 addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse')return;
  mx=e.clientX;my=e.clientY;if(!inside){inside=true;hx=mx;hy=my;}
  const t=e.target;over=isLink(t)?'link':'';
  const text=labelFor(t);label.textContent=text;label.classList.toggle('on',!!text);
  // Light text on dark areas, accent on light ones.
  dark=!!t.closest?.('.hero,.network-zone.fullscreen,.site-footer,.fx-dark');
  if(lastX===null){lastX=mx;lastY=my;}
  const dx=mx-lastX,dy=my-lastY,dist=Math.hypot(dx,dy);
  if(dist>SPACING){
   const steps=Math.min(3,Math.floor(dist/SPACING));
   for(let i=1;i<=steps;i++){
    const k=i/steps,nx=-dy/dist,ny=dx/dist,side=(Math.random()-.5)*2;
    spawn(lastX+dx*k+nx*side*10,lastY+dy*k+ny*side*10,nx*side*18+dx*.15,ny*side*18+dy*.15);
    if(Math.random()<.35&&nodes.length>2){const a=nodes[nodes.length-1],b=nodes[nodes.length-3];pulses.push({a,b,t:0,speed:1.6+Math.random()});}
   }
   lastX=mx;lastY=my;
  }
  start();
 },{passive:true});
 document.addEventListener('pointerleave',()=>{inside=false;lastX=null;label.classList.remove('on');});
 addEventListener('pointerdown',e=>{
  if(e.pointerType!=='mouse')return;
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2+Math.random()*.3,s=90+Math.random()*90;spawn(e.clientX,e.clientY,Math.cos(a)*s,Math.sin(a)*s,800,true);}
  const ring=nodes.slice(-10);ring.forEach((n,i)=>pulses.push({a:ring[i],b:ring[(i+1)%ring.length],t:0,speed:2.4}));
  start();
 },{passive:true});
 addEventListener('scroll',()=>{lastX=null;},{passive:true});

 function frame(now){
  const dt=Math.min(.05,(now-lastT)/1000);lastT=now;
  hx+=(mx-hx)*.28;hy+=(my-hy)*.28;halo+=((over==='link'&&inside?1:0)-halo)*.18;
  ctx.clearRect(0,0,W,H);
  nodes=nodes.filter(n=>now-n.born<n.life);
  pulses=pulses.filter(p=>p.t<1&&nodes.includes(p.a)&&nodes.includes(p.b));
  const col=dark?SOFT:BLUE;
  // drift
  for(const n of nodes){n.x+=n.vx*dt;n.y+=n.vy*dt;n.vx*=.93;n.vy*=.93;n.a=1-(now-n.born)/n.life;n.a=n.a*n.a*(3-2*n.a);}
  // web between nodes
  ctx.lineWidth=1;
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
   const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d>LINK)continue;
   ctx.strokeStyle=`rgba(${col},${(1-d/LINK)*Math.min(a.a,b.a)*(dark?.75:.55)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
  }
  // cursor wired to nearby nodes
  if(inside)for(const n of nodes){const d=Math.hypot(n.x-hx,n.y-hy);if(d>HEAD_LINK||d<4)continue;
   ctx.strokeStyle=`rgba(${col},${(1-d/HEAD_LINK)*n.a*.7})`;ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(n.x,n.y);ctx.stroke();}
  // nodes
  for(const n of nodes){ctx.fillStyle=`rgba(${col},${n.a*.9})`;ctx.beginPath();ctx.arc(n.x,n.y,n.r*(.6+.4*n.a),0,Math.PI*2);ctx.fill();}
  // pulses travelling along links
  for(const p of pulses){p.t+=dt*p.speed;const x=p.a.x+(p.b.x-p.a.x)*p.t,y=p.a.y+(p.b.y-p.a.y)*p.t,al=Math.sin(p.t*Math.PI)*Math.min(p.a.a,p.b.a);
   ctx.fillStyle=`rgba(255,255,255,${al})`;ctx.beginPath();ctx.arc(x,y,1.6,0,Math.PI*2);ctx.fill();
   ctx.fillStyle=`rgba(${col},${al*.35})`;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();}
  // halo on links/buttons
  if(halo>.02){ctx.strokeStyle=`rgba(${col},${halo*.9})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(hx,hy,8+halo*12,0,Math.PI*2);ctx.stroke();
   ctx.fillStyle=`rgba(${col},${halo*.12})`;ctx.fill();}
  label.style.transform=`translate(${mx+18}px,${my+16}px)`;
  if(nodes.length||pulses.length||halo>.02)requestAnimationFrame(frame);else{running=false;ctx.clearRect(0,0,W,H);}
 }
}
