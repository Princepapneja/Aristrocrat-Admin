import React, { useEffect, useState } from "react";
import GameCard from "../utils/GameCard";
import InputField from "../utils/InputFields";
import ActiveButtons from "../utils/ActiveButtons";
import DashboardHeader from "../header-footer/dashBoardHeader";
import AllTables from "./AllTables";
import ListingTabel from "../utils/ListingTabel";
import apiHandler from "../../functions/apiHandler";
import ForlderCard from "../utils/forlderCard";
function AssestsDocs() {


  

  const [activeStudio, setActiveStudio] = useState(0);

  const [companyList,setCompanyList]=useState([])
  

  const fetchCompany = async () => {
    try {
      const { data } = await apiHandler.get(`/companies`);

    //   //console.log(data);
      setCompanyList(data.data)
      
//       const newSubstudio = data?.data?.map((e) => {
//         //console.log(e);
        
//         return {
//           name: e?.name,
//           value: e?.id
//         }
//       }) || [];
// // //console.log(newSubstudio);

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
    fetchCompany();
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


  const [games, setGames] = useState([]);
const [filters, setFilters] = useState({ skip: 0, limit: 5 });
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);


const fetchGames = async () => {
  setLoading(true);
  try {
    const query = new URLSearchParams(filters).toString();
    const { data } = await apiHandler.get(`/games?${query}`);

    const newGames = data?.data?.games || [];

    setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
    setHasMore((filters.skip + filters.limit) < data?.data?.total);
  } catch (error) {
    console.error("Failed to fetch games:", error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchGames();
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
  games={games}
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
                    <ForlderCard folders={folders} />
                )

            }
          </div>
        </div>
      </div>
      

    </>
  );
}

export default AssestsDocs;
