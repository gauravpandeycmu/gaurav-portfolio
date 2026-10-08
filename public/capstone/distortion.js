/* Toy radial lens, f=500 px, k=-0.2. World spacing requires a known plane. */
(()=>{
const canvas=document.getElementById('distortion-canvas'),c=canvas.getContext('2d'),play=document.getElementById('distortion-play');
const teal='#147d78',purple='#8263ac',ink='#192d32',muted='#637276';let stage=0,auto=true,elapsed=0,last=performance.now(),wasActive=false;
const ease=x=>(x=Math.max(0,Math.min(1,x)),x*x*(3-2*x));
const pairs=[[-.1,.1],[.55,.75]],k=-.2;
function inverse(d){let x=d;for(let i=0;i<20;i++)x-=(x+k*x*x*x-d)/(1+3*k*x*x);return x;}
const corrected=pairs.map(p=>p.map(inverse));
function text(s,x,y,size=18,color=ink){c.font=`${size}px Arial`;c.fillStyle=color;c.fillText(s,x,y);}
function line(a,b,color,width=1,dash=[]){c.beginPath();c.setLineDash(dash);c.moveTo(...a);c.lineTo(...b);c.strokeStyle=color;c.lineWidth=width;c.stroke();c.setLineDash([]);}
function point(p,color){c.beginPath();c.arc(...p,6,0,Math.PI*2);c.fillStyle=color;c.fill();}
function bracket(a,b,y,label){line([a,y],[b,y],teal,2);line([a,y-5],[a,y+5],teal,2);line([b,y-5],[b,y+5],teal,2);text(label,(a+b)/2-30,y-12,17,teal);}
function controls(){document.getElementById('distortion-step').textContent=`${stage+1} / 4 · 10 seconds per step`;play.textContent=auto?'Pause animation':'Play animation';}
function draw(){
c.clearRect(0,0,1152,400);c.fillStyle='#faf8f4';c.fillRect(0,0,1152,400);
text('NEAR THE IMAGE CENTRE',0,22,15,teal);text('NEAR THE IMAGE EDGE',610,22,15,teal);
for(let i=0;i<2;i++){const left=i*610,cx=left+245,p=pairs[i],x=corrected[i];
if(stage<2){c.fillStyle='#e3edf1';c.beginPath();c.roundRect(left,42,542,225,10);c.fill();
if(stage===1){for(let n=-.8;n<=.81;n+=.2){for(let vertical of [true,false]){c.beginPath();for(let v=-.8;v<=.81;v+=.02){const xx=vertical?n:v,yy=vertical?v:n,s=1+k*(xx*xx+yy*yy),q=[cx+xx*230*s,148+yy*117*s];v===-.8?c.moveTo(...q):c.lineTo(...q);}c.strokeStyle='#afc4ba';c.lineWidth=1;c.stroke();}}}
line([cx,56],[cx,254],'#b9cbc4',1,[3,4]);text('centre',cx-20,256,12,muted);
const q=p.map(v=>cx+v*230);q.forEach(v=>point([v,153],purple));bracket(q[0],q[1],113,'100 px');
if(stage===1){x.forEach((v,j)=>{const ideal=cx+v*230,u=ease(elapsed/2);line([q[j],153],[ideal,209],teal,1,[4,4]);point([q[j]+(ideal-q[j])*u,153+56*u],teal);});text('Distorted pixel → corrected ray coordinate',left+12,289,16,teal);}
}else{
const origin=[cx,268],end=x.map(v=>[cx+v*230,82]);line([left+10,82],[left+532,82],'#a5b9ae',2);line(origin,[cx,64],'#b4c4ba',1,[4,5]);
if(stage===3)text('Known plane · 100 m forward',left+12,57,15,muted);else text('Corrected viewing rays',left+12,57,16,teal);
c.beginPath();c.moveTo(...origin);end.forEach(q=>c.lineTo(...q));c.closePath();c.fillStyle='#147d7817';c.fill();end.forEach(q=>{const u=stage===2?ease(elapsed/2):1;line(origin,[origin[0]+(q[0]-origin[0])*u,origin[1]+(q[1]-origin[1])*u],teal,2);point(q,purple);});c.fillStyle=ink;c.fillRect(origin[0]-15,origin[1]-4,30,20);line([origin[0],origin[1]+16],[origin[0],origin[1]+30],ink,2);
const degrees=(Math.atan(x[1])-Math.atan(x[0]))*180/Math.PI;
text(`Ray angle gap ${degrees.toFixed(1)}°`,left+12,309,24,teal);
if(stage===3)bracket(end[0][0],end[1][0],113,`${((x[1]-x[0])*100).toFixed(1)} m`);
}}
const titles=['1 / BOTH IMAGE GAPS ARE 100 PIXELS','2 / THE LENS MAP IS NONLINEAR','3 / CORRECT THE PIXELS INTO VIEWING RAYS','4 / WORLD DISTANCE NEEDS KNOWN GEOMETRY'];
const notes=['Equal pixel spacing does not guarantee equal angles or equal world spacing.','The same pixel gap changes meaning across the image. This example uses a toy radial lens.','Image location and lens distortion both affect the angle between rays.','On this illustrative plane 100 m away, the equal pixel gaps cover different distances.'];
text(titles[stage],0,351,22,teal);text(notes[stage],0,382,17,muted);
controls();}
document.getElementById('distortion-replay').onclick=()=>{stage=0;elapsed=0;auto=true;draw();};play.onclick=()=>{auto=!auto;controls();};
function tick(now){const active=canvas.closest('.slide').classList.contains('active');if(active&&!wasActive){stage=0;auto=true;elapsed=0;}if(active&&auto){elapsed+=(now-last)/1000;if(elapsed>=10){stage=(stage+1)%4;elapsed%=10;}}last=now;wasActive=active;if(active)draw();requestAnimationFrame(tick);}requestAnimationFrame(tick);
})();
