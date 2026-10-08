/* Minimal race illustration: moving wave crests and time-based trailing wakes. */
(()=>{
  const canvas=document.getElementById('closing-water'),c=canvas.getContext('2d');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let elapsed=12,last=performance.now(),lastDraw=0;
  const fleet=[{y:416,offset:140,size:.64,phase:0},{y:457,offset:-120,size:.75,phase:1.8},{y:501,offset:210,size:.86,phase:3.1},{y:553,offset:-245,size:.93,phase:4.6},{y:596,offset:40,size:1,phase:2.3}];
  const period=24,travel=2050;
  function position(b,t){
    const left=-45*b.size,span=1280+80*b.size;
    const raw=-530+t/period*travel+b.offset+Math.sin(t*.24+b.phase)*16;
    return {x:((raw-left)%span+span)%span+left,
      y:b.y+Math.sin(t*2.4+b.phase)*1.8+Math.sin(t*.8+b.phase)*1.1};
  }
  function water(){
    for(let row=0;row<16;row++){
      const base=365+row*18+Math.sin(row*1.7)*3,depth=row/15;
      for(let group=-1;group<10;group++){
        const start=group*155+(row%3)*48-(elapsed*(9+depth*8))%155;
        const length=65+((row*17+group*23+200)%55);
        const opacity=(.18+depth*.16)*Math.min(1,(base-350)/65)*Math.min(1,(660-base)/45);
        c.beginPath();
        for(let j=0;j<=length;j+=3){
          const x=start+j,y=base+Math.sin(x*.019-elapsed*.9+row*.72)*(3+depth*5)+Math.sin(x*.041+elapsed*.4)*.8;
          if(j===0)c.moveTo(x,y);else c.lineTo(x,y);
        }
        c.setLineDash([9+depth*6,9+depth*4]);c.lineDashOffset=-elapsed*3;
        c.strokeStyle=`rgba(83,137,149,${opacity})`;c.lineWidth=.85+depth*.35;c.stroke();
      }
    }
    c.setLineDash([]);
  }
  function wake(b){
    for(let age=0.1;age<3.5;age+=.095){
      // History is sampled independently across the wrap: the old wake fades
      // on the right while a new wake forms on the left, without a joining line.
      const p=position(b,elapsed-age),fade=Math.pow(1-age/3.5,1.5);
      const spread=(3+age*6)*b.size;
      for(const side of [-1,1]){
        const x=p.x-35*b.size-age*5;
        const y=p.y+side*spread+Math.sin(age*8+b.phase)*1.1;
        c.beginPath();c.moveTo(x-3,y);c.quadraticCurveTo(x,y-side*.8,x+5,y);
        c.strokeStyle=`rgba(86,140,150,${fade*.43})`;c.lineWidth=(1+fade*.7)*b.size;c.stroke();
      }
      if(age<1.1){c.fillStyle=`rgba(119,163,170,${fade*.2})`;c.fillRect(p.x-38*b.size,p.y+Math.sin(age*16)*2,3*b.size,.9);}
    }
  }
  function boat(b){
    const p=position(b,elapsed);c.save();c.translate(p.x,p.y);
    c.rotate(Math.sin(elapsed*2.4+b.phase)*.012);c.scale(b.size,b.size);
    // Compact, slightly elevated hull. Light outlines, no rendered cutout.
    c.fillStyle='rgba(99,143,150,.09)';c.beginPath();c.ellipse(0,5,43,8,0,0,Math.PI*2);c.fill();
    c.beginPath();c.moveTo(-35,-9);c.bezierCurveTo(-13,-17,22,-12,45,-1);c.bezierCurveTo(25,10,-10,15,-35,9);c.closePath();
    c.fillStyle='#fff';c.fill();c.strokeStyle='#628990';c.lineWidth=1.1;c.stroke();
    c.beginPath();c.moveTo(-31,4);c.quadraticCurveTo(4,11,37,1);c.strokeStyle='#acccd0';c.lineWidth=2;c.stroke();
    c.beginPath();c.moveTo(-15,-8);c.bezierCurveTo(0,-13,12,-8,17,-2);c.bezierCurveTo(10,3,-4,3,-17,0);c.closePath();c.fillStyle='#38585e';c.fill();
    c.beginPath();c.moveTo(-12,-7);c.quadraticCurveTo(2,-10,12,-3);c.strokeStyle='#8ba8ae';c.lineWidth=.8;c.stroke();
    c.beginPath();c.moveTo(-27,-5);c.lineTo(-27,5);c.strokeStyle='#bfd4d6';c.stroke();
    c.restore();
  }
  function draw(){
    c.clearRect(0,0,1280,720);
    water();fleet.forEach(wake);fleet.forEach(boat);
  }
  function frame(now){
    if(canvas.closest('.slide').classList.contains('active')){
      if(!reduced.matches)elapsed+=Math.min(.1,(now-last)/1000);
      if(now-lastDraw>33){draw();lastDraw=now;}
    }
    last=now;requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
