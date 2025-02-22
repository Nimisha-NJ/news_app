import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async () => {
  try {
    console.log("BASE_URL:", BASE_URL);
    console.log("API_KEY:", API_KEY);
    const response = await axios.get("https://newsdata.io/api/1/latest?apikey=pub_70991731738e3689d0d08c048c6bcff41b70a");
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching headlines:", error);
    return [];
  }
};

export const fetchCategoryNews = async (category) => {
  try {
    const response = await axios.get("https://newsdata.io/api/1/latest?apikey=pub_70991731738e3689d0d08c048c6bcff41b70a");
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching category news:", error);
    return [];
  }
};

export const searchNews = async (query) => {
  try {
    const response = await axios.get("https://newsdata.io/api/1/latest?apikey=pub_70991731738e3689d0d08c048c6bcff41b70a");
    return response.data.articles;
  } catch (error) {
    console.error("Error searching news:", error);
    return [];
  }
};
