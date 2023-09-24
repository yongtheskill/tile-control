<template>
  <div class="w-full mx-auto max-w-4xl px-4 py-16 flex flex-row space-x-6 h-screen">
    <div class="flex-[1_1_60%]">
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
        <div class="space-y-2">
          <RadioGroupOption
            as="template"
            v-for="game in games"
            :key="game.id"
            :value="game"
            v-slot="{ active, checked }">
            <div
              :class="[
                active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : '',
                checked ? 'bg-sky-600 text-white hover:bg-sky-500 ' : 'bg-white hover:bg-slate-50 ',
              ]"
              class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none transition-all duration-200">
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel
                      as="p"
                      :class="checked ? 'text-white' : 'text-slate-900'"
                      class="font-medium">
                      {{ game.name }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      :class="checked ? 'text-slate-100' : 'text-slate-500'"
                      class="inline">
                      <span> {{ game.description }}</span>
                    </RadioGroupDescription>
                  </div>
                </div>
                <div v-show="checked" class="shrink-0 text-white">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                    <path
                      d="M7 13l3 3 7-7"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
    <div class="flex-[1_1_40%] shadow-md bg-slate-100 flex flex-col justify-between">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-bold">
          {{ selected.name }}
        </h1>
        <div>
          {{ selected.description }}
        </div>
      </div>
      <div class="px-6 py-4">
        <button
          @click="selectGame()"
          class="bg-sky-600 text-slate-50 font-bold rounded-md hover:bg-sky-500 transition duration-200 w-full py-2">
          Select Game
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { apiBase } from '../constants';
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue';

const games = [
  {
    name: 'Loading...',
    id: 0,
    description: 'Please wait',
  },
];

export default defineComponent({
  data() {
    return {
      selected: games[0],
      games,
    };
  },
  methods: {
    async selectGame() {
      const res = await fetch(apiBase + '/setGame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: this.selected.id }),
      });
      this.$router.push('/');
    },
    async loadGames() {
      const res = await fetch(apiBase + '/gameList');
      const games = await res.json();
      this.games = games;
      this.selected = games[0];
    },
  },
  mounted() {
    this.loadGames();
  },
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  },
});
</script>
