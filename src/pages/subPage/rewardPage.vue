<template>
  <div class="reward-home">
    <div class="main-title">
      <p>바로 사용하는, 리워드</p>
    </div>
    <div class="tab-menu">
      <ul>
        <li
          :class="{ active: adsSubCate === 'QUIZ' }"
          @click="changeCategory('QUIZ')"
        >
          퀴즈형<br />광고
        </li>

        <li
          :class="{
            active: adsSubCate === 'SNS_SUBSCRIBE',
          }"
          @click="changeCategory('SNS_SUBSCRIBE')"
        >
          SNS 구독<br />광고
        </li>
      </ul>
      <ul>
        <li
          :class="{ active: adsSubCate === 'PARTICIPATE' }"
          @click="changeCategory('PARTICIPATE')"
        >
          참여형<br />광고
        </li>
        <li
          :class="{ active: adsSubCate === 'SECOND_30' }"
          @click="changeCategory('SECOND_30')"
        >
          30초<br />광고
        </li>
      </ul>
    </div>
    <div class="contents">
      <p class="page-title">{{ adsSubTitle }}</p>
      <div v-if="!totalPage" class="no-ads">
        <p>광고가 없습니다.</p>
      </div>
      <div
        class="ads-card"
        v-for="item in items"
        :key="item.adsIdx"
      >
        <img
          v-if="item.adsFeedImg"
          :src="item.adsFeedImg"
          alt="광고 썸네일"
        />
        <img
          v-else
          src="@/assets/images/img-ads-preview-default.png"
          alt="광고 썸네일 기본"
        />
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
              <p v-if="item.adsReParticipate === 'Y'">
                가능
              </p>
              <p v-else>불가능</p>
            </div>
            <div
              class="reward-area"
              @click="joinCampaign(item.clickUrl)"
            >
              <span>Rewardit 포인트 적립</span>
              <span>
                {{ $gFunc.comma(item.adsRewardPrice) }}원
              </span>
            </div>
          </div>
        </div>
      </div>
      <v-pagination
        v-if="totalPage"
        rounded="circle"
        v-model="page"
        :length="totalPage"
        :total-visible="5"
        @click="[getCampaignList(), $gFunc.scrollUp()]"
      />
    </div>
  </div>

  <CampaignExplainModal v-if="isCampaignExplain">
    <template #info>{{ selected.adsName }}</template>
    <template #point>
      {{ $gFunc.comma(selected.adsRewardPrice) }}P
    </template>
    <template #content>
      <pre v-html="decodeAdsSummary" />
    </template>
    <template #bottom>
      <button
        type="button"
        @click="joinCampaign(selected.clickUrl)"
      >
        참여하기
      </button>
    </template>
    <template #button>
      <button class="btn closeBtn" @click="closeModal">
        <span class="hidden">닫기</span>
      </button>
    </template>
  </CampaignExplainModal>

  <CampaignConditionModal v-if="isCampaignCondition">
    <template #info>{{ selected.adsName }}</template>
    <template #point>
      {{ $gFunc.comma(selected.adsRewardPrice) }}P
    </template>
    <template #content>
      <pre v-html="decodeAdsCondition" />
    </template>
    <template #bottom>
      <button
        type="button"
        @click="joinCampaign(selected.clickUrl)"
      >
        참여하기
      </button>
    </template>
    <template #button>
      <button class="btn closeBtn" @click="closeModal">
        <span class="hidden">닫기</span>
      </button>
    </template>
  </CampaignConditionModal>
</template>

<script>
import CampaignExplainModal from '@/components/modal/RewardModal.vue';
import CampaignConditionModal from '@/components/modal/RewardModal.vue';
import api from '@/api/api';
import openModal from '@/util/modalSetter';
import axios from 'axios';

export default {
  components: {
    CampaignExplainModal,
    CampaignConditionModal,
  },

  data() {
    return {
      uid: null,

      page: 1,
      perPage: 10,
      totalPage: 0,
      adsSubCate: 'QUIZ',
      adsSubTitle: '퀴즈형 광고',

      items: [],
      selected: {},

      isCampaignExplain: false,
      isCampaignCondition: false,
    };
  },

  computed: {
    decodeAdsSummary() {
      return this.decodeHtmlEntities(
        this.selected.adsSummary,
      );
    },

    decodeAdsCondition() {
      return this.decodeHtmlEntities(
        this.selected.adsCondition,
      );
    },
  },

  watch: {
    adsSubCate() {
      if (this.adsSubCate === 'SECOND_30') {
        this.adsSubTitle = '30초 광고';
      } else if (this.adsSubCate === 'PARTICIPATE') {
        this.adsSubTitle = '참여형 광고';
      } else if (this.adsSubCate === 'SNS_SUBSCRIBE') {
        this.adsSubTitle = 'SNS 구독 광고';
      } else {
        this.adsSubTitle = '퀴즈형 광고';
      }

      this.getCampaignList();
    },
  },

  async created() {
    await this.getMemberInfo();
    this.getCampaignList();
  },

  methods: {
    async getMemberInfo() {
      const res = await api.getMemberInfo();

      if (res?.data?.result === 'FAIL') {
        openModal('로그인이 필요합니다.', 'warning');
        return;
      }

      this.uid = res?.data?.data?.id ?? null;
    },

    async getCampaignList() {
      const params = {
        page: this.page,
        perPage: this.perPage,
        adsSubCate: this.adsSubCate,
      };

      const res = await api.getCampaignList(params);

      this.items = res?.data?.data?.items ?? [];
      this.totalPage = res?.data?.data?.total ?? 1;
    },

    changeCategory(cate) {
      this.adsSubCate = cate;
    },

    showCampaignExplainModal(item) {
      this.selected = item;
      this.isCampaignExplain = true;
    },

    showCampaignConditionModal(item) {
      this.selected = item;
      this.isCampaignCondition = true;
    },

    decodeHtmlEntities(value) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = value;
      return textarea.value;
    },

    closeModal() {
      this.selected = {};
      this.isCampaignExplain = false;
      this.isCampaignCondition = false;
    },

    async joinCampaign(urlString) {
      this.closeModal();

      if (!urlString) {
        openModal('종료된 캠페인입니다.', 'warning');
        return;
      }

      const params = {
        clickUrl: urlString,
      };

      const res = await api.getCampaignJoin(params);

      if (res?.data?.result === 'FAIL') {
        openModal(
          res?.data?.message
            ? res?.data?.message
            : '종료된 캠페인입니다.',
          'warning',
        );
        return;
      }

      const responseUrl = res.data.data;
      window.open(responseUrl, '_blank');
    },
  },
};
</script>
