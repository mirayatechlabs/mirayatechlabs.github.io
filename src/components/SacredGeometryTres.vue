<template>
  <TresCanvas antialias :dpr="[1, 2]" :clear-color="'#f2ede3'">
    <TresPerspectiveCamera :position="[0, 0, 9]" :fov="42" />
    <SacredScene />
  </TresCanvas>
</template>

<script setup>
// Wrapper del canvas. La logica della scena (geometrie, laser, useLoop) vive in
// SacredScene.vue: i hook di TresJS (useLoop/useTresContext) richiedono di stare
// in un componente FIGLIO di <TresCanvas>, non nello stesso che lo dichiara.
import { TresCanvas } from '@tresjs/core'
import SacredScene from './SacredScene.vue'
</script>
