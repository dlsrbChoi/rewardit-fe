<template>
  <div class="admin-home">
    <div class="main-title">
      <p>사장님페이지</p>
    </div>
    <div class="remain-box">
      <p>총 파트너 수 : <span class="point">0</span> 명</p>
      <p>지급 금액 : <span class="point">0</span> 명</p>
    </div>
    <div class="table">
      <div class="table-top">
        <!-- TODO: DATE MONTH PICKER -->
        <select>
          <option>1 월</option>
          <option>2 월</option>
        </select>
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
        @page-count="pageCount = $event"
      >
        <template #colgroup>
          <caption>
            사장님페이지 테이블
          </caption>
        </template>
        <template #[`item.requestedAt`]="{ item }">
          <div class="th">요청일시</div>
          <div class="td">
            {{ item.requestedAt }}
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
            {{ item.status }}
          </div>
        </template>
      </v-data-table>
      <v-pagination
        rounded="circle"
        v-model="page"
        :length="totalPage"
        :total-visible="5"
      />
    </div>
  </div>

  <!-- <button
    type="button"
    class="button black"
    @click="showModal"
  >
    승인하기
  </button> -->
</template>

<script>
import openModal from '@/util/modalSetter';

export default {
  data() {
    return {
      page: 1,
      perPage: 10,
      totalPage: 1,
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
      items: [
        {
          requestedAt: '2025-01-01',
          memberName: '김OO',
          usePoint: 1000,
          status: '사용 완료',
        },
        {
          requestedAt: '2025-01-01',
          memberName: '박OO',
          usePoint: 5000,
          status: '미사용',
        },
      ],

      isLoading: false,
    };
  },

  methods: {
    showModal() {
      openModal(
        `승인하시겠습니까?`,
        'confirm',
        null,
        this.test,
        '취소',
        '승인',
      );
    },

    test() {
      console.log('승인');
    },
  },
};
</script>
