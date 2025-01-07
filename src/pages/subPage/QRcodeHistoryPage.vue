<template>
  <div class="mypage-home">
    <div class="main-title">
      <p>마이페이지</p>
    </div>
    <div class="tab-menu">
      <ul>
        <li @click="$router.push('/mypage')">
          이벤트 참여 내역
        </li>
        <li class="active">QR 교환 및 내역 확인</li>
        <!-- <li @click="$router.push('/mypage/qr-code/use')">
          QR 사용
        </li> -->
      </ul>
    </div>
    <div class="remain-box">
      <p>
        요청가능 금액 :
        <span class="point">
          {{ $gFunc.comma(info?.rewardPoint ?? 0) }}
        </span>
        원
      </p>
      <p>
        지급된 금액 :
        <span class="point">
          {{ $gFunc.comma(info?.usedPoint ?? 0) }}
        </span>
        원
      </p>
    </div>
    <div class="table">
      <div class="table-top">
        <button
          type="button"
          class="button black"
          @click="showQRCodeChangeModal"
        >
          QR 교환 요청
        </button>
      </div>
      <v-data-table
        caption="마이페이지 테이블"
        no-data-text="결과가 없습니다."
        class="table vuetify-table responsive"
        loading-text="데이터 로딩중입니다... 잠시만 기다려주세요."
        :loading="isLoading"
        :headers="headers"
        :items="items"
        :page="page"
        :items-per-page="perPage"
        @page-count="pageCount = $event"
      >
        <template #colgroup>
          <caption>
            마이페이지 테이블
          </caption>
        </template>
        <template #[`item.requestAt`]="{ item }">
          <div class="th">요청일시</div>
          <div class="td">
            {{ item.requestAt }}
          </div>
        </template>
        <template #[`item.requestPoint`]="{ item }">
          <div class="th">요청포인트</div>
          <div class="td">
            {{ $gFunc.comma(item.requestPoint) }}
          </div>
        </template>
        <template #[`item.status`]="{ item }">
          <div class="th">상태</div>
          <div class="td">
            {{ item.status }}
          </div>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        rounded="circle"
        :length="5"
        :total-visible="5"
      />
    </div>
  </div>

  <QRCodeChangeModal v-if="isQRCodeModal">
    <template #info>QR 교환 요청</template>
    <template #content>
      <div class="change-point">
        <div class="input-area">
          <div class="title">잔여포인트</div>
          <div class="contents">
            {{ $gFunc.comma(info?.rewardPoint ?? 0) }}
            포인트
          </div>
        </div>
        <div class="input-area">
          <div class="title">교환 금액</div>
          <div class="contents">
            <input type="tel" class="middle" />
          </div>
        </div>
        <div class="modal-button-area">
          <button type="button" class="button black">
            교환하기
          </button>
        </div>
      </div>
    </template>
    <template #button>
      <button class="btn closeBtn" @click="closeModal">
        <span class="hidden">닫기</span>
      </button>
    </template>
  </QRCodeChangeModal>
</template>

<script>
import QRCodeChangeModal from '@/components/modal/ContentsModal.vue';
import api from '@/api/api';

export default {
  components: {
    QRCodeChangeModal,
  },

  data() {
    return {
      info: {},

      page: 1,
      perPage: 10,
      totalCount: 0,
      headers: [
        {
          title: '요청일시',
          key: 'requestAt',
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
      items: [
        {
          requestAt: '2025-01-01',
          requestPoint: 1000,
          status: '사용 완료',
        },
        {
          requestAt: '2025-01-01',
          requestPoint: 5000,
          status: '미사용',
        },
      ],

      isLoading: false,
      isQRCodeModal: false,
    };
  },

  computed: {
    pageCount() {
      return Math.ceil(this.totalCount / this.perPage);
    },
  },

  created() {
    // this.getMemberInfo();
    // this.getQrcodeHistory();
  },

  methods: {
    async getMemberInfo() {
      const res = await api.getMemberInfo();
      console.log(res);
      this.info = res?.data?.data ?? {};
    },

    async getQrcodeHistory() {
      const params = {
        page: this.page,
        perPage: this.perPage,
      };

      const res = await api.getQrcodeHistory(params);
      console.log(res);
    },

    showQRCodeChangeModal() {
      this.isQRCodeModal = true;
    },

    closeModal() {
      this.isQRCodeModal = false;
    },
  },
};
</script>
