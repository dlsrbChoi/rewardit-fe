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
          약관보기
        </button>
        <button
          type="button"
          @click="$router.push('/reward')"
        >
          동의하기
        </button>
      </div>
    </div>
  </div>
  <div class="half-menu scroll" v-if="isTerms">
    <loginTerms />
  </div>
</template>

<script>
import loginTerms from '@/components/terms/loginTerms.vue';

export default {
  components: {
    loginTerms,
  },

  data() {
    return {
      isTerms: false,
    };
  },

  methods: {
    showTerms() {
      this.isTerms = true;
    },
  },
};
</script>
