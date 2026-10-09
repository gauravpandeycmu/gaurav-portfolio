// Keep the input section ordered: divider, KML, survey tour, digital twin.
const kmlSlide=document.querySelector('.slide[data-title="KML survey"]');
document.querySelector('#deck').insertBefore(kmlSlide,document.querySelector('.slide[data-title="Survey fly-through"]'));
const slides=[...document.querySelectorAll('.slide')];
document.querySelectorAll('video').forEach(v=>{v.loop=true;});
const pipeline=document.getElementById('pipeline');
const stageNodes=[...document.querySelectorAll('.flow-node')];
let active=0;
let telemetry=null;
let hasShown=false,transitionSerial=0;
const navigationAnimations=new Set();
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function scale(){
 const viewport=document.getElementById('viewport');
 const zoom=Math.min(viewport.clientWidth/1280,viewport.clientHeight/720);
 document.getElementById('deck').style.transform=`scale(${zoom})`;
 document.getElementById('slide-notes').style.width=`${Math.min(1280*zoom,innerWidth-32)}px`;
}
window.addEventListener('resize',scale);scale();
function show(i){
  i=Math.max(0,Math.min(slides.length-1,i));
  if(hasShown&&i===active)return;
  const previous=slides[active];
  const incoming=slides[i],direction=i>=active?1:-1,animate=hasShown&&!reducedMotion.matches;
  // Capture interrupted motion before cancelling; rapid navigation must not snap.
  const oldStyle=getComputedStyle(previous),oldPose={opacity:oldStyle.opacity,transform:oldStyle.transform};
  const token=++transitionSerial;
  navigationAnimations.forEach(a=>a.cancel());navigationAnimations.clear();
  slides.forEach(s=>s.classList.remove('transition-out','leaving'));
  previous.querySelectorAll('video').forEach(v=>v.pause());
  previous.querySelectorAll('[data-tour]').forEach(f=>f.contentWindow?.postMessage({type:'tour-visible',visible:false},location.origin));
  previous.classList.remove('active');
  active=i;incoming.classList.add('active');hasShown=true;
  if(animate){
    const easing='cubic-bezier(0.22, 1, 0.36, 1)';
    previous.classList.add('transition-out');
    const out=previous.animate([oldPose,{opacity:0,transform:`translate3d(${-direction*26}px,0,0) scale(.994)`}],{duration:420,easing,fill:'both'});
    const enter=incoming.animate([{opacity:0,transform:`translate3d(${direction*40}px,0,0) scale(.992)`},{opacity:1,transform:'translate3d(0,0,0) scale(1)'}],{duration:720,easing,fill:'both'});
    for(const a of [out,enter])navigationAnimations.add(a);
    out.finished.then(()=>{if(token===transitionSerial){previous.classList.remove('transition-out');out.cancel();navigationAnimations.delete(out);}}).catch(()=>{});
    enter.finished.then(()=>{if(token===transitionSerial){enter.cancel();navigationAnimations.delete(enter);}}).catch(()=>{});
    incoming.querySelectorAll(':scope > .eyebrow, :scope > h1, :scope > h2, :scope > .lead, :scope > .subtitle, :scope > .stage-copy').forEach((el,n)=>{
      const a=el.animate([{opacity:0,transform:'translate3d(0,10px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:600,delay:Math.min(n*35,105),easing,fill:'both'});navigationAnimations.add(a);a.finished.then(()=>{a.cancel();navigationAnimations.delete(a);}).catch(()=>{});
    });
  }
  const flow=slides[i].dataset.flow;
  pipeline.classList.toggle('visible',Boolean(flow));pipeline.classList.toggle('compact',Boolean(flow)&&flow!=='overview');
  stageNodes.forEach(n=>{n.classList.toggle('selected',flow===n.dataset.stage);n.classList.toggle('dim',Boolean(flow)&&flow!=='overview'&&flow!==n.dataset.stage);});
  document.getElementById('page-count').textContent=`${String(i+1).padStart(2,'0')} / ${slides.length}`;
  document.getElementById('progress-fill').style.width=`${(i+1)/slides.length*100}%`;
  document.getElementById('previous').disabled=i===0;document.getElementById('next').disabled=i===slides.length-1;
  history.replaceState(null,'',`#${i+1}`);
  window.renderSlideNotes(incoming.dataset.title);
  slides[i].querySelectorAll('video').forEach(v=>{
    if(!v.getAttribute('src'))v.src=`media/${v.dataset.media}.mp4`;
    v.currentTime=0;v.play().catch(()=>{});
  });
  slides[i].querySelectorAll('[data-tour]').forEach(f=>{
    if(!f.getAttribute('src')){f.onload=()=>f.contentWindow.postMessage({type:'tour-visible',visible:f.closest('.slide').classList.contains('active')},location.origin);f.src='flythrough.html';}
    else f.contentWindow.postMessage({type:'tour-visible',visible:true},location.origin);
  });
}
document.getElementById('previous').onclick=()=>show(active-1);
document.getElementById('next').onclick=()=>show(active+1);
stageNodes.forEach(n=>n.onclick=()=>show(slides.findIndex(s=>s.dataset.flow===n.dataset.stage)));
async function fullscreen(){
 if(document.body.classList.contains('presenting')||document.fullscreenElement){
   document.body.classList.remove('presenting');
   if(document.fullscreenElement)try{await document.exitFullscreen();}catch{}
   scale();
   return;
 }
 document.body.classList.add('presenting');
 scale();
 try{if(document.fullscreenEnabled)await document.documentElement.requestFullscreen();}catch{}
}
document.addEventListener('fullscreenchange',()=>{
 document.body.classList.toggle('presenting',Boolean(document.fullscreenElement));
 scale();
});
document.getElementById('fullscreen').onclick=fullscreen;
document.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]'))return;
  if(['INPUT','VIDEO','IFRAME'].includes(document.activeElement.tagName))return;
  if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(active+1);}
  if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(active-1);}
  if(e.key==='Home')show(0);if(e.key==='End')show(slides.length-1);
  if(e.key.toLowerCase()==='f')fullscreen();
  if(e.key==='Escape'){document.body.classList.remove('presenting');scale();}
});
const comparison=document.getElementById('comparison');
function updateTelemetry(){
 if(!telemetry)return;
 const i=Math.min(telemetry.frames.length-1,Math.max(0,Math.floor(comparison.currentTime*25)));
 const r=telemetry.frames[i];
 for(const [id,key] of [['yaw','pan_deg'],['pitch','tilt_deg'],['roll','roll_deg'],['fov','horizontal_fov_deg']])document.getElementById(id).textContent=r.available&&Number.isFinite(r[key])?r[key].toFixed(1)+'°':'Unavailable';
 document.getElementById('source-time').textContent=r.nominal_s.toFixed(1)+' s';
}
comparison.addEventListener('timeupdate',updateTelemetry);comparison.addEventListener('seeked',updateTelemetry);
fetch('media/telemetry.json').then(r=>r.json()).then(j=>{telemetry=j;updateTelemetry();}).catch(()=>{});
const modal=document.getElementById('site-modal');
document.getElementById('show-site')?.addEventListener('click',()=>{comparison.pause();const f=document.getElementById('site-frame');if(!f.src)f.src='review/index.html';modal.showModal();});
document.getElementById('close-site').onclick=()=>modal.close();
modal.addEventListener('close',()=>{const f=document.getElementById('site-frame');try{f.contentDocument.querySelectorAll('video').forEach(v=>v.pause());}catch{}});
const contents=document.getElementById('contents-modal');
document.getElementById('contents').onclick=()=>{
 const list=document.getElementById('contents-list');list.replaceChildren();
 slides.forEach((s,i)=>{const b=document.createElement('button');b.textContent=`${String(i+1).padStart(2,'0')}  ${s.dataset.title}`;b.classList.toggle('current',i===active);b.onclick=()=>{contents.close();show(i);};list.append(b);});contents.showModal();
};
document.getElementById('close-contents').onclick=()=>contents.close();
show(Number(location.hash.slice(1))-1||0);
window.addEventListener('hashchange',()=>show(Number(location.hash.slice(1))-1||0));
