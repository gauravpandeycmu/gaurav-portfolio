/* Fixed-centre pinhole camera, rendered from an external observer and through its lens.
   All values and scene geometry are illustrative, not estimated project data. */
(()=>{
 const canvas=document.getElementById('angles-canvas'),c=canvas.getContext('2d');
 const play=document.getElementById('angles-play'),seek=document.getElementById('angles-seek');
 const ink='#192d32',teal='#147d78',purple='#8263ac',muted='#637276';
 let t=0,running=true,last=performance.now(),wasActive=false;
 const rad=d=>d*Math.PI/180,dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
 const names=['Yaw / pan','Pitch / tilt','Roll','Horizontal FOV'];
 const descriptions=['Turn left and right','Aim up and down','Rotate around the viewing direction','Change how wide the camera sees'];
 const notes=['The scene moves sideways in the image.','The scene moves vertically in the image.','The horizon rotates in the image.','Narrower field of view makes objects appear larger.'];
 function basis(p){const a=rad(p.yaw),b=rad(p.pitch),r=rad(p.roll),right=[Math.cos(a),-Math.sin(a),0],up=[-Math.sin(a)*Math.sin(b),-Math.cos(a)*Math.sin(b),Math.cos(b)];return{f:[Math.sin(a)*Math.cos(b),Math.cos(a)*Math.cos(b),Math.sin(b)],r:right.map((v,i)=>v*Math.cos(r)+up[i]*Math.sin(r)),u:up.map((v,i)=>v*Math.cos(r)-right[i]*Math.sin(r))};}
 const centre=[0,-110,28];
 const world=P=>[267+P[0]*1.6+P[1]*.58,240-P[1]*.45-P[2]*1.8];
 function line(a,b,color,width=1){c.beginPath();c.moveTo(...a);c.lineTo(...b);c.strokeStyle=color;c.lineWidth=width;c.stroke();}
 function text(s,x,y,size=19,color=ink){c.font=`${size}px Arial`;c.fillStyle=color;c.fillText(s,x,y);}
 function polygon(points,fill,stroke){c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.stroke();}}
 function point(p,color,r=5){c.beginPath();c.arc(...p,r,0,2*Math.PI);c.fillStyle=color;c.fill();}
 function draw(){
  const stage=Math.min(3,Math.floor(t/8)),u=Math.min(1,(t-stage*8)/8),motion=Math.sin(u*2*Math.PI);
  const p={yaw:stage===0?motion*20:0,pitch:stage===1?motion*11:-5,roll:stage===2?motion*19:0,fov:stage===3?54+motion*20:54};
  const b=basis(p),vals=[p.yaw,p.pitch,p.roll,p.fov];
  c.clearRect(0,0,1152,400);c.fillStyle='#faf8f4';c.fillRect(0,0,1152,400);
  names.forEach((name,i)=>{const x=i*290;c.fillStyle=i===stage?'#e3eeea':'#f0eeeb';c.beginPath();c.roundRect(x,0,278,55,8);c.fill();text(name,x+16,23,17,i===stage?teal:muted);text(`${vals[i].toFixed(1)}°`,x+16,46,19,i===stage?teal:muted);});
  text('THE CAMERA',0,89,14,teal);text('WHAT THE CAMERA SEES',680,89,14,teal);
  for(let y=-110;y<=150;y+=40)line(world([-95,y,0]),world([95,y,0]),'#dde3de');
  for(let x=-80;x<=80;x+=40)line(world([x,-110,0]),world([x,150,0]),'#dde3de');
  const landmarks=[[-50,110,8],[-18,130,30],[22,145,9],[55,160,40]];
  landmarks.forEach((P,i)=>{const base=world([P[0],P[1],0]),top=world(P);line(base,top,'#b0c0b5',18);point(top,purple);text(String(i+1),top[0]+9,top[1]-6,16,purple);});
  // A rotating 3D camera box and its actual frustum share the same orientation basis.
  const local=(x,y,z)=>centre.map((v,i)=>v+b.r[i]*x+b.f[i]*y+b.u[i]*z);
  const body=[[-11,-18,-8],[11,-18,-8],[11,10,-8],[-11,10,-8],[-11,-18,8],[11,-18,8],[11,10,8],[-11,10,8]].map(q=>world(local(...q)));
  polygon([body[0],body[1],body[5],body[4]],ink);polygon([body[1],body[2],body[6],body[5]],'#486366');polygon([body[4],body[5],body[6],body[7]],teal);
  const lens=[[-6,10,-6],[6,10,-6],[6,20,-6],[-6,20,-6],[-6,10,6],[6,10,6],[6,20,6],[-6,20,6]].map(q=>world(local(...q)));
  polygon([lens[4],lens[5],lens[6],lens[7]],purple);polygon([lens[1],lens[2],lens[6],lens[5]],'#685184');
  const origin=world(centre),base=world([centre[0],centre[1],0]);line(origin,base,ink,3);line(base,[base[0]-24,base[1]+17],ink,2);line(base,[base[0]+25,base[1]+17],ink,2);
  const dist=145,half=dist*Math.tan(rad(p.fov)/2),corners=[[-half,dist,-half*9/16],[half,dist,-half*9/16],[half,dist,half*9/16],[-half,dist,half*9/16]].map(q=>world(local(...q)));
  polygon(corners,'#8263ac12','#8263ac60');corners.forEach(q=>line(origin,q,'#8263ac60'));
  line(origin,world(local(0,dist,0)),teal,2);text('Fixed position',origin[0]-47,base[1]+43,16,muted);
  // Perspective image: points and a world-level horizon respond to all four variables.
  const project=P=>{const d=P.map((v,i)=>v-centre[i]),z=dot(d,b.f),f=460/(2*Math.tan(rad(p.fov)/2));return[910+f*dot(d,b.r)/z,220-f*dot(d,b.u)/z];};
  c.save();c.beginPath();c.rect(680,105,460,224);c.clip();c.fillStyle='#e3edf1';c.fillRect(680,105,460,224);
  const horizon=[project([-100000,1000000,centre[2]]),project([100000,1000000,centre[2]])];
  const slope=(horizon[1][1]-horizon[0][1])/(horizon[1][0]-horizon[0][0]);
  const hy=x=>horizon[0][1]+(x-horizon[0][0])*slope;
  polygon([[680,hy(680)],[1140,hy(1140)],[1140,329],[680,329]],'#dae6d6');line([680,hy(680)],[1140,hy(1140)],'#91a98b',2);
  landmarks.forEach((P,i)=>{const x=P[0],y=P[1],h=P[2],pts=[[x-8,y,0],[x+8,y,0],[x+8,y,h],[x-8,y,h]].map(project);polygon(pts,'#c0cec1','#9aafa0');const top=project(P);point(top,purple);text(String(i+1),top[0]+8,top[1]-8,15,purple);});
  c.restore();c.strokeStyle='#d1d9d6';c.strokeRect(680,105,460,224);
  text(descriptions[stage],0,353,24,teal);text(notes[stage],0,383,18,muted);
 }
 play.onclick=()=>{running=!running;play.textContent=running?'Pause animation':'Play animation';};
 document.getElementById('angles-replay').onclick=()=>{t=0;running=true;play.textContent='Pause animation';};
 seek.oninput=()=>{t=Number(seek.value);running=false;play.textContent='Play animation';draw();};
 function tick(now){const active=canvas.closest('.slide').classList.contains('active');if(active&&!wasActive){t=0;running=true;play.textContent='Pause animation';}if(active&&running){t=(t+(now-last)/1000)%32;}last=now;wasActive=active;if(active){draw();seek.value=t;document.getElementById('angles-time').textContent=`${Math.floor(t)} / 32 s`;}requestAnimationFrame(tick);}requestAnimationFrame(tick);
})();
