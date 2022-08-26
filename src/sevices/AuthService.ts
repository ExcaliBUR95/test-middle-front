import { Axios, AxiosResponse } from "axios";
import $api from "../http/axios";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    return $api
      .post("/login", { email, password })
      .then((response) => response.data);
  }

  static async registration(
    email: string,
    password: string,
    male: boolean,
    name: string,
    brithDay: string,
  ): Promise<AxiosResponse> {
    return $api
      .post("/registration", { email, password, male, name, brithDay })
      .then((response) => response.data);
  }

  static async logout( ): Promise<void> {
    return $api
      .post("/logout")
  }
}
