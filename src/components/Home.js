import { useEffect, useState, useCallback } from "react";

const Home = ({ category, search, language }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getNews = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Update the fetch URL to point to the correct API route
      const response = await fetch(`/api/news?category=${category || "All"}&page=${pageNumber}&language=${language}`);
      if (!response.ok) throw new Error("Failed to fetch news");

      const data = await response.json();
      const articles = data.articles;

      if (articles.length > 0) {
        setNews((prevNews) => [...prevNews, ...articles]); // Append new articles
        setHasMore(true);
      } else {
        setHasMore(false); // No more articles to load
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    setNews([]); // Clear previous news on category or language change
    setPage(1);
    getNews(1);
  }, [category, language]);

  // Load more news when scrolling near bottom
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      getNews(page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="mt-20 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {news
        .filter((data) => data.title.includes(search))
        .map((data, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {data.urlToImage ? (
              <img className="w-full h-40 sm:h-48 object-cover" src={data.urlToImage} alt={data.title} />
            ) : (
              <img className="w-full h-40 sm:h-48 object-cover" src="/defaultnews.jpeg" alt="Default News" />
            )}
            <div className="p-3">
              <h2 className="font-bold text-md sm:text-lg mb-2">
                <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:underline">
                  {data.title}
                </a>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base line-clamp-3">
                {data.description}
              </p>
            </div>
          </div>
        ))}

      {/* Show Loader */}
      {loading && (
        <div className="col-span-full flex justify-center my-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* No More News Message */}
      {!loading && !hasMore && (
        <div className="col-span-full text-center text-gray-500 text-lg font-semibold">
          No more news to load.
        </div>
      )}
    </div>
  );
};

export default Home;