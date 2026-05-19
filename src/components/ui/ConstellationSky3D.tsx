import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ── Helpers ─────────────────────────────────────────────────────────────────
const W = 24, H = 14, Z = -30;
const wx = (nx: number) => (nx - 0.5) * W;
const wy = (ny: number) => -(ny - 0.5) * H;

// ── Constellation data ───────────────────────────────────────────────────────
interface CStar { p: [number, number, number]; sz: number; gold?: true }
interface CLine { f: number; t: number }
interface Cons { name: string; stars: CStar[]; lines: CLine[]; gold?: true }

const CONS: Cons[] = [
    {
        name: 'Cygnus',
        stars: [
            { p: [wx(0.48), wy(0.18), Z],      sz: 7 },
            { p: [wx(0.46), wy(0.28), Z - 1],  sz: 4.5 },
            { p: [wx(0.42), wy(0.24), Z + 1],  sz: 3.5 },
            { p: [wx(0.50), wy(0.24), Z - 0.5],sz: 3.5 },
            { p: [wx(0.44), wy(0.36), Z],       sz: 4.5 },
            { p: [wx(0.38), wy(0.32), Z + 1],  sz: 3 },
            { p: [wx(0.52), wy(0.32), Z - 1],  sz: 3 },
        ],
        lines: [
            { f: 0, t: 1 }, { f: 1, t: 4 },
            { f: 1, t: 2 }, { f: 1, t: 3 },
            { f: 2, t: 5 }, { f: 3, t: 6 },
        ],
    },
    {
        name: 'Lyra',
        stars: [
            { p: [wx(0.32), wy(0.20), Z],      sz: 9 },
            { p: [wx(0.30), wy(0.25), Z - 1],  sz: 3.5 },
            { p: [wx(0.34), wy(0.25), Z + 1],  sz: 3.5 },
            { p: [wx(0.30), wy(0.30), Z],       sz: 3 },
            { p: [wx(0.34), wy(0.30), Z - 0.5],sz: 3 },
        ],
        lines: [
            { f: 0, t: 1 }, { f: 0, t: 2 },
            { f: 1, t: 3 }, { f: 2, t: 4 }, { f: 3, t: 4 },
        ],
    },
    {
        name: 'Aquila',
        stars: [
            { p: [wx(0.55), wy(0.45), Z],      sz: 7 },
            { p: [wx(0.53), wy(0.42), Z - 1],  sz: 3.5 },
            { p: [wx(0.57), wy(0.48), Z + 1],  sz: 3.5 },
            { p: [wx(0.51), wy(0.38), Z],       sz: 3 },
            { p: [wx(0.59), wy(0.52), Z - 1],  sz: 3 },
        ],
        lines: [
            { f: 3, t: 1 }, { f: 1, t: 0 },
            { f: 0, t: 2 }, { f: 2, t: 4 },
        ],
    },
    {
        name: 'Scorpius',
        gold: true,
        stars: [
            { p: [wx(0.35), wy(0.75), Z],      sz: 7,  gold: true },
            { p: [wx(0.33), wy(0.70), Z - 1],  sz: 3.5,gold: true },
            { p: [wx(0.32), wy(0.66), Z + 1],  sz: 3,  gold: true },
            { p: [wx(0.34), wy(0.63), Z],       sz: 3,  gold: true },
            { p: [wx(0.37), wy(0.78), Z - 0.5],sz: 3,  gold: true },
            { p: [wx(0.40), wy(0.82), Z + 1],  sz: 3,  gold: true },
            { p: [wx(0.43), wy(0.85), Z],       sz: 3,  gold: true },
            { p: [wx(0.45), wy(0.83), Z - 1],  sz: 3.5,gold: true },
            { p: [wx(0.44), wy(0.87), Z + 0.5],sz: 3,  gold: true },
        ],
        lines: [
            { f: 3, t: 2 }, { f: 2, t: 1 }, { f: 1, t: 0 },
            { f: 0, t: 4 }, { f: 4, t: 5 }, { f: 5, t: 6 },
            { f: 6, t: 7 }, { f: 6, t: 8 },
        ],
    },
    {
        name: 'Sagittarius',
        stars: [
            { p: [wx(0.58), wy(0.78), Z],      sz: 4.5 },
            { p: [wx(0.62), wy(0.75), Z - 1],  sz: 4.5 },
            { p: [wx(0.65), wy(0.78), Z + 1],  sz: 4.5 },
            { p: [wx(0.62), wy(0.82), Z],       sz: 4.5 },
            { p: [wx(0.66), wy(0.73), Z - 0.5],sz: 3 },
            { p: [wx(0.60), wy(0.72), Z + 0.5],sz: 3 },
        ],
        lines: [
            { f: 0, t: 1 }, { f: 1, t: 2 },
            { f: 2, t: 3 }, { f: 3, t: 0 },
            { f: 1, t: 4 }, { f: 1, t: 5 },
        ],
    },
    {
        name: 'Cassiopeia',
        stars: [
            { p: [wx(0.78), wy(0.12), Z],      sz: 4.5 },
            { p: [wx(0.82), wy(0.08), Z - 1],  sz: 4.5 },
            { p: [wx(0.85), wy(0.11), Z + 1],  sz: 5.5 },
            { p: [wx(0.88), wy(0.07), Z],       sz: 4.5 },
            { p: [wx(0.92), wy(0.10), Z - 0.5],sz: 4.5 },
        ],
        lines: [
            { f: 0, t: 1 }, { f: 1, t: 2 },
            { f: 2, t: 3 }, { f: 3, t: 4 },
        ],
    },
    {
        name: 'Hercules',
        stars: [
            { p: [wx(0.20), wy(0.38), Z],      sz: 3.5 },
            { p: [wx(0.24), wy(0.42), Z - 1],  sz: 3.5 },
            { p: [wx(0.22), wy(0.48), Z + 1],  sz: 3.5 },
            { p: [wx(0.18), wy(0.45), Z],       sz: 3.5 },
            { p: [wx(0.16), wy(0.35), Z - 0.5],sz: 2.5 },
            { p: [wx(0.26), wy(0.52), Z + 0.5],sz: 2.5 },
        ],
        lines: [
            { f: 0, t: 1 }, { f: 1, t: 2 },
            { f: 2, t: 3 }, { f: 3, t: 0 },
            { f: 0, t: 4 }, { f: 2, t: 5 },
        ],
    },
    {
        name: 'Cancer',
        gold: true,
        stars: [
            { p: [wx(0.08), wy(0.44), Z],      sz: 6.5, gold: true },
            { p: [wx(0.06), wy(0.38), Z - 1],  sz: 3.5, gold: true },
            { p: [wx(0.11), wy(0.40), Z + 1],  sz: 3.5, gold: true },
            { p: [wx(0.10), wy(0.35), Z],       sz: 3,   gold: true },
            { p: [wx(0.05), wy(0.50), Z - 0.5],sz: 2.5, gold: true },
        ],
        lines: [
            { f: 1, t: 3 }, { f: 3, t: 2 },
            { f: 2, t: 0 }, { f: 0, t: 4 },
            { f: 1, t: 0 },
        ],
    },
];

// Summer Triangle vertices (Vega, Deneb, Altair)
const TRI: [number, number, number][] = [
    [wx(0.32), wy(0.20), Z],
    [wx(0.48), wy(0.18), Z],
    [wx(0.55), wy(0.45), Z],
];

// ── Shaders ──────────────────────────────────────────────────────────────────
const BG_VERT = /* glsl */`
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
`;
const BG_FRAG = /* glsl */`
    varying float vAlpha;
    void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv) * 2.0;
        if (d > 1.0) discard;
        float a = exp(-d * 5.5) * vAlpha * 0.65;
        gl_FragColor = vec4(0.84, 0.92, 1.0, a);
    }
`;
const CS_VERT = /* glsl */`
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
`;
const CS_FRAG = /* glsl */`
    varying float vAlpha;
    varying vec3 vColor;
    void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv) * 2.0;
        if (d > 1.0) discard;
        float a = exp(-d * 2.8) * vAlpha;
        gl_FragColor = vec4(vColor, a);
    }
`;

// ── Shooting star ─────────────────────────────────────────────────────────────
interface SS {
    start: THREE.Vector3;
    dir: THREE.Vector3;
    len: number;
    life: number;
    maxLife: number;
    mesh: THREE.Line;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ConstellationSky3D() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Scene & camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 500);
        camera.position.set(0, 0, 0);
        camera.lookAt(0, 0, Z);

        // ── Background stars ──────────────────────────────────────────────
        const N = 3200;
        const bgPos   = new Float32Array(N * 3);
        const bgSize  = new Float32Array(N);
        const bgPhase = new Float32Array(N);

        for (let i = 0; i < N; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.acos(Math.random()); // hemisphere toward -Z
            const r     = 70 + Math.random() * 50;
            bgPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            bgPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            bgPos[i * 3 + 2] = -r * Math.cos(phi);
            bgSize[i]  = 0.4 + Math.random() * 2.2;
            bgPhase[i] = Math.random() * Math.PI * 2;
        }

        const bgGeo = new THREE.BufferGeometry();
        bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
        bgGeo.setAttribute('aSize',    new THREE.BufferAttribute(bgSize, 1));
        bgGeo.setAttribute('aPhase',   new THREE.BufferAttribute(bgPhase, 1));

        const bgMat = new THREE.ShaderMaterial({
            vertexShader: BG_VERT, fragmentShader: BG_FRAG,
            uniforms: { uTime: { value: 0 } },
            transparent: true, depthWrite: false,
        });
        scene.add(new THREE.Points(bgGeo, bgMat));

        // ── Constellation stars ───────────────────────────────────────────
        const allStars = CONS.flatMap(c => c.stars);
        const SN = allStars.length;
        const csPos   = new Float32Array(SN * 3);
        const csSize  = new Float32Array(SN);
        const csPhase = new Float32Array(SN);
        const csColor = new Float32Array(SN * 3);

        allStars.forEach((s, i) => {
            csPos[i * 3]     = s.p[0];
            csPos[i * 3 + 1] = s.p[1];
            csPos[i * 3 + 2] = s.p[2];
            csSize[i]        = s.sz;
            csPhase[i]       = Math.random() * Math.PI * 2;
            if (s.gold) {
                csColor[i * 3] = 0.99; csColor[i * 3 + 1] = 0.87; csColor[i * 3 + 2] = 0.28;
            } else {
                csColor[i * 3] = 0.84; csColor[i * 3 + 1] = 0.93; csColor[i * 3 + 2] = 1.0;
            }
        });

        const csGeo = new THREE.BufferGeometry();
        csGeo.setAttribute('position', new THREE.BufferAttribute(csPos, 3));
        csGeo.setAttribute('aSize',    new THREE.BufferAttribute(csSize, 1));
        csGeo.setAttribute('aPhase',   new THREE.BufferAttribute(csPhase, 1));
        csGeo.setAttribute('aColor',   new THREE.BufferAttribute(csColor, 3));

        const csMat = new THREE.ShaderMaterial({
            vertexShader: CS_VERT, fragmentShader: CS_FRAG,
            uniforms: { uTime: { value: 0 } },
            transparent: true, depthWrite: false,
        });
        scene.add(new THREE.Points(csGeo, csMat));

        // ── Constellation lines ───────────────────────────────────────────
        const blueMats: THREE.LineBasicMaterial[] = [];
        const goldMats: THREE.LineBasicMaterial[] = [];

        for (const cons of CONS) {
            const positions: number[] = [];
            for (const ln of cons.lines) {
                positions.push(...cons.stars[ln.f].p, ...cons.stars[ln.t].p);
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            const mat = new THREE.LineBasicMaterial({
                color: cons.gold ? 0xfbcf24 : 0x78b4f0,
                transparent: true, opacity: cons.gold ? 0.45 : 0.28,
                depthWrite: false,
            });
            scene.add(new THREE.LineSegments(geo, mat));
            if (cons.gold) goldMats.push(mat); else blueMats.push(mat);
        }

        // ── Summer Triangle (dashed) ──────────────────────────────────────
        const triPos = [
            ...TRI[0], ...TRI[1],
            ...TRI[1], ...TRI[2],
            ...TRI[2], ...TRI[0],
        ];
        const triGeo = new THREE.BufferGeometry();
        triGeo.setAttribute('position', new THREE.Float32BufferAttribute(triPos, 3));
        const triMat = new THREE.LineDashedMaterial({
            color: 0x64c8ff, dashSize: 0.28, gapSize: 0.42,
            transparent: true, opacity: 0.2, depthWrite: false,
        });
        const triLine = new THREE.LineSegments(triGeo, triMat);
        triLine.computeLineDistances();
        scene.add(triLine);

        // ── Shooting stars ────────────────────────────────────────────────
        const shooters: SS[] = [];

        const spawnSS = () => {
            const startX = (Math.random() - 0.5) * 22;
            const startY = Math.random() * 5 + 1;
            const start = new THREE.Vector3(startX, startY, Z - 4);
            const dir   = new THREE.Vector3(0.4 + Math.random() * 0.4, -(0.4 + Math.random() * 0.4), 0).normalize();
            const len   = 1.8 + Math.random() * 2.5;
            const maxLife = 55 + Math.random() * 40;

            const sGeo = new THREE.BufferGeometry();
            sGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
            const sMat = new THREE.LineBasicMaterial({ color: 0xd0e8ff, transparent: true, opacity: 0, depthWrite: false });
            const mesh = new THREE.Line(sGeo, sMat);
            scene.add(mesh);
            shooters.push({ start, dir, len, life: 0, maxLife, mesh });
        };

        // ── Mouse parallax ────────────────────────────────────────────────
        let tgtX = 0, tgtY = 0, camX = 0, camY = 0;
        const onMouse = (e: MouseEvent) => {
            const r = mount.getBoundingClientRect();
            tgtX = ((e.clientX - r.left) / r.width  - 0.5) * 2.8;
            tgtY = (-(e.clientY - r.top)  / r.height + 0.5) * 1.8;
        };
        window.addEventListener('mousemove', onMouse);

        // ── Resize ────────────────────────────────────────────────────────
        const onResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', onResize);

        // ── Animation loop ────────────────────────────────────────────────
        let animId: number;

        const animate = (time: number) => {
            animId = requestAnimationFrame(animate);

            bgMat.uniforms.uTime.value = time;
            csMat.uniforms.uTime.value = time;

            // Parallax
            camX += (tgtX - camX) * 0.022;
            camY += (tgtY - camY) * 0.022;
            camera.position.set(camX, camY, 0);
            camera.lookAt(camX * 0.08, camY * 0.08, Z);

            // Pulse line opacity
            const bp = 0.22 + 0.1  * Math.sin(time * 0.001);
            const gp = 0.40 + 0.15 * Math.sin(time * 0.0012);
            blueMats.forEach(m => { m.opacity = bp; });
            goldMats.forEach(m => { m.opacity = gp; });
            triMat.opacity = 0.15 + 0.08 * Math.sin(time * 0.0009);

            // Shooting stars
            if (Math.random() < 0.004 && shooters.length < 3) spawnSS();

            for (let i = shooters.length - 1; i >= 0; i--) {
                const s = shooters[i];
                s.life++;
                const prog = s.life / s.maxLife;
                const fadeIn  = Math.min(prog * 5, 1);
                const fadeOut = 1 - prog * prog;
                const alpha   = fadeIn * fadeOut * 0.88;

                const head = s.start.clone().addScaledVector(s.dir, s.life * 0.14);
                const tail = head.clone().addScaledVector(s.dir, -s.len * (1 - prog * 0.5));

                const pa = s.mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
                pa.setXYZ(0, tail.x, tail.y, tail.z);
                pa.setXYZ(1, head.x, head.y, head.z);
                pa.needsUpdate = true;

                (s.mesh.material as THREE.LineBasicMaterial).opacity = alpha;

                if (s.life >= s.maxLife) {
                    scene.remove(s.mesh);
                    s.mesh.geometry.dispose();
                    (s.mesh.material as THREE.Material).dispose();
                    shooters.splice(i, 1);
                }
            }

            renderer.render(scene, camera);
        };

        animId = requestAnimationFrame(animate);

        // ── Cleanup ───────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('resize', onResize);

            scene.traverse(obj => {
                if ('geometry' in obj) (obj as THREE.Mesh).geometry?.dispose();
                if ('material' in obj) {
                    const m = (obj as THREE.Mesh).material;
                    if (Array.isArray(m)) m.forEach(x => x.dispose());
                    else (m as THREE.Material)?.dispose();
                }
            });
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
