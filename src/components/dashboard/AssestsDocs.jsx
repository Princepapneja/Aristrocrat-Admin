import React, { useEffect, useState } from "react";
import GameCard from "../utils/GameCard";
import InputField from "../utils/InputFields";
import ActiveButtons from "../utils/ActiveButtons";
import DashboardHeader from "../header-footer/dashBoardHeader";
import AllTables from "./AllTables";
import ListingTabel from "../utils/ListingTabel";
import apiHandler from "../../functions/apiHandler";
import ForlderCard from "../utils/forlderCard";
import moment from "moment";
import { dateFormat } from "../../../constants";
function AssestsDocs() {


  const [activeStudio, setActiveStudio] = useState(0);

  const [companyList,setCompanyList]=useState([])
  const [masterList,setMasterList]=useState([])
  

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
const fetchMasterList=async ()=>{
  try {
debugger
    
    const { data } = await apiHandler.get(`/master-game-list`);
    setMasterList(data?.data)
  } catch (error) {
    
  }
}
  
  useEffect(() => {
    fetchCompany();
    fetchMasterList()
  }, []);

  const handleRowClick = (game) => {
    // alert(`Clicked on: ${game.name}`);
  };
const folders = [
    { name: 'Background' },
    { name: 'Thumbnails'},
    { name: 'Banners' },
    { name: 'Symbols' },
    
];

  const [activeButtons, setActiveButtons] = useState([
    {
      name: "Game File & Certificates",
    },
    {
      name: "Master Game List",
    },
  ]);


  const [files, setFiles] = useState([]);
const [filters, setFilters] = useState({ skip: 0, limit: 5 });
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);


const fetchFiles = async () => {
  setLoading(true);
  try {
    const query = new URLSearchParams(filters).toString();
    const { data } = await apiHandler.get(`/files?${query}`);
    const newFiles = data?.data?.resp || [];

    setFiles((prev) => (filters.skip === 0 ? newFiles : [...prev, ...newFiles]));
    setHasMore((filters.skip + filters.limit) < data?.data?.total);
  } catch (error) {
    console.error("Failed to fetch games:", error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchFiles();
}, [filters]);

const handleLoadMore = () => {
  if (hasMore && !loading) {
    setFilters(prev => ({ ...prev, skip: prev.skip + prev.limit }));
  }
};

  return (
    <>
      <div className="">
        <div>
          <div className="space-y-11">
            <div className=" mb-8 mt-10">
              <ActiveButtons
                active={activeStudio}
                className={"grid grid-cols-2 gap-4"}
                setActive={setActiveStudio}
                buttons={activeButtons}
              />
            </div>
          </div>

          <div className="">
            {activeStudio === 0 && (
             <div className="bg-white ">
      <ListingTabel
  files={files}
  companyList={companyList}
  handleRowClick={handleRowClick}
  handleLoadMore={handleLoadMore}
  hasMore={hasMore}
  loading={loading}
/>

    </div>
            )}
            {
                activeStudio === 1 && (
                   <div className="mt-5">
                        <table className="w-full text-left border-collapse">
                          <thead className="text-[#A8A8A8] text-base font-normal border-b border-gray-200 ">
                            <tr>
                              <th className="py-5">Studio</th>
                              <th className="py-5">File</th>
                            </tr>
                          </thead>
                          <tbody>
                            {masterList?.map((file, index) => (
                              <tr
                                key={index}
                                onClick={() => handleRowClick(file?.id)}
                                className="group cursor-pointer text-xl border-b border-gray-200 transition"
                              >
                                <td className="py-5 text-base font-medium text-[#6F6F6F] group-hover:text-black ">
                                  {file?.studioDetail?.name || "Others"}
                                </td>
                               
                                
                              
                                
                                <td className="py-5  text-base font-medium text-[#6F6F6F] group-hover:text-black">
                                  <a href={file?.file}>{file?.file}</a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                
                        {/* Load More Button */}
                      
                      </div>
                )

            }
          </div>
        </div>
      </div>
      

    </>
  );
}

export default AssestsDocs;
