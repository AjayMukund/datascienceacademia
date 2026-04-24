/* ════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════ */
const CUR=document.getElementById('cur');
if(CUR){
  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;CUR.style.left=mx+'px';CUR.style.top=my+'px';});
  document.querySelectorAll('a,button,.cc,.dc,.pill,.pc,.explore-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{CUR.style.transform='translate(-50%,-50%) scale(2.8)';CUR.style.opacity='.45';});
    el.addEventListener('mouseleave',()=>{CUR.style.transform='translate(-50%,-50%) scale(1)';CUR.style.opacity='1';});
  });
}

/* ════════════════════════════════════════
   NEURAL NETWORK + PROTON TRAIL
   Canvas 2D — works on every browser
════════════════════════════════════════ */
(function(){
  const canvas=document.getElementById('fluid-canvas');
  const ctx=canvas.getContext('2d');
  if(!ctx)return;

  let W=canvas.width=window.innerWidth,H=canvas.height=window.innerHeight;

  /* ── Nodes ── */
  const LINK_DIST=155, MOUSE_DIST=210;
  let nodes=[];
  function initNodes(){
    const n=Math.min(Math.round(W*H/13000),110);
    nodes=Array.from({length:n},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.42, vy:(Math.random()-.5)*.42,
      r:Math.random()*1.4+0.9, phase:Math.random()*Math.PI*2
    }));
  }
  initNodes();
  window.addEventListener('resize',()=>{
    W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;initNodes();
  });

  /* ── Mouse & proton trail ── */
  let nmx=-9999,nmy=-9999;
  const protons=[];
  document.addEventListener('mousemove',e=>{
    const px=e.clientX,py=e.clientY;
    for(let i=0;i<4;i++){
      const a=Math.random()*Math.PI*2,s=Math.random()*1.4+0.4;
      protons.push({
        x:px+(Math.random()-.5)*7, y:py+(Math.random()-.5)*7,
        vx:Math.cos(a)*s*.55,     vy:Math.sin(a)*s*.55-0.35,
        life:1, decay:0.028+Math.random()*0.028,
        size:Math.random()*3+1.4,
        gold:Math.random()>.38
      });
    }
    nmx=px;nmy=py;
  });
  document.addEventListener('mouseleave',()=>{nmx=-9999;nmy=-9999;});
  document.addEventListener('touchmove',e=>{
    nmx=e.touches[0].clientX;nmy=e.touches[0].clientY;
  },{passive:true});

  /* ── Main loop ── */
  let frame=0;
  (function tick(){
    frame++;
    ctx.clearRect(0,0,W,H);
    const t=frame*.008;

    nodes.forEach(n=>{
      n.x+=n.vx; n.y+=n.vy; n.phase+=.016;
      if(n.x<-20)n.x=W+20; else if(n.x>W+20)n.x=-20;
      if(n.y<-20)n.y=H+20; else if(n.y>H+20)n.y=-20;
    });

    ctx.lineWidth=.65;
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<LINK_DIST){
          ctx.strokeStyle=`rgba(200,169,110,${(1-d/LINK_DIST)*.28})`;
          ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);
          ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();
        }
      }
      const mdx=nodes[i].x-nmx,mdy=nodes[i].y-nmy;
      const md=Math.sqrt(mdx*mdx+mdy*mdy);
      if(md<MOUSE_DIST){
        const a=(1-md/MOUSE_DIST)*.75;
        ctx.strokeStyle=`rgba(62,207,178,${a})`;
        ctx.lineWidth=.9;
        ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);
        ctx.lineTo(nmx,nmy);ctx.stroke();
        ctx.lineWidth=.65;
      }
    }

    nodes.forEach(n=>{
      const pulse=.6+.4*Math.sin(n.phase);
      ctx.beginPath();ctx.arc(n.x,n.y,n.r*3.5,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,169,110,${.055*pulse})`;ctx.fill();
      ctx.beginPath();ctx.arc(n.x,n.y,n.r*pulse,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,169,110,${.78*pulse})`;ctx.fill();
    });

    if(nmx>-100){
      const rp=.5+.5*Math.sin(t*4);
      ctx.beginPath();ctx.arc(nmx,nmy,13+rp*5,0,Math.PI*2);
      ctx.strokeStyle=`rgba(62,207,178,${.28+.18*rp})`;
      ctx.lineWidth=1.1;ctx.stroke();
      ctx.beginPath();ctx.arc(nmx,nmy,3.8,0,Math.PI*2);
      ctx.fillStyle='rgba(62,207,178,.95)';ctx.fill();
    }

    for(let i=protons.length-1;i>=0;i--){
      const p=protons[i];
      p.x+=p.vx;p.y+=p.vy;p.vy-=.04;
      p.life-=p.decay;p.size*=.968;
      if(p.life<=0||p.size<.25){protons.splice(i,1);continue;}
      const rgb=p.gold?'200,169,110':'62,207,178';
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*2.8);
      g.addColorStop(0,`rgba(${rgb},${p.life*.8})`);
      g.addColorStop(.45,`rgba(${rgb},${p.life*.22})`);
      g.addColorStop(1,`rgba(${rgb},0)`);
      ctx.beginPath();ctx.arc(p.x,p.y,p.size*2.8,0,Math.PI*2);
      ctx.fillStyle=g;ctx.fill();
      ctx.beginPath();ctx.arc(p.x,p.y,p.size*.38,0,Math.PI*2);
      ctx.fillStyle=`rgba(${rgb},${p.life})`;ctx.fill();
    }

    requestAnimationFrame(tick);
  })();
})();

/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('vis'),i*65);});
},{threshold:.1});
document.querySelectorAll('[data-r]').forEach(el=>obs.observe(el));

/* NAV */
const _nav=document.getElementById('nav');
if(_nav){
  window.addEventListener('scroll',()=>_nav.classList.toggle('scrolled',scrollY>60));
  (function(){
    const nm=document.getElementById('nmenu'),tog=document.querySelector('.nav-tog');
    if(!nm||!tog)return;
    const ov=document.createElement('div');ov.className='nav-overlay';document.body.appendChild(ov);
    const close=()=>{nm.classList.remove('open');ov.classList.remove('show');document.body.classList.remove('nav-open');};
    const open=()=>{nm.classList.add('open');ov.classList.add('show');document.body.classList.add('nav-open');};
    tog.onclick=()=>nm.classList.contains('open')?close():open();
    ov.addEventListener('click',close);
    document.querySelectorAll('#nmenu a').forEach(a=>a.addEventListener('click',close));
  })();
}

/* ════════════════════════════════════════
   METRIC COUNTER ANIMATION
════════════════════════════════════════ */
(function(){
  const counters=document.querySelectorAll('.met-n');
  if(!counters.length)return;
  const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  function animateCounter(el){
    const raw=el.textContent.trim();
    const num=parseInt(raw.replace(/\D/g,''));
    const suffix=raw.replace(/[\d]/g,'');
    const start=raw.includes('201')?num-5:0;
    const dur=1800;
    const t0=performance.now();
    (function frame(now){
      const p=Math.min((now-t0)/dur,1);
      el.textContent=Math.round(start+(num-start)*ease(p))+suffix;
      if(p<1)requestAnimationFrame(frame);
      else el.textContent=raw;
    })(t0);
  }
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);obs.unobserve(e.target);}});
  },{threshold:.6});
  counters.forEach(el=>obs.observe(el));
})();

/* ════════════════════════════════════════
   CHATBASE — DSA AI ASSISTANT
════════════════════════════════════════ */
(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...args)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(args)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="c0CBw_ktD4FG0ExvrlhUW";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
