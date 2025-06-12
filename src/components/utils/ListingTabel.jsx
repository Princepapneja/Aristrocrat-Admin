import React, { useState } from "react";
import InputField from "./InputFields";
import StudioDropdown from "./studio";

const ListingTabel = ({ games, handleRowClick,companyList,handleLoadMore ,files}) => {
    
  console.log(files);
  
  return (
    <>
      {/* Filter and Search */}
      {/* <div className="flex gap-6 justify-between items-center mb-6">
        <div className="w-1/4">
         <StudioDropdown className="w-full" label='Company' showBtn={false} options={companyList} selectedData={selectedData} />
         
        </div>

        <div className="flex gap-2 grow items-center rounded-[10px] border-2 border-gray-200 py-2 px-4">
          <img
            className="h-3.5 w-3.5"
            src="/logos/Search.png"
            alt="Search"
          />
          <input
            type="text"
            className="outline-none bg-transparent text-[#A8A8A8] text-[16px]"
            placeholder="Keyword"
          />
        </div>
      </div> */}

      {/* Table */}
      <div className="mt-5">
        <table className="w-full text-left border-collapse">
          <thead className="text-[#A8A8A8] text-base font-normal border-b border-gray-200 ">
            <tr>
              <th className="py-5">Name</th>
              <th className="py-5">Product Type</th>
              <th className=" py-5">Company</th>
              <th className="py-5">Status</th>
              <th className="py-5">Release Date</th>
            </tr>
          </thead>
          <tbody>
            {files?.map((game, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(game?.id)}
                className="group cursor-pointer text-xl border-b border-gray-200 transition"
              >
                <td className="py-5 text-base font-medium text-[#6F6F6F] group-hover:text-black ">
                  {game?.title}
                </td>
                <td className="py-5 text-base font-medium text-[#6F6F6F] group-hover:text-black">
                  {game?.studio?.name}
                </td>
                <td className="py-5 text-base font-medium text-[#6F6F6F] group-hover:text-black">
                  Company Name
                </td>
                <td className="py-5 text-base font-medium vtext-[#6F6F6F] group-hover:text-black">
                  {game.status}
                </td>
                <td className="py-5  text-base font-medium text-[#6F6F6F] group-hover:text-black">
                  {game?.releaseDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Load More Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-teal-500 text-white text-sm font-medium px-5 py-2 rounded hover:bg-teal-600 transition" onClick={handleLoadMore}>
            Load More Games
          </button>
        </div>
      </div>
    </>
  );
};

export default ListingTabel;
