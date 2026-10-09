// Native data chart from saved observations. No interpolation or synthetic data.
(() => {
const svg=document.getElementById('availability-timeline');if(!svg)return;
const NS='http://www.w3.org/2000/svg';
function el(tag,attrs,parent=svg,text){const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);if(text)n.textContent=text;parent.append(n);return n;}
fetch('media/island-availability-v5.json').then(r=>{if(!r.ok)throw Error('Missing chart data');return r.json();}).then(data=>{
  const x=105,width=990,rowHeight=13,rowStep=22;
  const palette={1:'#147d78',2:'#a18ac4'};
  el('title',{},svg,'Island landmark availability, with and without immediate recovery');
  el('desc',{},svg,'Recorded 165–195 second replay. Teal marks baseline observations, purple marks recovered observations. Both panels already use smoothing.');
  for(const [runs,y,title] of [[data.baseline,53,'Reference tracking'],[data.recovery,259,'With recovery']]){
    el('text',{x:0,y:y-24,class:'timeline-panel-title'},svg,title);
    data.labels.forEach((label,j)=>{
      const ry=y+j*rowStep;
      el('text',{x:77,y:ry+11,'text-anchor':'end',class:'timeline-landmark'},svg,label);
      el('rect',{x,y:ry,width,height:rowHeight,rx:6.5,fill:'#e6eae5'});
      for(const [start,end,state] of runs[j]){
        const barWidth=(end-start)/data.frames*width;
        const bar=el('rect',{x:x+start/data.frames*width,y:ry,width:barWidth,height:rowHeight,rx:Math.min(3,barWidth/2),fill:palette[state]});
        el('title',{},bar,`${label}: ${(data.start_s+start/data.fps).toFixed(2)}–${(data.start_s+end/data.fps).toFixed(2)} s, ${state===1?'observed':'recovered'}`);
      }
    });
  }
  for(let t=0;t<=30;t+=5){const tx=x+t/30*width;el('line',{x1:tx,x2:tx,y1:421,y2:426,stroke:'#b4bfba'});el('text',{x:tx,y:447,'text-anchor':'middle',class:'timeline-tick'},svg,`${Math.floor((data.start_s+t)/60)}:${String((data.start_s+t)%60).padStart(2,'0')}`);}
  document.getElementById('availability-gap-count').textContent=`${data.short_gaps_before} → ${data.short_gaps_after}`;
}).catch(()=>{el('text',{x:0,y:90,class:'timeline-panel-title'},svg,'Chart unavailable');});
})();
