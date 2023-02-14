<template>
  <div class="my-3">
    <input v-model="input" type="text" />
    <div>
      <div v-for="i in searchResult" :key="i.refIndex">
        <div @click="handleClick(i.item)">
          {{ i.item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimeZoneStore, type TimeZoneSelected } from '@/stores/timeZone'
import { computed, ref } from 'vue'
import Fuse from 'fuse.js'

const timeZoneStore = useTimeZoneStore()
const input = ref('')
const fuse = new Fuse(timeZoneStore.getTimeZoneList, {
  keys: ['utc', 'value'],
  threshold: 0.5
})
const searchResult = computed(() => fuse.search(input.value))

function handleClick(item: TimeZoneSelected) {
  timeZoneStore.setTimeZone(item)
  input.value = ''
}
</script>

<style scoped></style>
