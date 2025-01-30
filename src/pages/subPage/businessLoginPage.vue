<template>
  <div class="inner">
    <div class="login-home">
      <div class="title-area">
        <p>
          <strong>사장님 전용 로그인</strong>
        </p>
        <p>
          <span class="bold">
            항상 즐거운 일이 생기는 SF부업 플랫폼 입니다.
          </span>
        </p>
      </div>
      <div class="login-area">
        <div class="input-area">
          <div class="title">아이디</div>
          <div class="contents">
            <input
              type="text"
              v-model.trim="login.loginId"
            />
          </div>
        </div>
        <div class="input-area">
          <div class="title">비밀번호</div>
          <div class="contents">
            <input
              type="password"
              v-model.trim="login.password"
            />
          </div>
        </div>
        <div class="login-button-area">
          <button
            type="button"
            class="button black"
            :disabled="isDisabled"
            @click="loginBusiness"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="half-menu">
    <div class="half-title">
      <p>
        자영업자와 공존하는 <br />
        부업 플랫폼 Rewardit
      </p>
    </div>
  </div>
</template>

<script>
import openModal from '@/util/modalSetter';
import api from '@/api/api';
import VueJwtDecode from 'vue-jwt-decode';

export default {
  data() {
    return {
      login: {
        loginId: '',
        password: '',
      },

      isDisabled: false,
    };
  },

  computed: {
    isLogin() {
      return this.$store.state.userStore?.isLogin ?? false;
    },
  },

  methods: {
    loginValidation() {
      if (!this.login.loginId) {
        openModal('아이디를 입력해주세요.', 'warning');
        return false;
      }

      if (!this.login.password) {
        openModal('비밀번호를 입력해주세요.', 'warning');
        return false;
      }

      return true;
    },

    async loginBusiness() {
      if (!this.loginValidation()) return;

      this.isDisabled = true;
      const res = await api.loginBusiness(this.login);

      if (res?.data?.result !== 'OK') {
        openModal(
          '아이디 또는 비밀번호를 확인해주세요.',
          'warning',
        );
        this.isDisabled = false;
        return;
      }

      if (this.isLogin) {
        this.$store.dispatch('clearTokens');
      }

      const accessToken =
        res?.data?.data?.accessToken ?? '';
      const userRole =
        VueJwtDecode.decode(accessToken).role;

      await this.$store.dispatch('setTokens', {
        accessToken,
      });
      await this.$store.dispatch('setUsers', {
        name: '자영업자',
        role: userRole,
      });

      this.isDisabled = false;

      this.$router.push('/business');
    },
  },
};
</script>
