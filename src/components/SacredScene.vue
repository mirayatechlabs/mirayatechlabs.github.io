<template>
  <TresGroup ref="groupRef">
    <!-- Anelli concentrici: "disegnati" dal laser (drawRange animato) -->
    <TresLineLoop v-for="(d, i) in ringDrawables" :key="'ring-' + i" :geometry="d.geo">
      <TresLineBasicMaterial :color="d.color" :transparent="true" :opacity="d.opacity" />
    </TresLineLoop>

    <!-- Seme della Vita -->
    <TresLineLoop
      v-for="(d, i) in seedDrawables"
      :key="'seed-' + i"
      :geometry="d.geo"
      :position="d.pos"
    >
      <TresLineBasicMaterial :color="OCHRE" :transparent="true" :opacity="0.55" />
    </TresLineLoop>

    <!-- Solidi platonici annidati (wireframe) -->
    <TresLineSegments :geometry="icoGeo">
      <TresLineBasicMaterial :color="TERRACOTTA" :transparent="true" :opacity="0.9" />
    </TresLineSegments>
    <TresLineSegments :geometry="octaGeo">
      <TresLineBasicMaterial :color="INK" :transparent="true" :opacity="0.75" />
    </TresLineSegments>

    <!-- Vertici dei solidi + testa del laser: costruiti in JS con la texture già
         nel materiale (round garantito), inseriti con primitive. -->
    <primitive :object="vertexPoints" />
    <primitive :object="sparkPoints" />
  </TresGroup>
</template>

<script setup>
import { useLoop } from '@tresjs/core'
import { shallowRef, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// Palette calda satura, leggibile sulla carta (blending normale)
const TERRACOTTA = '#c0532f'
const OCHRE = '#b3801f'
const INK = '#5a3a22'
const SPARK = '#e8631f'

const groupRef = shallowRef(null)

// Rende un PointsMaterial un bagliore rotondo modellando l'alpha in base alla
// distanza dal centro del punto (gl_PointCoord). `core` = raggio del nucleo pieno.
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

// ---------- Geometrie ----------
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
  geo.setDrawRange(0, 0)
  return geo
}

const ringSpecs = [
  { r: 1.45, color: OCHRE, opacity: 0.6 },
  { r: 2.35, color: TERRACOTTA, opacity: 0.5 },
  { r: 3.05, color: OCHRE, opacity: 0.45 },
]
const ringDrawables = ringSpecs.map((s) => ({
  geo: makeLineGeo(circlePoints(s.r)),
  color: s.color,
  opacity: s.opacity,
}))

const seedDrawables = Array.from({ length: 6 }).map((_, k) => {
  const a = (k / 6) * Math.PI * 2
  return {
    geo: makeLineGeo(circlePoints(1.45, 96)),
    pos: [Math.cos(a) * 1.45, Math.sin(a) * 1.45, 0],
  }
})

const icoGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.6))
const octaGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.95))
icoGeo.setDrawRange(0, 0)
octaGeo.setDrawRange(0, 0)

const vertexGeo = new THREE.IcosahedronGeometry(1.6)

// Timeline del disegno [start, end] in secondi
const BUILD = []
const pushBuild = (geo, t0, t1) => {
  BUILD.push({ geo, count: geo.attributes.position.count, t0, t1 })
}
// Timeline lenta e scandita: si segue ogni tratto del laser (durata ~5.5s)
ringDrawables.forEach((d, i) => pushBuild(d.geo, 0.0 + i * 0.5, 1.6 + i * 0.5))
seedDrawables.forEach((d, i) => pushBuild(d.geo, 1.7 + i * 0.28, 3.0 + i * 0.28))
pushBuild(icoGeo, 3.9, 5.1)
pushBuild(octaGeo, 4.4, 5.6)
const BUILD_END = 5.8

const sparkGeo = new THREE.BufferGeometry()
const sparkPositions = new Float32Array(BUILD.length * 3)
sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))

// Vertici: bagliori tondi terracotta. Testa laser: nucleo caldo brillante + alone.
const vertexMat = new THREE.PointsMaterial({
  color: new THREE.Color(TERRACOTTA),
  size: 0.22,
  transparent: true,
  opacity: 0,
  depthWrite: false,
  sizeAttenuation: true,
})
roundGlow(vertexMat, 0.0)
const vertexPoints = new THREE.Points(vertexGeo, vertexMat)

const sparkMat = new THREE.PointsMaterial({
  color: new THREE.Color(SPARK),
  size: 0.6,
  transparent: true,
  opacity: 0,
  depthWrite: false,
  sizeAttenuation: true,
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
    BUILD.forEach((b) => b.geo.setDrawRange(0, b.count))
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

  // 1) Disegno laser progressivo
  if (!prefersReduced && elapsed < BUILD_END + 0.5) {
    let activeSparks = 0
    for (let i = 0; i < BUILD.length; i++) {
      const b = BUILD[i]
      const p = THREE.MathUtils.clamp((elapsed - b.t0) / (b.t1 - b.t0), 0, 1)
      const drawn = Math.floor(p * b.count)
      b.geo.setDrawRange(0, drawn)
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
    sparkMat.opacity = activeSparks > 0 ? 1 : 0
    // Battito luminoso: la testa del laser "respira" mentre disegna
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
