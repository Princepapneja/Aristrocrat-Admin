import { Minus, MoveLeft, Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InputField from '../utils/InputFields'

const AvailableFor = ({formData,setFormData,companyList,getIpData}) => {
    const [companyCount,setCompanyCount]= useState( 0)
    useEffect(()=>{
setCompanyCount(formData?.companyIds?.length )
    },[formData])
    
    const addNewOption = async ()=>{
        setCompanyCount((prev)=>(prev+1))
    }
const handleRemoveCompany= (index)=>{
  debugger
  const companyIds =formData?.companyIds?.filter((q,i)=>i!==index)
  setFormData((prev)=>({...prev,companyIds}))
  setCompanyCount((prev)=>prev-1)
}
useEffect(()=>{
console.log(companyCount)
},[companyCount])
    return (
    <>
        <div className="w-full bg-[#F4F4F4] p-6 rounded-[10px] mt-5">

          <div className="flex items-center justify-between mb-4  ">
            <h2 className="text-2xl font-semibold leading-[24px] mb-4">Available For</h2>
            {
              (companyCount>0 ) ?
                <button disabled={formData?.companyIds?.length>0 } className="border disabled:opacity-50 border-[#A8A8A8] px-2 py-1 rounded-[10px]  text-black font-semibold flex items-center gap-2 cursor-pointer" onClick={() =>  setCompanyCount(0)}>
                  <MoveLeft className="w-4 h-4  " />
                  Go Back
                </button> :
                <button className="border border-[#00B290] px-2 py-1 rounded-[10px] hover:bg-[#b1e1d8] text-[#00B290] font-semibold flex items-center gap-2 cursor-pointer" onClick={() => setCompanyCount(1)}>
                  Make Exclusive For
                </button>
            }


          </div>
          {
            ((companyCount>0))?
              <div className='bg-white flex items-center gap-[10px] p-4 rounded-[10px] mb-5'>

                <Minus className="w-4 h-4 text-white p-0 bg-red-500 rounded-full " />
                <span className="text-red-500">All</span>
              </div>
              : <InputField type="checkbox" label="All" className='bg-white flex gap-4 p-4 mb-4 rounded-[10px]'   checked={formData?.companyIds?.length ===0 || true} 
            //   handleInputChange={handleAllCheckbox}
              />
          }


         {( companyCount>0) && (
  <>
    {Array.from({length:companyCount}).map((item, index) => (
      <div key={index} className="flex items-center justify-evenly space-x-4 mb-3 ">
        <InputField
          type="select"
          placeholder="Choose Partner/Operator"
          options={companyList}
          handleInputChange={(e) => getIpData(e, index)} 
          className="bg-white"
          id="companyId"
          value={formData?.companyIds?.[index] || ''}
        />
        <X
          size={20}
          className="text-black cursor-pointer hover:text-black"
          onClick={() => {handleRemoveCompany(index)}}
        />
      </div>
    ))}

    <div className="mt-10 flex justify-center">
      <button
        className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
        onClick={addNewOption}
      >
        <span>Add More</span>
        <Plus size={35} className="border rounded-[5px]" />
      </button>
    </div>
  </>
)}





        </div>
    
    </>
  )
}

export default AvailableFor