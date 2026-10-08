import * as THREE from './media/three.module.js';
const status=document.getElementById('status');
const enu=p=>new THREE.Vector3(p[0],p[2],-p[1]);
const smooth=x=>(x=Math.max(0,Math.min(1,x)),x*x*(3-2*x));
let playing=true,t=0,visible=false,last=performance.now(),diagram=true;
const speed=()=>diagram?2:1.5;
window.addEventListener('message',e=>{if(e.origin!==location.origin)return;if(e.data?.type==='tour-visible'){visible=e.data.visible;if(visible){t=0;playing=true;document.getElementById('play').textContent='Pause';}}});
document.getElementById('play').onclick=()=>{playing=!playing;document.getElementById('play').textContent=playing?'Pause':'Play';};
document.getElementById('replay').onclick=()=>{t=0;playing=true;document.getElementById('play').textContent='Pause';};
document.getElementById('seek').oninput=e=>{t=Number(e.target.value)*speed();playing=false;document.getElementById('play').textContent='Play';};
try{
 const [survey,aerial]=await Promise.all([fetch('media/survey-tour.json').then(r=>{if(!r.ok)throw Error('Survey missing');return r.json();}),fetch('media/venue-aerial.json').then(r=>{if(!r.ok)throw Error('Aerial imagery unavailable');return r.json();})]);
 const scene=new THREE.Scene();scene.background=new THREE.Color('#edf1ed');scene.fog=new THREE.Fog('#edf1ed',1800,3800);
 const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;document.getElementById('scene').append(renderer.domElement);
 const camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.5,7000);
 scene.add(new THREE.HemisphereLight('#fff6e4','#647b72',2.5));const sun=new THREE.DirectionalLight('#fff0d5',3);sun.position.set(200,700,-400);scene.add(sun);
 const sea=new THREE.Mesh(new THREE.PlaneGeometry(6000,6000),new THREE.MeshStandardMaterial({color:'#5d9cac',roughness:.65,metalness:.15}));sea.rotation.x=-Math.PI/2;sea.position.y=-.5;scene.add(sea);
 // Real, georeferenced imagery on a flat surface. No invented terrain heights.
 const radians=x=>x*Math.PI/180,A=6378137,e2=6.6943799901413165e-3;
 const ecef=(lon,lat)=>{const a=radians(lon),b=radians(lat),n=A/Math.sqrt(1-e2*Math.sin(b)**2);return[n*Math.cos(b)*Math.cos(a),n*Math.cos(b)*Math.sin(a),n*(1-e2)*Math.sin(b)];};
 const [olon,olat]=aerial.origin_lon_lat,o=ecef(olon,olat),lo=radians(olon),la=radians(olat);
 function mapToENU(mx,my){const lon=mx/A*180/Math.PI,lat=(2*Math.atan(Math.exp(my/A))-Math.PI/2)*180/Math.PI,p=ecef(lon,lat).map((v,i)=>v-o[i]);return[-Math.sin(lo)*p[0]+Math.cos(lo)*p[1],-Math.sin(la)*Math.cos(lo)*p[0]-Math.sin(la)*Math.sin(lo)*p[1]+Math.cos(la)*p[2]];}
 const texture=await new THREE.TextureLoader().loadAsync('media/venue-aerial.jpg');texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();
 const g=new THREE.PlaneGeometry(1,1,48,48),uv=g.getAttribute('uv'),positions=g.getAttribute('position'),ex=aerial.extent;
 for(let i=0;i<positions.count;i++){const [e,n]=mapToENU(ex.xmin+uv.getX(i)*(ex.xmax-ex.xmin),ex.ymin+uv.getY(i)*(ex.ymax-ex.ymin));positions.setXYZ(i,e,-.1,-n);}g.computeVertexNormals();
 const photoMap=new THREE.Mesh(g,new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));scene.add(photoMap);
 const sketch=new THREE.Group();scene.add(sketch);
 const contours=await fetch('media/venue-outlines.json').then(r=>r.json());
 for(const path of contours){const pts=path.map(([u,v])=>{const [e,n]=mapToENU(ex.xmin+u*(ex.xmax-ex.xmin),ex.ymin+v*(ex.ymax-ex.ymin));return new THREE.Vector3(e,0,-n);});const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineDashedMaterial({color:'#2d594e',transparent:true,opacity:.95,dashSize:6,gapSize:2.5}));line.computeLineDistances();sketch.add(line);}
 const grid=new THREE.GridHelper(1800,18,'#c5d1ca','#dbe2dc');grid.position.y=-.2;sketch.add(grid);
 function setMode(){photoMap.visible=!diagram;sketch.visible=diagram;sea.material.color.set(diagram?'#edf1ed':'#5d9cac');document.getElementById('mode').textContent=diagram?'Photo view':'Diagram view';document.getElementById('seek').max=48/speed();document.getElementById('visual-source').textContent=diagram?'Image-derived dashed outlines · illustrative diagram · ENU metres':'Esri World Imagery · simulated flat-surface flight · ENU metres';}
 document.getElementById('mode').onclick=()=>{diagram=!diagram;setMode();};setMode();
 const pins=[];const c=enu(survey.camera),origin=enu([0,0,0]),fort=enu(survey.points['BXR-7']);
 const leaders=document.createElementNS('http://www.w3.org/2000/svg','svg');leaders.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';document.getElementById('labels').append(leaders);
 function pin(id,p,color){const sphere=new THREE.Mesh(new THREE.SphereGeometry(2,12,8),new THREE.MeshBasicMaterial({color,depthTest:false}));sphere.position.copy(p);sphere.renderOrder=100;scene.add(sphere);const label=document.createElement('div');label.className='label';label.innerHTML=`<strong>${id}</strong>`;const coords=document.createElement('span');const xyz=[p.x,-p.z,p.y].map(v=>Math.abs(v)<.05?'0.0':v.toFixed(1));coords.textContent=`E ${xyz[0]} · N ${xyz[1]} · U ${xyz[2]} m`;label.append(coords);document.getElementById('labels').append(label);pins.push({id,p,label,sphere});}
 pin('Camera 1',c,'#147d78');pin('GeoOrigin · 0, 0, 0',origin,'#b63c82');for(const [id,p]of Object.entries(survey.points))pin(id,enu(p),'#8263ac');
 // Axis markers meet at the exact local origin. Marker heights do not relocate it.
 for(const [v,color]of [[new THREE.Vector3(55,0,0),'#b63c82'],[new THREE.Vector3(0,0,-55),'#147d78'],[new THREE.Vector3(0,55,0),'#8263ac']])scene.add(new THREE.ArrowHelper(v.clone().normalize(),origin,v.length(),color,8,3));
 const icon=new THREE.Mesh(new THREE.BoxGeometry(6,4,8),new THREE.MeshStandardMaterial({color:'#147d78'}));icon.position.copy(c);icon.lookAt(fort);scene.add(icon);
 const sight=new THREE.BufferGeometry().setFromPoints([c,fort]),ray=new THREE.Line(sight,new THREE.LineDashedMaterial({color:'#147d78',dashSize:8,gapSize:5}));ray.computeLineDistances();scene.add(ray);
 // Decorative tour route, not an estimated camera ray or measured flight path.
 const routeCurve=new THREE.QuadraticBezierCurve3(c,c.clone().lerp(fort,.5).add(new THREE.Vector3(0,130,0)),fort);
 const route=new THREE.Group();scene.add(route);
 const routeBase=new THREE.Mesh(new THREE.TubeGeometry(routeCurve,96,.65,6,false),new THREE.MeshBasicMaterial({color:'#147d78',transparent:true,opacity:.35}));route.add(routeBase);
 const routeDash=new THREE.Line(new THREE.BufferGeometry().setFromPoints(routeCurve.getPoints(160)),new THREE.LineDashedMaterial({color:'#147d78',dashSize:12,gapSize:8}));routeDash.computeLineDistances();route.add(routeDash);
 const traveller=new THREE.Mesh(new THREE.SphereGeometry(3.5,16,12),new THREE.MeshBasicMaterial({color:'#b63c82'}));route.add(traveller);
 const beacons=pins.map(pin=>{const ring=new THREE.Mesh(new THREE.RingGeometry(7,8.5,48),new THREE.MeshBasicMaterial({color:pin.id.startsWith('GeoOrigin')?'#b63c82':'#147d78',transparent:true,opacity:.7,side:THREE.DoubleSide,depthTest:false}));ring.rotation.x=-Math.PI/2;ring.position.copy(pin.p);ring.position.y+=.4;ring.renderOrder=101;scene.add(ring);return {pin,ring};});
 const steps=document.createElement('div');steps.className='tour-steps';steps.innerHTML='<span>01 Camera</span><i>→</i><span>02 Origin</span><i>→</i><span>03 Fort</span><i>→</i><span>04 Survey</span>';document.body.append(steps);
 const compass=document.createElement('div');compass.className='tour-compass';compass.innerHTML='<b>＋</b><span>EAST / NORTH / UP</span>';document.body.append(compass);
 // Keyframes are observer positions, never changes to the surveyed race camera.
 const keys=[
  {time:0,pos:c.clone().add(new THREE.Vector3(40,65,65)),look:c.clone()},
  {time:7,pos:c.clone().add(new THREE.Vector3(145,105,150)),look:c.clone()},
  {time:14,pos:new THREE.Vector3(120,170,190),look:origin.clone()},
  {time:21,pos:new THREE.Vector3(-230,260,360),look:new THREE.Vector3(-230,20,110)},
  {time:28,pos:fort.clone().add(new THREE.Vector3(75,90,110)),look:fort.clone().add(new THREE.Vector3(0,15,0))},
  {time:34,pos:fort.clone().add(new THREE.Vector3(-90,110,75)),look:fort.clone().add(new THREE.Vector3(0,10,0))},
  {time:42,pos:new THREE.Vector3(-450,210,400),look:new THREE.Vector3(-450,5,90)},
  {time:48,pos:new THREE.Vector3(-190,420,660),look:new THREE.Vector3(-350,0,70)}
 ];
 status.textContent='';
 function frame(now){const dt=(now-last)/1000;last=now;if(visible&&playing){t=(t+dt*speed())%48;}
  if(visible){let i=0;while(i<keys.length-2&&t>keys[i+1].time)i++;const a=keys[i],b=keys[i+1],s=smooth((t-a.time)/(b.time-a.time));camera.position.lerpVectors(a.pos,b.pos,s);camera.lookAt(new THREE.Vector3().lerpVectors(a.look,b.look,s));camera.updateMatrixWorld();
   const chapter=t<9?'Start at Camera 1':t<17?'The local coordinate origin':t<27?'Fly toward the fort':t<36?'BXR-7, in its surveyed location':'The other surveyed reference points';
   document.getElementById('chapter').textContent=chapter;document.getElementById('caption').textContent=t<9?'The rooftop camera stays fixed while our virtual drone moves.':t<17?'GeoOrigin defines East, North and Up in metres.':t<27?'Follow the same city sector visible from the race camera.':t<36?'BXR-7 coordinates come directly from the project KML.':'The points connect the photographed location to our coordinate system.';
   document.getElementById('fort-photo').style.display=!diagram&&t>=27&&t<36?'block':'none';
   route.visible=diagram&&t>=17;traveller.position.copy(routeCurve.getPoint((t/6)%1));
   for(const {pin,ring}of beacons){ring.visible=diagram&&(t>=36?pin.id.startsWith('BXR'):t<9?pin.id==='Camera 1':t<17?pin.id.startsWith('GeoOrigin'):pin.id==='BXR-7');const phase=(t/2.5+pins.indexOf(pin)*.13)%1;ring.scale.setScalar(1+phase*1.1);ring.material.opacity=.7*(1-phase);}
   steps.style.display=diagram?'flex':'none';compass.style.display=diagram?'flex':'none';steps.querySelectorAll('span').forEach((el,n)=>el.classList.toggle('active',n===(t<9?0:t<17?1:t<36?2:3)));
   leaders.replaceChildren();
   for(const pin of pins){const selected=t<9?pin.id==='Camera 1':t<17?pin.id.startsWith('GeoOrigin'):t<27?pin.id==='Camera 1'||pin.id==='BXR-7':t<36?pin.id==='BXR-7':pin.id.startsWith('BXR');const q=pin.p.clone().project(camera);pin.sphere.visible=selected;pin.label.style.display=selected&&q.z>-1&&q.z<1?'block':'none';if(pin.label.style.display==='none')continue;const x=(q.x*.5+.5)*innerWidth,y=(-q.y*.5+.5)*innerHeight;let lx=Math.max(90,Math.min(innerWidth-90,x)),ly=Math.max(140,Math.min(innerHeight-90,y-12));
    if(t>=36){const n=Number(pin.id.split('-')[1])-1;lx=innerWidth-(n%2===0?300:110);ly=146+Math.floor(n/2)*58;const line=document.createElementNS(leaders.namespaceURI,'line');line.setAttribute('x1',x);line.setAttribute('y1',y);line.setAttribute('x2',lx);line.setAttribute('y2',ly-20);line.setAttribute('stroke',diagram?'#147d78':'#faf8f4');line.setAttribute('stroke-opacity','.45');line.setAttribute('stroke-width','1');line.setAttribute('stroke-dasharray','4 4');leaders.append(line);}
    pin.label.style.left=`${lx}px`;pin.label.style.top=`${ly}px`;}
   renderer.render(scene,camera);document.getElementById('seek').value=t/speed();document.getElementById('time').textContent=`${Math.floor(t/speed())} / ${48/speed()} s`;
  }requestAnimationFrame(frame);
 }requestAnimationFrame(frame);
 window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
}catch(e){status.textContent=`Could not load the photo-based fly-through: ${e.message}.`;
}
