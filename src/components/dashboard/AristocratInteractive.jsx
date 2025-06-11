import React, { useEffect, useState } from "react";
import { Plus, Calendar } from "lucide-react";
import Studio from '../utils/studio'
import { Upload } from "lucide-react";
import InputField from "../utils/InputFields";
import { X } from 'lucide-react';
import { MoveLeft } from 'lucide-react';
import { Minus } from 'lucide-react';
import { Send } from 'lucide-react';
import { Pen } from 'lucide-react';
import { MoveRight } from 'lucide-react';

import { ChevronUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import apiHandler from "../../functions/apiHandler";
import useGlobal from "../../hooks/useGlobal";




const GameUploadForm = () => {
  const [variations, setVariations] = useState([{ variation: "", rtp: "" }]);

  const [enabled, setEnabled] = useState(false);

  const [availablefor, setAvailableFor] = useState(false)
  const [partners, setPartners] = useState([{ partner: "" }]);
  const param = useParams();
  // console.log(param);
const [countries ,setCountries]=useState([])


  const [subStudios, setSubStudios] = useState([])
  const { error, success } = useGlobal()




  const [gameType, setGameType] = useState([]);
  const [familyType, setFamilyType] = useState([]);
  const [feature, setFeature] = useState([]);
  const [theme, setTheme] = useState([]);
  const [volatility, setVolatility] = useState([]);
  const [jackpot, setJackpot] = useState([]);

  const [formData, setFormData] = useState(null)
const [variationRows, setVariationRows] = useState(1);

  const navigate = useNavigate()
  const handleAddPartner = () => {
    setPartners([...partners, { partner: "" }]);
  };

  const handleRemovePartner = (index) => {
    const updatedPartners = [...partners];
    updatedPartners.splice(index, 1);
    setPartners(updatedPartners);
  };

  const handlePartnerChange = (index, value) => {
    const updated = [...partners];
    updated[index].partner = value;
    setPartners(updated);
  };


  const [dates, setDates] = useState([
    { id: "", date: "" },
  ]);

 const handleChange = (index, field, value) => {
  const updatedDates = [...dates];
  updatedDates[index][field] = value;
  console.log( updatedDates[index][field] = value);
  
  setDates(updatedDates);

  setFormData((prev) => ({
    ...prev,
    regionalReleaseDates: updatedDates,
  }));
};




  const handleAdd = () => {
    setDates([...dates, { id: "", date: "" }]);
  };

  const handleRemove = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
  };

  const fetchSubStudios = async () => {
    try {
      const { data } = await apiHandler.get(`sub-studios/${param?.id}`);
      console.log(data);
      

      const newSubstudio = data?.data?.map((e) => {
        return {
          name: e?.name,
          value: e?.id
        }
      }) || [];
// console.log(newSubstudio);

      setSubStudios([
        {
          name:"Select Sub Studio",
          value:""
        }
        ,
        ...newSubstudio
      ])

      // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      // setHasMore((filters.skip + filters.limit) < data.data.total);
      // setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  const fetchRegions = async () => {
    try {
      const { data } = await apiHandler.get(`/regions`);
      console.log(data);
      setCountries(data?.data)

      
      // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      // setHasMore((filters.skip + filters.limit) < data.data.total);
      // setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };
  

  const fetchTypes = async () => {
    try {
      const { data } = await apiHandler.get(`categories`);
      const types = data?.data || [];
      const gameType = types.filter(item => item.type === "gameType");
      const familyType = types.filter(item => item.type === "family");
      const theme = types.filter(item => item.type === "theme");
      const volatility = types.filter(item => item.type === "volatility");
      const jackpots = types.filter(item => item.type === "jackpots");
      const feature = types.filter(item => item.type === "feature");

      setGameType(gameType)
      setFamilyType(familyType)
      setFeature(feature)
      setJackpot(jackpots)
      setTheme(theme)
      setVolatility(volatility)

      // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      // setHasMore((filters.skip + filters.limit) < data.data.total);
      // setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  // console.log(formData);


  useEffect(() => {
    fetchSubStudios()
    fetchTypes()
    fetchRegions()
  }, [])

  const getIpData = (e) => {
    let { name, value } = e.target;

    setFormData((prev) => (
      {
        ...prev,
        [name]: value,
        studioId:param?.id,
        freeSpins:enabled

      }
    ))
  }
  const handleFileUpload = (e, name) => {
  const file = e.target.files[0];

  if (!file) return;

  setFormData((prev) => ({
    ...prev,
    [name]: file,

  }));
};


const handleNextClick = async (e) => {
  e.preventDefault();

  const result = await handleSubmit(e, "draft");
console.log(result);
const data =result?.successData

 
    navigate(`/dashboard/games/aristocrat-interactive/aristocrat-interactive-publish/${data?.id}`);
 
};


  const handleSubmit = async (e,status) => {
    e.preventDefault()

    

    try {
      // const finalTemp = {
      //   title: formData.GameName,
      //   subStudioId: formData.SubStudio,
      //   studioId: param?.id,
      //   description: formData.GameDes,
      //   gameDemoLink: formData.gameDemoLink,
      //   categoryIds: categoryArr


      // };
       const finalData = {
      ...formData,
      status, 
    };

    console.log(finalData);
    
      const { data } = await apiHandler.post("/games", finalData)
      success(data?.message)
      console.log(data.data);
      
      return { successData: data.data };
      // console.log(data);

      // setRender(!render)
    } catch (err) {
      error(err.message)
      return { success: false };
    }
  }

  const handleCategories = (e) => {
    if (e.type === "clearAll") {
      setFormData((prev => ({ ...prev, categoryIds: [] })))
      return
    }
    const data = [...formData?.categoryIds || []]
    const value = e.target.value
    if (data.includes(value)) {
      data?.filter((q) => {
        return q !== value
      })
    } else {
      data.push(value)
    }
    // console.log(data);

    setFormData((prev => ({ ...prev, categoryIds: data })))
  }

// useEffect(() => {


//   const fetchGameData = async () => {
//     try {
//       const { data } = await apiHandler.get(`/games`);
//       console.log(data?.data?.games[0]);
      
    
//       setFormData({
//         GameName: data?.data?.games[0].title || '',
//         SubStudio: data?.data?.games[0].subStudioId || '',
//         GameDes: data?.data?.games[0].description || '',
//         gameDemoLink: data?.data?.games[0].gameDemoLink || '',
//         categoryIds: data?.data?.games[0].categories || [],
//         releaseDate: data?.data?.games[0].releaseDate || '',
//         // variations: data?.data?.games[0].variations || [{ variation: "", rtp: "" }],
//         freeSpins: data?.data?.games[0].freeSpins || false,
//         // partners: data?.data?.games[0].partners || [{ partner: '' }],
//         // ... Add all other fields here based on the structure of your API response
//       });
//     } catch (err) {
//       console.error("Error fetching game data: ", err);
//     }
//   };

//   fetchGameData();
// }, []);

console.log(formData);


  return (
    <div className=" mt-6 mb-6 bg-white min-h-screen text-gray-800 font-sans">

      <div className="border-b pb-4">
        <div className="">
          <div className="flex gap-6 justify-between items-center">
            <div className="w-3/4">
              <label className="block text-sm font-semibold mb-1 leading-[24px] text-[#000000]">Game Name</label>
              <input
                type="text"
                className="w-full rounded-[10px] border-2  border-gray-200 px-4 py-2"
                onChange={getIpData}
                name="title"
              />
              
            </div>

            <div className="w-1/4 mt-7">
              <InputField  type="select" options={subStudios} handleInputChange={getIpData} id='subStudioId' name='subStudioId'/>
              {/* <Studio className="w-full" label='Studio' showBtn={false} options={subStudios} getInputData={getIpData} name="SubStudio"/> */}
            </div>
          </div>


          <div className="flex gap-2 justify-between items-start">

            <div className="w-2/4">
              <label className="block mt-6 mb-2 text-sm font-semibold  leading-[24px] text-[#000000]">Game Description Here</label>
              <textarea
                className="w-full border-[1px] border-gray-300 rounded-[10px] px-4 py-2 min-h-[200px]  text-[#A8A8A8]"
                placeholder="GameKeyHere"
                onChange={getIpData}
                name="description"
              />
            </div>


            <div className="grid grid-cols-2 gap-6 mt-12">
              {[
                "Upload Thumbnail Game Page",
                "Upload Thumbnail Portrait",
                "Upload Logo Icon",
                "Upload Screenshots",
                "Upload Character Images",
                "Choose Platform Icon",
              ].map((text, idx) => {
                const name = text.toLowerCase().replace(/\s+/g, "_");
                const inputId = `fileInput-${idx}`;
                return(
                 <div key={idx} className="w-full">
                        <input
                          type="file"
                          id={inputId}
                           accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, name)}
                          name={name}
                          
                        />
                        
                        <button
                  className="w-full bg-[#94FF80] hover:bg-black  hover:text-white text-black text-base font-medium py-2 px-4 rounded-[10px] flex items-center justify-between cursor-pointer"
                          onClick={() => document.getElementById(`${inputId}`).click()}
                        >
                  {text}

                         <span className="ml-2"><Upload size={20} /></span>

                        </button>


                       
                      </div>

                
              )})}
            </div>

          </div>
        </div>

        <div className="mt-8">
          <label className="block  mb-2 text-sm font-semibold  leading-[24px] text-[#000000]">Game Demo Link</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            name="demoLink"
            onChange={getIpData}


          />
        </div>

{Array.from({ length: variationRows }).map((_, rowIndex) => (
  <React.Fragment key={rowIndex}>
    {/* Variation Row */}
    <div className="grid grid-cols-2 md:grid-cols-8 gap-4 text-center text-sm font-semibold mb-2 mt-10">
      {[...Array(8)].map((_, index) => {
        const labelIndex = (rowIndex * 4) + (index % 4) + 1;
        const isUSA = index >= 4;
        const id = `variation_${labelIndex}${isUSA ? '_USA' : ''}`; 
        return (
          <InputField
            key={id}
            id={id}
            type="text"
            label={`Variation ${labelIndex} ${isUSA ? 'USA' : ''}`} 
            handleInputChange={getIpData}
          />
        );
      })}
    </div>

    {/* RTP Row */}
    <div className="grid grid-cols-2 md:grid-cols-8 gap-4 text-center text-sm font-semibold mb-2 mt-2">
      {[...Array(8)].map((_, index) => {
        const labelIndex = (rowIndex * 4) + (index % 4) + 1;
        const isUSA = index >= 4;
        const id = `rtp_${labelIndex}${isUSA ? '_USA' : ''}`;  
        return (
          <InputField
            key={id}
            id={id}
            type="text"
            label={`RTP ${labelIndex} ${isUSA ? 'USA' : ''}`} 
            handleInputChange={getIpData}
          />
        );
      })}
    </div>
  </React.Fragment>
))}






        <div className="mt-10  flex justify-center">
          <button
  className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
  onClick={() => setVariationRows(prev => prev + 1)}
>
  <span>Add More</span>
  <Plus size={35} className="border  rounded-[5px]" />
</button>
        </div>
      </div>

      <div className="flex justify-between gap-2 mt-10">

        <Studio className="w-full" label='Features' options={feature} showBtn={true} onChange={handleCategories} />

        <Studio className="w-full" label='Game Type' showBtn={true} options={gameType} onChange={handleCategories} name="GametypeId" />
        <Studio className="w-full" label='Theme' showBtn={true} options={theme} onChange={handleCategories} name="ThemeId" />
        <Studio className="w-full" label='Family' showBtn={true} options={familyType} getInputData={getIpData} name="FamilyId" />

      </div>

      <div className="grid grid-cols-4 gap-4 mt-10  items-center justify-center ">
        <Studio className="w-full" label="Volatility" showBtn={true} options={volatility} onChange={handleCategories} name="VolatilityId" />
        <Studio className="w-full" label="Jackpots" showBtn={true} options={jackpot} onChange={handleCategories} name="JackpotsId" />

        <div className="flex items-center  space-x-3 w-full">
          <span className="text-sm font-semibold text-black">Free Spins</span>

          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
        ${enabled ? "bg-emerald-500" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300
          ${enabled ? "translate-x-5" : "translate-x-1"}`}
            />
          </button>
        </div>

        <div className="w-full">
          <label className="block text-sm font-semibold mb-1 text-black">Bet Values</label>
          <div className="border border-gray-300 rounded-md p-2 text-sm flex flex-col gap-2 focus-within:ring-2 focus-within:ring-emerald-400 h-[100]px">
            <input
              type="number"
              placeholder="Min -"
              className="w-full border-none outline-none focus:ring-0 text-sm"
              onChange={getIpData}
              name="min"

            />
            <input
              type="number"
              placeholder="Max -"
              className="w-full border-none outline-none focus:ring-0 text-sm"
              onChange={getIpData}
              name="max"
            />
          </div>
        </div>
        <InputField

          type="text"
          label='Line/Ways'
          handleInputChange={getIpData}
          id='livesWays'
          name='livesWays'
        />
        <InputField

          type="text"
          label='Real Type'
          handleInputChange={getIpData}
          id='realType'

        />
        <InputField
          id="maxExposure"

          type="number"
          label='Max Exposure'
          handleInputChange={getIpData}

        />

      </div>


      <div className="w-full bg-[#F4F4F4] p-6 rounded-[10px] mt-10">

        <div className="w-full">
          <label className="block text-2xl font-semibold leading-[24px] mt-6 mb-4 ">Game Key</label>
          <textarea
            className="w-full border-[1px] bg-white border-gray-300  rounded-[10px] text-[#A8A8A8] px-4 py-2 min-h-[150px]"
            placeholder="Game Key Here"
            onChange={getIpData}
            name="gameKey"
          />
        </div>

      </div>

      <div className="w-full bg-[#F4F4F4] p-6 rounded-[10px] mt-5">
        <h2 className="text-2xl font-semibold leading-[24px] mb-4">Release Date</h2>

        <div className="flex items-center justify-between mb-4 border-b-1 pb-5  border-gray-300 ">
          <span className="font-semibold leading-[24px] text-xl text-[#6F6F6F]">General</span>
          <input
            type="date"
            className="border border-gray-300 rounded-[10px] px-2 py-1 bg-[#00B290] text-white hover:bg-[black] custom-date me-31"

            onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      releaseDate: e.target.value, 
    }))
  }
          />
          


        </div>

        {dates.map((item, index) => (
          <div key={index} className="flex items-center justify-evenly space-x-4 mb-3 ">
            <select
              className="w-2/3   rounded-[10px] px-2 py-1 bg-[#FAFAFA] focus:outline-none text-black"
              value={item.country}
              onChange={(e) => handleChange(index, "id", e.target.value)}
            >
              <option value="">Choose Country</option>
              {countries.map((country, idx) => (
                <option key={country?.id} value={country?.id}>
                  {country?.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="border border-gray-300 rounded-[10px] px-2 py-1 bg-[#00B290] text-white hover:bg-[black] custom-date"
              value={item.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
            />


            <X
              size={20}
              className="text-black cursor-pointer hover:text-black"
              onClick={() => handleRemove(index)}
            />
          </div>
        ))}

        <div className="mt-10  flex justify-center">
          <button className="flex items-center space-x-2 text-black text-sm font-semibold leading-[24px]  cursor-pointer" onClick={handleAdd}>
            <span>Add More</span>
            <Plus size={35} className="border  rounded-[5px]" />

          </button>
        </div>
      </div>


      <div className="w-full bg-[#F4F4F4] p-6 rounded-[10px] mt-5">

        <div className="flex items-center justify-between mb-4  ">
          <h2 className="text-2xl font-semibold leading-[24px] mb-4">Available For</h2>
          {
            availablefor ?
              <button className="border border-[#A8A8A8] px-2 py-1 rounded-[10px]  text-balck] font-semibold flex items-center gap-2 cursor-pointer" onClick={() => setAvailableFor(!availablefor)}>
                <MoveLeft className="w-4 h-4  " />
                Go Back
              </button> :
              <button className="border border-[#00B290] px-2 py-1 rounded-[10px] hover:bg-[#b1e1d8] text-[#00B290] font-semibold flex items-center gap-2 cursor-pointer" onClick={() => setAvailableFor(!availablefor)}>
                Make Exclusive For
              </button>
          }


        </div>
        {
          availablefor ?
            <div className='bg-white flex items-center gap-[10px] p-4 rounded-[10px] mb-5'>

              <Minus className="w-4 h-4 text-white p-0 bg-red-500 rounded-full " />
              <span className="text-red-500">All</span>
            </div>
            : <InputField type="checkbox" label="All" className='bg-white flex gap-4 p-4 rounded-[10px]' />
        }


        {availablefor &&
          (
            <>
              {partners.map((item, index) => (
                <div key={index} className="flex items-center justify-evenly space-x-4 mb-3 ">
                  <InputField
                    type="select"
                    placeholder="Choose Partner/Operator"
                    value={item.partner}
                    onChange={(e) => handlePartnerChange(index, e.target.value)}
                    className='bg-white'
                  />
                  <X
                    size={20}
                    className="text-black cursor-pointer hover:text-black"
                    onClick={() => handleRemovePartner(index)}
                  />
                </div>
              ))}

              <div className="mt-10 flex justify-center">
                <button
                  className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
                  onClick={handleAddPartner}
                >
                  <span>Add More</span>
                  <Plus size={35} className="border rounded-[5px]" />
                </button>
              </div>


            </>
          )
        }




      </div>
      <p className="text-[#6F6F6F] text-2xl font-['OT_Sono'] font-semibold mt-10 mb-10 text-center">
        Publish, Save draft  <span className="text-[#6F6F6F] text-xl font-['OT_Sono'] font-normal">or click</span>  Next <span className="text-[#6F6F6F] text-xl font-['OT_Sono'] font-normal">to go to the drive and follow the steps</span>
      </p>
      <div className="flex w-full justify-between gap-2 mt-10 mb-10 ">
        <button className="flex-grow bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-4 px-6 rounded-[10px] cursor-pointer flex justify-center items-center gap-2" onClick={(e) => handleSubmit(e, "published")}>
          Publish
          <Send size={20} />
        </button>
        <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-4 px-6 rounded-[10px]  cursor-pointer flex justify-center items-center gap-2 w-60" onClick={(e) => handleSubmit(e, "draft")}>
          Save Draft Review
          <Pen size={20} />
        </button>
      </div>

      {/* back and farword btn */}

      <div className="flex w-full justify-between gap-2 mt-10 mb-40 ">
        <button className=" hover:text-[#00B290] text-xl  font-medium  rounded-[10px] cursor-pointer flex justify-center items-center gap-2" onClick={() => navigate(-1)}>

          <div className="rounded-full border-2 hover:text-[#00B290] p-0.5 " >
            <MoveLeft
              size={20}
            />
          </div >


          Previous
        </button>
        <button className=" hover:text-[#00B290] text-xl  font-medium  rounded-[10px] cursor-pointer flex justify-center items-center gap-2"  onClick={handleNextClick}>




          Next
          <div className="rounded-full border-2 hover:text-[#00B290] p-0.5  " >
            <MoveRight
              size={20}

            />
          </div >
        </button>
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

    </div>
  );
};

export default GameUploadForm;
