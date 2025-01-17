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
          {{ $gFunc.comma(info?.usePoint ?? 0) }}
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
        @page-count="totalPage = $event"
        @click:row="showQrcode"
      >
        <template #colgroup>
          <caption>
            QR 내역 테이블
          </caption>
        </template>
        <template #[`item.requestAt`]="{ item }">
          <div class="th">요청일시</div>
          <div class="td">
            {{ $gFunc.dateFormat(item.requestAt) }}
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
        v-if="totalPage"
        rounded="circle"
        v-model="page"
        :length="totalPage"
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
            <input
              type="tel"
              class="middle"
              v-model="formattedPoint"
              @input="formatNumber"
            />
          </div>
        </div>
        <div class="modal-button-area">
          <button
            type="button"
            class="button black"
            @click="chageQrcode"
          >
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

  <QRCodeShowModal v-if="isQRCodeShowModal">
    <template #info>QR 코드</template>
    <template #content>
      <img :src="imgSrc" alt="QR 코드" />
    </template>
    <template #button>
      <button class="btn closeBtn" @click="closeModal">
        <span class="hidden">닫기</span>
      </button>
    </template>
  </QRCodeShowModal>
</template>

<script>
import QRCodeChangeModal from '@/components/modal/ContentsModal.vue';
import QRCodeShowModal from '@/components/modal/ContentsModal.vue';
import api from '@/api/api';
import openModal from '@/util/modalSetter';

export default {
  components: {
    QRCodeChangeModal,
    QRCodeShowModal,
  },

  data() {
    return {
      info: {},

      page: 1,
      perPage: 10,
      totalPage: 0,
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
      items: [],

      applyQr: {
        usePoint: null,
      },

      imgSrc: null,

      isLoading: false,
      isQRCodeModal: false,
      isQRCodeShowModal: false,
    };
  },

  computed: {
    formattedPoint: {
      get() {
        return this.applyQr.usePoint
          ? Number(this.applyQr.usePoint).toLocaleString(
              'en-US',
            )
          : '';
      },
      set(newValue) {
        this.applyQr.usePoint = newValue.replace(/,/g, '');
      },
    },
  },

  created() {
    this.getMemberInfo();
    this.getQrcodeHistory();
  },

  methods: {
    async getMemberInfo() {
      const res = await api.getMemberInfo();

      this.info = res?.data?.data ?? {};
    },

    async getQrcodeHistory() {
      const params = {
        page: this.page,
        perPage: this.perPage,
      };

      const res = await api.getQrcodeHistory(params);

      this.items = res?.data?.data?.items ?? [];
      this.totalPage = res?.data?.data?.total ?? 1;
    },

    formatNumber() {
      const numericValue = this.applyQr.usePoint.replace(
        /[^\d]/g,
        '',
      );
      this.applyQr.usePoint = +numericValue;
    },

    showQRCodeChangeModal() {
      this.isQRCodeModal = true;
    },

    closeModal() {
      this.isQRCodeModal = false;
      this.applyQr.usePoint = null;
      this.isQRCodeShowModal = false;
    },

    isValidThousandUnit(value) {
      const number = Number(value);
      return number >= 1000 && number % 1000 === 0;
    },

    changeValidation() {
      if (!this.applyQr.usePoint) {
        openModal('교환 금액을 입력해주세요.', 'warning');
        return false;
      }

      if (this.info.rewardPoint < this.applyQr.usePoint) {
        openModal('잔여포인트가 부족합니다.', 'warning');
        return false;
      }

      if (
        !this.isValidThousandUnit(this.applyQr.usePoint)
      ) {
        openModal('천원 단위로 교환가능합니다.', 'warning');
        return false;
      }

      return true;
    },

    async chageQrcode() {
      if (!this.changeValidation()) return;

      const res = await api.generateQrcode(this.applyQr);

      if (res?.data?.result === 'FAIL') {
        openModal(
          '교환에 실패하였습니다.\n다시시도해주세요.',
          'warning',
        );
        return;
      }

      this.closeModal();
      openModal(
        '교환되었습니다.\n교환하신 QR을 항목에서 선택해주세요.',
        'check',
      );
    },

    async showQrcode(e, { item }) {
      if (item.status === 'USED') return;

      const res = await api.getQrcode(item.qrId);

      this.imgSrc = res.data;
      this.isQRCodeShowModal = true;
    },
  },
};
</script>
