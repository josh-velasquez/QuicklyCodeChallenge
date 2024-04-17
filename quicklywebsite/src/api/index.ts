import axios from "axios";
import { CompanyPayload, UserPayload, UserResponse } from "../models/User";

export interface QuicklyPayload {
  success: boolean;
  message: string;
  token?: string;
}

export const createUser = async (
  userInfo: UserPayload,
  companyInfo: CompanyPayload
): Promise<QuicklyPayload> => {
  return await axios
    .post(`${process.env.REACT_APP_QUICKLY_BASE_URL}/auth/signup`, {
      user: userInfo,
      company: companyInfo,
    })
    .then((response: any) => {
      return response.data as QuicklyPayload;
    })
    .catch((error: any) => {
      return error.response.data as QuicklyPayload;
    });
};

export const getUser = async (token: string): Promise<UserResponse> => {
  return await axios
    .get(`${process.env.REACT_APP_QUICKLY_BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => {
      if (response.data.success) {
        return response.data.user as UserResponse;
      }
    })
    .catch((error: any) => {
      return error.response.data;
    });
};

export const loginUser = async (
  email: string,
  password: string
): Promise<QuicklyPayload> => {
  return await axios
    .post(`${process.env.REACT_APP_QUICKLY_BASE_URL}/auth/login`, {
      email: email,
      password: password,
    })
    .then((response: any) => {
      return response.data as QuicklyPayload;
    })
    .catch((error: any) => {
      return error.response.data as QuicklyPayload;
    });
};
