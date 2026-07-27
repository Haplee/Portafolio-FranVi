import{r as Q,j as rt}from"./index-DSXhrDJv.js";import{W as lt,S as ct,P as pt,B as w,a as m,b as $,c as tt,F as T,L as et,d as st,e as ft,V as at,f as dt}from"./three-DZNuUIDr.js";import"./motion-Bu4HRFG_.js";const mt=24,ut=14,t=-30,e=u=>(u-.5)*mt,s=u=>-(u-.5)*ut,ot=[{name:"Cygnus",stars:[{p:[e(.48),s(.18),t],sz:7},{p:[e(.46),s(.28),t-1],sz:4.5},{p:[e(.42),s(.24),t+1],sz:3.5},{p:[e(.5),s(.24),t-.5],sz:3.5},{p:[e(.44),s(.36),t],sz:4.5},{p:[e(.38),s(.32),t+1],sz:3},{p:[e(.52),s(.32),t-1],sz:3}],lines:[{f:0,t:1},{f:1,t:4},{f:1,t:2},{f:1,t:3},{f:2,t:5},{f:3,t:6}]},{name:"Lyra",stars:[{p:[e(.32),s(.2),t],sz:9},{p:[e(.3),s(.25),t-1],sz:3.5},{p:[e(.34),s(.25),t+1],sz:3.5},{p:[e(.3),s(.3),t],sz:3},{p:[e(.34),s(.3),t-.5],sz:3}],lines:[{f:0,t:1},{f:0,t:2},{f:1,t:3},{f:2,t:4},{f:3,t:4}]},{name:"Aquila",stars:[{p:[e(.55),s(.45),t],sz:7},{p:[e(.53),s(.42),t-1],sz:3.5},{p:[e(.57),s(.48),t+1],sz:3.5},{p:[e(.51),s(.38),t],sz:3},{p:[e(.59),s(.52),t-1],sz:3}],lines:[{f:3,t:1},{f:1,t:0},{f:0,t:2},{f:2,t:4}]},{name:"Scorpius",gold:!0,stars:[{p:[e(.35),s(.75),t],sz:7,gold:!0},{p:[e(.33),s(.7),t-1],sz:3.5,gold:!0},{p:[e(.32),s(.66),t+1],sz:3,gold:!0},{p:[e(.34),s(.63),t],sz:3,gold:!0},{p:[e(.37),s(.78),t-.5],sz:3,gold:!0},{p:[e(.4),s(.82),t+1],sz:3,gold:!0},{p:[e(.43),s(.85),t],sz:3,gold:!0},{p:[e(.45),s(.83),t-1],sz:3.5,gold:!0},{p:[e(.44),s(.87),t+.5],sz:3,gold:!0}],lines:[{f:3,t:2},{f:2,t:1},{f:1,t:0},{f:0,t:4},{f:4,t:5},{f:5,t:6},{f:6,t:7},{f:6,t:8}]},{name:"Sagittarius",stars:[{p:[e(.58),s(.78),t],sz:4.5},{p:[e(.62),s(.75),t-1],sz:4.5},{p:[e(.65),s(.78),t+1],sz:4.5},{p:[e(.62),s(.82),t],sz:4.5},{p:[e(.66),s(.73),t-.5],sz:3},{p:[e(.6),s(.72),t+.5],sz:3}],lines:[{f:0,t:1},{f:1,t:2},{f:2,t:3},{f:3,t:0},{f:1,t:4},{f:1,t:5}]},{name:"Cassiopeia",stars:[{p:[e(.78),s(.12),t],sz:4.5},{p:[e(.82),s(.08),t-1],sz:4.5},{p:[e(.85),s(.11),t+1],sz:5.5},{p:[e(.88),s(.07),t],sz:4.5},{p:[e(.92),s(.1),t-.5],sz:4.5}],lines:[{f:0,t:1},{f:1,t:2},{f:2,t:3},{f:3,t:4}]},{name:"Hercules",stars:[{p:[e(.2),s(.38),t],sz:3.5},{p:[e(.24),s(.42),t-1],sz:3.5},{p:[e(.22),s(.48),t+1],sz:3.5},{p:[e(.18),s(.45),t],sz:3.5},{p:[e(.16),s(.35),t-.5],sz:2.5},{p:[e(.26),s(.52),t+.5],sz:2.5}],lines:[{f:0,t:1},{f:1,t:2},{f:2,t:3},{f:3,t:0},{f:0,t:4},{f:2,t:5}]},{name:"Cancer",gold:!0,stars:[{p:[e(.08),s(.44),t],sz:6.5,gold:!0},{p:[e(.06),s(.38),t-1],sz:3.5,gold:!0},{p:[e(.11),s(.4),t+1],sz:3.5,gold:!0},{p:[e(.1),s(.35),t],sz:3,gold:!0},{p:[e(.05),s(.5),t-.5],sz:2.5,gold:!0}],lines:[{f:1,t:3},{f:3,t:2},{f:2,t:0},{f:0,t:4},{f:1,t:0}]}],z=[[e(.32),s(.2),t],[e(.48),s(.18),t],[e(.55),s(.45),t]],ht=`
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
`,zt=`
    varying float vAlpha;
    void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv) * 2.0;
        if (d > 1.0) discard;
        float a = exp(-d * 5.5) * vAlpha * 0.65;
        gl_FragColor = vec4(0.84, 0.92, 1.0, a);
    }
`,gt=`
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
`,vt=`
    varying float vAlpha;
    varying vec3 vColor;
    void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv) * 2.0;
        if (d > 1.0) discard;
        float a = exp(-d * 2.8) * vAlpha;
        gl_FragColor = vec4(vColor, a);
    }
`;function St(){const u=Q.useRef(null);return Q.useEffect(()=>{const r=u.current;if(!r)return;const c=new lt({antialias:!0,alpha:!0});c.setPixelRatio(Math.min(devicePixelRatio,2)),c.setSize(r.clientWidth,r.clientHeight),c.setClearColor(0,0),r.appendChild(c.domElement);const p=new ct,f=new pt(65,r.clientWidth/r.clientHeight,.1,500);f.position.set(0,0,0),f.lookAt(0,0,t);const M=3200,A=new Float32Array(M*3),G=new Float32Array(M),B=new Float32Array(M);for(let a=0;a<M;a++){const o=Math.random()*Math.PI*2,l=Math.acos(Math.random()),i=70+Math.random()*50;A[a*3]=i*Math.sin(l)*Math.cos(o),A[a*3+1]=i*Math.sin(l)*Math.sin(o),A[a*3+2]=-i*Math.cos(l),G[a]=.4+Math.random()*2.2,B[a]=Math.random()*Math.PI*2}const S=new w;S.setAttribute("position",new m(A,3)),S.setAttribute("aSize",new m(G,1)),S.setAttribute("aPhase",new m(B,1));const V=new $({vertexShader:ht,fragmentShader:zt,uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1});p.add(new tt(S,V));const k=ot.flatMap(a=>a.stars),y=k.length,P=new Float32Array(y*3),H=new Float32Array(y),I=new Float32Array(y),d=new Float32Array(y*3);k.forEach((a,o)=>{P[o*3]=a.p[0],P[o*3+1]=a.p[1],P[o*3+2]=a.p[2],H[o]=a.sz,I[o]=Math.random()*Math.PI*2,a.gold?(d[o*3]=.99,d[o*3+1]=.87,d[o*3+2]=.28):(d[o*3]=.84,d[o*3+1]=.93,d[o*3+2]=1)});const g=new w;g.setAttribute("position",new m(P,3)),g.setAttribute("aSize",new m(H,1)),g.setAttribute("aPhase",new m(I,1)),g.setAttribute("aColor",new m(d,3));const X=new $({vertexShader:gt,fragmentShader:vt,uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1});p.add(new tt(g,X));const Y=[],N=[];for(const a of ot){const o=[];for(const n of a.lines)o.push(...a.stars[n.f].p,...a.stars[n.t].p);const l=new w;l.setAttribute("position",new T(o,3));const i=new et({color:a.gold?16502564:7910640,transparent:!0,opacity:a.gold?.45:.28,depthWrite:!1});p.add(new st(l,i)),a.gold?N.push(i):Y.push(i)}const nt=[...z[0],...z[1],...z[1],...z[2],...z[2],...z[0]],j=new w;j.setAttribute("position",new T(nt,3));const q=new ft({color:6605055,dashSize:.28,gapSize:.42,transparent:!0,opacity:.2,depthWrite:!1}),D=new st(j,q);D.computeLineDistances(),p.add(D);const v=[],it=()=>{const a=(Math.random()-.5)*22,o=Math.random()*5+1,l=new at(a,o,t-4),i=new at(.4+Math.random()*.4,-(.4+Math.random()*.4),0).normalize(),n=1.8+Math.random()*2.5,h=55+Math.random()*40,x=new w;x.setAttribute("position",new T([0,0,0,0,0,0],3));const R=new et({color:13691135,transparent:!0,opacity:0,depthWrite:!1}),E=new dt(x,R);p.add(E),v.push({start:l,dir:i,len:n,life:0,maxLife:h,mesh:E})};let Z=0,O=0,b=0,C=0;const U=a=>{const o=r.getBoundingClientRect();Z=((a.clientX-o.left)/o.width-.5)*2.8,O=(-(a.clientY-o.top)/o.height+.5)*1.8};window.addEventListener("mousemove",U);const J=()=>{f.aspect=r.clientWidth/r.clientHeight,f.updateProjectionMatrix(),c.setSize(r.clientWidth,r.clientHeight)};window.addEventListener("resize",J);let L;const K=a=>{L=requestAnimationFrame(K),V.uniforms.uTime.value=a,X.uniforms.uTime.value=a,b+=(Z-b)*.022,C+=(O-C)*.022,f.position.set(b,C,0),f.lookAt(b*.08,C*.08,t);const o=.22+.1*Math.sin(a*.001),l=.4+.15*Math.sin(a*.0012);Y.forEach(i=>{i.opacity=o}),N.forEach(i=>{i.opacity=l}),q.opacity=.15+.08*Math.sin(a*9e-4),Math.random()<.004&&v.length<3&&it();for(let i=v.length-1;i>=0;i--){const n=v[i];n.life++;const h=n.life/n.maxLife,x=Math.min(h*5,1),R=1-h*h,E=x*R*.88,F=n.start.clone().addScaledVector(n.dir,n.life*.14),W=F.clone().addScaledVector(n.dir,-n.len*(1-h*.5)),_=n.mesh.geometry.getAttribute("position");_.setXYZ(0,W.x,W.y,W.z),_.setXYZ(1,F.x,F.y,F.z),_.needsUpdate=!0,n.mesh.material.opacity=E,n.life>=n.maxLife&&(p.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),v.splice(i,1))}c.render(p,f)};return L=requestAnimationFrame(K),()=>{cancelAnimationFrame(L),window.removeEventListener("mousemove",U),window.removeEventListener("resize",J),p.traverse(a=>{if("geometry"in a&&a.geometry?.dispose(),"material"in a){const o=a.material;Array.isArray(o)?o.forEach(l=>l.dispose()):o?.dispose()}}),c.dispose(),r.contains(c.domElement)&&r.removeChild(c.domElement)}},[]),rt.jsx("div",{ref:u,className:"absolute inset-0 w-full h-full"})}export{St as default};
