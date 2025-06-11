import React, { useEffect, useState } from 'react';
import InputField from '../utils/InputFields';
import GameCard from '../utils/GameCard';
import DashboardHeader from '../header-footer/dashBoardHeader';
import apiHandler from '../../functions/apiHandler';
import cross from '/logos/cross.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Buttons from '../utils/buttons';
import cardImg from '../../assets/adminAssets/_fortineSM_story_size_1080x1920.png'
import pencil from '../../assets/adminAssets/pencil--change-edit-modify-pencil-write-writing.png'
import arrow from '../../assets/adminAssets/arrow-bend-left.png'
import { Pen } from "lucide-react";
import { Plus, X } from 'lucide-react';
import '../../../src/mainStyle.css'
import { ChevronUp } from "lucide-react";

function GamePage() {
  const [params] = useSearchParams()
  const studio = params.get("studio")
  // //console.log(studio)
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


  useEffect(() => {
    fetchGames();
  }, [filters]);

  useEffect(() => {
    fetchStudios()
    fetchCategories()

  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
        !loading && hasMore
      ) {
        setFilters((prev) => ({ ...prev, skip: prev.skip + prev.limit }));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

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
      //console.log(queryParams);
      
      const { data } = await apiHandler.get(`games?${queryParams}`);
      //console.log(data);
      
      const newGames = data.data.games || [];
      setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      setHasMore((filters.skip + filters.limit) < data.data.total);
      setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
    setLoading(false);
  };

  // //console.log(games);
  
  const onFilterChange = (e) => {
    debugger
    const updatedFilters = { ...filters, [e.target.name]: e.target.value, skip: 0 };
    setGames([]);

    setFilters(updatedFilters);
  };

  const clearFilter = (key) => {
    const updatedFilters = { ...filters };
    delete updatedFilters[key];
    updatedFilters.skip = 0;
    setGames([]);
    setFilters(updatedFilters);
  };



  const clearAllFilters = () => {
    setGames([]);
    setFilters({ skip: 0, limit: 16 });
  };

  const navigate = useNavigate()

  const handleNavigate = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  const fetchStudio = async () => {
    try {
      const { data } = await apiHandler.get(`studios`);
      // //console.log(data);

      const newstudio = data?.data || [];
      //console.log(newstudio);
      setStudioName(newstudio)

      // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      // setHasMore((filters.skip + filters.limit) < data.data.total);
      // setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };
  useEffect(() => {
    fetchStudio()
  }, [])


  const dateFormate =(date)=>{
 return new Date(date).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'long',
})
  }
  return (


    <div className=' group mb-50' >


      <div className="flex flex-col relative py-10 gap-4">
        <div className="flex gap-10 items-center">

          <Buttons className='flex gap-15 justify-between items-center hover:bg-[black] cursor-pointer rounded-[10px] text-[16px]' onClick={toggleDropdown}>Add New Game <span className='text-lg'> {showDropdown ? <X size={20} /> : <Plus size={20} />}</span></Buttons>



          <div className="flex gap-2 grow items-center rounded-[10px] border-[1px] border-[#A8A8A8] py-2 px-4 ">
            <img className="h-3.5 w-3.5" src="/logos/Search.png" alt="Search" />
            <input type="text" className="outline-none bg-transparent text-[#A8A8A8] text-[16px]" placeholder="Keyword" />
          </div>
        </div>

        {showDropdown && (
          <div className="absolute top-24 left-0  bg-white  rounded-xl   z-10 w-64" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
            <ul className="space-y-2 pb-3 pt-3">
              {
                studioName.map((item, index) => {

                  return (
                    <li key={item.id} onClick={() => handleNavigate(`/dashboard/add-games/${item?.id}?name=${item?.name}`)} className="hover:text-[#00B290] px-5 py-2 mb-0 rounded cursor-pointer">{item.name}</li>

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
              name="category"
              className="bg-[#F4F4F4] w-[200px] rounded-[10px] p-2 px-4 pr-10 border-0 appearance-none focus-visible:outline-none"
            >
              <option value="" className=''>Release Date</option>
              <option value="animation">Option</option>
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
              name="category"
              className="bg-[#F4F4F4] w-[200px] rounded-[10px] p-2 px-4 pr-10 border-0 appearance-none focus-visible:outline-none"
            >
              <option value="" className=''>Staus 1</option>
              <option value="animation">Staus 2</option>
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
  <div key={game.id} className="max-w-[280px] rounded-xl  shadow bg-white relative">
    <div className="relative">
      <img
        src={cardImg}
        alt="Game Poster"
        className="w-full h-[300px] object-cover rounded-t-xl"
      />
       <div
      className="absolute top-3 left-3 text-black px-3 py-2 text-xs font-semibold rounded-[10px]"
      style={{
        background: "linear-gradient(86.08deg, #66FFCC 0%, #94FF80 100%)",
      }}
    >
        {dateFormate(game?.releaseDate)}
    </div>

      {hoveredCardIndex === index &&  (
        <div className="absolute top-[-30px] right-0 z-10">
          <div className="bg-black text-white text-xs rounded px-2 py-1 shadow">
            Saved for Draft Review
          </div>
        </div>
      )}

  {game?.status ==="draft"?
<div>
                <div className="absolute top-3 right-3  bg-[#F4405A] p-1.5 rounded-full shadow text-white">
                <span className='w-[15px] h-[15px] px-1 py-2'  onMouseEnter={() => setHoveredCardIndex(index)}
          onMouseLeave={() => setHoveredCardIndex(null)}>PP</span>

                </div>
              </div>:
             <div className="absolute top-3 right-3">
        <button
          className="bg-[#F4405A] p-2 rounded-full shadow relative"
          onMouseEnter={() => setHoveredCardIndex(index)}
          onMouseLeave={() => setHoveredCardIndex(null)}
        >
          <img src={pencil} alt="Edit" />
        </button>
      </div>
              }
                
    </div>

   <div className="p-4 bg-[#F4F4F4] rounded-b-[20px]">
            <h3 className="font-bold text-xl leading-tight text-black mt-5">{game?.title}</h3>
            <p className="text-base mt-4 font-normal">By: {game?.studio?.name}</p>

            <div className="flex justify-between gap-2 mt-4 mb-4">
              <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-1.5 px-10 rounded-[10px] cursor-pointer">
                Edit
              </button>
              <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-1.5 px-10 rounded-[10px] cursor-pointer">
                Delete
              </button>
            </div>
          </div>
  </div>
))}
        
      </div>



      <div className='mt-[50px] flex justify-center'>
        <button className='cursor-pointer bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-3 px-8 rounded-[10px]'>Load More Game</button>
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
