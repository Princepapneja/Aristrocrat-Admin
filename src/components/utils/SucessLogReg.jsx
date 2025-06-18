import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Buttons from "./buttons";

const SucessLogReg = ({data,resend,showBtn}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className=" text-black rounded-[20px] shadow-md p-10 max-w-md w-full text-center"style={{
    backgroundImage: "linear-gradient(50deg, #6FC 43.19%, #94FF80 117.35%)"
  }}>
        <div className="flex items-center justify-center mb-6">
          <div className="border-2 border-black rounded-xl p-4">
            <Check className="w-8 h-8" />
          </div>
        </div>
        
          <p className="text-xl font-semibold mb-2 leading-[36px]">{data?.head}</p>
        <p className="text-xl font-semibold mb-2 leading-[36px]">
          {data?.content}
          

        </p>
        {
            showBtn? <button  className={"rounded-[10px] py-2.5 px-8 w-80 mt-5 text-black border border-black bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)]"}>{ "Resend Email" }</button>:""
        }
 

      
      </div>

      <Link
        to="/"
        className="mt-8 text-sm text-gray-600 w-full hover:underline"
      >
        <span className="mr-1">←</span> Back to Aristocrat Interactive
      </Link>
    </div>
  );
};

export default SucessLogReg;
