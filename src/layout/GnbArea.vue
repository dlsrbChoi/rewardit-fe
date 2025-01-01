<template>
  <header id="nav">
    <div class="header">
      <div class="logo" @click="$router.push('/reward')">
        Rewardit
      </div>
      <div class="nav-button-area">
        <button v-if="$route.name === 'main'" type="button">
          로그인
        </button>
        <div v-else>
          <button
            v-if="!isMenuShow"
            type="button"
            class="menuButton"
            @click="changeShowMenu"
          >
            <span class="hidden">메뉴</span>
          </button>
          <button
            v-if="isMenuShow"
            type="button"
            class="closeMenu"
            @click="changeShowMenu"
          >
            <span class="hidden">메뉴 닫기</span>
          </button>
        </div>
      </div>
      <div v-if="isMenuShow" class="menu-bar">
        <div class="user-area">
          <p>
            안녕하세요. <span class="bold">김동환</span>님
          </p>
          <button type="button">로그아웃</button>
        </div>
        <ul>
          <li @click="$router.push('/mypage')">
            마이페이지
          </li>
          <li @click="$router.push('/mypage/qr-code/use')">
            QR 사용
          </li>
          <li @click="$router.push('/login/business')">
            사장님 페이지
          </li>
          <li @click="$router.push('/admin')">
            관리자 페이지
          </li>
        </ul>
        <div class="menu-dim" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuShow: false,
    };
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
  },
};
</script>
