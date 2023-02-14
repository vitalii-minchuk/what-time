import { defineStore } from 'pinia'
import timezones, { type Timezone } from 'timezones.json'
import { computed, ref } from 'vue'

export type TimeZoneSelected = Pick<Timezone, 'text' | 'offset' | 'isdst'>

export const useTimeZoneStore = defineStore('timeZone', () => {
  const timeZoneList = ref<Timezone[]>(timezones)
  const timeZonesSelected = ref<TimeZoneSelected[]>([])

  const getTimeZoneList = computed(() => timeZoneList.value)
  const getTimeZonesSelected = computed(() => timeZonesSelected.value)

  function setTimeZone(item: TimeZoneSelected) {
    const newTimeZone = {
      text: item.text,
      offset: item.offset,
      isdst: item.isdst
    }
    timeZonesSelected.value.push(newTimeZone)
  }
  function removeTimeZone(item: string) {
    const index = timeZonesSelected.value.findIndex((t) => t.text === item)
    timeZonesSelected.value.splice(index, 1)
  }
  function moveZone(item: TimeZoneSelected, direction: 1 | -1) {
    const target = timeZonesSelected.value.findIndex(
      (t) => t.text === item.text
    )
    const moveTo = target + direction
    const other = timeZonesSelected.value[moveTo]
    timeZonesSelected.value[moveTo] = item
    timeZonesSelected.value[target] = other
  }

  return {
    getTimeZoneList,
    getTimeZonesSelected,
    setTimeZone,
    removeTimeZone,
    moveZone
  }
})
