<template>
  <div ref="target" class="overflow-y-auto" style="max-height: 300px">
    <v-text-field v-model="input" placeholder="Search..."></v-text-field>
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
import { onClickOutside } from '@vueuse/core'

const timeZoneStore = useTimeZoneStore()
const input = ref('')
const fuse = new Fuse(timeZoneStore.getTimeZoneList, {
  keys: ['utc', 'value'],
  threshold: 0.3
})
const searchResult = computed(() => fuse.search(input.value))
const target = ref<HTMLDivElement>()

onClickOutside(target, () => {
  input.value = ''
})

function handleClick(item: TimeZoneSelected) {
  timeZoneStore.setTimeZone(item)
  input.value = ''
}
</script>
