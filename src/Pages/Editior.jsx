import React from "react";
import EditiorCom from "../Components/editior/editiorCom";
import SearchBar from "../Components/editior/searchBar";

function Editior() {
  return (
    <>
      <main className="h-[calc(100vh-70px)] bg-[#070F2B] w-full pt-6 dark:bg-[#FFF2D7]">
      <EditiorCom/>
     <SearchBar/>
      </main>
    </>
  );
}

export default Editior;
