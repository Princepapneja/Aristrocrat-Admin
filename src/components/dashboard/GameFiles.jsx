import React, { useState } from 'react'
import apiHandler from '../../functions/apiHandler'
import { Plus } from 'lucide-react'

const GameFiles = ({selectedFolder,folders,setSelectedFolder,gameId,handleFileChange,files}) => {
    const [open,setOpen]= useState(false)
    const [name,setName]= useState("")
    const addNewFolder=async ()=>{
        const {data}= await apiHandler.post("create-folder",{
            gameId,subFolder:selectedFolder,name
        } )
        console.log(data,"folder")
    }
  return (
    
    <div>
    {
        selectedFolder ? <div>
<p>selected folder:- {selectedFolder}</p>
{

}
<div className="mt-15 flex justify-center">
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <span>Add More</span>
          <Plus size={35} className="border rounded-[5px]" />
        </button>
      </div>
        </div>: 
        <div>
 <div className="flex justify-between">


{
    folders?.map((folder)=>{
        return <button onClick={()=>{
            setSelectedFolder(folder)
        }}>{folder}</button>
    })
}
{
    files?.map((file)=>{
        return <button onClick={()=>{
            // setSelectedFolder(folder)
        }}>{file?.name}</button>
    })
}
</div>
<button onClick={()=>{setOpen(true)}}>
    open field
</button>
{
    open && <div>
        <input className='border' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
        <button onClick={addNewFolder}>Add</button>
    </div>
}
        </div>
       

    }

</div>
  )
}

export default GameFiles