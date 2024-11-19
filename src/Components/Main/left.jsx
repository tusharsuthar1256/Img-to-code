import { MoveRight, WandSparkles } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Left() {

     const navigate = useNavigate()


     return (
          <>
           <div className="h-full w-[50%] text-[#9290C3] flex flex-col pl-[50px] p-2 justify-center items-start leading-normal">
          <div className="">
            <div className="text-[80px] font-[1000] mb-[-30px] dark:text-[#D8AE7E]">Transform</div>
            <div className="text-[80px] font-[1000] mb-[-30px] dark:text-[#D8AE7E]">
              Your Designs
            </div>
            <div className="text-[80px] font-[1000] dark:text-[#D8AE7E]">into Code Instantly!</div>
          </div>
          <span className="text-[20px] font-semibold dark:text-[#D8AE7E]">
            Effortlessly Convert Images, into HTML & CSS.
          </span>
   
      
        </div>
          </>
     )
}

export default Left
