<template>
  <div v-if="$route.name == 'main'" id="main">
    <GnbArea />
    <RouterView />
  </div>
  <div v-else id="sub">
    <GnbArea />
    <RouterView />
  </div>
</template>

<script>
import GnbArea from '@/layout/GnbArea.vue';

export default {
  components: {
    GnbArea,
  },
};
</script>
