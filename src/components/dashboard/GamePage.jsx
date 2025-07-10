import React, { useEffect, useState } from 'react';
import InputField from '../utils/InputFields';
import GameCard from '../utils/GameCard';
import DashboardHeader from '../header-footer/dashBoardHeader';
import apiHandler from '../../functions/apiHandler';
import cross from '/logos/cross.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Buttons from '../utils/buttons';
import arrow from '../../assets/adminAssets/arrow-bend-left.png'
import { Pen } from "lucide-react";
import { Plus, X } from 'lucide-react';
import '../../../src/mainStyle.css'
import { ChevronUp } from "lucide-react";
import useGlobal from '../../hooks/useGlobal';
import MiniLoader from '../utils/miniLoader';
let debounce =null
function GamePage() {
  const [params] = useSearchParams()
  const studio = params.get("studio")
  const [filters, setFilters] = useState({ skip: 0, limit: 12, studio: studio || "" });
  const [games, setGames] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalGames, setTotalGames] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [studioName, setStudioName] = useState([])
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const dropdownDefaults = (label) => [
    { value: label, selected: true, name: label }
  ];
  const [studios, setStudios] = useState([])
  const [dropdowns, setDropdowns] = useState({
    regionOption: dropdownDefaults('Region'),
    volatilityOption: dropdownDefaults('Volatility'),
    themeOption: dropdownDefaults('Theme'),
    featuresOption: dropdownDefaults('Feature'),
    familyOption: dropdownDefaults('Family'),
    gameTypeOption: dropdownDefaults('Game Type'),
    jackpotOption: dropdownDefaults('Jackpot'),
  });

const {success}= useGlobal()
  useEffect(() => {
    if(debounce) clearTimeout(debounce)
    debounce= setTimeout(()=>{
      fetchGames();
    },300)
  }, [filters]);

  useEffect(() => {
    fetchStudios()
    fetchCategories()

  }, [])

const loadMoreGames = () => {
  if (!loading && hasMore) {
    setFilters((prev) => ({
      ...prev,
      skip: prev.skip + prev.limit,
    }));
  }
};


  const fetchStudios = async () => {
    try {
      const { data } = await apiHandler.get("studios");
      const options = data?.data?.map((e) => ({ name: e.name, value: e.id }));
      setStudios([{ value: "", selected: true, name: "Select one" }, ...options]);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchCategories = async () => {
    try {
      const { data } = await apiHandler.get("categories");
      const categories = data?.data || [];

      const options = (type) => {
        const items = categories?.filter((q) => q.type === type).map((e) => ({ name: e.title, value: e.id }))
        return [{ value: "", selected: true, name: "Select one" }, ...items]
      }

      setDropdowns({
        regionOption: options("region"),
        volatilityOption: options("volatility"),
        themeOption: options("theme"),
        featureOption: options("feature"),
        jackpotOption: options("jackpot"),
        gameTypeOption: options("gameType"),
        familyOption: options("family"),
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchGames = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const { data } = await apiHandler.get(`games?${queryParams}&orderBy=createdAt`);
      const newGames = data.data.games || [];
      setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      setHasMore((filters.skip + filters.limit) < data.data.total);
      setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
    setLoading(false);
  };


  const onFilterChange = (e) => {
    const updatedFilters = { ...filters, [e.target.name]: e.target.value};
    setGames([]);

    setFilters(updatedFilters);
  };

  const navigate = useNavigate()

  const handleNavigate = (item) => {
    setShowDropdown(false);
    let path = `/dashboard/games/game-form?name=${item?.name}&studioId=${item?.id}`
    path += `&direct=${item.direct}`
    navigate(path);
  };

  const fetchStudio = async () => {
    try {
      const { data } = await apiHandler.get(`studios`);
      const newstudio = data?.data || [];
      setStudioName(newstudio)
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };
  useEffect(() => {
    fetchStudio()
  }, [])

 const handleGameDelete =async (id)=>{
    try {

      await apiHandler.delete(`delete-entry/game/${id}`)
      success("Game is Deleted successfully")
      await fetchGames()
    } catch (error) {
      console.log(error)
    }
  } 
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
  //       !loading && hasMore
  //     ) {
  //       setFilters((prev) => ({ ...prev, skip: prev.skip + prev.limit }));
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [loading, hasMore]);



  if(loading) {
    return <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <MiniLoader/>

    </div>
}


  return (


    <div className=' group mb-50' >


      <div className="flex flex-col relative py-10 gap-4">
        <div className="flex gap-10 items-center">

          <Buttons className='flex gap-15 justify-between items-center hover:bg-black cursor-pointer rounded-[10px] text-[16px]' onClick={toggleDropdown}>Add New Game <span className='text-lg'> {showDropdown ? <X size={20} /> : <Plus size={20} />}</span></Buttons>
          <div className="flex gap-2 grow items-center rounded-[10px] border-[1px] border-[#A8A8A8] py-2 px-4 ">
            <img className="h-3.5 w-3.5" src="/logos/Search.png" alt="Search" />
            <input type="text" className="outline-none bg-transparent text-[#A8A8A8] text-[16px]" placeholder="Keyword" value={filters?.search} onChange={(e)=>{setFilters((prev)=>({...prev, search: e.target.value}))}}
 />
          </div>
        </div>

        {showDropdown && (
          <div className="absolute top-24 left-0  bg-white  rounded-xl   z-10 w-64" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
            <ul className="space-y-2 pb-3 pt-3">
              {
                studioName.map((item, index) => {

                  return (
                    <li key={item.id} onClick={() => handleNavigate(item)} className="hover:text-[#00B290] px-5 py-2 mb-0 rounded cursor-pointer">{item.name}</li>

                  )
                })
              }

            </ul>
          </div>
        )}
      </div>


      <div className="games flex gap-20 justify-between items-center">
        <h1 className="font-medium text-[48px] leading-[100%] tracking-[0] font-ot-sono">
          Games
        </h1>


        <div className="filterCta  flex gap-5 justify-end items-center">


          <div className="relative inline-block ">
            <select
              id="category"
              name="order"
               value={filters?.order || 'DESC'}
              className="bg-[#F4F4F4] w-[200px] rounded-[10px] p-2 px-4 pr-10 border-0 appearance-none focus-visible:outline-none"
              onChange={onFilterChange}
            >
              <option value="DESC" className=''>Latest</option>
              <option value="ASC">Oldest</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>



          <div className="relative inline-block ">
            <select
              id="category"
              name="status"
              className="bg-[#F4F4F4] w-[200px] rounded-[10px] p-2 px-4 pr-10 border-0 appearance-none focus-visible:outline-none"
              onChange={onFilterChange}
           value={filters?.status || 'published'}
            >
              <option value="published" className=''>Published</option>
              <option value="draft">Draft</option>
              <option value="">All</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

      </div>







      <div className="grid grid-cols-4 gap-8 mt-10">

        {games.map((game, index) =>

        (
        <div>
          <GameCard handleGameDelete={handleGameDelete}  game={game} key={index} setHoveredCardIndex={setHoveredCardIndex} hoveredCardIndex={hoveredCardIndex} index={index} />
        </div>
        ))}

      </div>



      <div className='mt-[50px] flex justify-center'>
        <Buttons className='cursor-pointer bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-3 px-8 rounded-[10px]' disabled={games?.length===totalGames}  onClick={loadMoreGames}>Load More Game</Buttons>
      </div>


      <div className="fixed bottom-2 right-30 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer bg-[#66FFCC]  p-4 rounded-full"
        >
          <ChevronUp

          />
        </button>
      </div>



    </div>
  );
}

export default GamePage;
