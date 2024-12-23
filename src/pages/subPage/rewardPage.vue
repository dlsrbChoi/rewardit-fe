<template>
  <div class="reward-home">
    <div class="main-title">
      <p>바로 사용하는, 리워드</p>
    </div>
    <div class="tab-menu">
      <ul>
        <li class="active">참여형<br />광고</li>
        <li>30초<br />광고</li>
        <li>SNS 구독<br />광고</li>
      </ul>
    </div>
    <div class="contents">
      <p class="page-title">참여형 광고</p>
      <div class="ads-card">
        <div class="ads-top">
          <img
            src="../../assets/images/sampleAdd.png"
            alt="광고 썸네일"
          />
        </div>
        <div class="ads-bottom">
          <div class="text-area">
            <div
              class="text-box"
              @click="showCampaignExplainModal"
            >
              <span>캠페인 참여 설명 : </span>
              <span class="description">
                이미지를 클릭 뒤 URL 접속 후 회원가입
              </span>
            </div>
            <div class="text-box">
              <span>캠페인 참여 조건 : </span>
              <span class="description">
                회원가입 후 아이디 입력 및 이벤트 신청
              </span>
            </div>
            <div class="possible-area">
              <p>재참여 가능 여부</p>
              <p>가능</p>
            </div>
            <div class="reward-area">
              <span>케이뱅크 (신규 회원가입)</span>
              <span>30원</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ads-card">
        <div class="ads-top">
          <img
            src="../../assets/images/sampleAdd.png"
            alt="광고 썸네일"
          />
        </div>
        <div class="ads-bottom">
          <div class="text-area">
            <div class="text-box">
              <span>캠페인 참여 설명 : </span>
              <span class="description">
                이미지를 클릭 뒤 URL 접속 후 회원가입
              </span>
            </div>
            <div class="text-box">
              <span>캠페인 참여 조건 : </span>
              <span class="description">
                회원가입 후 아이디 입력 및 이벤트 신청
              </span>
            </div>
            <div class="possible-area">
              <p>재참여 가능 여부</p>
              <p>가능</p>
            </div>
            <div class="reward-area">
              <span>30초 영상보기</span>
              <span>30원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CampaignExplainModal v-if="isCampaignExplain">
    <template #info>캠페인 참여 설명</template>
    <template #content>
      <div>이미지를 클릭 뒤 URL 접속 후 회원가입</div>
    </template>
    <template #button>
      <button class="btn closeBtn" @click="closeModal">
        <span class="hidden">닫기</span>
      </button>
    </template>
  </CampaignExplainModal>
</template>

<script>
import openModal from '@/util/modalSetter';
import CampaignExplainModal from '@/components/modal/ContentsModal.vue';

export default {
  components: {
    CampaignExplainModal,
  },

  data() {
    return {
      isCampaignExplain: false,
    };
  },

  methods: {
    showModal() {
      openModal('text area', 'check');
    },

    showCampaignExplainModal() {
      this.isCampaignExplain = true;
    },

    closeModal() {
      this.isCampaignExplain = false;
    },
  },
};
</script>
