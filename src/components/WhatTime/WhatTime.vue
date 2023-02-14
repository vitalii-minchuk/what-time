<template>
  <v-container>
    <input v-model="input" type="text" />
    <div>
      <div v-for="item in searchResult" :key="item.text">
        <div @click="setZone(item)">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div>
      <div v-for="zone in zones" :key="zone.name">
        {{ zone.name }} {{ zone.offset }}
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import type { Timezone } from '@/types'
import timezones from 'timezones.json'
import { computed, ref } from 'vue'

const zones = ref<Timezone[]>([])
const input = ref('')
const searchResult = computed(() =>
  timezones.filter((t) => t.utc.find((u) => u.includes(input.value)))
)
function setZone(item: (typeof timezones)[0]) {
  const newZone: Timezone = {
    offset: item.offset,
    name: item.text
  }

  zones.value.push(newZone)
}
</script>

<style scoped></style>
