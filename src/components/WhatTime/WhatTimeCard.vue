<template>
  <v-card class="pa-4">
    <div class="pa-2" v-for="(zone, i) in timeZonesSelected" :key="zone.text">
      <div class="d-flex align-center">
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
        <v-col cols="9">
          {{ getOffset(zone.offset) }} {{ getName(zone) }}
        </v-col>
        <v-col class="text-end" cols="2">
          {{ getLocalTime(zone.offset) }}
        </v-col>
      </div>
      <div class="d-flex justify-end align-center">
        <div
          class="day"
          v-for="i in 24"
          :key="i"
          :style="(i + zone.offset + 24) % 24 === 0 ? 'margin-right: 8px' : ''"
          :class="
            (i + zone.offset + 24) % 24 > 22 || (i + zone.offset + 24) % 24 < 6
              ? 'bg-pink'
              : ''
          "
        >
          {{ (i + zone.offset + 24) % 24 }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import ArrowFilledSVG from '@/assets/icons/ArrowFilledSVG.vue'
import { useTimeZoneStore, type TimeZoneSelected } from '@/stores/timeZone'
import { useNow, useDateFormat } from '@vueuse/core'
import type { Timezone } from 'timezones.json'
import { computed } from 'vue'

const props = defineProps<{
  currentTimeZone?: Timezone
}>()
const timeZoneStore = useTimeZoneStore()
const timeZonesSelected = computed<TimeZoneSelected[]>(
  () => timeZoneStore.getTimeZonesSelected
)
function getLocalTime(offset: number) {
  if (!props.currentTimeZone) return
  const userOffset = props.currentTimeZone.offset * 60 * 60 * 1000
  const data =
    useNow({ interval: 5_000 }).value.getTime() -
    userOffset +
    offset * 60 * 60 * 1000
  return useDateFormat(data, 'HH:mm:ss a').value.replace(/"/g, '')
}
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
.day-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.day {
  width: 27px;
  height: 27px;
  text-align: center;
  border: 1px solid gray;
}
</style>
