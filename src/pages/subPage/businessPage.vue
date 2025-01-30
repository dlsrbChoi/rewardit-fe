<template>
  <div class="admin-home">
    <div class="main-title">
      <p>사장님페이지</p>
    </div>
    <div class="remain-box">
      <p>사용 금액 : <span class="point">0</span> 원</p>
    </div>
    <div class="table">
      <div class="table-top">
        <YearMonthPicker
          @updateYearMonth="updateYearMonth"
        />
      </div>
      <v-data-table
        caption="사장님페이지 테이블"
        no-data-text="결과가 없습니다."
        class="table vuetify-table responsive"
        loading-text="데이터 로딩중입니다... 잠시만 기다려주세요."
        :loading="isLoading"
        :headers="headers"
        :items="items"
        :page="page"
        :items-per-page="perPage"
        @page-count="totalPage = $event"
      >
        <template #colgroup>
          <caption>
            사장님페이지 테이블
          </caption>
        </template>
        <template #[`item.requestedAt`]="{ item }">
          <div class="th">요청일시</div>
          <div class="td">
            {{ $gFunc.dateFormat(item.requestedAt) }}
          </div>
        </template>
        <template #[`item.memberName`]="{ item }">
          <div class="th">요청회원명</div>
          <div class="td">
            {{ item.memberName }}
          </div>
        </template>
        <template #[`item.usePoint`]="{ item }">
          <div class="th">요청포인트</div>
          <div class="td">
            {{ $gFunc.comma(item.usePoint) }}
          </div>
        </template>
        <template #[`item.status`]="{ item }">
          <div class="th">상태</div>
          <div class="td">
            <span v-if="item.status === 'USED'">
              사용완료
            </span>
            <span v-else> 미사용 </span>
          </div>
        </template>
      </v-data-table>
      <v-pagination
        v-if="totalPage"
        rounded="circle"
        v-model="page"
        :length="totalPage"
        :total-visible="5"
      />
    </div>
  </div>
</template>

<script>
import YearMonthPicker from '@/components/datePicker/YearMonthPicker.vue';
import openModal from '@/util/modalSetter';
import api from '@/api/api';
import dayjs from 'dayjs';

export default {
  components: {
    YearMonthPicker,
  },

  data() {
    return {
      yearMonth: dayjs().format('YYYY-MM'),

      page: 1,
      perPage: 10,
      totalPage: 0,
      headers: [
        {
          title: '요청일시',
          key: 'requestedAt',
          align: 'center',
          sortable: false,
        },
        {
          title: '요청회원명',
          key: 'memberName',
          align: 'center',
          sortable: false,
        },
        {
          title: '요청포인트',
          key: 'requestPoint',
          align: 'center',
          sortable: false,
        },
        {
          title: '상태',
          key: 'status',
          align: 'center',
          sortable: false,
        },
      ],
      items: [],

      qrId: null,

      isLoading: false,
    };
  },

  watch: {
    yearMonth() {
      this.getQRcodeUseHistory();
    },
  },

  created() {
    if (this.$route.query.qrId) {
      this.qrId = this.$route.query.qrId;
      this.showModal();
    }

    this.getQRcodeUseHistory();
  },

  methods: {
    async getQRcodeUseHistory() {
      this.isLoading = true;
      const params = {
        page: this.page,
        perPage: this.perPage,
        yearMonth: this.yearMonth,
      };

      const res = await api.getQRcodeUseHistory(params);
      this.isLoading = false;

      this.items = res?.data?.data?.items ?? [];
      this.totalPage = res?.data?.data?.total ?? 1;
    },

    updateYearMonth(yearMonth) {
      this.yearMonth = yearMonth;
    },

    showModal() {
      openModal(
        `승인하시겠습니까?`,
        'confirm',
        null,
        this.acceptQrcode,
        '취소',
        '승인',
      );
    },

    async acceptQrcode() {
      const res = await api.useQrcode(this.qrId);

      if (res?.data?.result !== 'OK') {
        openModal(
          res.data.message ? res.data.message : '승인 실패',
          'warning',
        );
        return;
      }

      openModal('승인되었습니다.', 'check');
      this.getQRcodeUseHistory();
    },
  },
};
</script>
