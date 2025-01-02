import axiosHook from './axios';

export default {
  /* CAMPAIGN */
  // 캠페인 목록 조회
  getCampaignList(params) {
    return axiosHook('get', '/api/campaign', params);
  },

  /* MEMBER */
  // 회원 정보 조회
  getMemberInfo() {
    return axiosHook('get', '/api/member', params);
  },

  /* REWARD */
  // 리워드 기록 목록 조회
  getRewardHistory() {
    return axiosHook('get', '/api/reward', params);
  },

  /* SHOP */
  // 사업자 로그인
  loginBusiness() {
    return axiosHook('post', '/api/shop/login', params);
  },

  // QR 가맹점 연결
  useQRcodeWithBusiness(qrid) {
    return axiosHook('post', `/api/shop/use-request/${qrid}`);
  },

  // QR 사용 요청 조회
  getQRcodeUseHistory(params) {
    return axiosHook('get', '/api/shop/use-request', params);
  },
};
