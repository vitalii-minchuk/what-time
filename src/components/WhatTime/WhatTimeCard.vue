<template>
  <v-card>
    <div v-for="zone in timeZonesSelected" :key="zone.text">
      {{ zone.offset }} {{ getName(zone) }}
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useTimeZoneStore, type TimeZoneSelected } from '@/stores/timeZone'
import { computed } from 'vue'

const timeZoneStore = useTimeZoneStore()
const timeZonesSelected = computed(() => timeZoneStore.getTimeZonesSelected)

function getName(item: TimeZoneSelected) {
  const index = item.text.indexOf(')')
  return item.text.slice(index + 1).trim()
}
</script>

<style scoped></style>
