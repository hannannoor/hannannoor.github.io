import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
import {nodes,edges,projects,events,certificates,relatedNodes} from './content.js?v=9';
import {pulsePosition} from './network-math.js';
import {shouldRotate,cameraFocus,orbitPosition} from './motion.js';

export async function createNetwork(container,labelLayer,onSelect){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0x101722,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.NoToneMapping;container.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,100);
 const overview=new THREE.Vector3(.3,.5,19.5);camera.position.copy(overview);
 const controls=new OrbitControls(camera,renderer.domElement);
 Object.assign(controls,{enableDamping:true,dampingFactor:.09,enablePan:false,enableZoom:false,rotateSpeed:.65,autoRotateSpeed:1.05,minPolarAngle:.2,maxPolarAngle:Math.PI-.2});
 controls.touches={ONE:THREE.TOUCH.PAN,TWO:THREE.TOUCH.DOLLY_ROTATE};renderer.domElement.style.touchAction='pan-y';
 scene.add(new THREE.HemisphereLight(0xc4d9ff,0x101722,2));
 const key=new THREE.DirectionalLight(0xc4ddff,2);key.position.set(-6,8,7);scene.add(key);
 const fill=new THREE.DirectionalLight(0x497bff,1.1);fill.position.set(6,-4,-4);scene.add(fill);
 const group=new THREE.Group();scene.add(group);
 const sphere=new THREE.SphereGeometry(1,36,26),smallSphere=new THREE.SphereGeometry(1,14,10);
 const meshes=new Map(),labels=new Map(),connections=[],pulses=[],loader=new THREE.TextureLoader();
 let selected=null,hoveredNode=null,stageHovered=false,interacting=false,paused=false,expanded=false,path=[],tween=null;
 let visible=true,running=false,raf=0,lastFrame=0,lastPaint=0,started=performance.now();
 const vec=new THREE.Vector3(),ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
 const rotationState=()=>({paused,hovered:stageHovered,interacting,reduced:reduced.matches,selected:!!selected&&selected!=='hannan'});
 function setRotation(){controls.autoRotate=shouldRotate(rotationState());container.dataset.rotation=controls.autoRotate?'running':'paused';schedule();}
 function getItem(id){return projects.find(x=>x.id===id)||events.find(x=>x.id===id)||certificates.find(x=>x.id===id);}
 // Camera-facing circular previews keep screenshots undistorted as the graph orbits.
 function texture(node,image){
  const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d');
  ctx.save();ctx.beginPath();ctx.arc(256,256,244,0,Math.PI*2);ctx.clip();
  ctx.fillStyle=node.type==='core'?'#245aff':node.type==='event'?'#25416b':node.type==='certificate'?'#284a55':'#192c47';ctx.fillRect(0,0,512,512);
  if(image){
   const sourceHeight=Math.min(image.height,getItem(node.id)?.imageCropHeight||image.height);
   const scale=Math.max(488/image.width,488/sourceHeight),w=image.width*scale,h=sourceHeight*scale;
   ctx.drawImage(image,0,0,image.width,sourceHeight,256-w/2,256-h/2,w,h);
   const shade=ctx.createRadialGradient(210,180,70,256,256,250);shade.addColorStop(0,'#07101a00');shade.addColorStop(.7,'#07101a00');shade.addColorStop(1,'#07101a75');ctx.fillStyle=shade;ctx.fillRect(0,0,512,512);
  }else{
   const glow=ctx.createRadialGradient(140,100,0,256,256,300);glow.addColorStop(0,'#79b1ff');glow.addColorStop(.45,'#245aff');glow.addColorStop(1,'#142849');ctx.fillStyle=glow;ctx.fillRect(0,0,512,512);
   ctx.fillStyle='#eff6ff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='80px Arial';ctx.fillText(node.type==='certificate'?'✓':node.type==='event'?'✳':'↗',256,260);
  }
  ctx.restore();ctx.beginPath();ctx.arc(256,256,244,0,Math.PI*2);ctx.strokeStyle='#b9d6ff99';ctx.lineWidth=5;ctx.stroke();
  const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return map;
 }
 const shortNames={'restaurant-website':'ByteBite','dsag-queues':'Queue Simulations','transport-fare-calculator':'Fare Calculator','campus-navigation':'Campus Routes','restaurant-data-analytics':'Data Analytics','network-design':'Network Design','windows-security-lab':'Windows Security','cloud-services-case-study':'Cloud Services','food-ordering-system':'Food Ordering','orientation':'FMO','infocomm-robotics':'Infocomm & Robotics','sylp':'SYLP','poly-forum':'Poly Forum','tpla':'LEAD Ambassadors','iitsc':'IITSC','cert-knime':'KNIME','cert-nets':'NETS QR','cert-windows':'Windows Security','cert-ai':'AI Literacy'};
 for(const node of nodes){
  const radius=node.type==='core'?.67:node.type==='project'?(projects.find(p=>p.id===node.id)?.featured?.72:.58):node.type==='event'?.36:node.type==='certificate'?.26:.085;
  const material=node.type==='skill'?new THREE.MeshStandardMaterial({color:0x6a95d4,roughness:.4,metalness:.3,transparent:true}):new THREE.SpriteMaterial({map:texture(node),transparent:true,depthWrite:false,toneMapped:false});
  const mesh=node.type==='skill'?new THREE.Mesh(smallSphere,material):new THREE.Sprite(material);
  mesh.position.fromArray(node.position);mesh.scale.setScalar(node.type==='skill'?radius:radius*2);
  mesh.userData={id:node.id,radius,scale:node.type==='skill'?radius:radius*2,baseScale:node.type==='skill'?radius:radius*2,opacity:1,type:node.type};group.add(mesh);meshes.set(node.id,mesh);
  const label=document.createElement('span');label.className=`node-label ${node.type}-label`;label.textContent=shortNames[node.id]||node.label;labelLayer.append(label);labels.set(node.id,label);
  const item=getItem(node.id),image=node.type==='core'?'assets/hannan-portrait.webp':item?.networkImage||item?.image;
  if(image)loader.load(image,t=>{mesh.material.map.dispose();mesh.material.map=texture(node,t.image);mesh.material.needsUpdate=true;t.dispose();schedule();},undefined,()=>{});
 }
 for(const [a,b] of edges){
  const from=meshes.get(a).position,to=meshes.get(b).position,mid=from.clone().lerp(to,.5);mid.z+=.12;
  const curve=new THREE.QuadraticBezierCurve3(from,mid,to),material=new THREE.LineBasicMaterial({color:0x597396,transparent:true,opacity:.2});
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(18)),material);group.add(line);connections.push({a,b,line,curve,target:.2});
 }
 for(let i=0;i<6;i++){const mesh=new THREE.Mesh(new THREE.SphereGeometry(.035,7,6),new THREE.MeshBasicMaterial({color:0x75a9ff,transparent:true}));group.add(mesh);pulses.push(mesh);}
 for(let i=0;i<2;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.89+i*.12,.008,5,90),new THREE.MeshBasicMaterial({color:0x4b76b9,transparent:true,opacity:.5}));ring.rotation.set(.8+i*.3,.2+i,.4);group.add(ring);}
 function highlight(){
  const active=hoveredNode||selected,related=active?relatedNodes(active):null;
  meshes.forEach((m,id)=>{m.userData.opacity=!related||related.has(id)||path.includes(id)?1:.36;m.userData.scale=m.userData.baseScale*(id===active?1.12:1);labels.get(id).classList.toggle('selected-label',id===active||path.includes(id));});
  connections.forEach(edge=>{const traced=path.some((id,i)=>i<path.length-1&&[edge.a,edge.b].includes(id)&&[edge.a,edge.b].includes(path[i+1]));edge.target=traced?.95:active?(edge.a===active||edge.b===active)?.85:.05:.25;edge.line.material.color.set(traced||active&&[edge.a,edge.b].includes(active)?0x75a9ff:0x597396);});schedule();
 }
 function moveCamera(target,position,duration=1200){tween={start:performance.now(),duration,fromTarget:controls.target.clone(),target:target.clone(),from:camera.position.clone(),position:position.clone()};schedule();}
 function select(id,focus=true){
  if(!meshes.has(id))return;selected=id==='hannan'?null:id;path=[];hoveredNode=null;setRotation();
  const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.enableDamping=damping;highlight();
  if(focus){const focus=cameraFocus(nodes.find(n=>n.id===id).position,camera.aspect<.9?25:20.5);moveCamera(new THREE.Vector3(...focus.target),new THREE.Vector3(...focus.position));}
 }
 function expand(value,id){
  expanded=value;resize(false);
  if(value){if(id)select(id,true);else moveCamera(new THREE.Vector3(),new THREE.Vector3(0,.4,camera.aspect<.9?25:20.5),1150);}
  else{selected=null;path=[];hoveredNode=null;highlight();setRotation();moveCamera(new THREE.Vector3(),overview,1000);}
 }
 function reset(){selected=null;hoveredNode=null;path=[];highlight();moveCamera(new THREE.Vector3(),expanded?new THREE.Vector3(0,.4,camera.aspect<.9?25:20.5):overview);setRotation();}
 function zoom(factor){const d=camera.position.clone().sub(controls.target),length=THREE.MathUtils.clamp(d.length()*factor,14,32);moveCamera(controls.target,controls.target.clone().add(d.normalize().multiplyScalar(length)),700);}
 function pause(value){paused=value;setRotation();}
 function trace(ids){path=ids;highlight();}
 function hit(e){const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray.intersectObjects([...meshes.values()]).find(hit=>!hit.object.isSprite||hit.uv&&Math.hypot(hit.uv.x-.5,hit.uv.y-.5)<=244/512)?.object.userData.id;}
 let down=null;
 container.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'){stageHovered=true;setRotation();}});
 container.addEventListener('pointerleave',()=>{stageHovered=false;hoveredNode=null;down=null;highlight();setRotation();});
 renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};tween=null;});
 renderer.domElement.addEventListener('pointerup',e=>{if(down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)<8){const id=hit(e);onSelect(id||'hannan');}down=null;});
 renderer.domElement.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||down)return;const id=hit(e)||null;if(id!==hoveredNode){hoveredNode=id;renderer.domElement.style.cursor=id?'pointer':'grab';highlight();}});
 controls.addEventListener('start',()=>{interacting=true;tween=null;setRotation();});controls.addEventListener('end',()=>{interacting=false;setRotation();});controls.addEventListener('change',schedule);
 function resize(adjust=true){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(adjust&&!expanded&&!selected&&!tween){overview.z=w/h<.9?25:19.5;camera.position.copy(overview);}schedule();}
 new ResizeObserver(()=>resize(true)).observe(container);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else{cancelAnimationFrame(raf);running=false;}},{rootMargin:'80px'}).observe(container);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});reduced.addEventListener('change',setRotation);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);running=false;container.dispatchEvent(new CustomEvent('network-unavailable'));});
 function draw(now){
  running=false;if(!visible||document.hidden)return;
  if(now-lastPaint<30&&!reduced.matches){schedule();return;}
  const dt=Math.min(.05,Math.max(0,(now-lastFrame)/1000)||.033);lastFrame=now;lastPaint=now;
  const elapsed=Math.max(0,(now-started)/1000),intro=reduced.matches?1:Math.min(1,elapsed/1.5),ease=1-Math.pow(1-intro,4);group.scale.setScalar(.25+.75*ease);
  if(tween){const p=reduced.matches?1:Math.min(1,Math.max(0,(now-tween.start)/tween.duration)),e=p*p*(3-2*p);controls.target.lerpVectors(tween.fromTarget,tween.target,e);const offset=orbitPosition(tween.from.clone().sub(tween.fromTarget).toArray(),tween.position.clone().sub(tween.target).toArray(),e);camera.position.copy(controls.target).add(new THREE.Vector3(...offset));if(p===1)tween=null;}
  controls.autoRotate=shouldRotate(rotationState())&&!tween;controls.update(dt);
  let settling=false;const active=hoveredNode||selected,related=active?relatedNodes(active):null,labelCandidates=[];
  meshes.forEach((mesh,id)=>{
   const u=mesh.userData;mesh.material.opacity=THREE.MathUtils.lerp(mesh.material.opacity,u.opacity,.17);const s=THREE.MathUtils.lerp(mesh.scale.x,u.scale,.16);mesh.scale.setScalar(s);
   if(Math.abs(s-u.scale)>.002||Math.abs(mesh.material.opacity-u.opacity)>.01)settling=true;
   
   mesh.getWorldPosition(vec);const distance=vec.distanceTo(camera.position);vec.project(camera);const x=(vec.x*.5+.5)*container.clientWidth,y=(-vec.y*.5+.5)*container.clientHeight;
   const label=labels.get(id),show=id===active||u.type==='core'||(u.type==='project'||u.type==='event'&&distance<21)&&!active||related?.has(id);
   const offset=container.clientHeight*u.radius/(2*distance*Math.tan(camera.fov*Math.PI/360))+8;
   label.style.transform=`translate(${x}px,${y+offset}px) translateX(-50%)`;
   labelCandidates.push({id,label,x,y:y+offset,z:vec.z,show:show&&vec.z<1,opacity:Math.max(.35,mesh.material.opacity),priority:id===active?0:u.type==='core'?1:2});
  });
  const occupied=[];labelCandidates.sort((a,b)=>a.priority-b.priority||a.z-b.z).forEach(c=>{const width=Math.min(160,Math.max(65,c.label.textContent.length*7)),height=c.label.textContent.length>19?42:26;const box={left:c.x-width/2,right:c.x+width/2,top:c.y,bottom:c.y+height};const collision=occupied.some(b=>box.left<b.right+8&&box.right>b.left-8&&box.top<b.bottom+6&&box.bottom>b.top-6);const show=c.show&&(!collision||c.priority===0)&&box.top<container.clientHeight-45&&box.left>=-5&&box.right<=container.clientWidth+5;c.label.style.opacity=show?String(c.opacity):'0';if(show)occupied.push(box);});
  connections.forEach(e=>{e.line.material.opacity=THREE.MathUtils.lerp(e.line.material.opacity,e.target*ease,.14);});
  pulses.forEach((p,i)=>{p.visible=!reduced.matches&&!paused;if(!p.visible)return;const state=pulsePosition(elapsed,i,connections.length),edge=connections[state.index];p.position.copy(edge.curve.getPoint(state.phase));p.material.opacity=Math.sin(state.phase*Math.PI)*.8;});
  renderer.render(scene,camera);container.dataset.ready='true';
  if(!reduced.matches&&!paused||tween||interacting||settling||intro<1)schedule();
 }
 function schedule(){if(!running&&visible&&!document.hidden){running=true;raf=requestAnimationFrame(draw);}}
 resize();setRotation();schedule();return {select,expand,reset,zoom,pause,trace,resize};
}
