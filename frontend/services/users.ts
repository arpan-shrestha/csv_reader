import { API_BASE } from "@/lib/constants";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  username: string;
  password: string;
}

interface UserResponse {
  role: string;
  username: string;
  id: number;
}

interface CsvFile {
  id: string;
  path: string;
  filename: string;
  upload_time: string;
  uploaded_by: number;
}

const successStatus = (status: number) => status === 200;

export const getAllUsers = async () => {
  const response = await axios<UserResponse[]>({
    method: "GET",
    url: `${API_BASE}auth/users`,
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}` || "",
    },
  });
  return response;
};

export const createUser = async (user: User) => {
  const response = await axios({
    method: "POST",
    url: `${API_BASE}auth/signup`,
    data: user,
    validateStatus: successStatus,
  });
  return response.data;
};

export const signIn = async (credentials: User) => {
  const response = await axios({
    method: "POST",
    url: `${API_BASE}auth/login`,
    data: credentials,
    validateStatus: successStatus,
  });
  return response.data;
};

export const deleteUser = async (username: string) => {
  const response = await axios({
    method: "DELETE",
    url: `${API_BASE}auth/user/${username}`,
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}` || "",
    },
    validateStatus: successStatus,
  });
  return response.data;
};

export const getUsersCsvs = async () => {
  const response = await axios<CsvFile[]>({
    method: "GET",
    url: `${API_BASE}csv/files`,
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}` || "",
    },
  });
  return response;
};

export const getUserCsvById = async (id: string) => {
  const response = await axios<Record<string, string | number>[]>({
    method: "GET",
    url: `${API_BASE}csv/files/${id}`,
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}` || "",
    },
  });
  return response;
};
