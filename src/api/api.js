import axiosHook from './axios';

export default {
  // 캠페인 목록 조회
  getCampaignList(params) {
    return axiosHook('get', '/campaign', params);
  },

  // 회원 정보 조회
  getMemberInfo() {
    return axiosHook('get', '/member', params);
  },

  // 리워드 기록 목록 조회
  getRewardHistory() {
    return axiosHook('get', '/reward', params);
  },

  // 사업자 로그인
  loginBusiness() {
    return axiosHook('post', '/shop/login', params);
  },

  //
};
