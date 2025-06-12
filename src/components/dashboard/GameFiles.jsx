import React, { useState } from 'react'
import apiHandler from '../../functions/apiHandler'
import folderImg from "../../assets/adminAssets/folder.png";
import { Plus, SquareArrowOutUpRight } from "lucide-react";

const GameFiles = ({ selectedFolder, folders, setSelectedFolder, gameId, handleFileChange, files }) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const addNewFolder = async () => {
        const { data } = await apiHandler.post("create-folder", {
            gameId, subFolder: selectedFolder, name
        })
        console.log(data, "folder")
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
                </div> :
                    <div>
                        <div className="flex justify-between">


                            {/* {
    folders?.map((folder)=>{
        console.log(folder);
        
        return <button onClick={()=>{
            setSelectedFolder(folder)
        }}>{folder}</button>
    })
} */}


                            {
                                <div className="bg-white font-sans">
                                    <div className="grid grid-cols-4 gap-10">
                                        {
                                            folders.map((folder) => {

                                                return (
                                                    <div
                                                        key={folder}
                                                        className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
                                                       
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            //   checked={selectedFolders.includes(folder)}
                                                            //   onChange={() => toggleFolderSelection(folder.name)}
                                                            className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
                                                        />

                                                        <span className="hover:text-[#00B290] absolute top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
                                                            Company <SquareArrowOutUpRight size={18} />
                                                        </span>

                                                        <div className="flex flex-col items-center w-full">
                                                            <img src={folderImg} alt="Folder" className="w-20 h-20 mb-2" />
                                                            <span className="text-[16px] font-[600] text-center break-words w-full">
                                                                {folder}
                                                            </span>


                                                        </div>


                                                    </div>

                                                )
                                            })
                                        }

                                    </div>
                                </div>

                            }

                            {
                                files?.map((file) => {
                                    return <button onClick={() => {
                                        // setSelectedFolder(folder)
                                    }}>{file?.name}</button>
                                })
                            }
                        </div>
                        <button onClick={() => { setOpen(true) }}>
                            open field
                        </button>
                        {
                            open && <div>
                                <input className='border' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                                <button onClick={addNewFolder}>Add</button>
                            </div>
                        }
                    </div>


            }

        </div>
    )
}

export default GameFiles