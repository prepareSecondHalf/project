import axios from "axios";
import { LOGIN_USER } from "./types/types";

export function loginUser(dataToSubmit) {
  console.log("dataToSubmit>>>>", dataToSubmit);
  const request = axios
    // .post("/api/user/login", dataToSubmit)
    // .post("/login", dataToSubmit)
    // .post("http://localhost:3000/login", dataToSubmit)
    .post("/login", dataToSubmit)
    .then((res) => res.data)
    .catch((err) => {
      return { status: `login Fail: ${err}` };
    });
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
