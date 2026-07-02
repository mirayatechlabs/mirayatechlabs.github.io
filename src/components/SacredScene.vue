<template>
  <TresGroup ref="groupRef">
    <!-- Strati del mandala: fasci laser Line2 (nucleo + alone), disegnati dal centro -->
    <primitive v-for="(l, i) in lasers" :key="'layer-' + i" :object="l.group" />
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

// Palette allineata al design system — vermiglio, oro, viola
const VERMILION = '#e14f28'
const GOLD = '#e2a24b'
const VIOLET = '#8a4fd8'
const SPARK = '#ff8c42'

const groupRef = shallowRef(null)
const { sizes } = useTresContext()

// ---------- Fascio laser: Line2 a doppio strato (nucleo + alone) ----------
const allLineMats = []

const makeLaser = (positions, color, { core = 2.2, halo = 8, haloOpacity = 0.18, opacity = 0.95 } = {}) => {
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

// ---------- Curve del mandala (percorsi chiusi continui) ----------
// Anello smerlato: r(θ) = r0 + amp·cos(kθ+φ). Con amp=0 è un cerchio.
const scallopSegments = (r0, amp, k, n = 220, phase = 0) => {
  const arr = []
  const rAt = (a) => r0 + amp * Math.cos(k * a + phase)
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2
    const a1 = ((i + 1) / n) * Math.PI * 2
    arr.push(
      Math.cos(a0) * rAt(a0), Math.sin(a0) * rAt(a0), 0,
      Math.cos(a1) * rAt(a1), Math.sin(a1) * rAt(a1), 0
    )
  }
  return arr
}

// Rosa polare: r(θ) = R·cos(kθ) — corolla di petali che passa per il centro.
const roseSegments = (R, k, n = 340) => {
  const arr = []
  const pt = (a) => {
    const r = R * Math.cos(k * a)
    return [Math.cos(a) * r, Math.sin(a) * r]
  }
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2
    const a1 = ((i + 1) / n) * Math.PI * 2
    const [x0, y0] = pt(a0)
    const [x1, y1] = pt(a1)
    arr.push(x0, y0, 0, x1, y1, 0)
  }
  return arr
}

// ---------- Strati, dal centro verso l'esterno ----------
const lasers = []
const push = (l, dir) => {
  l.dir = dir // verso di rotazione nella fase "viva"
  lasers.push(l)
  return l
}

const core8 = push(makeLaser(roseSegments(1.15, 4), VERMILION, { core: 2.2, halo: 8, haloOpacity: 0.2 }), 1)
const wreath8 = push(makeLaser(scallopSegments(1.5, 0.22, 8), GOLD, { core: 1.8, halo: 7, haloOpacity: 0.15 }), -1)
const wreath12 = push(makeLaser(scallopSegments(2.05, 0.3, 12, 260, Math.PI), VIOLET, { core: 2.2, halo: 8, haloOpacity: 0.18 }), 1)
const ringMid = push(makeLaser(scallopSegments(2.62, 0, 1, 180), GOLD, { core: 1.5, halo: 6, haloOpacity: 0.12, opacity: 0.75 }), -1)
const lace24 = push(makeLaser(scallopSegments(2.82, 0.1, 24, 300), VERMILION, { core: 1.4, halo: 5, haloOpacity: 0.1, opacity: 0.65 }), 1)
const ringOut = push(makeLaser(scallopSegments(3.12, 0, 1, 180), GOLD, { core: 1.6, halo: 6, haloOpacity: 0.14, opacity: 0.85 }), -1)

// Timeline del disegno [start, end] in secondi — dal centro, lenta e scandita
const BUILD = []
const pushBuild = (laser, t0, t1) => BUILD.push({ ...laser, t0, t1 })
pushBuild(core8, 0.0, 1.8)
pushBuild(wreath8, 1.2, 2.9)
pushBuild(wreath12, 2.3, 4.2)
pushBuild(ringMid, 3.8, 4.8)
pushBuild(lace24, 4.4, 5.7)
pushBuild(ringOut, 5.2, 6.3)
const BUILD_END = 6.5

// Punti-luce sulle punte dei 12 petali viola (figli dello strato: ruotano con lui)
const roundGlow = (mat, coreR = 0.0) => {
  mat.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      'vec4 diffuseColor = vec4( diffuse, opacity );',
      `float _d = length( gl_PointCoord - vec2( 0.5 ) );
       float _a = smoothstep( 0.5, ${coreR.toFixed(2)}, _d );
       vec4 diffuseColor = vec4( diffuse, opacity * _a );`
    )
  }
}

const tipPositions = new Float32Array(12 * 3)
for (let m = 0; m < 12; m++) {
  // punte dove cos(12θ+π)=1 → θ = (2m+1)π/12
  const a = ((2 * m + 1) * Math.PI) / 12
  const r = 2.05 + 0.3
  tipPositions[m * 3] = Math.cos(a) * r
  tipPositions[m * 3 + 1] = Math.sin(a) * r
  tipPositions[m * 3 + 2] = 0
}
const tipsGeo = new THREE.BufferGeometry()
tipsGeo.setAttribute('position', new THREE.BufferAttribute(tipPositions, 3))
const tipsMat = new THREE.PointsMaterial({
  color: new THREE.Color(VIOLET),
  size: 0.16, transparent: true, opacity: 0, depthWrite: false, sizeAttenuation: true,
})
roundGlow(tipsMat, 0.0)
wreath12.group.add(new THREE.Points(tipsGeo, tipsMat))

// Testa incandescente del laser (una per strato in costruzione)
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
    tipsMat.opacity = 0.85
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

  // LineMaterial richiede la risoluzione del canvas per il linewidth in px
  const w = sizes.width.value || 1
  const h = sizes.height.value || 1
  for (const m of allLineMats) m.resolution.set(w, h)

  // 1) Il laser disegna il mandala, strato per strato
  if (!prefersReduced && elapsed < BUILD_END + 0.5) {
    let activeSparks = 0
    for (let i = 0; i < BUILD.length; i++) {
      const b = BUILD[i]
      const p = THREE.MathUtils.clamp((elapsed - b.t0) / (b.t1 - b.t0), 0, 1)
      const drawn = Math.floor(p * b.segCount)
      b.geo.instanceCount = drawn
      if (p > 0 && p < 1 && drawn > 0) {
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
    sparkMat.size = 0.55 * (1 + 0.25 * Math.sin(elapsed * 7))
    // Le punte dei petali si accendono verso la fine
    tipsMat.opacity = THREE.MathUtils.clamp((elapsed - 5.6) / 1.0, 0, 1) * 0.85
  } else if (sparkMat.opacity > 0) {
    sparkMat.opacity = Math.max(0, sparkMat.opacity - delta * 2)
  }

  if (prefersReduced) {
    group.rotation.set(-0.12, -0.15, 0)
    return
  }

  // 2) Vita: a disegno finito gli strati contro-ruotano piano (il mandala respira)
  if (elapsed > BUILD_END) {
    const spin = Math.min((elapsed - BUILD_END) / 3, 1) // rampa dolce
    for (const l of lasers) {
      l.group.rotation.z += l.dir * delta * 0.035 * spin
    }
  }

  // 3) Scroll + mouse + ambiente sul gruppo intero
  scrollSmooth += (scrollTarget - scrollSmooth) * Math.min(delta * 2.2, 1)
  tiltX += (pointerY * 0.2 - tiltX) * Math.min(delta * 3, 1)
  tiltY += (pointerX * 0.28 - tiltY) * Math.min(delta * 3, 1)

  group.rotation.x = tiltX + scrollSmooth * Math.PI * 0.2
  group.rotation.y = tiltY + Math.sin(elapsed * 0.15) * 0.04

  const bloom = 1 + scrollSmooth * 0.35
  group.scale.setScalar(bloom)
  group.position.z = scrollSmooth * 1.4
  group.position.y = Math.sin(elapsed * 0.4) * 0.05
})
</script>
