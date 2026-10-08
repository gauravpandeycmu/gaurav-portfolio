/* Measured SIFT/RANSAC pair with explanatory animation, not a live tracker. */
(()=>{
const canvas=document.getElementById('matches-canvas'),c=canvas.getContext('2d'),play=document.getElementById('matches-play'),seek=document.getElementById('matches-seek');
let data,images,t=0,running=true,last=performance.now(),wasActive=false,error='';
const teal='#147d78',purple='#8263ac',muted='#637276',ink='#192d32',scale=500/490;
const pos=(p,i)=>[i*652+p[0]*scale,45+p[1]*scale];
function text(s,x,y,n=18,color=ink){c.font=`${n}px Arial`;c.fillStyle=color;c.fillText(s,x,y);}
function line(a,b,color,width=1,dash=[]){c.beginPath();c.setLineDash(dash);c.moveTo(...a);c.lineTo(...b);c.strokeStyle=color;c.lineWidth=width;c.stroke();c.setLineDash([]);}
function ring(p,color,r=5){c.beginPath();c.arc(...p,r,0,Math.PI*2);c.strokeStyle=color;c.lineWidth=1.5;c.stroke();}
function image(src){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(Error('Image unavailable'));im.src=src;});}
Promise.all([fetch('media/match-animation.json').then(r=>{if(!r.ok)throw Error('Match evidence missing');return r.json();}),image('media/match-frame-0.jpg'),image('media/match-frame-1.jpg')]).then(([d,a,b])=>{data=d;images=[a,b];}).catch(e=>error=e.message);
function draw(){
c.clearRect(0,0,1152,400);c.fillStyle='#faf8f4';c.fillRect(0,0,1152,400);
if(!data){text(error||'Loading measured feature matches…',30,180,22);return;}
const phase=Math.min(3,Math.floor(t/6)),u=(t%6)/6;
text('REFERENCE / 190 s',0,24,15,teal);text('LATER FRAME / 195 s',652,24,15,teal);
images.forEach((im,i)=>{c.save();c.beginPath();c.roundRect(i*652,45,500,225,10);c.clip();c.drawImage(im,i*652,45,500,225);c.restore();});
if(phase===0){images.forEach((im,i)=>{const x=i*652+u*500;c.fillStyle='#147d7820';c.fillRect(i*652,45,u*500,225);line([x,45],[x,270],teal,2);data.features[i].filter(p=>p[0]>=0&&p[0]<490&&p[1]>=0&&p[1]<220&&p[0]/490<=u).forEach(p=>ring(pos(p,i),'#f4ede3',3));});text('SCAN FOR TEXTURE',517,147,12,teal);}
if(phase===1||phase===2){const count=phase===2?data.matches.length:Math.ceil(u*data.matches.length);data.matches.slice(0,count).forEach((m,i)=>{const a=pos(m.a,0),b=pos(m.b,1),color=phase===2?'#147d7875':'#8263ac60';line(a,b,color,1,[3,4]);ring(a,phase===2?teal:purple);ring(b,phase===2?teal:purple);const v=(t*.45+i*.13)%1;c.beginPath();c.arc(a[0]+(b[0]-a[0])*v,a[1]+(b[1]-a[1])*v,2,0,Math.PI*2);c.fillStyle=phase===2?teal:purple;c.fill();});
const m=data.matches[Math.min(data.matches.length-1,Math.floor(u*data.matches.length))];if(m){images.forEach((im,i)=>{const p=i?m.b:m.a,y=65+i*111;c.save();c.beginPath();c.roundRect(525,y,102,82,8);c.clip();c.drawImage(im,Math.max(0,Math.min(im.width-24,p[0]-12)),Math.max(0,Math.min(im.height-24,p[1]-12)),24,24,525,y,102,82);c.restore();c.strokeStyle=teal;c.strokeRect(525,y,102,82);ring(pos(p,i),'#fff4cf',10);});text('SAME PATCH',526,165,11,teal);}}
if(phase===3){data.landmarks.forEach((p,i)=>{const a=pos(p.a,0),b=pos(p.b,1);line(a,b,'#147d7870',1,[5,5]);[a,b].forEach((q,j)=>{ring(q,'#f4ede3',7);line([q[0]-11,q[1]],[q[0]+11,q[1]],teal,2);line([q[0],q[1]-11],[q[0],q[1]+11],teal,2);text(p.id,Math.min(j*652+432,q[0]+12),q[1]+(i%2?21:-14),13,'#fff4da');});});text('H',557,133,32,teal);text('land transform',519,163,13,teal);line([514,180],[638,180],teal,2,[5,5]);}
const titles=['1 / FIND DISTINCTIVE WALL TEXTURE','2 / MATCH THE SAME PATCHES','3 / CHECK ONE CONSISTENT LAND TRANSFORM','4 / MOVE THE LABELLED POINTS'];
const notes=['SIFT describes local texture inside the reference land mask.','Actual image patches are enlarged here; the lines are measured correspondences.',`${data.inlier_count} / ${data.candidate_count} matches pass RANSAC in this pair. ${data.displayed_inliers} are visible in these crops. No invented rejections.`,'Apply the fitted homography to BXR pixels. These are predictions, not new verified clicks.'];
text(titles[phase],0,318,23,teal);text(notes[phase],0,350,17,muted);
text('SIFT',0,388,13,phase===0?teal:muted);text('→',90,388,15,muted);text('PATCH MATCHING',125,388,13,phase===1?teal:muted);text('→',290,388,15,muted);text('RANSAC',325,388,13,phase===2?teal:muted);text('→',425,388,15,muted);text('BXR TRANSFER',460,388,13,phase===3?teal:muted);
}
play.onclick=()=>{running=!running;play.textContent=running?'Pause animation':'Play animation';};document.getElementById('matches-replay').onclick=()=>{t=0;running=true;play.textContent='Pause animation';};seek.oninput=()=>{t=Number(seek.value);running=false;play.textContent='Play animation';draw();};
function tick(now){const active=canvas.closest('.slide').classList.contains('active');if(active&&!wasActive){t=0;running=true;play.textContent='Pause animation';}if(active&&running&&data){t=(t+(now-last)/1000)%24;}last=now;wasActive=active;if(active){draw();seek.value=t;document.getElementById('matches-time').textContent=`${Math.floor(t)} / 24 s`;}requestAnimationFrame(tick);}requestAnimationFrame(tick);
})();
