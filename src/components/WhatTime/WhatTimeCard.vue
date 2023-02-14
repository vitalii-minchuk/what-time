<template>
  <v-card class="px-4 py2">
    <div
      class="d-flex align-center"
      v-for="(zone, i) in timeZonesSelected"
      :key="zone.text"
    >
      <v-col cols="1">
        <v-btn
          @click="timeZoneStore.removeTimeZone(zone.text)"
          block
          variant="plain"
          >X</v-btn
        >
        <v-btn
          v-if="i !== 0"
          @click="timeZoneStore.moveZone(zone, -1)"
          variant="plain"
          block
        >
          <ArrowFilledSVG type="up" :size="16" />
        </v-btn>
        <v-btn
          v-if="i !== timeZonesSelected.length - 1"
          @click="timeZoneStore.moveZone(zone, 1)"
          variant="plain"
          block
        >
          <ArrowFilledSVG type="down" :size="16" />
        </v-btn>
      </v-col>
      <v-col cols="11">
        {{ getOffset(zone.offset) }} {{ getName(zone) }}
      </v-col>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import ArrowFilledSVG from '@/assets/icons/ArrowFilledSVG.vue'
import { useTimeZoneStore, type TimeZoneSelected } from '@/stores/timeZone'
import { computed } from 'vue'

const timeZoneStore = useTimeZoneStore()
const timeZonesSelected = computed<TimeZoneSelected[]>(
  () => timeZoneStore.getTimeZonesSelected
)
function getOffset(offset: number) {
  if (offset > 0) {
    return '+ ' + offset
  } else {
    return offset
  }
}
function getName(item: TimeZoneSelected) {
  const index = item.text.indexOf(')')
  return item.text.slice(index + 1).trim()
}
</script>

<style scoped>
.zone {
  border-bottom: 1px solid gray;
  margin: 0;
  padding: 0;
}
</style>
