import { defineStore } from 'pinia'
import timezones, { type Timezone } from 'timezones.json'

export type TimeZoneSelected = Pick<Timezone, 'text' | 'offset'>

interface ITimeZoneState {
  timeZoneList: Timezone[]
  timeZonesSelected: TimeZoneSelected[]
}

export const useTimeZoneStore = defineStore('timeZone', {
  state: (): ITimeZoneState => {
    return {
      timeZoneList: timezones,
      timeZonesSelected: []
    }
  },
  getters: {
    getTimeZoneList: (state) => state.timeZoneList,
    getTimeZonesSelected: (state) => state.timeZonesSelected
  },
  actions: {
    setTimeZone(item: TimeZoneSelected) {
      const newTimeZone = {
        text: item.text,
        offset: item.offset
      }
      this.timeZonesSelected.push(newTimeZone)
    }
  }
})
