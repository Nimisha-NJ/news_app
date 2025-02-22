import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";

const Main = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState(""); // Default language

  useEffect(() => {
    const lastSearched = localStorage.getItem('lastSearched');
    if (lastSearched) {
      setCategory(lastSearched); // Set the last searched category
    }
  }, []);

  return (
    <div>
      <Navbar setCategory={setCategory} setSearch={setSearch} setLanguage={setLanguage} />
      <Home category={category} search={search} language={language} />
    </div>
  );
};

export default Main;