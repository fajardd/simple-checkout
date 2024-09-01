import axios from "axios";
import env from "react-dotenv";

export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${env.API_URL}/products`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API response error", error.response);
    } else {
      console.error("Error getAllProduct", error.message);
    }
    throw error;
  }
};
