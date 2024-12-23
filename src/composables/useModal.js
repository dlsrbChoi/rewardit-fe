import { ref, nextTick } from 'vue';
import store from '@/store/index';
import router from '@/routers';

export const useModal = () => {
  const msg = ref(store.state.modalStore.msg);
  const alertType = ref(store.state.modalStore.alertType);
  const url = ref(store.state.modalStore.url);
  const confirmCancelMessage = ref(
    store.state?.modalStore?.confirmCancelMessage ?? '취소',
  );
  const confirmOkMessage = ref(
    store.state?.modalStore?.confirmOkMessage ?? '확인',
  );

  const initModal = () => {
    if (
      alertType.value !== 'confirm' &&
      store.state.modalStore.confirmOkHandler
    ) {
      store.state.modalStore.confirmOkHandler();
    }

    if (url.value && router.currentRoute.value.path !== url.value) {
      router.push(url.value);
    }

    store.dispatch('modalObject', null);
  };

  const focusButton = async modalButton => {
    await nextTick();

    modalButton.focus();
  };

  return {
    msg,
    confirmCancelMessage,
    confirmOkMessage,
    initModal,
    focusButton,
  };
};
