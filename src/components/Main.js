import { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";

const Main = () => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("en"); // Default language

  return (
    <div>
      <Navbar setCategory={setCategory} setSearch={setSearch} setLanguage={setLanguage} />
      <Home category={category} search={search} language={language} />
    </div>
  );
};

export default Main;