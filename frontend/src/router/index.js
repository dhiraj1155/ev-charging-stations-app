import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import ChargerList from '../views/ChargerList.vue';
import MapView from '../views/MapView.vue';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/chargers',
    name: 'ChargerList',
    component: ChargerList,
    meta: { requiresAuth: true },
  },
  {
    path: '/map',
    name: 'MapView',
    component: MapView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;