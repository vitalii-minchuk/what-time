<template>
  <v-container style="max-width: 900px">
    <WhatTimeSearch />
    <WhatTimeCard
      :currentTimeZone="currentTimeZone"
      :isCalendar="props.isCalendar"
    />
  </v-container>
</template>

<script setup lang="ts">
import WhatTimeCard from '@/components/WhatTime/WhatTimeCard.vue'
import WhatTimeSearch from '@/components/WhatTime/WhatTimeSearch.vue'
import { useTimeZoneStore } from '@/stores/timeZone'
import timezones from 'timezones.json'
import { onMounted } from 'vue'

const props = defineProps<{ isCalendar: boolean }>()
const timeZoneStore = useTimeZoneStore()
const userTimeZone = new window.Intl.DateTimeFormat().resolvedOptions().timeZone
const currentTimeZone = timezones.find((t) => t.utc.includes(userTimeZone))
onMounted(() => {
  if (currentTimeZone) {
    timeZoneStore.setTimeZone(currentTimeZone)
  }
})
</script>

<style scoped></style>
