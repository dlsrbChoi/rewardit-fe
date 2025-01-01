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
        <li @click="$router.push('/mypage/qr-code/use')">
          QR 사용
        </li>
      </ul>
    </div>
    <div class="remain-box">
      <p>요청가능 금액 : <span class="point">0</span> 원</p>
      <p>지급된 금액 : <span class="point">0</span> 원</p>
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
      <table>
        <caption>
          QR 교환 및 내역 확인 테이블
        </caption>
        <colgroup>
          <col style="width: 30%; min-width: 120px" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th>요청 일시</th>
            <td>2024-12-25</td>
          </tr>
          <tr>
            <th>요청 금액</th>
            <td>10,000</td>
          </tr>
          <tr>
            <th>상태</th>
            <td>사용 완료</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <QRCodeChangeModal v-if="isQRCodeModal">
    <template #info>QR 교환 요청</template>
    <template #content>
      <div class="change-point">
        <div class="input-area">
          <div class="title">잔여포인트</div>
          <div class="contents">10,000 포인트</div>
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

export default {
  components: {
    QRCodeChangeModal,
  },

  data() {
    return {
      isQRCodeModal: false,
    };
  },

  methods: {
    showQRCodeChangeModal() {
      this.isQRCodeModal = true;
    },

    closeModal() {
      this.isQRCodeModal = false;
    },
  },
};
</script>
