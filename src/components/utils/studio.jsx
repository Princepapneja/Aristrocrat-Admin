import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import PlusIcon from '../../assets/adminAssets/Group 4537.png';
import { X,Plus } from 'lucide-react';
import InputField from './InputFields';


export default function StudioDropdown({ label, showBtn ,options,onChange,name,addExclusivity,createCategory,handleCreate}) {

  
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newStudio, setNewStudio] = useState("");

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

const handleCheck = (studio) => {
  
  const updatedSelection = selected.includes(studio)
    ? selected.filter((item) => item !== studio)
    : [...selected, studio];

  setSelected(updatedSelection);
// console.log(updatedSelection);

  if (onChange) {

    onChange({ target: { name:name, value: studio } });
  }
};


  
const handleClearAll = () => {
  setSelected([]);
  setSearchTerm("");

  if (onChange) {
    onChange({ target: { name,type:"clearAll", value: [] } });
  }
};


  const handleAddStudio = () => {
    if (newStudio.trim() !== "" && !studiosList.includes(newStudio)) {
      studiosList.push(newStudio);
    }
    createCategory(options[0])
    setNewStudio("");
    setShowPopup(false);
  };

  

  const filteredStudios = options?.filter((studio) =>{
    const studioName =studio?.name || studio?.title
    
    return(
studioName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
    
  );
  
  useEffect(()=>{
    if(addExclusivity){
      setOpen(addExclusivity)
    }
  },[addExclusivity])

  // console.log(filteredStudios);
  

  return (
    <div ref={dropdownRef} className={`relative w-full ${addExclusivity? "top-[-30px]":""} `}>
      {
        !addExclusivity &&(
           <div
        className="border-2 border-gray-200 rounded-md p-2 cursor-pointer flex items-center justify-between bg-[#F4F4F4]"
        onClick={toggleDropdown}
      >
        <span className="text-[#6F6F6F] font-semibold text-base">{label}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
        )
      }
     

      {open && (
        <div className={`absolute mt-2  bg-white shadow-lg rounded-md border border-gray-200 z-50 p-4 ${addExclusivity? "w-[260px]  right-3":"w-full"} `} >
          {/* <div className='flex items-baseline justify-between'>
              <h2 className="text-lg font-semibold mb-4">Add {label}</h2>
              <X
                size={16}
                className="text-black cursor-pointer hover:text-black"
                onClick={() => setShowPopup(false)}
              />
            </div> */}

          <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md">
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full outline-none text-sm"
              placeholder="Keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>


          <div className="max-h-48 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {filteredStudios?.map((studio, index) => (
              <label key={studio.id} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={selected.includes(studio.id)}
                  onChange={() => handleCheck(studio.id)}
                  className="accent-green-600"
                />
                <span className="text-sm text-gray-800">{studio?.name || studio?.title}</span>
              </label>
            ))}
            {filteredStudios?.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-2">
                No results found
              </div>
            )}
          </div>

 {
        !addExclusivity &&(

   <div className="flex justify-between items-center px-3 py-2">
            <button
              className="cursor-pointer bg-[#00B290] hover:bg-black text-white px-4 py-1 rounded-md text-sm"
              onClick={() => setOpen(false)}
            >
              Add Filters
            </button>
            <button
              className="px-3 py-1 text-sm border rounded-md bg-white hover:text-black hover:border-black border-[#A8A8A8] text-gray-700"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>

        )
        
        
        
        
        }
       
        </div>
      )}

      {showBtn && (
        <div className="flex items-center w-full mt-2 cursor-pointer" onClick={() => setShowPopup(true)}>
        <Plus size={12} className='rounded-full text-[#00B290] border'/>
          <div className="text-[12px] w-50 px-2 text-[#00B290]">Add {label}</div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div
            className="bg-white rounded-[15px] shadow-lg p-6 w-[25%] transform transition-all duration-300 translate-y-10 opacity-0 animate-popup"
          >
            <div className='flex items-baseline justify-between'>
              <h2 className="text-xl font-semibold mb-4">Add New {label}</h2>
              <X
                size={16}
                className="text-black cursor-pointer hover:text-black"
                onClick={() => setShowPopup(false)}
              />
            </div>
            <InputField type='text' label={label} placeholder={`Enter ${label} Name`}  id='title' handleInputChange={handleCreate}/>
            <div className="flex justify-between space-x-3 mt-5">

              <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold  w-full rounded-[10px] cursor-pointer px-4 py-2" onClick={handleAddStudio}>
                Create {label}
              </button>
              <button className="bg-white hover:text-black hover:border-black border w-full rounded-[10px] border-[#A8A8A8] text-gray-700 text-sm font-semibold px-4 py-2  cursor-pointer" onClick={() => setShowPopup(false)}>
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
