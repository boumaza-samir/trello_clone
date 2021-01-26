import Vue from 'vue';
import VueRouter from 'vue-router';
import Signup from '@/views/Signup.vue';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Store from '@/store';
import Board from '@/views/Board.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/board/:boardId',
    name: 'board',
    component: Board,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
// Global session route dispatching
router.beforeEach((to, from, next) => {
  // Authenticate with the local email/password strategy
  Store.dispatch('auth/authenticate').then(() => {
    if (['/signup', '/login'].includes(to.path)) {
      next('/');
    } else {
      next();
    }
  }).catch(() => {
    if (['/signup', '/login'].includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  });
});
export default router;
