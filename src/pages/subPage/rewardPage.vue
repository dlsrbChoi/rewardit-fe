<template>
  <div class="reward-home">
    <div class="main-title">
      <p>바로 사용하는, 리워드</p>
    </div>
    <div class="tab-menu">
      <ul>
        <li :class="{ active: adsSubCate === '1' }">
          30초<br />광고
        </li>
        <li :class="{ active: adsSubCate === '2' }">
          참여형<br />광고
        </li>
        <li :class="{ active: adsSubCate === '3' }">
          SNS 구독<br />광고
        </li>
      </ul>
    </div>
    <div class="contents">
      <p class="page-title">{{ adsSubTitle }}</p>
      <div
        class="ads-card"
        v-for="item in items"
        :key="item.adsIdx"
      >
        <img :src="item.adsFeedImg" alt="광고 썸네일" />
        <div class="text-area">
          <div
            class="text-box"
            @click="showCampaignExplainModal(item)"
          >
            <span>캠페인 참여 설명 : </span>
            <span class="description">
              {{ item.adsSummary }}
              이미지를 클릭 뒤 URL 접속 후 회원가입
            </span>
          </div>
          <div
            class="text-box"
            @click="showCampaignConditionModal(item)"
          >
            <span>캠페인 참여 조건 : </span>
            <span class="description">
              {{ item.adsCondition }}
              회원가입 후 아이디 입력 및 이벤트 신청
            </span>
          </div>
          <div class="result-area">
            <div class="possible-area">
              <p>재참여 가능 여부</p>
              <p>{{ item.adsReParticipate }}</p>
            </div>
            <div class="reward-area">
              <span>케이뱅크 (신규 회원가입)</span>
              <span>
                {{ $gFunc.comma(item.adsRewardPrice) }}원
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO: 페이지네이션 -->
  </div>

  <CampaignExplainModal v-if="isCampaignExplain">
    <template #info>캠페인 참여 설명</template>
    <template #content>
      <div>{{ selected.adsSummary }}</div>
    </template>
    <template #button>
      <button class="btn closeBtn" @click="closeModal">
        <span class="hidden">닫기</span>
      </button>
    </template>
  </CampaignExplainModal>

  <CampaignConditionModal v-if="isCampaignCondition">
    <template #info>캠페인 참여 조건</template>
    <template #content>
      <div>{{ selected.adsCondition }}</div>
    </template>
    <template #button>
      <button class="btn closeBtn" @click="closeModal">
        <span class="hidden">닫기</span>
      </button>
    </template>
  </CampaignConditionModal>
</template>

<script>
import CampaignExplainModal from '@/components/modal/ContentsModal.vue';
import CampaignConditionModal from '@/components/modal/ContentsModal.vue';
import api from '@/api/api';
import openModal from '@/util/modalSetter';

export default {
  components: {
    CampaignExplainModal,
    CampaignConditionModal,
  },

  data() {
    return {
      page: 1,
      perPage: 10,
      adsSubCate: '1',
      adsSubTitle: '30초 광고',

      items: [],
      selected: {},

      isCampaignExplain: false,
      isCampaignCondition: false,
    };
  },

  watch: {
    adsSubCate() {
      switch (this.adsSubCate) {
        case '1':
          this.adsSubTitle = '30초 광고';
        case '2':
          this.adsSubTitle = '참여형 광고';
        case '3':
          this.adsSubTitle = 'SNS 구독 광고';
      }
    },
  },

  created() {
    // this.getCampaignList();
  },

  methods: {
    async getCampaignList() {
      const params = {
        page: this.page,
        perPage: this.perPage,
        adsSubCate: this.adsSubCate,
      };

      const res = await api.getCampaignList(params);
      console.log(res);

      this.items = res?.data?.items ?? [];
    },

    showModal() {
      openModal('text area', 'check');
    },

    showCampaignExplainModal(item) {
      this.selected = item;
      this.isCampaignExplain = true;
    },

    showCampaignConditionModal(item) {
      this.selected = item;
      this.isCampaignCondition = true;
    },

    closeModal() {
      this.selected = {};
      this.isCampaignExplain = false;
      this.isCampaignCondition = false;
    },
  },
};
</script>
