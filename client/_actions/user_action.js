import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types/types";

export function loginUser(dataToSubmit) {
  // console.log("dataToSubmit>>>>", dataToSubmit);
  const request = axios
  // .post("/login", dataToSubmit) <<-- /login 이거 왜 localhost:3000를 바라보고 있는거야..
  // 아.. utils/api.ts에 axios baseURL 설정되어 있었구나.. 하하하하하하
  // .post("/api/user/login", dataToSubmit)
    .post("http://localhost:8080/login", dataToSubmit)
    .then((res) =>{ 
    console.log('res>>>>>>>,,,', res);
    return res.data
})
    return {
      type: LOGIN_USER,
      payload: request,
  };
}
export function registerUser(dataToSubmit) {
  const request = axios.post('http://localhost:8080/register', dataToSubmit)
  // const request = axios.post('http://localhost:8080/api/users/register', dataToSubmit)
  .then(response => response.data);
  return{
      type: REGISTER_USER,
      payload: request
    };
}

export function auth(){
  const request = axios.get('http://localhost:8080/auth')
    .then(response => response.data);
  return{
      type: AUTH_USER,
      payload: request
  }
}

// export function loginUser(dataToSubmit){
//   const request = axios.post('http://localhost:8080/login', dataToSubmit)
//     .then(response => response.data);
//   return{
//       type: LOGIN_USER,
//       payload: request
//   }
// }

      // .catch((err) => {
      //   return { status: `login Fail: ${err}` };
      // });