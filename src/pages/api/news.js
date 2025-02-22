import { fetchNews } from '../../util/fetchNews'; // Adjust the path as necessary

export default async function handler(req, res) {
  const { category = "All", page = 1, language } = req.query;

  try {
    const articles = await fetchNews(category, page, language);
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}