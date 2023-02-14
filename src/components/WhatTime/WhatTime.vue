<template>
  <v-container>
    <WhatTimeSearch />
    <WhatTimeCard />
  </v-container>
</template>

<script setup lang="ts">
import WhatTimeSearch from '@/components/WhatTime/WhatTimeSearch.vue'
import WhatTimeCard from '@/components/WhatTime/WhatTimeCard.vue'
import timezones from 'timezones.json'
import { onMounted } from 'vue'
import { useTimeZoneStore } from '@/stores/timeZone'

onMounted(() => {
  const timeZoneStore = useTimeZoneStore()
  const userTimeZone = new window.Intl.DateTimeFormat().resolvedOptions()
    .timeZone
  const currentTimeZone = timezones.find((t) => t.utc.includes(userTimeZone))
  if (currentTimeZone) {
    timeZoneStore.setTimeZone(currentTimeZone)
  }
})
</script>

<style scoped></style>
