import React from "react";
import InputField from "./InputFields";
import StudioDropdown from "./studio";
import moment from "moment";
import { dateFormat } from "../../../constants";

const ListingTabel = ({ files, handleRowClick,companyList,handleLoadMore }) => {
  
  return (
    <>
      {/* Filter and Search */}
      <div className="flex gap-6 justify-between items-center mb-6">
        <div className="w-1/4">
         <StudioDropdown className="w-full" label='Company' showBtn={false} options={companyList} />
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
      </div>

      {/* Table */}
      <div className="mt-5">
        <table className="w-full text-left border-collapse">
          <thead className="text-[#A8A8A8] text-base font-normal border-b border-gray-200 ">
            <tr>
              <th className="py-5">Name</th>
              <th className="py-5">Product Type</th>
              <th className="py-5">Company</th>
              <th className="py-5">Game</th>
              <th className="py-5">Release Date</th>
            </tr>
          </thead>
          <tbody>
            {files?.map((file, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(file?.id)}
                className="group cursor-pointer text-xl border-b border-gray-200 transition"
              >
                <td className="py-5 text-base font-medium text-[#6F6F6F] group-hover:text-black ">
                  {file?.name}
                </td>
                <td className="capitalize py-5 text-base font-medium text-[#6F6F6F] group-hover:text-black">
                  {file?.type}
                </td>
                <td className="capitalize py-5 text-base font-medium text-[#6F6F6F] group-hover:text-black">
                  {file?.companies?.length > 0 ? file?.companies?.join(",") : "All"}
                </td>
              
                <td className="py-5 text-base font-medium text-[#6F6F6F] group-hover:text-black">
                  {file?.game?.title}
                </td>
                <td className="py-5  text-base font-medium text-[#6F6F6F] group-hover:text-black">
                  {moment(file?.game?.releaseDate).format(dateFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Load More Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-teal-500 text-white text-sm font-medium px-5 py-2 rounded hover:bg-teal-600 transition" onClick={handleLoadMore}>
            Load More files
          </button>
        </div>
      </div>
    </>
  );
};

export default ListingTabel;
