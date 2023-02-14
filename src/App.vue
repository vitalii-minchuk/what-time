<template>
  <v-app>
    <v-app-bar class="px-6">
      <v-alert-title>What time</v-alert-title>
      <v-spacer></v-spacer>
      <v-row justify="end">
        <v-btn>
          <a
            href="https://github.com/vitalii-minchuk/what-time"
            target="_blank"
          >
            <GitHubSVG />
          </a>
        </v-btn>
        <v-btn> ok </v-btn>
      </v-row>
    </v-app-bar>

    <main class="mt-16">
      <WhatTime />
    </main>
  </v-app>
</template>

<script setup lang="ts">
import GitHubSVG from './assets/icons/GitHubSVG.vue'
import WhatTime from './components/WhatTime/WhatTime.vue'
</script>
