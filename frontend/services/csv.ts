import { API_BASE } from "@/lib/constants";
import axios from "axios";
import Cookies from "js-cookie";

interface CsvFile {
  id: string;
  path: string;
  filename: string;
  upload_time: string;
  uploaded_by: number;
}

export const getAllCsv = async () => {
  const response = await axios<CsvFile[]>({
    method: "GET",
    url: `${API_BASE}csv/files`,
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}` || "",
    },
  });
  return response;
};

export const uploadCsv = async (csv: File) => {
  const response = await axios({
    method: "POST",
    url: `${API_BASE}csv/upload`,
    data: csv,
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}` || "",
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const deleteCsv = async (id: string) => {
  const response = await axios({
    method: "DELETE",
    url: `${API_BASE}csv/files/${id}`,
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}` || "",
    },
  });
  return response;
};
