import { Download, WandSparkles } from "lucide-react";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../Utils/Context";
import { GenerateResponse, fileToGenerativePart } from "../../Utils/api";
import { InputPrompt } from "../../Utils/prompts";
import { Loader } from "../loader";

function Right() {
  // const [file, setFile] = useState(null);
  const {file,setFile,userPrompt,setUserPrompt,setOutput,loading,setLoading} = useContext(DataContext);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleOnDrop = async(event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files;
    if (droppedFile && droppedFile[0]) {
      setFile(droppedFile[0]);
      
    }

    if (file) {
      navigate("/editior");
    }
  };

  const handleFileChange = async (e) => {
    setLoading(true)
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      const res = await fileToGenerativePart(selectedFile);
      const sendToAPI = await GenerateResponse(res);

      const main = sendToAPI.replaceAll("```","").replace("html","");
      setOutput(main)
      
    }
    if (selectedFile) {
      navigate("/editior");
      setLoading(false)
    }
  };

  const handleInputBtn = async () => {
    setLoading(true)
    
    try {
      const response = await GenerateResponse(userPrompt);

      if (response) {
        const filteredRes = response.replaceAll("```","").replace("html","");
        setOutput(filteredRes);
      }
      
      
    } catch (error) {
      console.log("Error while sending the input to gemini api",error);
      
    }

    if(userPrompt){
      navigate("/editior")
      setLoading(false)
    }
  }

  

  const handleClick = () => {
    fileInputRef.current.click();
    
  }

  
  return (
    <>
      <div className="h-full w-[50%] pl-[50px] p-2  flex justify-center items-center">
        <div>
          <div
            className="h-[350px] w-[550px] bg-[#1d1b4b] hover:bg-[#1c1a47] p-6 rounded-xl  dark:bg-[#D8AE7E]"
            onDrop={handleOnDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleClick}
          >
            <div className="outline-dashed outline-[#9290C3] h-full w-full rounded-xl flex justify-center items-center dark:outline-[#FFF2D7]">
              <div className="flex justify-start items-center flex-col text-[#9290C3] ">
                <Download className="h-10 w-10 mb-4" />
                <p className="dark:text-[#FFF2D7]">Drag & Drop or , Click here to upload</p>
              </div>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleFileChange}
            onClick={handleClick}
          />
          <div className="flex h-auto w-[550px] justify-center items-center mt-4">
            <input
              type="text"
              className="h-[40px] w-[520px] rounded-md mr-4 bg-transparent outline-dashed outline-[#9290C3] hover:outline-[#c3c2d0] text-[#9290C3] dark:outline-[#D8AE7E] pl-3 text-xl"
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button className="text-[#afaec8] flex justify-center items-center h-[50px] w-[50px] hover:text-[#9290C3] bg-[#1B1A55] hover:bg-[#323082] p-2 rounded-md dark:text-[#FFF2D7] dark:bg-[#D8AE7E]"
            onClick={handleInputBtn}
            >
              {/* <MoveRight className="h-6 w-6" /> */}
              <WandSparkles className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Right;
