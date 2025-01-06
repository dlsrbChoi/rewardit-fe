import axios from "axios";

export default {
  /* CAMPAIGN */
  // 캠페인 목록 조회
  getCampaignList(params) {
    return axios.get('/api/campaign', { params });
  },

  // 캠페인 참여 요청
  getCampaignJoin(url, params) {
    return axios.get(url, { params });
  },

  /* MEMBER */
  // 구글 회원 존재 여부
  checkMember(params) {
    return axios.post('/api/member/google/exists', params)
  },

  // 구글 로그인
  googleLogin(params) {
    return axios.post('/api/member/google/login', params)
  },

  // refresh 토큰
  refreshToken() {
    return axios.get('/api/member/refresh');
  },

  // 회원 정보 조회
  getMemberInfo() {
    return axios.get('/api/member')
  },

  /* REWARD */
  // 리워드 기록 목록 조회
  getRewardHistory(params) {
    return axios.get('/api/reward', { params });
  },

  /* QR CODE */
  // 포인트 QR 코드 생성
  generateQrcode(params) {
    return axios.post('/api/qr/generate', params)
  },

  // 포인트 사용 QR 조회
  getQrcode(qrId) {
    return axios.get(`/api/qr/${qrId}`);
  },

  // QR 사용 처리
  useQrcode(qrId) {
    return axios.post(`/api/qr/use/${qrId}`)
  },

  // QR 사용 목록 조회
  getQrcodeHistory(params) {
    return axios.get('/api/qr', { params })
  },

  /* SHOP */
  // 사업자 로그인
  loginBusiness(params) {
    return axios.post('/api/shop/login', params)
  },

  // QR 가맹점 연결
  useQRcodeWithBusiness(qrId) {
    return axios.post(`/api/shop/use-request/${qrId}`)
  },

  // QR 사용 요청 조회
  getQRcodeUseHistory(params) {
    return axios.get('/api/shop/use-request', { params })
  },
};
