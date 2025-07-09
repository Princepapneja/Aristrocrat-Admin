import React, { useEffect, useState } from "react";
import { Plus, SquareArrowOutUpRight, X, File, ChevronRight } from "lucide-react";
import folderImg from "../../assets/adminAssets/folder.png";
import InputField from "./InputFields";
import apiHandler from "../../functions/apiHandler";
import StudioDropdown from "./studio";
import MiniLoader from "./miniLoader";

const GameFolderCard = React.memo(({options, addExclusivity, setAddExclusivity, setSelectedFoldersPre, selectedFoldersPre, type, subFolderFile, handleFileChange, onSelectionChange, selectedFolder, folders, setSelectedFolder, gameId, files, fetchFolders, setGameShowPopup, gameShowPopup, addNewFolder, handleInput, uploadedFolders, activeStep,showStudioModal, setShowStudioModal,preSelected, onChange,handleSelectedFolder,loading,setLoading}) => {
  const [open, setOpen] = useState(false)
console.log(selectedFolder);

  const [companyList, setCompanyList] = useState([])
  const fetchCompany = async () => {
    try {
      const { data } = await apiHandler.get(`/companies`);

      //   console.log(data);
      setCompanyList(data.data)

      //       const newSubstudio = data?.data?.map((e) => {
      //         console.log(e);

      //         return {
      //           name: e?.name,
      //           value: e?.id
      //         }
      //       }) || [];
      // // console.log(newSubstudio);

      //       setCompanyList([
      //         {
      //           name:"Select Company",
      //           value:""
      //         }
      //         ,
      //         ...newSubstudio
      //       ])

      // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      // setHasMore((filters.skip + filters.limit) < data.data.total);
      // setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  useEffect(() => {
    fetchCompany()

  }, [])

  const toggleFolderSelection = (item, type) => {
    const key = type === "folder" ? "folderId" : "fileId";
    // console.log(item);
    const exists = selectedFoldersPre.some((entry) => entry[key] === item.id);

    const updated = exists
      ? selectedFoldersPre.filter((entry) => entry[key] !== item.id)
      : [...selectedFoldersPre, { [key]: item.id }];

    setSelectedFoldersPre(updated);
    // if (onSelectionChange) onSelectionChange(updated);
  };
  // console.log(files);
  // console.log(folders);
  // console.log(selectedFoldersPre);





  const file = uploadedFolders.length > 0 ? uploadedFolders : files;
  const [regionBasedFolders, setRegionBasedFolders] = useState([])
  useEffect(() => {
    const items = [];
    folders?.forEach((folder) => {
      const region = folder?.region;
      if (!region) return
      const existingRegionGroup = items.find(
        (group) => group.region?.id === region?.id
      );

      if (existingRegionGroup) {
        existingRegionGroup.folders.push(folder);
      } else {
        items.push({
          region: region,
          folders: [folder],
        });
      }
    });
    setRegionBasedFolders(items)

  }, [folders, activeStep])

  const handleModal = (type,folder) => {
    setGameShowPopup(!gameShowPopup)
    setShowStudioModal(type)
// console.log(folder);

  }

// console.log(folders);

  return (

    <>
      {
        selectedFolder ?
          <div>
            {/* <div className="text-sm text-gray-600 mt-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-1 md:space-x-3">
                {menuItems.length > 0 && menuItems?.map((item, index) => {
                  console.log(item);
                  
                  return (
                    <li key={item?.id} className="inline-flex items-center cursor-pointer"     onClick={() => handleBreadcrumbClick(index)}>
                      {index !== 0 && (
                        <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                      )}
                      <span

                      >
                        {item?.name}
                      </span>
                    </li>
                  )
                })}
              </ol>
            </div> */}

            <>

              <div className="grid grid-cols-4 gap-10">
                {folders?.map((folder, index) => (
                  <div
                    key={index}
                    className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFoldersPre.includes(folder)}
                      onChange={() => toggleFolderSelection(folder)}
                      className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
                    />

                    <button  disabled={preSelected?.length>0} className="hover:text-[#00B290] disabled:opacity-50 disabled:hover:text-white absolute top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
                      Company <SquareArrowOutUpRight size={18} />
                    </button>

                    <div className="flex flex-col items-center w-full cursor-pointer" onClick={() => {
                      handleSelectedFolder(folder)
                    }}>
                      <img src={folderImg} alt="Folder" className="w-20 h-20 mb-2" />
                      <span className="text-[16px] font-[600] text-center break-words w-full">
                        {folder?.name}
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
                {subFolderFile?.map((folder, index) => (
                  <div
                    key={index}
                    className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFoldersPre.includes(folder)}
                      onChange={() => toggleFolderSelection(folder)}
                      className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
                    />

                    <span onClick={()=>{setShowStudioModal("company")}} className="hover:text-[#00B290] absolute top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
                      Company <SquareArrowOutUpRight size={18} />
                    </span>

                    <div className="flex flex-col items-center w-full">
                      <File size={50} />
                      <span className="text-[16px] font-[600] text-center break-words w-full">
                        {folder.name}
                      </span>

                      {/* {!folder.loading && (
                        <div className="mt-2 text-sm text-green-600 font-semibold">Uploaded</div>
                      )} */}
                    </div>



                  </div>
                ))}
                {uploadedFolders?.map((folder, index) => (
                  <div
                    key={index}
                    className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
                  >
                    <input
                      type="checkbox"
                      // checked={selectedFoldersPre.includes(folder)}
                      onChange={() => toggleFolderSelection(folder, "file")}
                      className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
                    />

                    <span onClick={()=>{setShowStudioModal("company")}} className="hover:text-[#00B290] absolute top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
                      Company <SquareArrowOutUpRight size={18} />
                    </span>

                    <div className="flex flex-col items-center w-full">
                      <File size={50} />
                      <span className="text-[16px] font-[600] text-center break-words w-full">
                        {folder.name}
                      </span>
                      {/* 
                    {!folder.loading && (
                      <div className="mt-2 text-sm text-green-600 font-semibold">Uploaded</div>
                    )} */}
                    </div>

                    {folder.loading && (
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
                    )}
                  </div>
                ))}


              </div>
              <div className="mt-15 flex justify-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                <button
                  className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <span>Add More</span>
                  <Plus size={35} className="border rounded-[5px]" />
                </button>
              </div>

            </>
          </div> :



          <div className=" bg-white font-sans relative">
             {
              preSelected?.length>0&&<p className="text-center font-bold p-5 text-xl ">Permissions Already Selected</p>
             }
            <div className="  mt-10">
            {/* {folders && <MiniLoader  size={24} />} */}
              {regionBasedFolders?.length > 0 ? 
                <div>
                  {
                    regionBasedFolders?.map((e, i) => {

                      return (
                        <div key={i} className={`${i === regionBasedFolders.length - 1 ? "" : "border-b-1 border-[#A8A8A8]"} pb-25`}>
                          <div className="flex justify-between items-center mb-5 mt-10">

                            <h3 className="text-2xl font-semibold leading-6">{e?.region?.name}</h3>
                            <div className="flex  items-center">
                              {/* <div
                                className="bg-white flex items-center gap-[10px] p-4 rounded-[10px] mb-5 cursor-pointer"
                                onClick={() => setGameShowPopup(true)}
                              >
                                <span className="text-[#00B290]">Cretate Folder</span>
                                <Plus className="w-4 h-4 text-white p-0 bg-[#00B290] rounded-full" />
                              </div> */}
                              <div className="bg-white flex items-center gap-[10px] p-4 rounded-[10px] mb-5 ml-4 cursor-pointer">
                                <span className="text-red-500">Delete</span>
                                <X className="w-4 h-4 text-white p-0 bg-red-500 rounded-full" />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-10">

                            {
                              e?.folders?.map((folder, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
                                  >
                                    <input
                                      type="checkbox"
                                      // checked={selectedFoldersPre.includes(folder?.id)}
                                      onChange={() => toggleFolderSelection(folder, "folder")}
                                      className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
                                    />
                                    {/* certificate btn */}
                                    <button disabled={preSelected?.length>0}  onClick={() => handleModal("company")} className="hover:text-[#00B290] disabled:opacity-50 disabled:hover:text-white absolute top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
                                      Company <SquareArrowOutUpRight size={18} />
                                    </button>

                                    <div className="flex flex-col items-center w-full cursor-pointer" onClick={() => {
                                      handleSelectedFolder(folder)
                                    }}>
                                      <img src={folderImg} alt="Folder" className="w-20 h-20 mb-2" />
                                      <span className="text-[16px] font-[600] text-center break-words w-full">
                                        {folder?.name}
                                      </span>

                                    
                                    </div>

                                  
                                  </div>
                                )
                              })
                            }

                          </div>


                          <div className="mt-25 flex justify-center">
                            <input
                              type="file"
                              id="fileInput"
                              className="hidden"
                              onChange={handleFileChange}
                              multiple
                            />
                            <button
                              className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
                              onClick={() => document.getElementById("fileInput").click()}
                            >
                              <span>Add More</span>
                              <Plus size={35} className="border rounded-[5px]" />
                            </button>
                          </div>

                        </div>
                      )
                    })
                  }
                </div>
              
                :

               <div className=" grid grid-cols-4 gap-10 mt-10">
             
                 {/* {folders && <MiniLoader  size={24}/>} */}
                  {
                    folders
                      ?.map((folder, index) => (
                        <div
                          key={index}
                          className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
                        >
                          <input
                            type="checkbox"
                            // checked={selectedFoldersPre.includes(folder?.id)}
                            onChange={() => toggleFolderSelection(folder, "folder")}
                            className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
                          />

                          <button disabled={preSelected?.length>0} onClick={() => handleModal("company",folder?.id)} className="hover:text-[#00B290] disabled:opacity-50 disabled:hover:text-white absolute top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
                            {/* folder btn */}
                            Company<SquareArrowOutUpRight size={18} />
                          </button>

                          <div className="flex flex-col items-center w-full cursor-pointer" onClick={() => {
                            handleSelectedFolder(folder)
                          }}>
                            <img src={folderImg} alt="Folder" className="w-20 h-20 mb-2" />
                            <span className="text-[16px] font-[600] text-center break-words w-full">
                              {folder?.name}
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
                      ))
                  }

                  {files?.map((folder, index) => (
                  <div
                    key={index}
                    className="group  relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
                  >
                    <input
                      type="checkbox"
                      // checked={selectedFoldersPre.includes(folder)}
                      onChange={() => toggleFolderSelection(folder, "file")}
                      className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
                    />

                    <button   disabled={preSelected?.length>0} onClick={() => {
                  
                      setShowStudioModal("company")}} className="hover:text-[#00B290] absolute disabled:opacity-50 disabled:hover:text-white  top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
                      Company <SquareArrowOutUpRight size={18} />
                    </button>

                    <div className="flex flex-col items-center w-full">
                      <File size={50} />
                      <span className="text-[16px] font-[600] text-center break-words w-full">
                        {folder.name}
                      </span>
                      {/* 
                    {!folder.loading && (
                      <div className="mt-2 text-sm text-green-600 font-semibold">Uploaded</div>
                    )} */}
                    </div>

                    {folder.loading && (
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
                    )}
                  </div>
                ))}

              


              {uploadedFolders?.map((folder, index) => (
                <div
                  key={index}
                  className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
                >
                  <input
                    type="checkbox"
                    // checked={selectedFoldersPre.includes(folder)}
                    onChange={() => toggleFolderSelection(folder, "file")}
                    className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
                  />

                  <span className="hover:text-[#00B290] absolute top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
                    Company <SquareArrowOutUpRight size={18} />
                  </span>

                  <div className="flex flex-col items-center w-full">
                    <File size={50} />
                    <span className="text-[16px] font-[600] text-center break-words w-full">
                      {folder.name}
                    </span>
                    {/* 
                    {!folder.loading && (
                      <div className="mt-2 text-sm text-green-600 font-semibold">Uploaded</div>
                    )} */}
                  </div>

                  {folder.loading && (
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
                  )}
                </div>
              ))}
                </div>
              }

             
             
                
            </div>

            {
              regionBasedFolders?.length > 0 ? "" : <div className="mt-15 flex justify-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                <button
                  className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <span>Add More</span>
                  <Plus size={35} className="border rounded-[5px]" />
                </button>
              </div>
            }




          </div>

      }


      {gameShowPopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          {showStudioModal === "company" ?

            <div
              className=""
            ><StudioDropdown  className="w-full" label='Studio' showBtn={false} options={companyList} addExclusivity={showStudioModal} name="companyIds" setGameShowPopup={setGameShowPopup} preSelected={preSelected} onChange={onChange}/></div>
            :
            <div
              className="bg-white rounded-[15px] shadow-lg p-6 w-[25%] transform transition-all duration-300 translate-y-10 opacity-0 animate-popup"
            >
              <div className='flex items-baseline justify-between'>

                <h2 className="text-xl font-semibold mb-4">Create Folder</h2>

                {/* {showStudioModal} */}

                <X
                  size={16}
                  className="text-black cursor-pointer hover:text-black"
                  onClick={() => {setGameShowPopup(false)}}
                />
              </div>
              <InputField type='text' placeholder={`Enter Folder Name`} id='folder' handleInputChange={handleInput} />
              <div className="flex justify-between space-x-3 mt-5">

                <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold  w-full rounded-[10px] cursor-pointer px-4 py-2" onClick={addNewFolder}>
                  Create Folder
                </button>
                <button className="bg-white hover:text-black hover:border-black border w-full rounded-[10px] border-[#A8A8A8] text-gray-700 text-sm font-semibold px-4 py-2  cursor-pointer" onClick={() => setGameShowPopup(false)}>
                  Cancel
                </button>

              </div>
            </div>}

        </div>
      )}


    </>

  );
});

export default GameFolderCard;
