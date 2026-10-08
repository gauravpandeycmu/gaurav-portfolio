/* Synthetic teaching scene, not measured tracking data. */
(()=>{
const canvas=document.getElementById('hardware-canvas'),c=canvas.getContext('2d'),play=document.getElementById('hardware-play'),seek=document.getElementById('hardware-seek');
const ink='#192d32',teal='#147d78',purple='#8263ac',pink='#b63c82',muted='#637276';let t=0,running=true,last=performance.now(),wasActive=false;
const rad=x=>x*Math.PI/180,dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),ease=x=>(x=Math.max(0,Math.min(1,x)),x*x*(3-2*x));
const centre=[0,-100,28],landmarks=[[-45,110,12],[-15,130,35],[25,145,16],[55,160,43]],world=P=>[200+P[0]*1.3+P[1]*.42,230-P[1]*.4-P[2]*1.5];
function text(s,x,y,size=18,color=ink){c.font=`${size}px Arial`;c.fillStyle=color;c.fillText(s,x,y);}
function line(a,b,color,width=1,dash=[]){c.beginPath();c.setLineDash(dash);c.moveTo(...a);c.lineTo(...b);c.strokeStyle=color;c.lineWidth=width;c.stroke();c.setLineDash([]);}
function box(x,y,w,h,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,9);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.stroke();}}
function poly(ps,fill,stroke){c.beginPath();ps.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.stroke();}}
function point(p,color,r=4){c.beginPath();c.arc(...p,r,0,Math.PI*2);c.fillStyle=color;c.fill();}
function flow(a,b,color){line(a,b,color,2,[5,5]);const u=(t*.6)%1;point([a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u],color,4);}
function draw(){
const phase=t<6?0:t<14?1:t<18?2:3,hardware=1-ease((t-14)/3),software=ease((t-18)/3),m=ease((t-3)/3);
const p={yaw:12*Math.sin(t*.6)*m,pitch:-5+6*Math.sin(t*.43)*m,roll:7*Math.sin(t*.51)*m,fov:54+12*Math.sin(t*.36)*m};
const a=rad(p.yaw),b=rad(p.pitch),r=rad(p.roll),right=[Math.cos(a),-Math.sin(a),0],up=[-Math.sin(a)*Math.sin(b),-Math.cos(a)*Math.sin(b),Math.cos(b)];
const basis={f:[Math.sin(a)*Math.cos(b),Math.cos(a)*Math.cos(b),Math.sin(b)],r:right.map((v,i)=>v*Math.cos(r)+up[i]*Math.sin(r)),u:up.map((v,i)=>v*Math.cos(r)-right[i]*Math.sin(r))};
const local=(x,y,z)=>centre.map((v,i)=>v+basis.r[i]*x+basis.f[i]*y+basis.u[i]*z);
const project=P=>{const d=P.map((v,i)=>v-centre[i]),z=dot(d,basis.f),f=340/(2*Math.tan(rad(p.fov)/2));return[635+f*dot(d,basis.r)/z,177-f*dot(d,basis.u)/z];};
c.clearRect(0,0,1152,400);c.fillStyle='#faf8f4';c.fillRect(0,0,1152,400);
text(['1 / CALIBRATE THE SETUP','2 / HARDWARE REPORTS THE CAMERA STATE','3 / REMOVE THE TRACKING SENSORS','4 / RECOVER THE SAME VALUES FROM VIDEO'][phase],0,25,22,phase===2?pink:teal);
text('CAMERA + KNOWN VENUE',0,63,13,muted);text('THE BROADCAST IMAGE',465,63,13,muted);text(phase===3?'SOFTWARE TARGET':'CAMERA STATE',858,63,13,muted);
for(let y=-100;y<=160;y+=40)line(world([-80,y,0]),world([80,y,0]),'#dce3dd');for(let x=-80;x<=80;x+=40)line(world([x,-100,0]),world([x,160,0]),'#dce3dd');
landmarks.forEach((P,i)=>{line(world([P[0],P[1],0]),world(P),'#b3c5b9',14);point(world(P),purple);text(`${i+1}`,world(P)[0]+8,world(P)[1]-6,13,purple);});
const origin=world(centre),base=world([0,-100,0]);line(origin,base,ink,3);line(base,[base[0]-22,base[1]+14],ink,2);line(base,[base[0]+22,base[1]+14],ink,2);
const body=[[-11,-18,-8],[11,-18,-8],[11,10,-8],[-11,10,-8],[-11,-18,8],[11,-18,8],[11,10,8],[-11,10,8]].map(q=>world(local(...q)));
poly([body[0],body[1],body[5],body[4]],ink);poly([body[1],body[2],body[6],body[5]],'#486366');poly([body[4],body[5],body[6],body[7]],teal);poly([[-6,10,6],[6,10,6],[6,22,6],[-6,22,6]].map(q=>world(local(...q))),purple);
const dist=140,half=dist*Math.tan(rad(p.fov)/2),corners=[[-half,dist,-half*.5625],[half,dist,-half*.5625],[half,dist,half*.5625],[-half,dist,half*.5625]].map(q=>world(local(...q)));
poly(corners,'#147d7810','#147d7850');corners.forEach(q=>line(origin,q,'#147d7850'));line(origin,world(local(0,dist,0)),teal,2);
if(phase===0)landmarks.forEach(P=>line(origin,world(P),purple,1,[4,5]));
c.globalAlpha=hardware;c.beginPath();c.ellipse(...origin,31,12,0,0,Math.PI*2);c.strokeStyle=purple;c.lineWidth=3;c.stroke();for(let i=0;i<12;i++){const q=i*Math.PI/6;point([origin[0]+31*Math.cos(q),origin[1]+12*Math.sin(q)],purple,2);}line([origin[0],origin[1]+16],[185,280],purple,2,[3,4]);c.globalAlpha=1;
c.save();c.beginPath();c.rect(465,80,340,185);c.clip();c.fillStyle='#e3edf1';c.fillRect(465,80,340,185);
const hz=[project([-1e5,1e6,28]),project([1e5,1e6,28])],slope=(hz[1][1]-hz[0][1])/(hz[1][0]-hz[0][0]),hy=x=>hz[0][1]+(x-hz[0][0])*slope;
poly([[465,hy(465)],[805,hy(805)],[805,265],[465,265]],'#dce7d8');line([465,hy(465)],[805,hy(805)],'#99ae96',2);
landmarks.forEach((P,i)=>{poly([[P[0]-8,P[1],0],[P[0]+8,P[1],0],[P[0]+8,P[1],P[2]],[P[0]-8,P[1],P[2]]].map(project),'#bdcdbf','#99ae9f');if(phase===0||phase===3){const q=project(P);point(q,teal,5);line([q[0]-9,q[1]],[q[0]+9,q[1]],teal);line([q[0],q[1]-9],[q[0],q[1]+9],teal);text(`${i+1}`,q[0]+10,q[1]-8,13,teal);}});c.restore();c.strokeStyle='#cbd7ce';c.strokeRect(465,80,340,185);
const missing=phase===2;box(858,80,294,185,missing?'#f1edec':'#ffffff','#d1d9d6');['Yaw / pan','Pitch / tilt','Roll','HFOV / zoom'].forEach((name,i)=>{text(name,875,113+i*42,17,muted);text(missing?'—':`${[p.yaw,p.pitch,p.roll,p.fov][i].toFixed(1)}°`,1050,113+i*42,23,missing?pink:teal);});
text(missing?'NO DIRECT READINGS':phase===3?'Illustrative estimates, not live results':'Calibrated sensor output',858,293,14,missing?pink:muted);
c.globalAlpha=hardware;box(0,280,407,61,'#eee7f5','#b6a4ce');box(14,292,32,32,purple);text('↻',20,316,25,'white');text(phase===0?'World + lens calibration':'Head sensors + lens interface',60,305,19,purple);text('Pan · tilt · roll reference · zoom',60,326,14,muted);c.globalAlpha=1;
if(phase===2&&hardware<.15){text('Tracking hardware removed',0,308,21,pink);line([0,322],[294,322],pink,2);}
if(phase<2){flow([410,311],[835,311],purple);line([835,311],[835,170],purple,2,[5,5]);line([835,170],[850,170],purple,2);text('calibrated readings',562,333,14,purple);}
if(software>0){c.globalAlpha=software;box(0,280,407,61,'#e3eeea','#a8c9bc');text('Known 3D points + tracked pixels',16,305,19,teal);text('Solve pose / FOV · check confidence',16,326,14,muted);flow([465,245],[430,311],teal);flow([410,311],[835,311],teal);line([835,311],[835,170],teal,2,[5,5]);line([835,170],[850,170],teal,2);text('software replaces the readings',524,333,14,teal);c.globalAlpha=1;}
text(['Known venue points align the camera to the world; lens calibration maps zoom to field of view.','The camera moves. Calibrated sensors report yaw, pitch, roll and zoom together.','The camera still broadcasts, but the direct tracking readings are gone.','Known 3D points + tracked image pixels → estimate orientation and field of view.'][phase],0,380,17,muted);
}
play.onclick=()=>{running=!running;play.textContent=running?'Pause animation':'Play animation';};document.getElementById('hardware-replay').onclick=()=>{t=0;running=true;play.textContent='Pause animation';};seek.oninput=()=>{t=Number(seek.value);running=false;play.textContent='Play animation';draw();};
function tick(now){const active=canvas.closest('.slide').classList.contains('active');if(active&&!wasActive){t=0;running=true;play.textContent='Pause animation';}if(active&&running){t=(t+(now-last)/1000)%28;}last=now;wasActive=active;if(active){draw();seek.value=t;document.getElementById('hardware-time').textContent=`${Math.floor(t)} / 28 s`;}requestAnimationFrame(tick);}requestAnimationFrame(tick);
})();
