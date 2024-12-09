<template>
  <div id="main">
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
