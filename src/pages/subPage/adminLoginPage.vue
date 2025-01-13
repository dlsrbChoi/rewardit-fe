<template>
  <div class="inner">
    <div class="login-home">
      <div class="title-area">
        <p>
          <strong>관리자 전용 로그인</strong>
        </p>
        <p>
          <span class="bold">
            자영업자와 일반 회원을 관리할 수 있습니다.
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
        부업 플랫폼 Rewordit
      </p>
    </div>
  </div>
</template>

<script>
import openModal from '@/util/modalSetter';

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

    async loginAdmin() {
      if (!this.loginValidation()) return;

      this.isDisabled = true;
      // TODO: 관리자 로그인인
      // const res = await api.loginAdmin(this.login);

      if (res?.data?.result !== 'OK') {
        openModal(
          '아이디 또는 비밀번호를 확인해주세요.',
          'warning',
        );
        this.isDisabled = false;
        return;
      }

      const accessToken =
        res?.data?.data?.accessToken ?? '';
      await this.$store.dispatch('setTokens', {
        accessToken,
      });
      this.isDisabled = false;

      this.$router.push('/business');
    },
  },
};
</script>
