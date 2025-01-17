<template>
  <header id="nav">
    <div class="header">
      <div class="logo" @click="moveLogoSite">Rewardit</div>
      <div class="nav-button-area">
        <button
          v-if="$route.name === 'main'"
          type="button"
          @click="$router.push('/login')"
        >
          로그인
        </button>
        <div>
          <button
            v-if="!isMenuShow"
            type="button"
            class="menuButton"
            @click="changeShowMenu"
          >
            <span class="hidden">메뉴</span>
          </button>
          <button
            v-else
            type="button"
            class="closeMenu"
            @click="changeShowMenu"
          >
            <span class="hidden">메뉴 닫기</span>
          </button>
        </div>
      </div>
      <div v-if="isMenuShow" class="menu-bar">
        <div v-if="isLogin" class="user-area">
          <p>
            안녕하세요.
            <span class="bold">{{ userName }}</span
            >님
          </p>
          <button type="button" @click="handleLogout">
            로그아웃
          </button>
        </div>
        <ul>
          <li
            v-if="isLogin"
            @click="$router.push('/mypage')"
          >
            마이페이지
          </li>
          <li
            v-if="isLogin"
            @click="$router.push('/mypage/qr-code')"
          >
            QR 교환
          </li>
          <li @click="$router.push('/login/business')">
            사장님 페이지
          </li>
          <li @click="$router.push('/login/admin')">
            관리자 페이지
          </li>
        </ul>
        <div class="menu-dim" />
      </div>
    </div>
  </header>
</template>

<script>
import openModal from '@/util/modalSetter';

export default {
  data() {
    return {
      isMenuShow: false,
    };
  },

  computed: {
    userName() {
      return this.$store.state.userStore?.name ?? '';
    },

    isLogin() {
      return this.$store.state.userStore?.isLogin ?? false;
    },
  },

  watch: {
    $route() {
      this.isMenuShow = false;
    },
  },

  methods: {
    changeShowMenu() {
      this.isMenuShow = !this.isMenuShow;
    },

    moveLogoSite() {
      if (!this.isLogin) {
        this.$router.push('/main');
        return;
      }

      this.$router.push('/reward');
    },

    async handleLogout() {
      await this.$store.dispatch('clearTokens');
      openModal('로그아웃 되었습니다.', 'check', '/main');
    },
  },
};
</script>
