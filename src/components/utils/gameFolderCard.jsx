import React, { useState } from "react";
import { Plus, SquareArrowOutUpRight, X } from "lucide-react";
import folderImg from "../../assets/adminAssets/folder.png";
import InputField from "./InputFields";
import apiHandler from "../../functions/apiHandler";

const GameFolderCard = ({ handleFileChange, onSelectionChange,selectedFolder,folders,setSelectedFolder,gameId,files,fetchFolders,setShowPopup,showPopup,addNewFolder,handleInput }) => {
  // const [selectedFolders, setSelectedFolders] = useState([]);
   const [open,setOpen]= useState(false)


  // const toggleFolderSelection = (folderName) => {
  //   const updated = selectedFolders.includes(folderName)
  //     ? selectedFolders.filter((name) => name !== folderName)
  //     : [...selectedFolders, folderName];

  //   setSelectedFolders(updated);

  //   if (onSelectionChange) {
  //     onSelectionChange(updated);
  //   }
  // };
//console.log(uploadedFolders);

  return (

    <>
        {
        selectedFolder ? <div>
<p>selected folder:- {selectedFolder}</p>
</div>:
   <div className="bg-white font-sans">
      <div className="grid grid-cols-4 gap-10">


        {folders.map((folder, index) => (
          <div
            key={index}
            className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
          >
            <input
              type="checkbox"
              // checked={selectedFolders.includes(folder)}
              onChange={() => toggleFolderSelection(folder)}
              className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
            />

            <span className="hover:text-[#00B290] absolute top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
              Company <SquareArrowOutUpRight size={18} />
            </span>

            <div className="flex flex-col items-center w-full cursor-pointer"  onClick={()=>{
            setSelectedFolder(folder)
        }}>
              <img src={folderImg} alt="Folder" className="w-20 h-20 mb-2" />
              <span className="text-[16px] font-[600] text-center break-words w-full">
                {folder}
              </span>

              {/* {!folder.loading && (
                <div className="mt-2 text-sm text-green-600 font-semibold">Uploaded</div>
              )} */}
            </div>

            {/* {folder.loading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-[20px]">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-t-[#00B290] border-b-[#00B290] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[#00B290] font-semibold text-[10px] text-center leading-tight px-2">
                    <div>
                      {folder.uploaded} <br /> / {folder.total}
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>

      <div className="mt-15 flex justify-center">
       
        <button 
          className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
        >
          <span>Add More</span>
          <Plus size={35} className="border rounded-[5px]" />
        </button>
      </div>

      
    </div>

}
    

         {showPopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div
            className="bg-white rounded-[15px] shadow-lg p-6 w-[25%] transform transition-all duration-300 translate-y-10 opacity-0 animate-popup"
          >
            <div className='flex items-baseline justify-between'>

              <h2 className="text-xl font-semibold mb-4">Create Folder</h2>

              
              <X
                size={16}
                className="text-black cursor-pointer hover:text-black"
                onClick={() => setShowPopup(false)}
              />
            </div>
            <InputField type='text'  placeholder={`Enter Folder Name`}  id='folder' handleInputChange={handleInput}/>
            <div className="flex justify-between space-x-3 mt-5">

              <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold  w-full rounded-[10px] cursor-pointer px-4 py-2" onClick={addNewFolder}>
                Create Folder
              </button>
              <button className="bg-white hover:text-black hover:border-black border w-full rounded-[10px] border-[#A8A8A8] text-gray-700 text-sm font-semibold px-4 py-2  cursor-pointer" onClick={() => setShowPopup(false)}>
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    
    
    </>
 
  );
};

export default GameFolderCard;
