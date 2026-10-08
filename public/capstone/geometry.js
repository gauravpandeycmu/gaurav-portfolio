/* Teaching animation. Synthetic geometry and a real perspective projection.
   It is deliberately separate from project estimates and calibration evidence. */
(() => {
  const canvas=document.getElementById('geometry-canvas'),ctx=canvas.getContext('2d');
  const W=1152,H=400, ink='#192d32',teal='#147d78',purple='#8263ac',pink='#b63c82';
  const C=[0,-110,35];
  const landmarks=[[-45,120,4],[-21,137,25],[8,145,5],[37,153,32],[61,170,8]];
  const target={pan:4,tilt:-6.5,fov:48,roll:0};
  let t=0,playing=true,last=performance.now();
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const ease=x=>(x=clamp(x),x*x*(3-2*x));
  const mix=(a,b,s)=>a+(b-a)*s;
  const rad=x=>x*Math.PI/180;
  const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
  function basis(p){const a=rad(p.pan),b=rad(p.tilt);return{forward:[Math.sin(a)*Math.cos(b),Math.cos(a)*Math.cos(b),Math.sin(b)],right:[Math.cos(a),-Math.sin(a),0],up:[-Math.sin(a)*Math.sin(b),-Math.cos(a)*Math.sin(b),Math.cos(b)]};}
  function project(P,p){const b=basis(p),d=P.map((v,i)=>v-C[i]),z=dot(d,b.forward),f=440/(2*Math.tan(rad(p.fov)/2));return[908+f*dot(d,b.right)/z,206-f*dot(d,b.up)/z];}
  function world(P){ // Oblique observer orbits gently. Camera itself never translates.
    const a=rad(-20+7*Math.sin(t/9)),x=P[0]*Math.cos(a)-P[1]*Math.sin(a),y=P[0]*Math.sin(a)+P[1]*Math.cos(a);
    return[286+x*1.35,265-y*.45-P[2]*1.6];
  }
  function line(a,b,color,width=1,dash=[]){ctx.beginPath();ctx.setLineDash(dash);ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();ctx.setLineDash([]);}
  function text(s,x,y,size=18,color=ink){ctx.font=`${size}px Arial`;ctx.fillStyle=color;ctx.fillText(s,x,y);}
  function point(p,color,r=5){ctx.fillStyle=color;ctx.beginPath();ctx.arc(...p,r,0,Math.PI*2);ctx.fill();}
  function cross(p,color){line([p[0]-6,p[1]-6],[p[0]+6,p[1]+6],color,2);line([p[0]-6,p[1]+6],[p[0]+6,p[1]-6],color,2);}
  function poly(points,color,stroke){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}}
  function building(x,y,w,d,h){const p=[[x,y,0],[x+w,y,0],[x+w,y+d,0],[x,y+d,0]],q=p.map(v=>[v[0],v[1],h]);poly([p[0],p[1],q[1],q[0]].map(world),'#d3d9d3');poly([p[1],p[2],q[2],q[1]].map(world),'#bfcac1');poly(q.map(world),'#e3d8c9','#bac3bd');}
  function pose(){
    if(t<8)return{pan:mix(-20,target.pan,ease(t/7)),tilt:-6.5,fov:65};
    if(t<16)return{pan:target.pan,tilt:mix(7,target.tilt,ease((t-8)/7)),fov:65};
    if(t<24)return{...target,fov:mix(75,target.fov,ease((t-16)/7))};
    const s=ease((t-24)/11);return{pan:mix(-10,target.pan,s),tilt:mix(2,target.tilt,s),fov:mix(70,target.fov,s)};
  }
  function draw(){
    const p=pose(),phase=Math.min(4,Math.floor(t/8));ctx.clearRect(0,0,W,H);ctx.fillStyle='#faf8f4';ctx.fillRect(0,0,W,H);
    text('WORLD / KNOWN 3D COORDINATES',0,23,14,teal);text('IMAGE / PROJECTED LANDMARKS',680,23,14,teal);
    for(let y=-110;y<=210;y+=40)line(world([-110,y,0]),world([110,y,0]),'#dce3de');
    for(let x=-100;x<=100;x+=40)line(world([x,-110,0]),world([x,210,0]),'#dce3de');
    poly([[-110,75,0],[110,75,0],[110,215,0],[-110,215,0]].map(world),'#e3eeea');
    building(-52,118,27,21,25);building(-10,140,29,24,18);building(28,147,30,26,32);building(57,175,20,15,22);
    const b=basis(p),origin=world(C),distance=230;
    const edge=[];for(const sign of [-1,1])edge.push(C.map((v,i)=>v+b.forward[i]*distance+b.right[i]*sign*distance*Math.tan(rad(p.fov)/2)));
    poly([origin,...edge.map(world)],'#8263ac15');edge.forEach(P=>line(origin,world(P),'#8263ac70',1));
    line(origin,world(C.map((v,i)=>v+b.forward[i]*distance)),teal,2);
    point(origin,teal,9);text('Surveyed camera',origin[0]-75,origin[1]+30,17,teal);text('Position stays fixed',origin[0]-75,origin[1]+51,14,'#637276');
    landmarks.forEach((P,i)=>{const q=world(P);point(q,purple);text(String(i+1),q[0]+8,q[1]-7,16,purple);if(t>24)line(origin,q,'#8263ac45',1,[4,5]);});
    ctx.save();ctx.beginPath();ctx.rect(680,51,460,274);ctx.clip();
    ctx.fillStyle='#e3edf1';ctx.fillRect(680,51,460,274);ctx.fillStyle='#dde7da';ctx.fillRect(680,218,460,107);
    // Wireframes use the same perspective projection as the points.
    for(const [x,y,w,d,h] of [[-52,118,27,21,25],[-10,140,29,24,18],[28,147,30,26,32],[57,175,20,15,22]]){
      const pts=[[x,y,0],[x+w,y,0],[x+w,y+d,0],[x,y+d,0],[x,y,h],[x+w,y,h],[x+w,y+d,h],[x,y+d,h]];
      for(const [a,z] of [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])line(project(pts[a],p),project(pts[z],p),'#9daea5',1.5);
    }
    let error=0;landmarks.forEach((P,i)=>{const q=project(P,p),truth=project(P,target);point(q,purple,5);text(String(i+1),q[0]+8,q[1]-7,14,purple);if(t>=24){cross(truth,teal);line(q,truth,pink,1.5);error+=Math.hypot(q[0]-truth[0],q[1]-truth[1]);}});
    ctx.restore();
    ctx.strokeStyle='#d1d9d6';ctx.strokeRect(680,51,460,274);
    text(`Pan ${p.pan.toFixed(1)}°`,684,349,20,teal);text(`Tilt ${p.tilt.toFixed(1)}°`,826,349,20,teal);text(`HFOV ${p.fov.toFixed(1)}°`,963,349,20,teal);
    const titles=['PAN / turn left and right','TILT / aim up and down','ZOOM / change the field of view','SOLVE / match observed pixels','CHECK / do the points agree?'];
    const explanations=['Known points slide across the image as the camera turns.','The same 3D features move vertically when the camera tilts.','The points spread apart as the field of view narrows.','Green crosses are observed pixels. Purple dots come from a candidate camera.','Adjust angles and FOV until the reprojection errors shrink.'];
    text(titles[phase],0,351,20,teal);text(explanations[phase],0,379,16,'#637276');
    if(t>=24)text(`Mean mismatch: ${(error/landmarks.length).toFixed(1)} illustration px`,682,379,16,t>=35?teal:pink);
  }
  const play=document.getElementById('geometry-play'),seek=document.getElementById('geometry-seek');
  play.onclick=()=>{playing=!playing;play.textContent=playing?'Pause animation':'Play animation';};
  document.getElementById('geometry-replay').onclick=()=>{t=0;playing=true;play.textContent='Pause animation';};
  seek.oninput=()=>{t=Number(seek.value);playing=false;play.textContent='Play animation';draw();};
  let wasActive=false;
  document.getElementById('geometry-export').onclick=()=>{
    const button=document.getElementById('geometry-export');
    if(!window.MediaRecorder||!canvas.captureStream){button.textContent='Export unavailable';return;}
    const output=document.createElement('canvas');output.width=1280;output.height=720;
    const c=output.getContext('2d'),chunks=[];
    const mime=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(m=>MediaRecorder.isTypeSupported(m));
    if(!mime){button.textContent='Export unavailable';return;}
    const recorder=new MediaRecorder(output.captureStream(30),{mimeType:mime,videoBitsPerSecond:4500000});
    button.disabled=true;play.disabled=true;seek.disabled=true;document.getElementById('geometry-replay').disabled=true;
    recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    recorder.onstop=()=>{const blob=new Blob(chunks,{type:mime}),a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download='camera-geometry-explanation.webm';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);button.disabled=false;play.disabled=false;seek.disabled=false;document.getElementById('geometry-replay').disabled=false;button.textContent='Export video';};
    t=0;playing=true;draw();recorder.start();
    function compose(){c.fillStyle='#faf8f4';c.fillRect(0,0,1280,720);c.fillStyle=ink;c.font='44px Arial';c.fillText('How 3D points reveal camera angles',64,130);c.drawImage(canvas,64,198);c.font='17px Arial';c.fillStyle='#637276';c.fillText('Illustrative geometry. Camera position is fixed. Image correspondences constrain orientation and field of view.',64,655);button.textContent=`Recording ${Math.floor(t)} / 40 s`;if(t<40)requestAnimationFrame(compose);else recorder.stop();}
    compose();
  };
  function tick(now){const active=canvas.closest('.slide').classList.contains('active');if(active&&!wasActive){t=0;playing=true;play.textContent='Pause animation';}if(active&&playing){t=Math.min(40,t+(now-last)/1000);if(t===40){if(document.getElementById('geometry-export').disabled){playing=false;}else{t=0;}}}last=now;wasActive=active;if(active){draw();seek.value=t;document.getElementById('geometry-time').textContent=`${Math.floor(t)} / 40 s`;}requestAnimationFrame(tick);}
  requestAnimationFrame(tick);

})();
