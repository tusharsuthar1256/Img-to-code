import { Github, Sun } from "lucide-react";
import { Loader } from "../loader.jsx";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../Utils/Context.jsx";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [darkMode, setDarkMode] = useState(false);
  const {loading} = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Apply or remove the dark class on the <html> element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  return (
    <>
    
    <nav className="h-[70px] w-full flex justify-between px-[50px] items-center bg-[#070F2B] dark:bg-[#FFF2D7]">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <span className="text-[24px] font-bold text-[#9290C3] dark:text-[#D8AE7E]">Img-to-Code</span>
      </div>
      <div className="flex justify-center items-center gap-5">
        <a href="#">
          <button className="text-[#afaec8] hover:text-[#9290C3] bg-[#1B1A55] hover:bg-[#323082] p-2 rounded-md dark:text-[#FFF2D7] dark:bg-[#D8AE7E]" onClick={() => setDarkMode(!darkMode)}>
            <Sun className="h-5 w-5" />
          </button>
        </a>
        <a href="#">
          <button className="text-[#afaec8] hover:text-[#9290C3] bg-[#1B1A55] hover:bg-[#323082] p-2 rounded-md dark:text-[#FFF2D7] dark:bg-[#D8AE7E]">
            <Github className="h-5 w-5" />
          </button>
        </a>
      </div>
    </nav>
    {loading ? <Loader/> : <div className="w-full h-[3px] bg-[] dark:bg-[#D8AE7E]"></div>}
 


    </>

  );
}

export default Nav;
