<template>
  <div v-if="$route.name == 'main'" id="main">
    <GnbArea />
    <RouterView />
  </div>
  <div v-else id="sub">
    <v-app>
      <GnbArea />
      <RouterView />
    </v-app>
  </div>

  <CheckModal v-if="alertType === 'check'" />
  <WarningModal v-else-if="alertType === 'warning'" />
  <ConfirmModal v-else-if="alertType === 'confirm'" />
</template>

<script>
import GnbArea from '@/layout/GnbArea.vue';
import CheckModal from '@/components/modal/CheckModal.vue';
import WarningModal from '@/components/modal/WarningModal.vue';
import ConfirmModal from '@/components/modal/ConfirmModal.vue';

export default {
  components: {
    GnbArea,
    CheckModal,
    WarningModal,
    ConfirmModal,
  },

  computed: {
    alertType() {
      return this.$store.state.modalStore.alertType;
    },
  },

  created() {},
};
</script>
