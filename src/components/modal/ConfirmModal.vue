<template>
  <div>
    <section class="alert confirm">
      <article class="alertCont">
        <div class="inner">
          <pre>{{ msg }}</pre>
          <article class="btn-area">
            <button class="btn border" @click="closeConfirmModal(false)">
              {{ confirmCancelMessage }}
            </button>
            <button
              class="btn primary"
              ref="confirmRef"
              @click="closeConfirmModal(true)"
            >
              {{ confirmOkMessage }}
            </button>
          </article>
        </div>
      </article>
      <article class="alertBottom">
        <button class="btn closeBtn" @click="closeConfirmModal(false)">
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
    const {
      msg,
      confirmCancelMessage,
      confirmOkMessage,
      initModal,
      focusButton,
    } = useModal();

    return {
      msg,
      confirmCancelMessage,
      confirmOkMessage,
      initModal,
      focusButton,
    };
  },

  mounted() {
    this.focusButton(this.$refs.confirmRef);
  },

  methods: {
    closeConfirmModal(status) {
      this.initModal();

      if (status) this.$store.dispatch('confirmOkHandler');
    },
  },
};
</script>
