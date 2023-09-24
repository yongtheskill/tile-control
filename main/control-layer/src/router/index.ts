import { createRouter, createWebHistory } from 'vue-router';
import {
  RectangleGroupIcon,
  EyeIcon,
  CommandLineIcon,
  Square2StackIcon,
} from '@heroicons/vue/24/solid';

export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: RectangleGroupIcon,
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/games',
    name: 'Game Select',
    icon: Square2StackIcon,
    component: () => import('../views/GameSelectView.vue'),
  },
  {
    path: '/live',
    name: 'Live View',
    icon: EyeIcon,
    component: () => import('../views/LiveViewView.vue'),
  },
  {
    path: '/logs',
    name: 'Logs',
    icon: CommandLineIcon,
    component: () => import('../views/LogsView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
