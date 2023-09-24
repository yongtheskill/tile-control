<script lang="ts">
import { defineComponent } from 'vue';
import { PlayIcon, StopIcon, PauseIcon } from '@heroicons/vue/24/solid';
import { RouterLink } from 'vue-router';
import { apiBase } from '../constants';

export default defineComponent({
  components: { PlayIcon, PauseIcon, StopIcon, RouterLink },
  data() {
    return {
      gameState: 'Loading...',
      currentGame: 'Loading...',
    };
  },
  mounted() {
    this.getCurrentGame();
  },
  methods: {
    async changeGameState(state: 'Playing' | 'Stopped' | 'Paused') {
      const res = await fetch(apiBase + '/setGameState', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state }),
      });
      this.getCurrentGame();
    },
    async getCurrentGame() {
      const res = await fetch(apiBase + '/currentGame');
      const data = await res.json();
      this.gameState = data.gameState;
      this.currentGame = data.currentGame;
    },
  },
});
</script>

<template>
  <main class="w-full mx-auto max-w-4xl px-4 py-16 grid grid-cols-2 gap-6">
    <div class="rounded-lg shadow-md">
      <div class="px-6 pt-5 pb-3">
        <h1 class="text-base leading-none">Game State</h1>
        <div class="text-2xl font-bold">{{ gameState }}</div>
      </div>
      <div class="px-6 pb-2 pt-2 border-t flex justify-end space-x-2">
        <button class="rounded-md hover:bg-slate-300" @click="changeGameState('Stopped')">
          <StopIcon class="h-6 w-6"></StopIcon>
        </button>
        <button class="rounded-md hover:bg-slate-300" @click="changeGameState('Paused')">
          <PauseIcon class="h-6 w-6" />
        </button>
        <button class="rounded-md hover:bg-slate-300" @click="changeGameState('Playing')">
          <PlayIcon class="h-6 w-6" />
        </button>
      </div>
    </div>
    <div class="rounded-lg shadow-md">
      <div class="px-6 pt-5 pb-3">
        <h1 class="text-base leading-none">Current Game</h1>
        <div class="text-2xl font-bold">{{ currentGame }}</div>
      </div>
      <div class="px-6 pb-2 pt-2 border-t flex justify-end space-x-2">
        <RouterLink
          to="/games"
          class="bg-sky-600 text-slate-50 font-semibold rounded-md hover:bg-slate-300 px-2">
          Switch Game
        </RouterLink>
      </div>
    </div>
  </main>
</template>
