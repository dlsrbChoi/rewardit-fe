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
            @click="$router.push('/business')"
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
export default {
  data() {
    return {
      login: {
        loginId: '',
        password: '',
      },
    };
  },

  methods: {
    async loginBusiness() {
      const res = await api.loginBusiness(this.login);

      console.log(res);
    },
  },
};
</script>
