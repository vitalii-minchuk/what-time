<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <v-app-bar class="px-6">
      <v-alert-title>What time</v-alert-title>
      <v-spacer></v-spacer>
      <v-row justify="end" align="center">
        <v-btn>
          <a
            href="https://github.com/vitalii-minchuk/what-time"
            target="_blank"
          >
            <GitHubSVG />
          </a>
        </v-btn>
        <v-btn @click="toggleDark()" :icon="isDark ? TheSunSVG : TheMoonSVG">
        </v-btn>
      </v-row>
    </v-app-bar>

    <main class="mt-16">
      <WhatTime />
    </main>
  </v-app>
</template>

<script setup lang="ts">
import GitHubSVG from './assets/icons/GitHubSVG.vue'
import TheSunSVG from './assets/icons/TheSunSVG.vue'
import TheMoonSVG from './assets/icons/TheMoonSVG.vue'
import WhatTime from './components/WhatTime/WhatTime.vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
