<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { routes } from './router';

export default defineComponent({
  components: { RouterLink, RouterView },
  data() {
    return {
      routes,
    };
  },
});
</script>

<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-slate-50 shadow-md">
      <div class="w-full content-center border-solid border-b border-slate-300 pb-3">
        <h1 class="text-3xl font-extrabold text-center">Tiles</h1>
      </div>
      <ul class="space-y-2 font-medium pt-2">
        <li v-for="route in routes">
          <RouterLink
            :to="route.path"
            :class="
              'flex items-center p-2 rounded-lg transition duration-300 ' +
              (route.name == $route.name
                ? 'text-slate-50 bg-sky-600 hover:bg-sky-500'
                : 'text-slate-900 hover:bg-slate-200')
            ">
            <component :is="route.icon" class="h-6 w-6"></component>
            <span class="ml-3 text-base">{{ route.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>

  <div class="sm:ml-64 text-slate-900">
    <RouterView />
  </div>
</template>

<style scoped></style>
