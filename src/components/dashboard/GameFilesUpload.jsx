import React, { useEffect, useState } from "react";
import { Upload, Plus, Send, Pen, Minus, X, ChevronUp, ExternalLink, SquareArrowDownRight, SquareArrowUpIcon, SquareArrowUpLeft, SquareArrowUpRight, SquareArrowOutUpRight, Search, MoveLeft } from "lucide-react";
import StudioDropdown from "../utils/studio";
import folderImg from '../../assets/adminAssets/folder.png'
import expandWindowImg from '../../assets/adminAssets/expand-window-2--expand-small-bigger-retract-smaller-big.png'

import { ChevronRight } from "lucide-react";
import useGlobal from "../../hooks/useGlobal";
import { useLocation, useParams } from "react-router-dom";
import apiHandler from "../../functions/apiHandler";
import axios from "axios";
import GameFolderCard from "../utils/gameFolderCard";
import InputField from "../utils/InputFields";
import MiniLoader from "../utils/miniLoader";



const GameFilesUpload = React.memo(() => {
    const param = useParams();
    const { error, success } = useGlobal();
    const [activeStep, setActiveStep] = useState(0);
    const [uploadedFolders, setUploadedFolders] = useState([]);
    const [addExclusivity, setAddExclusivity] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null)
    const [folders, setFolders] = useState([])
    const [files, setFiles] = useState([])
    const [subFolderFile, setSubFolderFile] = useState([])
    const [rootLevels, setRootLevels] = useState([])
    const [subStudios, setSubStudios] = useState([])
    const [formData, setFormData] = useState(null)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [showStudioModal, setShowStudioModal] = useState("");
    const [loading, setLoading] = useState(false);
    const [miniLoader, setMiniLoader] = useState(false);
    const [menuItems, setMenuItems] = useState([])
    const [selectedFoldersPre, setSelectedFoldersPre] = useState([]);
    const [name, setName] = useState("")
    const [gameShowPopup, setGameShowPopup] = useState(false);
    useEffect(() => {
        if (!param.id) return
        dataSetter()
    }, [param.id])

    useEffect(() => {
        fetchFolders()
    }, [rootLevels,activeStep, uploadedFolders, selectedFolder])

    const dataSetter = async () => {
        setLoading(true)
        try {
            await fetchGame()
            await fetchSubStudios()
            await fetchCompany()
            await fetchRootLevels()
        } catch (error) {
            
        }finally{
            setLoading(false)

        }
     
    }

    const fetchSubStudios = async () => {
        try {
            const { data } = await apiHandler.get(`sub-studios/${searchParams?.get("studioId")}`);
            const newSubstudio = data?.data?.map((e) => {
                return {
                    name: e?.name,
                    id: e?.id
                }
            }) || [];
            setSubStudios([
                { name: "Select SubStudio", id: "", },
                ...newSubstudio
            ]);
            // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
            // setHasMore((filters.skip + filters.limit) < data.data.total);
            // setTotalGames(data.data.total);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    };

    const getIpData = (e) => {
        let { name, value } = e.target;
        if (name === "companyId") {
            const numValue = Number(value);
            setFormData((prev) => {
                const safePrev = prev || {};
                const existing = safePrev.availableFor || [];
                const updated = existing.includes(numValue)
                    ? existing
                    : [...existing, numValue];

                return { ...safePrev, availableFor: updated };
            });
            return;
        }


        setFormData((prev) => (
            {
                ...prev,
                [name]: value,

            }
        ))
    }
    const fetchRootLevels = async () => {
        try {
            let url = `games/${param.id}/folders`
            const { data } = await apiHandler.get(url)
            console.log(data);
            setRootLevels(data?.data?.folders || [])
        } catch (error) {
            console.error("Error fetching root levels:", error)
        }
    }
    const fetchFolders = async () => {
        setMiniLoader(true);
        try {
            if (!selectedFolder && rootLevels?.length === 0) {
                return
            }
            let url = `games/${param.id}/folders`

            if (selectedFolder) {
                console.log(selectedFolder)
                url += `?folder=${selectedFolder?.id}`
            } else {
                url += `?folder=${rootLevels?.[activeStep]?.id}`
            }

            const { data } = await apiHandler.get(url)
            // console.log(data)

            if (selectedFolder) {
                setSubFolderFile(data?.data?.files)
                setFolders(data?.data?.folders || [])
                setFiles(data?.data?.files)
            } else {
                setFolders(data?.data?.folders || [])
                setFiles(data?.data?.files)
            }
        } catch (error) {
            console.error("Error fetching folders:", error)
        } finally {
            setMiniLoader(false);
        }
    }
    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        selectedFiles.forEach(async (file) => {
            const gameData = {
                name: file.name,
                // folder: rootLevels[activeStep]?.id,
                // subFolder:selectedFolder,
                gameId: param?.id,
                fileType: file.type
            };
            try {
                const { data } = await apiHandler.post("/upload", gameData);
                success(data?.message);
                fetchFolders()
                const newFolder = {
                    name: file.name,
                    uploaded: "0 MB",
                    total: "0 MB",
                    loading: true,
                    fileType: file.type.includes("pdf") ? "PDF" : "Other",
                };
                setUploadedFolders((prev) => [...prev, newFolder]);
                const config = {
                    onUploadProgress: (progressEvent) => {
                        const uploadedMB = progressEvent.loaded / (1024 * 1024);
                        const totalMB = progressEvent.total / (1024 * 1024);

                        const updatedFolder = {
                            name: file.name,
                            uploaded:
                                totalMB < 1024
                                    ? `${uploadedMB.toFixed(2)} MB`
                                    : `${(uploadedMB / 1024).toFixed(2)} GB`,
                            total:
                                totalMB < 1024
                                    ? `${totalMB.toFixed(2)} MB`
                                    : `${(totalMB / 1024).toFixed(2)} GB`,
                            loading: true,
                            fileType: file.type.includes("pdf") ? "PDF" : "Other",
                        };

                        setUploadedFolders((prev) =>
                            prev.map((folder) =>
                                folder.name === file.name ? updatedFolder : folder
                            )
                        );
                    },
                };

                try {
                    const resp = await axios.put(data?.data?.uploadUrl, file, config);
                    setUploadedFolders((prev) =>
                        prev.map((folder) =>
                            folder.name === file.name
                                ? { ...folder, loading: false, uploaded: "100%", total: "100%" }
                                : folder
                        )
                    );
                    try {
                        const fileData = {
                            "name": file?.name,
                            "folderId": selectedFolder?.id || rootLevels[activeStep]?.id,
                            "size": file?.size,
                            "url": data?.data?.fileUrl,
                            "gameId": param?.id,
                            "type": rootLevels[activeStep]?.name
                        }
                        const response = await apiHandler.post("/file", fileData);
                        // setGameFiles(response?.data?.data);
                        setUploadedFolders([])
                        success(response?.data?.message || "File info saved successfully.");
                    } catch (err) {
                        error(err.message || "Failed to save file info.");
                    }
                } catch (abc) {
                }

            } catch (err) {
                error(err.message);
            }
        });
    };

    const fetchCompany = async () => {
        try {
            const { data } = await apiHandler.get(`/companies`);
            setCompanyList(data.data)
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    };

    const handleSelectionChange = (selectedIds) => {
        // console.log(selectedIds);

        setCompanyIds(selectedIds);
    };
    const handleCompanyId = (e) => {

        const data = [...formData?.companyIds || []]
        const value = e.target.value
        if (data.includes(value)) {
            data?.filter((q) => {
                return q !== value
            })
        } else {
            data.push(value)
        }
        // console.log(data);

        setFormData((prev => ({ ...prev, companyIds: data })))
    }
    const handleSubmit = async (e, folderId) => {
        e.preventDefault();
        const companyIds = formData?.companyIds || [];
        const permissions = selectedFoldersPre.map((item) => {
            if (item.folderId) {
                return { folderId: item.folderId, companyIds };
            } else if (item.fileId) {
                return { fileId: item.fileId, companyIds };
            }
            return null;
        });
        try {
            const res = await apiHandler.post(
                `/game/${param?.id}/permissions`,
                { permissions }
            );
            setAddExclusivity(!addExclusivity)
            success(res?.data.message);

        } catch (err) {
            error(err.message);
        }
    };




    const addNewFolder = async () => {
        const { data } = await apiHandler.post("folder", {
            gameId: param.id, parentId: selectedFolder?.id || rootLevels[activeStep]?.id, name

        })
        setGameShowPopup(false)
        fetchFolders()
    }

    function handleInput(event) {

        setName(event.target.value)
    }



    const fetchGame = async () => {
        try {

            const { data } = await apiHandler.get(`/game/${param?.id}`);
            console.log(data);

            setFormData({
                title: data?.data?.title || '',
                subStudioId: data?.data?.subStudioId || '',
                companies: data?.data?.companies.map((e) => e.id) || ''
            });
        } catch (err) {
            console.error("Error fetching game data: ", err);
        }
    };


    const handleSelectedFolder = (folder) => {
        setSelectedFolder(folder);
        setMenuItems(prev => [...prev, folder]);

    };

    const handleBreadcrumbClick = (index) => {
        const newPath = menuItems.slice(0, index + 1);
        setMenuItems(newPath);
        setSelectedFolder(newPath[index]);
    };

    const handleRootFolder = () => {
        setMenuItems([]);
        setSelectedFolder(null);
    }
if(loading) {
    return <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <MiniLoader/>

    </div>
}

    return (
        <div className="mt-6">

            <div className="flex gap-6 justify-between items-center">
                <div className="w-3/4">
                    <label className="block text-sm font-semibold mb-2">Game Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        placeholder="Enter game name"
                        onChange={getIpData}
                        name="title"
                        value={formData?.title}
                    />
                </div>

                <div className="w-1/4 mt-6">
                    <InputField type="select" options={subStudios} handleInputChange={getIpData} id='subStudioId' name='subStudioId' value={formData?.subStudioId} />

                </div>
            </div>

            <div className="text-center">
                <h2 className="text-[40px] font-medium text-black  mt-15">
                    Go through the steps to publish or save draft for later
                </h2>

                <p className="text-[24px] font-normal text-[#6F6F6F] text-center  mt-5">
                    To go back, click on previous step
                </p>

            </div>

            <div className="flex items-center justify-between mt-15">
                {rootLevels?.map((label, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`flex items-center  gap-5  cursor-pointer px-2 py-3  w-[250px] ${activeStep === index ? 'bg-[#00B290]' : 'bg-[rgba(148,255,128,0.3)]  hover:text-[#00B290] '} rounded-[31px] `}
                            onClick={() => {setActiveStep(index);setSelectedFolder(null);setMenuItems([])}}
                        >
                            <div
                                className={`w-8 h-8 rounded-[31px] flex items-center justify-center font-bold  ${activeStep === index ? "bg-white text-[#00B290] " : "bg-[rgba(0,178,144,0.6)] text-white "
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={`text-sm font-semibold px-8 ${activeStep === index ? "text-white" : "text-[#00B29099] text-center "
                                    }`}
                            >
                                {label?.name}
                            </span>
                        </div>
                        {index < rootLevels.length - 1 && (
                            <div className="text-gray-400 text-xl"><ChevronRight className="w-[50px] h-[55px] text-[#00B29099] font-light"

                            /></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="flex w-full justify-between gap-2 mt-10 mb-10 ">
                <button className="flex-grow bg-[#A8A8A8]  text-[#6F6F6F] text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2">
                    Publish
                    <Send size={20} />
                </button>
                <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-3 px-3 rounded-[10px]  cursor-pointer flex justify-center items-center gap-2 w-60">
                    Save Draft Review
                    <Pen size={20} />
                </button>
            </div>

            <div className={`flex  ${selectedFolder ? "justify-between" : "justify-end"} items-center `}>
                <div className="flex gap-7 items-center ">
                    {
                        selectedFolder && (
                            <button className="border border-[#A8A8A8] px-2 py-1 rounded-[10px]  text-balck] font-semibold flex items-center gap-2 cursor-pointer" onClick={handleRootFolder}>
                                <MoveLeft className="w-4 h-4  " />
                                Go Back
                            </button>
                        )
                    }
                    <div className="text-sm text-gray-600" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-1 md:space-x-3">
                            {menuItems.length > 0 && menuItems?.map((item, index) => {

                                return (
                                    <li key={item?.id} className="inline-flex items-center cursor-pointer" onClick={() => handleBreadcrumbClick(index)}>
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
                    </div>
                </div>

                {activeStep !== 3 && <div className="flex justify-end items-center mb-4 relative">

                    {/* {
    selectedFolder?"": <div
      className="bg-white flex items-center gap-[10px] p-4 rounded-[10px] mb-5 cursor-pointer"
      onClick={() => setGameShowPopup(true)}
    >
      <span className="text-[#00B290]">Cretate Folder</span>
      <Plus className="w-4 h-4 text-white p-0 bg-[#00B290] rounded-full" />
    </div>
}

{
    selectedFolder?"":  <div  className="relative">
    <div
      className="bg-white flex items-center gap-[10px] p-4 rounded-[10px] mb-5 cursor-pointer"
      onClick={() => setAddExclusivity(!addExclusivity)}
    >
      <span className="text-[#00B290]">Add Exclusivity</span>
      <Minus className="w-4 h-4 text-white p-0 bg-[#00B290] rounded-full" />
    </div>

  
  </div>
} */}
                    <div
                        className="bg-white flex items-center gap-[10px] p-4 rounded-[10px] mb-5 cursor-pointer"
                        onClick={() => { setGameShowPopup(true); setShowStudioModal("folder") }}
                    >
                        <span className="text-[#00B290]">Create Folder</span>
                        <Plus className="w-4 h-4 text-white p-0 bg-[#00B290] rounded-full" />
                    </div>


                    <div className="relative">
                        {/* <div
                            className="bg-white flex items-center gap-[10px] p-4 rounded-[10px] mb-5 cursor-pointer"
                            onClick={() => setAddExclusivity(!addExclusivity)}
                        >
                            <span className="text-[#00B290]">Add Exclusivity</span>
                            <Plus className="w-4 h-4 text-white p-0 bg-[#00B290] rounded-full" />
                        </div> */}


                    </div>


                    <div className="bg-white flex items-center gap-[10px] p-4 rounded-[10px] mb-5 ml-4 cursor-pointer">
                        <span className="text-red-500">Delete</span>
                        <X className="w-4 h-4 text-white p-0 bg-red-500 rounded-full" />
                    </div>


                </div>}
            </div>



            {/* {addExclusivity && (
                <StudioDropdown className="w-[260px]  right-3" label='Studio' showBtn={false} options={companyList} addExclusivity={addExclusivity} onChange={handleCompanyId} name="companyIds" />

            )} */}

            {/* <div className="mt-6">
                {activeStep === 0 && (
                    <>
                        <GameFolderCard
                            uploadedFolders={uploadedFolders}
                            handleFileChange={handleFileChange}
                             onSelectionChange={handleSelectionChange}
                        />
                          
                        <div className="flex w-full justify-between gap-2 mt-10 mb-10">
                            <button className="flex-grow bg-[#A8A8A8] text-[#6F6F6F] text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2" onClick={handleSubmit}>
                                Publish
                                <Send size={20} />
                            </button>
                            <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2 w-60">
                                Save Draft Review
                                <Pen size={20} />
                            </button>
                        </div>
                    </>

                )}
                {activeStep === 1 && (
                    <>
                        <GameFolderCard
                            uploadedFolders={folders}
                            handleFileChange={handleFileChange}
                             onSelectionChange={handleSelectionChange}
                        />
                      
                        <div className="flex w-full justify-between gap-2 mt-10 mb-10">
                            <button className="flex-grow bg-[#A8A8A8] text-[#6F6F6F] text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2" onClick={handleSubmit}>
                                Publish
                                <Send size={20} />
                            </button>
                            <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2 w-60">
                                Save Draft Review
                                <Pen size={20} />
                            </button>
                        </div>
                    </>

                )}
                {activeStep === 2 && (
                    <>
                        <GameFolderCard
                            uploadedFolders={uploadedFolders}
                            handleFileChange={handleFileChange}
                             onSelectionChange={handleSelectionChange}
                        />
                        <div className="flex w-full justify-between gap-2 mt-10 mb-10">
                            <button className="flex-grow bg-[#A8A8A8] text-[#6F6F6F] text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2" onClick={handleSubmit}>
                                Publish
                                <Send size={20} />
                            </button>
                            <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2 w-60">
                                Save Draft Review
                                <Pen size={20} />
                            </button>
                        </div>
                    </>

                )}
                {activeStep === 3 && (
                    <>
                        <GameFolderCard
                            uploadedFolders={uploadedFolders}
                            handleFileChange={handleFileChange}
                             onSelectionChange={handleSelectionChange}
                        />
                        <div className="flex w-full justify-between gap-2 mt-10 mb-10">
                            <button className="flex-grow bg-[#A8A8A8] text-[#6F6F6F] text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2" onClick={handleSubmit}>
                                Publish
                                <Send size={20} />
                            </button>
                            <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2 w-60">
                                Save Draft Review
                                <Pen size={20} />
                            </button>
                        </div>
                    </>

                )}
                

            </div>
           */}


            <div className="mt-6 w-full">
                {miniLoader ?<div className="grid place-items-center">
                    <MiniLoader />
                </div>
                    :
                    <GameFolderCard selectedFoldersPre={selectedFoldersPre} setSelectedFoldersPre={setSelectedFoldersPre} type={rootLevels?.[activeStep]?.id} uploadedFolders={uploadedFolders} addNewFolder={addNewFolder} gameShowPopup={gameShowPopup} setGameShowPopup={setGameShowPopup} handleInput={handleInput} fetchFolders={fetchFolders} handleFileChange={handleFileChange} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} gameId={param.id} files={files} folders={folders} onSelectionChange={handleSelectionChange} subFolderFile={subFolderFile} activeStep={activeStep} showStudioModal={showStudioModal} setShowStudioModal={setShowStudioModal} preSelected={formData?.companies} onChange={handleCompanyId} handleSelectedFolder={handleSelectedFolder} loading={loading} setLoading={setLoading} />
                }


                <div className="flex w-full justify-between gap-2 mt-10 mb-10">
                    <button className="flex-grow bg-[#A8A8A8] text-[#6F6F6F] text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2" onClick={handleSubmit}>
                        Publish
                        <Send size={20} />
                    </button>
                    <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-3 px-3 rounded-[10px] cursor-pointer flex justify-center items-center gap-2 w-60">
                        Save Draft Review
                        <Pen size={20} />
                    </button>
                </div>


            </div>


            <div className="fixed bottom-2 right-30 z-50 ">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="cursor-pointer bg-[#66FFCC]  p-4 rounded-full"
                >
                    <ChevronUp

                    />
                </button>
            </div>

            {/* {uploadProgress.length > 0 && uploadProgress[0]?.loading && (
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${(parseFloat(uploadProgress[0]?.uploaded) / parseFloat(uploadProgress[0]?.total)) * 100}%` }}>
                        <span className="progress-text">{uploadProgress[0]?.uploaded} / {uploadProgress[0]?.total}</span>
                    </div>
                </div>
            )} */}


        </div>
    );
});

export default GameFilesUpload;