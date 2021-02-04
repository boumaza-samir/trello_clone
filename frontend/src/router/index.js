import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store';
import Notfound from '@/views/Notfound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/board/:boardId',
    name: 'board',
    props: true,
    component: () => import(/* webpackChunkName: "board" */ '@/views/Board.vue'),
  },
  {
    path: '/404',
    name: 'not-found',
    component: Notfound,
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
router.beforeEach(async (to, from, next) => {
  // validate URL
  const link = router.resolve(to.path);
  if (link.resolved.matched.length === 0) {
    next('/404');
    return;
  }
  // Authenticate with the local email/password strategy
  const wantsAccess = ['/signup', '/login'].includes(to.path);
  try {
    await Store.dispatch('auth/authenticate');
    if (wantsAccess) {
      next('/');
      return;
    }
  } catch (e) {
    if (!wantsAccess) {
      next('/login');
      return;
    }
  }
  next();
});
export default router;
