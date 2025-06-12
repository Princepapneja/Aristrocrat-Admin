import React, { useState } from "react";
import { Plus, SquareArrowOutUpRight } from "lucide-react";
import folderImg from "../../assets/adminAssets/folder.png";
import axios from "axios";
import apiHandler from "../../functions/apiHandler";
// import apiHandler from "../../api/apiHandler";

const GameFile = ({  handleFileChangeProp, tabLabels, activeStep, selectedFolder, param, onSelectionChange }) => {
  const [selectedFolders, setSelectedFolders] = useState([]);
    const [uploadedFolders, setUploadedFolders] = useState([]);

  const toggleFolderSelection = (folderName) => {
    const updated = selectedFolders.includes(folderName)
      ? selectedFolders.filter((name) => name !== folderName)
      : [...selectedFolders, folderName];

    setSelectedFolders(updated);

    if (onSelectionChange) {
      onSelectionChange(updated);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    selectedFiles.forEach(async (file) => {
      const gameData = {
        name: file.name,
        folder: tabLabels[activeStep]?.key,
        subFolder: selectedFolder,
        gameId: param?.id,
        fileType: file.type,
      };

      try {
        const { data } = await apiHandler.post("/upload", gameData);
        success(data?.message);
console.log(data);

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
          await axios.put(data?.data?.uploadUrl, file, config);
        } catch (uploadErr) {
          console.error("Upload error", uploadErr);
        }

        setUploadedFolders((prev) =>
          prev.map((folder) =>
            folder.name === file.name
              ? { ...folder, loading: false, uploaded: "100%", total: "100%" }
              : folder
          )
        );

      } catch (err) {
        error(err.message);
      }
    });
  };

  return (
    <div className="bg-white font-sans">
      <div className="grid grid-cols-4 gap-10">
        {uploadedFolders.map((folder, index) => (
          <div
            key={index}
            className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
          >
            <input
              type="checkbox"
              checked={selectedFolders.includes(folder.name)}
              onChange={() => toggleFolderSelection(folder.name)}
              className="absolute top-5 left-4 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
                checked:after:content-['\u2713'] checked:after:text-white checked:after:text-sm checked:after:font-bold
                checked:after:flex checked:after:justify-center checked:after:items-center"
            />

            <span className="hover:text-[#00B290] absolute top-5 cursor-pointer right-4 bg-[#393939] text-white text-[15px] font-[600] px-3 py-1 rounded-[10px] flex items-center justify-around gap-2">
              Company <SquareArrowOutUpRight size={18} />
            </span>

            <div className="flex flex-col items-center w-full">
              <img src={folderImg} alt="Folder" className="w-20 h-20 mb-2" />
              <span className="text-[16px] font-[600] text-center break-words w-full">
                {folder.name}
              </span>

              {!folder.loading && (
                <div className="mt-2 text-sm text-green-600 font-semibold">Uploaded</div>
              )}
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
  );
};

export default GameFile;
