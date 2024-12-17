import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(
        /* webpackChunkName: "view-main-vue" */ '@/pages/mainpage/mainPage.vue'
      ),
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () =>
      import(
        /* webpackChunkName: "view-main-vue" */ '@/pages/subPage/loginPage.vue'
      ),
  },
  {
    path: '/agreement',
    name: 'agreementPage',
    component: () =>
      import(
        /* webpackChunkName: "view-main-vue" */ '@/pages/subPage/agreementPage.vue'
      ),
  },
  {
    path: '/reward',
    name: 'rewardPage',
    component: () =>
      import(
        /* webpackChunkName: "view-main-vue" */ '@/pages/subPage/rewardPage.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 };
  }
}

router.afterEach((to, from) => {
  window.scrollTo(scrollBehavior(to, from, null));
});

export default router;