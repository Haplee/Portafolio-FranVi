import{r as tt,j as lt}from"./index-SHWbPfxU.js";import{W as ct,S as pt,P as dt,B as w,a as m,b as et,c as st,F as _,L as at,d as ot,e as ft,V as nt,f as mt}from"./three-DZNuUIDr.js";import"./motion-CA7ZUGJ_.js";const ut=24,ht=14,t=-30,e=u=>(u-.5)*ut,s=u=>-(u-.5)*ht,it=[{name:"Cygnus",stars:[{p:[e(.48),s(.18),t],sz:7},{p:[e(.46),s(.28),t-1],sz:4.5},{p:[e(.42),s(.24),t+1],sz:3.5},{p:[e(.5),s(.24),t-.5],sz:3.5},{p:[e(.44),s(.36),t],sz:4.5},{p:[e(.38),s(.32),t+1],sz:3},{p:[e(.52),s(.32),t-1],sz:3}],lines:[{f:0,t:1},{f:1,t:4},{f:1,t:2},{f:1,t:3},{f:2,t:5},{f:3,t:6}]},{name:"Lyra",stars:[{p:[e(.32),s(.2),t],sz:9},{p:[e(.3),s(.25),t-1],sz:3.5},{p:[e(.34),s(.25),t+1],sz:3.5},{p:[e(.3),s(.3),t],sz:3},{p:[e(.34),s(.3),t-.5],sz:3}],lines:[{f:0,t:1},{f:0,t:2},{f:1,t:3},{f:2,t:4},{f:3,t:4}]},{name:"Aquila",stars:[{p:[e(.55),s(.45),t],sz:7},{p:[e(.53),s(.42),t-1],sz:3.5},{p:[e(.57),s(.48),t+1],sz:3.5},{p:[e(.51),s(.38),t],sz:3},{p:[e(.59),s(.52),t-1],sz:3}],lines:[{f:3,t:1},{f:1,t:0},{f:0,t:2},{f:2,t:4}]},{name:"Scorpius",gold:!0,stars:[{p:[e(.35),s(.75),t],sz:7,gold:!0},{p:[e(.33),s(.7),t-1],sz:3.5,gold:!0},{p:[e(.32),s(.66),t+1],sz:3,gold:!0},{p:[e(.34),s(.63),t],sz:3,gold:!0},{p:[e(.37),s(.78),t-.5],sz:3,gold:!0},{p:[e(.4),s(.82),t+1],sz:3,gold:!0},{p:[e(.43),s(.85),t],sz:3,gold:!0},{p:[e(.45),s(.83),t-1],sz:3.5,gold:!0},{p:[e(.44),s(.87),t+.5],sz:3,gold:!0}],lines:[{f:3,t:2},{f:2,t:1},{f:1,t:0},{f:0,t:4},{f:4,t:5},{f:5,t:6},{f:6,t:7},{f:6,t:8}]},{name:"Sagittarius",stars:[{p:[e(.58),s(.78),t],sz:4.5},{p:[e(.62),s(.75),t-1],sz:4.5},{p:[e(.65),s(.78),t+1],sz:4.5},{p:[e(.62),s(.82),t],sz:4.5},{p:[e(.66),s(.73),t-.5],sz:3},{p:[e(.6),s(.72),t+.5],sz:3}],lines:[{f:0,t:1},{f:1,t:2},{f:2,t:3},{f:3,t:0},{f:1,t:4},{f:1,t:5}]},{name:"Cassiopeia",stars:[{p:[e(.78),s(.12),t],sz:4.5},{p:[e(.82),s(.08),t-1],sz:4.5},{p:[e(.85),s(.11),t+1],sz:5.5},{p:[e(.88),s(.07),t],sz:4.5},{p:[e(.92),s(.1),t-.5],sz:4.5}],lines:[{f:0,t:1},{f:1,t:2},{f:2,t:3},{f:3,t:4}]},{name:"Hercules",stars:[{p:[e(.2),s(.38),t],sz:3.5},{p:[e(.24),s(.42),t-1],sz:3.5},{p:[e(.22),s(.48),t+1],sz:3.5},{p:[e(.18),s(.45),t],sz:3.5},{p:[e(.16),s(.35),t-.5],sz:2.5},{p:[e(.26),s(.52),t+.5],sz:2.5}],lines:[{f:0,t:1},{f:1,t:2},{f:2,t:3},{f:3,t:0},{f:0,t:4},{f:2,t:5}]},{name:"Cancer",gold:!0,stars:[{p:[e(.08),s(.44),t],sz:6.5,gold:!0},{p:[e(.06),s(.38),t-1],sz:3.5,gold:!0},{p:[e(.11),s(.4),t+1],sz:3.5,gold:!0},{p:[e(.1),s(.35),t],sz:3,gold:!0},{p:[e(.05),s(.5),t-.5],sz:2.5,gold:!0}],lines:[{f:1,t:3},{f:3,t:2},{f:2,t:0},{f:0,t:4},{f:1,t:0}]}],z=[[e(.32),s(.2),t],[e(.48),s(.18),t],[e(.55),s(.45),t]],zt=`
    attribute float aSize;
    attribute float aPhase;
    varying float vAlpha;
    uniform float uTime;
    void main() {
        float twinkle = 0.5 + 0.5 * sin(uTime * 0.0025 + aPhase);
        vAlpha = twinkle;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
    }
`,gt=`
    varying float vAlpha;
    void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv) * 2.0;
        if (d > 1.0) discard;
        float a = exp(-d * 5.5) * vAlpha * 0.65;
        gl_FragColor = vec4(0.84, 0.92, 1.0, a);
    }
`,vt=`
    attribute float aSize;
    attribute float aPhase;
    attribute vec3 aColor;
    varying float vAlpha;
    varying vec3 vColor;
    uniform float uTime;
    void main() {
        float twinkle = 0.55 + 0.45 * sin(uTime * 0.003 + aPhase);
        vAlpha = twinkle;
        vColor = aColor;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (420.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
    }
`,wt=`
    varying float vAlpha;
    varying vec3 vColor;
    void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv) * 2.0;
        if (d > 1.0) discard;
        float a = exp(-d * 2.8) * vAlpha;
        gl_FragColor = vec4(vColor, a);
    }
`;function yt(){const u=tt.useRef(null);return tt.useEffect(()=>{const r=u.current;if(!r)return;const c=new ct({antialias:!0,alpha:!0});c.setPixelRatio(Math.min(devicePixelRatio,2)),c.setSize(r.clientWidth,r.clientHeight),c.setClearColor(0,0),r.appendChild(c.domElement);const p=new pt,d=new dt(65,r.clientWidth/r.clientHeight,.1,500);d.position.set(0,0,0),d.lookAt(0,0,t);const M=3200,A=new Float32Array(M*3),G=new Float32Array(M),k=new Float32Array(M);for(let a=0;a<M;a++){const o=Math.random()*Math.PI*2,l=Math.acos(Math.random()),i=70+Math.random()*50;A[a*3]=i*Math.sin(l)*Math.cos(o),A[a*3+1]=i*Math.sin(l)*Math.sin(o),A[a*3+2]=-i*Math.cos(l),G[a]=.4+Math.random()*2.2,k[a]=Math.random()*Math.PI*2}const S=new w;S.setAttribute("position",new m(A,3)),S.setAttribute("aSize",new m(G,1)),S.setAttribute("aPhase",new m(k,1));const B=new et({vertexShader:zt,fragmentShader:gt,uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1});p.add(new st(S,B));const V=it.flatMap(a=>a.stars),y=V.length,b=new Float32Array(y*3),H=new Float32Array(y),I=new Float32Array(y),f=new Float32Array(y*3);V.forEach((a,o)=>{b[o*3]=a.p[0],b[o*3+1]=a.p[1],b[o*3+2]=a.p[2],H[o]=a.sz,I[o]=Math.random()*Math.PI*2,a.gold?(f[o*3]=.99,f[o*3+1]=.87,f[o*3+2]=.28):(f[o*3]=.84,f[o*3+1]=.93,f[o*3+2]=1)});const g=new w;g.setAttribute("position",new m(b,3)),g.setAttribute("aSize",new m(H,1)),g.setAttribute("aPhase",new m(I,1)),g.setAttribute("aColor",new m(f,3));const X=new et({vertexShader:vt,fragmentShader:wt,uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1});p.add(new st(g,X));const Y=[],N=[];for(const a of it){const o=[];for(const n of a.lines)o.push(...a.stars[n.f].p,...a.stars[n.t].p);const l=new w;l.setAttribute("position",new _(o,3));const i=new at({color:a.gold?16502564:7910640,transparent:!0,opacity:a.gold?.45:.28,depthWrite:!1});p.add(new ot(l,i)),a.gold?N.push(i):Y.push(i)}const rt=[...z[0],...z[1],...z[1],...z[2],...z[2],...z[0]],j=new w;j.setAttribute("position",new _(rt,3));const q=new ft({color:6605055,dashSize:.28,gapSize:.42,transparent:!0,opacity:.2,depthWrite:!1}),D=new ot(j,q);D.computeLineDistances(),p.add(D);const v=[],Z=()=>{const a=(Math.random()-.5)*22,o=Math.random()*5+1,l=new nt(a,o,t-4),i=new nt(.4+Math.random()*.4,-(.4+Math.random()*.4),0).normalize(),n=1.8+Math.random()*2.5,h=55+Math.random()*40,x=new w;x.setAttribute("position",new _([0,0,0,0,0,0],3));const R=new at({color:13691135,transparent:!0,opacity:0,depthWrite:!1}),E=new mt(x,R);p.add(E),v.push({start:l,dir:i,len:n,life:0,maxLife:h,mesh:E})},O=()=>{for(let a=0;a<18;a++)setTimeout(()=>Z(),a*80)};window.addEventListener("konami-burst",O);let K=0,U=0,P=0,C=0;const J=a=>{const o=r.getBoundingClientRect();K=((a.clientX-o.left)/o.width-.5)*2.8,U=(-(a.clientY-o.top)/o.height+.5)*1.8};window.addEventListener("mousemove",J);const Q=()=>{d.aspect=r.clientWidth/r.clientHeight,d.updateProjectionMatrix(),c.setSize(r.clientWidth,r.clientHeight)};window.addEventListener("resize",Q);let F;const $=a=>{F=requestAnimationFrame($),B.uniforms.uTime.value=a,X.uniforms.uTime.value=a,P+=(K-P)*.022,C+=(U-C)*.022,d.position.set(P,C,0),d.lookAt(P*.08,C*.08,t);const o=.22+.1*Math.sin(a*.001),l=.4+.15*Math.sin(a*.0012);Y.forEach(i=>{i.opacity=o}),N.forEach(i=>{i.opacity=l}),q.opacity=.15+.08*Math.sin(a*9e-4),Math.random()<.004&&v.length<3&&Z();for(let i=v.length-1;i>=0;i--){const n=v[i];n.life++;const h=n.life/n.maxLife,x=Math.min(h*5,1),R=1-h*h,E=x*R*.88,L=n.start.clone().addScaledVector(n.dir,n.life*.14),T=L.clone().addScaledVector(n.dir,-n.len*(1-h*.5)),W=n.mesh.geometry.getAttribute("position");W.setXYZ(0,T.x,T.y,T.z),W.setXYZ(1,L.x,L.y,L.z),W.needsUpdate=!0,n.mesh.material.opacity=E,n.life>=n.maxLife&&(p.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),v.splice(i,1))}c.render(p,d)};return F=requestAnimationFrame($),()=>{cancelAnimationFrame(F),window.removeEventListener("mousemove",J),window.removeEventListener("resize",Q),window.removeEventListener("konami-burst",O),p.traverse(a=>{if("geometry"in a&&a.geometry?.dispose(),"material"in a){const o=a.material;Array.isArray(o)?o.forEach(l=>l.dispose()):o?.dispose()}}),c.dispose(),r.contains(c.domElement)&&r.removeChild(c.domElement)}},[]),lt.jsx("div",{ref:u,className:"absolute inset-0 w-full h-full"})}export{yt as default};
