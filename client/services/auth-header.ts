// data service : 서버로부터 데이터 받는 과정에서 protected resource 접근을 위해 http request에 추가 authorization header 필요
import axios from "axios";

export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  // 로컬스토리지에 유저 존재여부 확인
  if (userStr) {
    user = JSON.parse(userStr);
  }
  // 이미 로그인한 경우
  if (user && user.accessToken) {
    // http authorization header 반환 :  ‘x-access-token’는 REST API의 인증 방식 중 하나
    return { "x-access-token": user.accessToken };
  } else {
    return { "x-access-token": null };
  }
}
