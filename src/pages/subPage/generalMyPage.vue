<template>
  <div class="mypage-home">
    <div class="main-title">
      <p>마이페이지</p>
    </div>
    <div class="tab-menu">
      <ul>
        <li class="active">이벤트 참여 내역</li>
        <li @click="$router.push('/mypage/qr-code')">
          QR 교환 및 내역 확인
        </li>
        <li @click="$router.push('/mypage/qr-code/use')">
          QR 사용
        </li>
      </ul>
    </div>
    <div class="remain-box">
      <p>요청가능 금액 : <span class="point">0</span> 원</p>
      <p>
        지급된 금액 :
        <span class="point">{{
          $gFunc.comma(info.usedPoint)
        }}</span>
        원
      </p>
    </div>
    <v-data-table
      caption="마이페이지 테이블"
      no-data-text="결과가 없습니다."
      class="table vuetify-table"
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
    </v-data-table>
    <!-- <div class="table">
      <table>
        <caption>
          마이페이지 테이블
        </caption>
        <colgroup>
          <col style="width: 30%; min-width: 120px" />
          <col style="width: auto" />
        </colgroup>
        <tbody v-for="item in items" :key="item.id">
          <tr>
            <th>광고종류</th>
            <td>{{ item.adsType }}</td>
          </tr>
          <tr>
            <th>이벤트 명</th>
            <td>{{ item.eventName }}</td>
          </tr>
          <tr>
            <th>발생 포인트</th>
            <td>{{ $gFunc.comma(item.reward) }}</td>
          </tr>
          <tr>
            <th>승인일시</th>
            <td>
              {{ $gFunc.dateFormat(item.acceptedAt) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>

<script>
import api from '@/api/api';

export default {
  data() {
    return {
      info: {},

      page: 1,
      perPage: 10,
      totalCount: 0,
      headers: [
        {
          title: '광고종류',
          key: 'adsType',
          align: 'center',
          sortable: false,
        },
        {
          title: '이벤트 명',
          key: 'eventName',
          align: 'center',
          sortable: false,
        },
        {
          title: '발생 포인트',
          key: 'reward',
          align: 'center',
          sortable: false,
        },
        {
          title: '승인일시',
          key: 'acceptedAt',
          align: 'center',
          sortable: false,
        },
      ],
      items: [],

      isLoading: false,
    };
  },

  computed: {
    pageCount() {
      return Math.ceil(this.totalCount / this.perPage);
    },
  },

  created() {
    // this.getMemberInfo();
  },

  methods: {
    async getMemberInfo() {
      const res = await api.getMemberInfo();
      console.log(res);
      this.info = res?.data ?? {};
      // TODO: 요청가능한 포인트
    },

    async getRewardHistory() {
      const params = {
        page: this.page,
        perPage: this.perPage,
      };

      const res = await api.getRewardHistory(params);

      this.items = res?.data?.items ?? [];
    },
  },
};
</script>
