<template>
  <div class="inner">
    <div class="login-home">
      <div class="title-area">
        <p>
          <strong>안녕하세요.<br />리워딧 입니다.</strong>
        </p>
        <p>
          <span>
            <span class="bold">빠르고 간편</span>하게 즉시,
            <span class="bold">사용</span>해보세요!
          </span>
        </p>
      </div>
      <div class="button-area">
        <button
          type="button"
          id="G_OAuth_btn"
          class="login-button"
          @click="handleGoogleLogin"
        >
          귀찮은 회원가입없이 원클릭 구글 로그인
        </button>
      </div>
    </div>
  </div>
  <div class="half-menu">
    <div class="half-title">
      <p>
        일상속에 현명한 소비를 도와주는<br />
        <span>Rewardit</span>
      </p>
    </div>
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {};
  },

  methods: {
    handleGoogleLogin() {
      const client = google.accounts.oauth2.initTokenClient(
        {
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: 'openid email profile',
          callback: this.googleCallback,
        },
      );

      client.requestAccessToken();
    },

    googleCallback(res) {
      fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${res.access_token}`,
          },
        },
      )
        .then(response => response.json())
        .then(userInfo => {
          this.checkUserInfo(userInfo);
        });
    },

    async checkUserInfo(userInfo) {
      const params = {
        email: userInfo.email,
        name: userInfo.name,
      };

      const res = await api.checkMember(params);

      if (!res?.data?.data) {
        this.$router.push({
          path: '/agreement',
          query: params,
        });
        return;
      }

      const loginRes = await api.googleLogin(params);

      const tokenObj = loginRes?.data?.data ?? {};
      await this.$store.dispatch('setTokens', tokenObj);
      await this.$store.dispatch('setUsers', userInfo);
      this.$router.push('/reward');
    },
  },
};
</script>
