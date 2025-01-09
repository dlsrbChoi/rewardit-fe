<template>
  <VueDatePicker
    v-model="dateValue"
    month-picker
    locale="ko"
    select-text="확인"
    cancel-text="취소"
    format="yyyy-MM"
  />
</template>

<script>
import dayjs from 'dayjs';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { VueDatePicker },

  data() {
    return {
      dateValue: dayjs(),
    };
  },

  watch: {
    dateValue() {
      this.updateYearMonth();
    },
  },

  methods: {
    updateYearMonth() {
      const formatMonth = String(
        this.dateValue.month + 1,
      ).padStart(2, '0');

      this.$emit(
        'updateYearMonth',
        `${this.dateValue.year}-${formatMonth}`,
      );
    },
  },
};
</script>

<style lang="scss">
.dp__main,
.dp__input_wrap {
  width: 150px;
}

.dp__overlay_cell_active {
  background: #ffa500;
}

.dp__action_buttons .dp__action_select {
  background: #ffa500;
}

.dp__icon {
  display: none;
}
</style>
