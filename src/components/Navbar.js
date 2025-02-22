import { useState } from "react";
import { IoIosSearch, IoIosMenu, IoIosClose, IoIosSunny, IoIosMoon } from "react-icons/io";
import { useDarkMode } from "../components/context/DarkModeContext";
import Image from "next/image";

const Navbar = ({ setCategory, setLanguage }) => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Home");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setCategory(search);
      localStorage.setItem('lastSearched', search);
      setActiveCategory("");
    } else {
      setCategory("All");
      setActiveCategory("Home");
    }
  };

  const handleCategoryClick = (category) => {
    if (category === "For You") {
      const lastSearched = localStorage.getItem('lastSearched');
      if (lastSearched) {
        setCategory(lastSearched);
      } else {
        setCategory("All");
      }
    } else {
      setCategory(category);
      localStorage.setItem('lastSearched', category);
    }
    setActiveCategory(category);
  };

  const categories = ["Home", "Movies", "Politics", "Technology", "Sports", "Science", "For You"];
  
  // Language options
  const languages = [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "de", name: "Deutsch" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "he", name: "עברית" },
    { code: "it", name: "Italiano" },
    { code: "nl", name: "Nederlands" },
    { code: "no", name: "Norsk" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "sv", name: "Svenska" },
    { code: "ud", name: "اردو" },
    { code: "zh", name: "中文" },
  ];

  return (
    <nav className={`fixed top-0 w-full ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-4 flex items-center justify-between z-50 shadow-md`}>
      
      {/* Left: Logo & Language Dropdown */}
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="Logo" width={80} height={42} priority />
        <select
          onChange={(e) => setLanguage(e.target.value)}
          className={`hidden lg:block p-2 rounded ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        >
          {languages.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Hamburger menu icon for mobile view */}
      <div className="lg:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <IoIosMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
{menuOpen && (
  <div className="absolute top-12 left-0 w-full bg-white shadow-md z-40 flex flex-col p-4">
    {/* Language Selector */}
    <div className="flex items-center gap-2 mb-4">
      <select
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 rounded w-full border border-gray-300"
      >
        {languages.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>

    {/* Category Buttons */}
    {categories.map((item) => (
      <button
        key={item}
        onClick={() => {
          handleCategoryClick(item);
          setMenuOpen(false); // Close the menu
        }}
        className={`block p-2 text-lg transition duration-200 hover:text-gray-400 ${
          activeCategory === item ? "font-bold" : ""
        }`}
      >
        {item}
      </button>
    ))}
  </div>
)}


      {/* Center: Navigation Links (for larger screens) */}
      <div className="hidden lg:flex gap-6">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => handleCategoryClick(item)}
            className={`relative text-lg transition duration-200 hover:text-gray-400 ${activeCategory === item ? "font-bold" : ""}`}
          >
            {item}
            {activeCategory === item && <div className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-black dark:bg-white"></div>}
          </button>
        ))}
      </div>

      {/* Right: Search & Dark Mode Toggle */}
      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch} className="relative flex items-center gap-2">
          <input
            type="text"
            placeholder="Search news, topics and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`p-2 rounded w-32 sm:w-48 lg:w-60 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"}`}
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setActiveCategory("Home");
              }}
              className="absolute right-12 p-1 text-gray-500 hover:text-gray-700"
            >
              <IoIosClose className="w-5 h-5" />
            </button>
          )}
          <button type="submit" className="p-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            <IoIosSearch className="w-5 h-5" />
          </button>
        </form>

        <button onClick={() => setDarkMode(!darkMode)} className="p-2">
          {darkMode ? <IoIosSunny className="w-6 h-6 text-yellow-400" /> : <IoIosMoon className="w-6 h-6 text-gray-400" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;