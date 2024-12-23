import store from '@/store';

const openModal = (
  msg,
  alertType,
  url,
  confirmOkHandler,
  confirmCancelMessage,
  confirmOkMessage,
) => {
  store.dispatch('modalObject', {
    msg,
    alertType,
    url,
    confirmOkHandler,
    confirmCancelMessage,
    confirmOkMessage,
  });
};
export default openModal;
