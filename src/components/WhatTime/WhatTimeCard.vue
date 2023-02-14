<template>
  <v-card>
    <div v-for="zone in timeZonesSelected" :key="zone.text">
      {{ zone.text }}
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useTimeZoneStore } from '@/stores/timeZone'
import { computed } from 'vue'

const timeZoneStore = useTimeZoneStore()
const timeZonesSelected = computed(() => timeZoneStore.getTimeZonesSelected)
</script>

<style scoped></style>
