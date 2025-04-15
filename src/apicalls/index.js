import axios from "axios";

export const apiRequest = async (method, url, payload, isFormData = false) => {
  try {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    const response = await axios({
      method,
      url,
      data: payload,
      headers,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
