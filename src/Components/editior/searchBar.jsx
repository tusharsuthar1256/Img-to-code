import { ArrowBigRight, Code, Copy, Undo2 } from "lucide-react";
import React, { useContext, useState } from "react";
import DataContext from "../../Utils/Context";
import { GenerateResponse } from "../../Utils/api";
import { FixCodePrompt, UpdatePrompt } from "../../Utils/prompts";

function SearchBar() {
  const [prompt, setPrompt] = useState("");
  const [textToCopy, setTextToCopy] = useState("");

  const { output, setOutput ,loading,setLoading} = useContext(DataContext);



 
  const handleUpdateCode = async () => {
    setLoading(true)
    try {
      const updatePrompt = UpdatePrompt(prompt, output);
      const response = await GenerateResponse(updatePrompt);

      if (response) {
        const filteredRes = response.replaceAll("```","").replace("html","");
        setOutput(filteredRes);
      }

    } catch (error) {
      console.log("Error while fixing tha code ", error);
    }
    setLoading(false)
  };

  const handleFixCodes = async() => {
    setLoading(true)
    try {
      const fixCodePrompt = FixCodePrompt(output);
      const res = await GenerateResponse(fixCodePrompt);

      if (res) {
        const filteredRes = res.replaceAll("```","").replace("html","");
        setOutput(filteredRes);
      }
 
      
    } catch (error) {
      console.log("Error while fixing the code || ",error);
      
    }
    setLoading(false)
  }
  const handleCopyBtn = async () => {
    setLoading(true)
    try {
      if (output) {
        await navigator.clipboard.writeText(output); // Clipboard API writes the `output` to clipboard
        console.log("Copied to clipboard:", output); // Optional feedback in the console
        alert("Copied successfully!"); // User feedback
      } else {
        alert("Nothing to copy!"); // Alert if output is empty
      }
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy. Try again!");
    }
    setLoading(false)
  };
  return (
    <>
      <div className="rounded-xl py-1.5 px-2 absolute bottom-[10px] left-1/2 transform -translate-x-1/2 bg-[#211e79] w-auto flex items-center justify-center gap-1.5">
        <input
          type="text"
          className="bg-[#555479] mr-2 h-[30px] w-[400px] rounded-md text-white px-2"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="text-[#afaec8] hover:text-[#9290C3] bg-[#555479] hover:bg-[#3f3e60] p-2 rounded-md"
          title="update-code"
          onClick={handleUpdateCode}
        >
          <ArrowBigRight className="h-5 w-5" />
        </button>
        <button
          className="text-[#afaec8] hover:text-[#9290C3] bg-[#555479] hover:bg-[#3f3e60] p-2 rounded-md"
          title="re-generate code"
          onClick={handleFixCodes}
        >
          <Undo2 className="h-5 w-5" />
        </button>
        <button
          className="text-[#afaec8] hover:text-[#9290C3] bg-[#555479] hover:bg-[#3f3e60] p-2 rounded-md"
          title="Copy code"
          onClick={handleCopyBtn}
        >
          <Copy className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}

export default SearchBar;
