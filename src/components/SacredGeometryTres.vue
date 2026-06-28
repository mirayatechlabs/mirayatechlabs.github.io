<template>
  <TresCanvas alpha antialias :clear-color="'transparent'">
    <TresPerspectiveCamera :position="[0, 0, 9]" :fov="40" />
    <TresScene>
      <Stars :radius="50" :depth="20" :count="3000" :size="0.05" :sizeAttenuation="true" />
      
      <Float :speed="1" :rotationIntensity="0.5" :floatIntensity="1">
        <TresGroup ref="groupRef">
          <!-- Anelli Concentrici -->
          <TresLineLoop v-for="(ring, idx) in rings" :key="'ring-'+idx" :geometry="ring.geo">
            <TresLineBasicMaterial :color="ring.color" :transparent="true" :opacity="ring.opacity" />
          </TresLineLoop>

          <!-- Seme della Vita -->
          <TresLineLoop v-for="(seed, idx) in seeds" :key="'seed-'+idx" :geometry="seed.geo" :position="seed.pos" ref="seedsRef">
            <TresLineBasicMaterial color="#b026ff" :transparent="true" :opacity="0.25" />
          </TresLineLoop>

          <!-- Solidi Platonici Annidati (wireframe) -->
          <TresLineSegments :geometry="icoGeo" ref="icoRef">
            <TresLineBasicMaterial color="#b026ff" :transparent="true" :opacity="0.8" />
          </TresLineSegments>
          <TresLineSegments :geometry="octaGeo" ref="octaRef">
            <TresLineBasicMaterial color="#ff0055" :transparent="true" :opacity="0.9" />
          </TresLineSegments>
          
          <!-- Punti per l'effetto luminoso -->
          <TresPoints :geometry="icoPtsGeo" ref="icoPtsRef">
            <TresPointsMaterial color="#00d2ff" :size="0.08" :transparent="true" :opacity="1" />
          </TresPoints>
          <TresPoints :geometry="crownGeo">
            <TresPointsMaterial color="#ff0055" :size="0.06" :transparent="true" :opacity="0.9" />
          </TresPoints>
        </TresGroup>
      </Float>
    </TresScene>
  </TresCanvas>
</template>

<script setup>
import { TresCanvas, useLoop } from '@tresjs/core'
import { Stars, Float } from '@tresjs/cientos'
import { shallowRef, onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const groupRef = shallowRef(null)
const icoRef = shallowRef(null)
const octaRef = shallowRef(null)
const icoPtsRef = shallowRef(null)
const seedsRef = shallowRef([])

const INK = '#b026ff' // Viola vibrante
const TERRACOTTA = '#ff0055' // Rosa/Rosso sgargiante
const OCHRE = '#00d2ff' // Azzurro acceso

const circlePoints = (radius, segments = 96) => {
  const pts = []
  for (let s = 0; s < segments; s++) {
    const a = (s / segments) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
  }
  return pts
}

const rings = [
  { geo: new THREE.BufferGeometry().setFromPoints(circlePoints(1.4)), opacity: 0.4, color: INK },
  { geo: new THREE.BufferGeometry().setFromPoints(circlePoints(2.3)), opacity: 0.3, color: INK },
  { geo: new THREE.BufferGeometry().setFromPoints(circlePoints(3.1)), opacity: 0.35, color: OCHRE },
]

const seeds = Array.from({ length: 6 }).map((_, k) => {
  const a = (k / 6) * Math.PI * 2
  return {
    geo: new THREE.BufferGeometry().setFromPoints(circlePoints(1.4)),
    pos: [Math.cos(a) * 1.4, Math.sin(a) * 1.4, 0]
  }
})

const icoGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.55))
const octaGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.95))
const icoPtsGeo = new THREE.IcosahedronGeometry(1.55)
const crownGeo = new THREE.BufferGeometry().setFromPoints(circlePoints(3.1, 36))

// Logica basata sullo scroll
const scrollProgress = ref(0)
let smoothedScroll = 0

const onScroll = () => {
  if (typeof window !== 'undefined') {
    // Calcoliamo la percentuale di scroll basandoci su una frazione della pagina 
    // in modo che l'esplosione avvenga man mano che si scende, ma molto lentamente.
    // Limitato a 1.
    scrollProgress.value = Math.min(window.scrollY / (window.innerHeight * 1.5), 1)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  if (!groupRef.value || !icoRef.value || !octaRef.value || !icoPtsRef.value) return

  const group = groupRef.value
  const ico = icoRef.value
  const octa = octaRef.value
  const icoPts = icoPtsRef.value

  const t = elapsed

  // Interpolazione lineare per ammorbidire lo scroll (inerzia molto morbida ed elegante)
  smoothedScroll += (scrollProgress.value - smoothedScroll) * delta * 2.0
  const sp = smoothedScroll

  // Rotazione di base automatica (molto lenta)
  group.rotation.z = t * 0.05
  ico.rotation.x = t * 0.1
  ico.rotation.y = t * 0.08
  icoPts.rotation.copy(ico.rotation)
  octa.rotation.x = -t * 0.12
  octa.rotation.y = -t * 0.09

  // Effetto "Esplosione/Scomposizione Lenta" guidato dallo scroll
  // Le geometrie si allontanano ed espandono leggermente
  const explosionScale = 1 + (sp * 0.4) // Scala max 1.4
  
  ico.scale.setScalar(explosionScale)
  icoPts.scale.setScalar(explosionScale)
  octa.scale.setScalar(1 + (sp * 0.7)) // L'ottaedro esplode un po' di più verso l'esterno

  // Il gruppo intero ruota sull'asse X per dare tridimensionalità mentre si scende
  group.rotation.x = sp * Math.PI * 0.25
  group.position.z = sp * 1.5 // Si avvicina allo spettatore

})
</script>
