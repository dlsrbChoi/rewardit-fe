<template>
  <div>
    <section class="alert check">
      <article class="alertCont">
        <div class="inner">
          <pre>{{ msg }}</pre>
          <article class="btn-area">
            <button
              ref="checkRef"
              class="btn primary"
              @mouseup="initModal"
              @keyup.enter="initModal"
            >
              확인
            </button>
          </article>
        </div>
      </article>
      <article class="alertBottom">
        <button class="btn closeBtn" @click="initModal">
          <span class="hidden">닫기</span>
        </button>
      </article>
    </section>
    <section class="dim">
      <slot name="dimarea"></slot>
    </section>
  </div>
</template>

<script>
import { useModal } from '@/composables/useModal';

export default {
  setup() {
    const { msg, initModal, focusButton } = useModal();

    return {
      msg,
      initModal,
      focusButton,
    };
  },

  mounted() {
    this.focusButton(this.$refs.checkRef);
  },
};
</script>
