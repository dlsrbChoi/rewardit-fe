import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import openModal from '@/util/modalSetter';

const loadView = view => {
  return () =>
    import(
      /* webpackChunkName: "view-[request]" */ `@/pages/subpage/${view}.vue`
    );
};

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
    component: loadView('loginPage'),
  },
  {
    path: '/agreement',
    name: 'agreementPage',
    component: loadView('agreementPage'),
    props: true,
  },
  {
    path: '/reward',
    name: 'rewardPage',
    component: loadView('rewardPage'),
    meta: {
      isAuth: true,
      role: "ROLE_USER",
    }
  },
  {
    path: '/mypage',
    name: 'generalMyPage',
    component: loadView('generalMyPage'),
    meta: {
      isAuth: true,
      role: "ROLE_USER",
    }
  },
  {
    path: '/mypage/qr-code',
    name: 'qrcodeHistoryPage',
    component: loadView('qrcodeHistoryPage'),
    meta: {
      isAuth: true,
      role: "ROLE_USER",
    }
  },  
  {
    path: '/login/business',
    name: 'businessLoginPage',
    component: loadView('businessLoginPage'),
  },
  {
    path: '/business',
    name: 'businessPage',
    component: loadView('businessPage'),
    meta: {
      isAuth: true,
      role: "ROLE_SHOP",
    }
  },
  {
    path: '/login/admin',
    name: 'adminLoginPage',
    component: loadView('adminLoginPage'),
  },
  {
    path: '/admin',
    name: 'adminPage',
    component: loadView('adminPage'),
    meta: {
      isAuth: true,
      role: "ROLE_ADMIN",
    }
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

router.beforeEach((to, from, next) => {
  const isLogin = store.state.userStore.isLogin;
  const role = store.state.userStore.role;
  const meta = to.meta;

  if (meta.isAuth && !isLogin) {
    openModal('로그인이 필요합니다.', 'warning');
    next('/login');
    return;
  }

  // if (meta.role && meta.role !== role) {
  //   openModal('접근 권한이 없습니다.', 'warning');
  //   next('/main');
  //   return;
  // }

  next();
});

export default router;