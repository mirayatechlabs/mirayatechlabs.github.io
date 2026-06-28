<template>
  <TresCanvas alpha antialias :dpr="[1, 2]" :clear-color="'transparent'">
    <TresPerspectiveCamera :position="[0, 0, 9]" :fov="42" />

    <TresGroup ref="groupRef">
      <!-- Linee della geometria sacra: vengono "disegnate" dal laser (drawRange animato) -->
      <TresLineLoop
        v-for="(d, i) in ringDrawables"
        :key="'ring-' + i"
        :geometry="d.geo"
      >
        <TresLineBasicMaterial
          :color="d.color"
          :transparent="true"
          :opacity="d.opacity"
          :blending="AdditiveBlending"
          :depthWrite="false"
        />
      </TresLineLoop>

      <TresLineLoop
        v-for="(d, i) in seedDrawables"
        :key="'seed-' + i"
        :geometry="d.geo"
        :position="d.pos"
      >
        <TresLineBasicMaterial
          :color="OCHRE"
          :transparent="true"
          :opacity="0.5"
          :blending="AdditiveBlending"
          :depthWrite="false"
        />
      </TresLineLoop>

      <TresLineSegments :geometry="icoGeo">
        <TresLineBasicMaterial
          :color="TERRACOTTA"
          :transparent="true"
          :opacity="0.95"
          :blending="AdditiveBlending"
          :depthWrite="false"
        />
      </TresLineSegments>

      <TresLineSegments :geometry="octaGeo">
        <TresLineBasicMaterial
          :color="OCHRE_HOT"
          :transparent="true"
          :opacity="0.95"
          :blending="AdditiveBlending"
          :depthWrite="false"
        />
      </TresLineSegments>

      <!-- Vertici luminosi dei solidi: compaiono a disegno completato -->
      <TresPoints :geometry="vertexGeo">
        <TresPointsMaterial
          ref="vertexMatRef"
          :color="OCHRE_HOT"
          :size="0.1"
          :transparent="true"
          :opacity="0"
          :blending="AdditiveBlending"
          :depthWrite="false"
          :sizeAttenuation="true"
        />
      </TresPoints>

      <!-- Testa incandescente del laser: segue i tracciati in costruzione -->
      <TresPoints :geometry="sparkGeo">
        <TresPointsMaterial
          ref="sparkMatRef"
          :color="SPARK"
          :size="0.22"
          :transparent="true"
          :opacity="0"
          :blending="AdditiveBlending"
          :depthWrite="false"
          :sizeAttenuation="true"
        />
      </TresPoints>

      <!-- Polvere ocra ambientale, rada -->
      <TresPoints :geometry="dustGeo">
        <TresPointsMaterial
          :color="DUST"
          :size="0.045"
          :transparent="true"
          :opacity="0.5"
          :blending="AdditiveBlending"
          :depthWrite="false"
          :sizeAttenuation="true"
        />
      </TresPoints>
    </TresGroup>
  </TresCanvas>
</template>

<script setup>
import { TresCanvas, useLoop } from '@tresjs/core'
import { shallowRef, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const AdditiveBlending = THREE.AdditiveBlending

// Palette calda on-brand (su nicchia scura le linee additive leggono come luce)
const TERRACOTTA = '#e3623c'
const OCHRE = '#d99a3e'
const OCHRE_HOT = '#f0bd5a'
const SPARK = '#fff1d4' // testa del laser, bianco-caldo incandescente
const DUST = '#b98a3e'

const groupRef = shallowRef(null)
const vertexMatRef = shallowRef(null)
const sparkMatRef = shallowRef(null)

// ---------- Costruzione geometrie ----------
const circlePoints = (radius, segments = 128) => {
  const pts = []
  for (let s = 0; s <= segments; s++) {
    const a = (s / segments) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
  }
  return pts
}

const makeLineGeo = (points) => {
  const geo = new THREE.BufferGeometry().setFromPoints(points)
  geo.setDrawRange(0, 0) // parte "non disegnata"
  return geo
}

// Anelli concentrici
const ringSpecs = [
  { r: 1.45, color: OCHRE, opacity: 0.55 },
  { r: 2.35, color: TERRACOTTA, opacity: 0.45 },
  { r: 3.05, color: OCHRE, opacity: 0.4 },
]
const ringDrawables = ringSpecs.map((s) => ({
  geo: makeLineGeo(circlePoints(s.r)),
  color: s.color,
  opacity: s.opacity,
}))

// Seme della Vita: 6 cerchi attorno al centro
const seedDrawables = Array.from({ length: 6 }).map((_, k) => {
  const a = (k / 6) * Math.PI * 2
  return {
    geo: makeLineGeo(circlePoints(1.45, 96)),
    pos: [Math.cos(a) * 1.45, Math.sin(a) * 1.45, 0],
  }
})

// Solidi platonici annidati (wireframe)
const icoGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.6))
const octaGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.95))
icoGeo.setDrawRange(0, 0)
octaGeo.setDrawRange(0, 0)

// Vertici luminosi (dall'icosaedro)
const vertexGeo = new THREE.IcosahedronGeometry(1.6)

// Timeline del disegno: ogni elemento ha la sua finestra [start, end] in secondi
const BUILD = [] // { geo, count, t0, t1 }
const pushBuild = (geo, t0, t1) => {
  BUILD.push({ geo, count: geo.attributes.position.count, t0, t1 })
}
ringDrawables.forEach((d, i) => pushBuild(d.geo, 0.0 + i * 0.18, 0.9 + i * 0.18))
seedDrawables.forEach((d, i) => pushBuild(d.geo, 0.7 + i * 0.1, 1.5 + i * 0.1))
pushBuild(icoGeo, 1.5, 2.3)
pushBuild(octaGeo, 1.7, 2.5)
const BUILD_END = 2.7

// Spark: una testa luminosa per ciascun tracciato in costruzione
const sparkGeo = new THREE.BufferGeometry()
const sparkPositions = new Float32Array(BUILD.length * 3)
sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))

// Polvere ambientale
const dustGeo = (() => {
  const N = 220
  const arr = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    const r = 2 + Math.random() * 6
    const a = Math.random() * Math.PI * 2
    const z = (Math.random() - 0.5) * 6
    arr[i * 3] = Math.cos(a) * r
    arr[i * 3 + 1] = Math.sin(a) * r
    arr[i * 3 + 2] = z
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
  return g
})()

// ---------- Stato interazione ----------
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
    // Reduced motion: niente costruzione laser, geometria già completa e statica
    BUILD.forEach((b) => b.geo.setDrawRange(0, b.count))
    if (vertexMatRef.value) vertexMatRef.value.opacity = 0.9
  }
  // Mette in pausa la logica quando il canvas è fuori dallo schermo
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

// ---------- Loop di render ----------
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  const group = groupRef.value
  if (!group || !visible) return

  // 1) Disegno laser progressivo
  if (!prefersReduced && elapsed < BUILD_END + 0.5) {
    let activeSparks = 0
    for (let i = 0; i < BUILD.length; i++) {
      const b = BUILD[i]
      const p = THREE.MathUtils.clamp((elapsed - b.t0) / (b.t1 - b.t0), 0, 1)
      const drawn = Math.floor(p * b.count)
      b.geo.setDrawRange(0, drawn)
      // Testa del laser sul vertice di punta, solo mentre il tracciato è in corso
      if (p > 0 && p < 1 && drawn > 0) {
        const arr = b.geo.attributes.position.array
        const idx = (drawn - 1) * 3
        sparkPositions[activeSparks * 3] = arr[idx]
        sparkPositions[activeSparks * 3 + 1] = arr[idx + 1]
        sparkPositions[activeSparks * 3 + 2] = arr[idx + 2]
        activeSparks++
      }
    }
    sparkGeo.setDrawRange(0, activeSparks)
    sparkGeo.attributes.position.needsUpdate = true
    if (sparkMatRef.value) sparkMatRef.value.opacity = activeSparks > 0 ? 1 : 0
    // I vertici luminosi sfumano in entrata verso fine costruzione
    if (vertexMatRef.value) {
      const vp = THREE.MathUtils.clamp((elapsed - 2.2) / 0.8, 0, 1)
      vertexMatRef.value.opacity = vp * 0.9
    }
  } else if (sparkMatRef.value && sparkMatRef.value.opacity > 0) {
    sparkMatRef.value.opacity = Math.max(0, sparkMatRef.value.opacity - delta * 2)
  }

  if (prefersReduced) {
    // Posa statica leggermente inclinata, nessuna animazione
    group.rotation.set(-0.15, -0.2, 0)
    return
  }

  // 2) Vita: scroll + mouse + ambiente
  scrollSmooth += (scrollTarget - scrollSmooth) * Math.min(delta * 2.2, 1)
  tiltX += (pointerY * 0.18 - tiltX) * Math.min(delta * 3, 1)
  tiltY += (pointerX * 0.25 - tiltY) * Math.min(delta * 3, 1)

  const t = elapsed
  // Rotazione ambientale lenta + tilt mouse + apertura su scroll
  group.rotation.z = t * 0.04
  group.rotation.x = tiltX + scrollSmooth * Math.PI * 0.22
  group.rotation.y = tiltY + Math.sin(t * 0.15) * 0.05

  // "Sboccia": leggera espansione e avvicinamento allo scroll
  const bloom = 1 + scrollSmooth * 0.35
  group.scale.setScalar(bloom)
  group.position.z = scrollSmooth * 1.4
  // Respiro ambientale
  group.position.y = Math.sin(t * 0.4) * 0.06
})
</script>
