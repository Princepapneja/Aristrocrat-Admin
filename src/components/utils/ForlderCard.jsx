import React from "react";
import InputField from "./InputFields";
import folderImg from '../../assets/adminAssets/folder.png'
import {SquareArrowOutUpRight } from "lucide-react";

const ForlderCard = ({folders}) => {
  return (
    <>
     

      <div className="grid grid-cols-4 gap-10 mt-20">
                                {folders?.map((folder, index) => (
                                    <div
                                        key={index}
                                        className="group relative bg-[#F4F4F4] rounded-[20px] w-[280px] h-[280px] p-4 flex flex-col items-center justify-center hover:shadow hover:bg-white"
                                    >

                                        <div className="flex flex-col items-center">
                                            <img
                                                src={folderImg}
                                                alt="Folder"
                                                className={`w-20 h-20 mb-2 ${folder.name === 'Banners' ? 'grayscale ' : ' group-hover:brightness-0'}`}
                                            />
                                            <span className="text-[20px] font-[600] text-center">{folder.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
     
    </>
  );
};

export default ForlderCard;
