<script setup lang="ts">
import { computed } from 'vue'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
  class?: string
  ratio: number | string
}

const props = defineProps<Props>()

const mergedClassName = computed(() =>
  twMerge('ratioArea relative w-full', props.class || props.className)
)

const paddingStyle = computed(() => ({
  width: '100%',
  paddingBottom: `${props.ratio}%`
}))
</script>

<template>
  <div :class="mergedClassName">
    <div
    class="fill pointer-events-none relative"
    :style="paddingStyle" />
    <slot />
  </div>
</template>