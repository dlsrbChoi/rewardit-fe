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
          id="G_OAuth_button"
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
export default {
  data() {
    return {
    }
  },

  mounted() {
    this.initializeGoogleLogin();
  },

  methods: {
    initializeGoogleLogin() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        });
      });
    },

    async handleGoogleLogin() {
      try {
        const auth2 = window.gapi.auth2.getAuthInstance();
        const googleUser = await auth2.signIn();

        // 로그인 성공 시 처리
        const profile = googleUser.getBasicProfile();
        // const token = googleUser.getAuthResponse().id_token;

        console.log('로그인 성공');
        console.log('사용자 이름:', profile.getName());
        console.log('사용자 이메일:', profile.getEmail());

        // 서버로 토큰을 전송하여 유효성 검증
        // 예시:
        // await axios.post('/api/auth/google', { token });
        // 로그인 후 후속 작업을 처리할 수 있습니다.

      } catch (error) {
        // 로그인 실패 시 처리
        console.error('구글 로그인 실패:', error);
      }
    }
  }
}
</script>
