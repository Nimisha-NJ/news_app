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
      setCategory(search); // Set the category based on the search input
      setActiveCategory(""); // Remove active category highlight
    } else {
      setCategory("All"); // Reset to default category when search is cleared
      setActiveCategory("Home"); // Set back to Home when search is empty
    }
  };

  const handleCategoryClick = (category) => {
    setCategory(category); // Set the selected category
    setActiveCategory(category); // Highlight the active category
  };

  const categories = ["Home", "Movies", "Politics", "Technology", "Sports", "Science"];
  
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
          className={`p-2 rounded ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        >
          {languages.map(({ code, name }) => (
            <option key={code} value={code}>
              {name} 
            </option>
          ))}
        </select>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden lg:flex gap-6">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => handleCategoryClick(item)} // Use the new handler for category clicks
            className={`relative text-lg transition duration-200 hover:text-gray-400 ${activeCategory === item ? "font-bold" : ""}`}
          >
            {item}
            {activeCategory === item && <div className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-black dark:bg-white"></div>}
          </button>
        ))}
      </div>

      {/* Right: Search & Dark Mode Toggle */}
      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2"> {/* Use handleSearch directly */}
          <input
            type="text"
            placeholder="Search news, topics and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`p-2 rounded w-32 sm:w-48 lg:w-60 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300"}`}
          />
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