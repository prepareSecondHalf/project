// authentication service : 로컬 스토리지에 저장된 유저 정보와 jwt를 axios를 이용해 http request 사용
import axios from "axios";
const API_URL = "http://localhost:8080/login";
class AuthService {
  // login: post 기능, 로컬 스토리지 jwt 저장 (로컬스토리지에 유저 추가)
  // - post(request) - email[string], password[string]
  // - get(response) - common[boolean], success[token(string), user(IUser)], fail[msg(string)]
  login = async (email: string, password: string) => {
    const userInfo = {
      email: email,
    };

    return await axios
      .post(
        API_URL + "signin",
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // response에 accessToken 존재 시
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          localStorage.setItem("isLoggedIn", "true");
        }
        return userInfo;
      })
      .catch(() => {
        console.log("실패");
      });
  };

  // logout : 로컬 스토리지 jwt 제거
  // - request - id[string]
  // - reponse - success[boolean]
  logout() {
    localStorage.removeItem("user");
  }

  // register : 회원 등록
  // - request - name, email, passowrd, phone
  // - response - common[boolean], success[token(string), user(IUser)], fail[msg(string)]
  register(username: string, email: string, phone: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      phone,
    });
  }

  // getCurrentUser : 스토리지에 저장된 jwt, user 정보 get
  // - request - name, email, passowrd, phone
  // - response - common[boolean], success[token(string), user(IUser)], fail[msg(string)]
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}

export default new AuthService();
