<template>
  <div class="admin-home">
    <div class="main-title">
      <p>관리자페이지</p>
    </div>
    <div class="remain-box">
      <p>
        총 사장님 수 :
        <span class="point">
          {{ $gFunc.comma(info.totalShopCount) }}
        </span>
        명
      </p>
      <p>
        총 회원 수 :
        <span class="point">
          {{ $gFunc.comma(info.totalMemberCount) }}
        </span>
        명
      </p>
      <p>
        지급 금액 :
        <span class="point">
          {{ $gFunc.comma(info.totalPayAmount) }}
        </span>
        원
      </p>
    </div>
    <div class="table">
      <div class="table-top">
        <YearMonthPicker
          @updateYearMonth="updateYearMonth"
        />
        <button
          type="button"
          class="signup"
          @click="openSignupModal"
        >
          사업자 계정생성
        </button>
      </div>
      <v-data-table
        caption="관리자페이지 테이블"
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
            관리자페이지 테이블
          </caption>
        </template>
        <template #[`item.shopName`]="{ item }">
          <div class="th">가게명</div>
          <div class="td">
            {{ item.shopName }}
          </div>
        </template>
        <template #[`item.name`]="{ item }">
          <div class="th">이름</div>
          <div class="td">
            {{ item.name }}
          </div>
        </template>
        <template #[`item.phone`]="{ item }">
          <div class="th">연락처</div>
          <div class="td">
            {{ item.phone }}
          </div>
        </template>
        <template #[`item.accumulateAmount`]="{ item }">
          <div class="th">월 누적금액</div>
          <div class="td">
            {{ $gFunc.comma(item.accumulateAmount) }}
          </div>
        </template>
        <template #[`item.bank`]="{ item }">
          <div class="th">은행명</div>
          <div class="td">
            {{ item.bank }}
          </div>
        </template>
        <template #[`item.accountNo`]="{ item }">
          <div class="th">계좌번호</div>
          <div class="td">
            {{ item.accountNo }}
          </div>
        </template>
        <template #[`item.status`]="{ item }">
          <div class="th">지급 여부</div>
          <div class="td">
            <span v-if="item.status === 'PAID'">완료</span>
            <span v-else>미지급</span>
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

  <SignupModal v-if="isSignupModal">
    <template #info>사업자 회원가입</template>
    <template #content>
      <div class="change-point">
        <div class="input-area">
          <div class="title">가맹점명</div>
          <div class="contents">
            <input
              type="text"
              class="middle"
              v-model="signupInfo.shopName"
            />
          </div>
        </div>
        <div class="input-area">
          <div class="title">아이디</div>
          <div class="contents">
            <input
              type="text"
              class="middle"
              v-model="signupInfo.loginId"
            />
          </div>
        </div>
        <div class="input-area">
          <div class="title">비밀번호</div>
          <div class="contents">
            <input
              type="password"
              class="middle"
              v-model="signupInfo.password"
            />
          </div>
        </div>
        <div class="input-area">
          <div class="title">비밀번호 확인</div>
          <div class="contents">
            <input
              type="password"
              class="middle"
              v-model="passwordCheck"
            />
          </div>
        </div>
        <div class="input-area">
          <div class="title">이름</div>
          <div class="contents">
            <input
              type="text"
              class="middle"
              v-model="signupInfo.name"
            />
          </div>
        </div>
        <div class="input-area">
          <div class="title">휴대폰 번호</div>
          <div class="contents">
            <input
              type="tel"
              class="middle"
              placeholder="숫자만 입력"
              v-model="signupInfo.phone"
              @input="onlyNum($event, 'phone')"
            />
          </div>
        </div>
        <div class="input-area">
          <div class="title">은행명</div>
          <div class="contents">
            <input
              type="text"
              class="middle"
              v-model="signupInfo.bank"
            />
          </div>
        </div>
        <div class="input-area">
          <div class="title">계좌번호</div>
          <div class="contents">
            <input
              type="tel"
              class="middle"
              placeholder="숫자만 입력"
              v-model="signupInfo.accountNo"
              @input="onlyNum($event, 'accountNo')"
            />
          </div>
        </div>
        <div class="modal-button-area">
          <button
            type="button"
            class="button black"
            @click="createAccount"
          >
            계정생성
          </button>
        </div>
      </div>
    </template>
    <template #button>
      <button class="btn closeBtn" @click="closeModal">
        <span class="hidden">닫기</span>
      </button>
    </template>
  </SignupModal>
</template>

<script>
import SignupModal from '@/components/modal/ContentsModal.vue';
import YearMonthPicker from '@/components/datePicker/YearMonthPicker.vue';
import api from '@/api/api';
import dayjs from 'dayjs';
import openModal from '@/util/modalSetter';

export default {
  components: {
    SignupModal,
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
          title: '가게명',
          key: 'shopName',
          align: 'center',
          sortable: false,
        },
        {
          title: '이름',
          key: 'name',
          align: 'center',
          sortable: false,
        },
        {
          title: '연락처',
          key: 'phone',
          align: 'center',
          sortable: false,
        },
        {
          title: '월 누적금액',
          key: 'accumulateAmount',
          align: 'center',
          sortable: false,
        },
        {
          title: '은행명',
          key: 'bank',
          align: 'center',
          sortable: false,
        },
        {
          title: '계좌번호',
          key: 'accountNo',
          align: 'center',
          sortable: false,
        },
        {
          title: '지급 여부',
          key: 'status',
          align: 'center',
          sortable: false,
        },
      ],
      items: [],
      info: {},

      signupInfo: {
        shopName: '',
        loginId: '',
        password: '',
        name: '',
        phone: '',
        bank: '',
        accountNo: '',
      },
      passwordCheck: '',

      isLoading: false,
      isSignupModal: false,
    };
  },

  methods: {
    updateYearMonth(yearMonth) {
      this.yearMonth = yearMonth;
    },

    async getManageList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        perPage: this.perPage,
        yearMonth: this.yearMonth,
      };

      const res = await api.getManageList(params);
      this.isLoading = false;

      this.items = res?.data?.data?.items ?? [];
      this.info = res?.data?.data?.totalInfo ?? {};
      this.totalPage = res?.data?.data?.total ?? 1;
    },

    openSignupModal() {
      this.isSignupModal = true;
    },

    closeModal() {
      this.isSignupModal = false;
    },

    onlyNum(e, type) {
      this.signupInfo[type] = this.$gFunc.onlyNumber(
        e.target.value,
      );
    },

    signupValidaion() {
      if (!this.signupInfo.shopName) {
        openModal('가맹점명을 입력해주세요.', 'warning');
        return false;
      }

      if (!this.signupInfo.loginId) {
        openModal('아이디를 입력해주세요.', 'warning');
        return false;
      }

      if (!this.signupInfo.password) {
        openModal('비밀번호를 입력해주세요.', 'warning');
        return false;
      }

      if (this.signupInfo.password !== this.passwordCheck) {
        openModal(
          '비밀번호가 일치하지 않습니다.',
          'warning',
        );
        return false;
      }

      if (!this.signupInfo.name) {
        openModal('이름을 입력해주세요.', 'warning');
        return false;
      }

      if (!this.signupInfo.phone) {
        openModal('휴대폰 번호를 입력해주세요.', 'warning');
        return false;
      }

      if (!this.signupInfo.bank) {
        openModal('은행명을 입력해주세요.', 'warning');
        return false;
      }

      if (!this.signupInfo.accountNo) {
        openModal('계좌번호를 입력해주세요.', 'warning');
        return false;
      }

      return true;
    },

    async signupBusiness() {
      if (!this.signupValidaion()) return;

      const res = await api.signupBusiness(this.signupInfo);

      if (res.data.result !== 'OK') {
        openModal('계정생성에 실패하였습니다.', 'warning');
        return;
      }

      this.closeModal();
      openModal('계정이 생성되었습니다.', 'check');
    },
  },
};
</script>
