import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchNews = async (category, pageNumber = 1, language) => {
  let url = `https://newsapi.org/v2/everything?q=${category || "All"}&page=${pageNumber}&pageSize=10&apiKey=${API_KEY}`;

  // Add language parameter if it's not English
  if (language && language !== "en") {
    url += `&language=${language}`;
  }

  const response = await axios.get(url);
  return response.data.articles;
};