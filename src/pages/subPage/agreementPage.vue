<template>
  <div class="inner">
    <div class="login-home">
      <div class="title-area">
        <p>
          <strong>약관 동의서</strong>
        </p>
        <p>
          <span class="blue">
            회원 가입을 해주셔서 감사합니다.
          </span>
        </p>
      </div>
      <div class="button-area">
        <button type="button" @click="showTerms">
          약관확인
        </button>
        <button type="button" @click="hadleLoginSucess">
          동의하기
        </button>
      </div>
    </div>
  </div>
  <div class="half-menu scroll" v-if="isTerms">
    <LoginTerms />
  </div>
</template>

<script>
import LoginTerms from '@/components/terms/LoginTerms.vue';
import openModal from '@/util/modalSetter';
import api from '@/api';

export default {
  components: {
    LoginTerms,
  },

  data() {
    return {
      isTerms: false,
      userInfo: {},
    };
  },

  created() {
    console.log(this.$route.query);

    this.userInfo = this.$route.query;
  },

  methods: {
    showTerms() {
      this.isTerms = true;
    },

    async hadleLoginSucess() {
      if (!this.isTerms) {
        openModal('약관을 확인해주세요.', 'warning');
        return;
      }

      const res = await api.googleLogin(this.userInfo);
      console.log(res);
    },
  },
};
</script>
