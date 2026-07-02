<template>
  <TresGroup ref="groupRef">
    <!-- Fasci laser (Line2: nucleo brillante + alone) costruiti in JS -->
    <primitive v-for="(l, i) in lasers" :key="'laser-' + i" :object="l.group" />
    <primitive :object="vertexPoints" />
    <primitive :object="sparkPoints" />
  </TresGroup>
</template>

<script setup>
import { useLoop, useTresContext } from '@tresjs/core'
import { shallowRef, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'

// Palette calda luminosa — niente toni scuri/neri
const TERRACOTTA = '#d95e40'
const GOLD = '#e2a24b'
const OCHRE = '#d99a3e'
const EMBER = '#f07a3a'
const SPARK = '#ff8c42'

const groupRef = shallowRef(null)
const { sizes } = useTresContext()

// ---------- Laser: Line2 a doppio strato (nucleo + alone) ----------
// linewidth è in pixel reali (LineMaterial), non il px singolo dei GL_LINES:
// è questo che dà il corpo da "fascio laser".
const allLineMats = []

const makeLaser = (positions, color, { core = 2.5, halo = 9, haloOpacity = 0.2, opacity = 0.95 } = {}) => {
  const geo = new LineSegmentsGeometry()
  geo.setPositions(positions)
  const segCount = positions.length / 6

  const coreMat = new LineMaterial({
    color, linewidth: core, transparent: true, opacity, depthWrite: false,
  })
  const haloMat = new LineMaterial({
    color, linewidth: halo, transparent: true, opacity: haloOpacity, depthWrite: false,
  })
  allLineMats.push(coreMat, haloMat)

  const group = new THREE.Group()
  group.add(new LineSegments2(geo, coreMat), new LineSegments2(geo, haloMat))
  geo.instanceCount = 0 // parte "non disegnato"

  return { group, geo, segCount, positions }
}

// Cerchio come lista di segmenti (coppie), con offset opzionale
const circleSegments = (r, n = 96, cx = 0, cy = 0) => {
  const arr = []
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2
    const a1 = ((i + 1) / n) * Math.PI * 2
    arr.push(
      cx + Math.cos(a0) * r, cy + Math.sin(a0) * r, 0,
      cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, 0
    )
  }
  return arr
}

const lasers = []

// Anelli concentrici — oro e terracotta
lasers.push(makeLaser(circleSegments(1.45, 96), GOLD, { core: 2, halo: 7, haloOpacity: 0.18 }))
lasers.push(makeLaser(circleSegments(2.35, 128), TERRACOTTA, { core: 2, halo: 8, haloOpacity: 0.16 }))
lasers.push(makeLaser(circleSegments(3.05, 128), OCHRE, { core: 1.8, halo: 7, haloOpacity: 0.14, opacity: 0.8 }))

// Seme della Vita — ocra chiara
const seedLasers = Array.from({ length: 6 }).map((_, k) => {
  const a = (k / 6) * Math.PI * 2
  const l = makeLaser(
    circleSegments(1.45, 72, Math.cos(a) * 1.45, Math.sin(a) * 1.45),
    GOLD,
    { core: 1.6, halo: 6, haloOpacity: 0.12, opacity: 0.6 }
  )
  lasers.push(l)
  return l
})

// Solidi platonici — terracotta brillante + oro (niente più quasi-nero)
const edgePositions = (edgesGeo) => Array.from(edgesGeo.attributes.position.array)
const icoEdges = edgePositions(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.6)))
const octaEdges = edgePositions(new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.95)))
const icoLaser = makeLaser(icoEdges, TERRACOTTA, { core: 2.4, halo: 9, haloOpacity: 0.2 })
const octaLaser = makeLaser(octaEdges, EMBER, { core: 2.2, halo: 8, haloOpacity: 0.22 })
lasers.push(icoLaser, octaLaser)

// Timeline del disegno [start, end] in secondi (lenta, si segue ogni tratto)
const BUILD = []
const pushBuild = (laser, t0, t1) => BUILD.push({ ...laser, t0, t1 })
pushBuild(lasers[0], 0.0, 1.6)
pushBuild(lasers[1], 0.5, 2.1)
pushBuild(lasers[2], 1.0, 2.6)
seedLasers.forEach((l, i) => pushBuild(l, 1.7 + i * 0.28, 3.0 + i * 0.28))
pushBuild(icoLaser, 3.9, 5.1)
pushBuild(octaLaser, 4.4, 5.6)
const BUILD_END = 5.8

// ---------- Punti: vertici e testa del laser (glow rotondo via shader) ----------
const roundGlow = (mat, core = 0.0) => {
  mat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      'vec4 diffuseColor = vec4( diffuse, opacity );',
      `float _d = length( gl_PointCoord - vec2( 0.5 ) );
       float _a = smoothstep( 0.5, ${core.toFixed(2)}, _d );
       vec4 diffuseColor = vec4( diffuse, opacity * _a );`
    )
  }
}

const vertexGeo = new THREE.IcosahedronGeometry(1.6)
const vertexMat = new THREE.PointsMaterial({
  color: new THREE.Color(TERRACOTTA),
  size: 0.22, transparent: true, opacity: 0, depthWrite: false, sizeAttenuation: true,
})
roundGlow(vertexMat, 0.0)
const vertexPoints = new THREE.Points(vertexGeo, vertexMat)

const sparkGeo = new THREE.BufferGeometry()
const sparkPositions = new Float32Array(BUILD.length * 3)
sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))
const sparkMat = new THREE.PointsMaterial({
  color: new THREE.Color(SPARK),
  size: 0.6, transparent: true, opacity: 0, depthWrite: false, sizeAttenuation: true,
})
roundGlow(sparkMat, 0.18)
const sparkPoints = new THREE.Points(sparkGeo, sparkMat)

// ---------- Interazione ----------
const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let scrollTarget = 0
let scrollSmooth = 0
let pointerX = 0
let pointerY = 0
let tiltX = 0
let tiltY = 0
let visible = true
let observer = null

const onScroll = () => {
  scrollTarget = Math.min(window.scrollY / (window.innerHeight * 1.4), 1)
}
const onPointer = (e) => {
  pointerX = (e.clientX / window.innerWidth) * 2 - 1
  pointerY = (e.clientY / window.innerHeight) * 2 - 1
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  if (!prefersReduced) {
    window.addEventListener('pointermove', onPointer, { passive: true })
  } else {
    BUILD.forEach((b) => (b.geo.instanceCount = b.segCount))
    vertexMat.opacity = 0.9
  }
  requestAnimationFrame(() => {
    const figure = document.querySelector('.hero-figure')
    if (figure && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((en) => (visible = en.isIntersecting)),
        { threshold: 0.01 }
      )
      observer.observe(figure)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('pointermove', onPointer)
  observer?.disconnect()
})

// ---------- Loop ----------
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  const group = groupRef.value
  if (!group || !visible) return

  // LineMaterial ha bisogno della risoluzione del canvas per il linewidth in px
  const w = sizes.width.value || 1
  const h = sizes.height.value || 1
  for (const m of allLineMats) m.resolution.set(w, h)

  // 1) Disegno laser progressivo (instanceCount = segmenti disegnati)
  if (!prefersReduced && elapsed < BUILD_END + 0.5) {
    let activeSparks = 0
    for (let i = 0; i < BUILD.length; i++) {
      const b = BUILD[i]
      const p = THREE.MathUtils.clamp((elapsed - b.t0) / (b.t1 - b.t0), 0, 1)
      const drawn = Math.floor(p * b.segCount)
      b.geo.instanceCount = drawn
      if (p > 0 && p < 1 && drawn > 0) {
        // Punta del fascio: fine dell'ultimo segmento disegnato
        const idx = (drawn - 1) * 6 + 3
        sparkPositions[activeSparks * 3] = b.positions[idx]
        sparkPositions[activeSparks * 3 + 1] = b.positions[idx + 1]
        sparkPositions[activeSparks * 3 + 2] = b.positions[idx + 2]
        activeSparks++
      }
    }
    sparkGeo.setDrawRange(0, activeSparks)
    sparkGeo.attributes.position.needsUpdate = true
    sparkMat.opacity = activeSparks > 0 ? 1 : 0
    // Battito luminoso della testa del laser
    sparkMat.size = 0.55 * (1 + 0.25 * Math.sin(elapsed * 7))
    const vp = THREE.MathUtils.clamp((elapsed - 5.0) / 1.0, 0, 1)
    vertexMat.opacity = vp * 0.85
  } else if (sparkMat.opacity > 0) {
    sparkMat.opacity = Math.max(0, sparkMat.opacity - delta * 2)
  }

  if (prefersReduced) {
    group.rotation.set(-0.15, -0.2, 0)
    return
  }

  // 2) Vita: scroll + mouse + ambiente
  scrollSmooth += (scrollTarget - scrollSmooth) * Math.min(delta * 2.2, 1)
  tiltX += (pointerY * 0.18 - tiltX) * Math.min(delta * 3, 1)
  tiltY += (pointerX * 0.25 - tiltY) * Math.min(delta * 3, 1)

  const t = elapsed
  group.rotation.z = t * 0.04
  group.rotation.x = tiltX + scrollSmooth * Math.PI * 0.22
  group.rotation.y = tiltY + Math.sin(t * 0.15) * 0.05

  const bloom = 1 + scrollSmooth * 0.35
  group.scale.setScalar(bloom)
  group.position.z = scrollSmooth * 1.4
  group.position.y = Math.sin(t * 0.4) * 0.06
})
</script>
