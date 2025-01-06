<template>
  <div class="admin-home">
    <div class="main-title">
      <p>관리자페이지</p>
    </div>
    <div class="remain-box">
      <p>총 사장님 수 : <span class="point">0</span> 명</p>
      <p>총 회원 수 : <span class="point">0</span> 명</p>
      <p>지급 금액 : <span class="point">0</span> 명</p>
      <p>채굴 포인트 : <span class="point">0</span> 명</p>
    </div>
    <div class="table">
      <div class="table-top">
        <select>
          <option>1 월</option>
          <option>2 월</option>
        </select>
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
        @page-count="pageCount = $event"
      >
        <template #colgroup>
          <caption>
            관리자페이지 테이블
          </caption>
        </template>
        <template #[`item.a`]="{ item }">
          <div class="th">가게명</div>
          <div class="td">
            {{ item.a }}
          </div>
        </template>
        <template #[`item.b`]="{ item }">
          <div class="th">이름</div>
          <div class="td">
            {{ item.b }}
          </div>
        </template>
        <template #[`item.c`]="{ item }">
          <div class="th">연락처</div>
          <div class="td">
            {{ item.c }}
          </div>
        </template>
        <template #[`item.d`]="{ item }">
          <div class="th">누적금액</div>
          <div class="td">
            {{ $gFunc.comma(item.d) }}
          </div>
        </template>
        <template #[`item.e`]="{ item }">
          <div class="th">은행명</div>
          <div class="td">
            {{ item.e }}
          </div>
        </template>
        <template #[`item.f`]="{ item }">
          <div class="th">계좌번호</div>
          <div class="td">
            {{ item.f }}
          </div>
        </template>
        <template #[`item.g`]="{ item }">
          <div class="th">등본<br />(확인여부)</div>
          <div class="td">
            {{ item.g }}
          </div>
        </template>
        <template #[`item.h`]="{ item }">
          <div class="th">지급 여부</div>
          <div class="td">
            {{ item.h }}
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
</template>

<script>
import openModal from '@/util/modalSetter';

export default {
  data() {
    return {
      page: 1,
      perPage: 10,
      totalCount: 0,
      headers: [
        {
          title: '가게명',
          key: 'a',
          align: 'center',
          sortable: false,
        },
        {
          title: '이름',
          key: 'b',
          align: 'center',
          sortable: false,
        },
        {
          title: '연락처',
          key: 'c',
          align: 'center',
          sortable: false,
        },
        {
          title: '누적금액',
          key: 'd',
          align: 'center',
          sortable: false,
        },
        {
          title: '은행명',
          key: 'e',
          align: 'center',
          sortable: false,
        },
        {
          title: '계좌번호',
          key: 'f',
          align: 'center',
          sortable: false,
        },
        {
          title: '등본(확인여부)',
          key: 'g',
          align: 'center',
          sortable: false,
        },
        {
          title: '지급 여부',
          key: 'h',
          align: 'center',
          sortable: false,
        },
      ],
      items: [
        {
          a: 'OO 음식점',
          b: '주방장',
          c: '010-1234-5678',
          d: 100000,
          e: '농협',
          f: '00-0000-00000',
          g: 'O',
          h: '완료',
        },
      ],

      isLoading: false,
    };
  },

  methods: {},
};
</script>
