import React, { useEffect, useState } from "react";
import { Plus, Calendar, Delete, Trash } from "lucide-react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiHandler from "../../functions/apiHandler";
import useGlobal from "../../hooks/useGlobal";
import { dateFormat } from "../../functions/dateFormat";


const GameForm = () => {
  const [variations, setVariations] = useState([{ variation: "", rtp: "" }]);

  const [enabled, setEnabled] = useState(false);

  const [availablefor, setAvailableFor] = useState(false)
  const [partners, setPartners] = useState([{ partner: "" }]);
  const location = useLocation();
  // console.log(location);

  const searchParams = new URLSearchParams(location.search);
  // console.log(searchParams);
  const [gameId, setGameId] = useState(searchParams.get("gameId"))

  const id = searchParams.get("studioId");
  const direct = searchParams.get("direct") === "true";


  // //console.log(param);
  const [countries, setCountries] = useState([])


  const [subStudios, setSubStudios] = useState([])
  const { error, success } = useGlobal()
  const [companyList, setCompanyList] = useState([])



  const [gameType, setGameType] = useState([]);
  const [familyType, setFamilyType] = useState([]);
  const [feature, setFeature] = useState([]);
  const [theme, setTheme] = useState([]);
  const [volatility, setVolatility] = useState([]);
  const [jackpot, setJackpot] = useState([]);

  const [formData, setFormData] = useState(null)
  const [variationRows, setVariationRows] = useState(1);

  const [extraRows, setExtraRows] = useState([]);

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
    console.log(updated);

    setPartners(updated);
  };


  const [dates, setDates] = useState([
    { id: "", date: "" },
  ]);

  const handleChange = (index, field, value) => {



    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    //console.log( updatedDates);

    setDates(updatedDates);

    const countryReleaseDates = updatedDates.reduce((acc, item) => {
      console.log(item);
      

      if (item.id && item.date) {
        acc[item.id] = new Date(item.date).toISOString();
      }
      return acc;
    }, {});

    //console.log(regionalReleaseDates);

    setFormData((prev) => ({
      ...prev,
      countryReleaseDates
    }));
  };




  const handleAdd = () => {
    setDates([...dates, { id: "", date: "" }]);
  };

  const handleRemove = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);

    const countryReleaseDates = updatedDates.reduce((acc, item) => {
      if (item.id && item.date) {
        acc[item.id] = new Date(item.date).toISOString();
      }
      return acc;
    }, {});


    setFormData((prev) => ({
      ...prev,
      countryReleaseDates
    }));
  };


  const fetchSubStudios = async () => {
    try {
      const { data } = await apiHandler.get(`sub-studios/${id}`);
      //console.log(data);


      const newSubstudio = data?.data?.map((e) => {
        return {
          name: e?.name,
          id: e?.id
        }
      }) || [];
      // //console.log(newSubstudio);

      setSubStudios([
        { name: "Select Studio", id: "", },
        ...newSubstudio
      ]);
      // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      // setHasMore((filters.skip + filters.limit) < data.data.total);
      // setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  const fetchRegions = async () => {
    try {
      const { data } = await apiHandler.get(`/countries`);
      //console.log(data);
      setCountries(data?.data)


      // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      // setHasMore((filters.skip + filters.limit) < data.data.total);
      // setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  };

  const fetchCompany = async () => {
    try {
      const { data } = await apiHandler.get(`/companies`);
      console.log(data);
      // setCompanyList(data?.data)

 const company = data?.data?.map((e) => {
        return {
          name: e?.name,
          id: e?.id
        }
      }) || [];
      // //console.log(newSubstudio);

      setCompanyList([
        { name: "Select Company", id: "", },
        ...company
      ]);
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

  // //console.log(formData);
const fetchGame = async () => {
  if (!gameId) return;

  try {
    const { data } = await apiHandler.get(`/game/${gameId}`);
    const game = data?.data;

    const { rtpVersions = {} } = game;
    const { rtp = {}, rtpUsa = {} } = rtpVersions;

    setFormData({
      ...game,
      categoryIds: game?.categories?.map((e) => e.id),
    });


  } catch (error) {
    console.error("Failed to fetch game:", error);
  }
};


  useEffect(() => {
    fetchSubStudios()
    fetchTypes()
    fetchRegions()
    fetchCompany()
    fetchGame()
  }, [])



const getIpData = (e, index) => {
  const { name, type, value, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
  const numValue = Number(value);

  if (name === "companyId") {

    setFormData((prev) => {
      const safePrev = prev || {};
      const existing = safePrev.companyIds || [];

 
      if (existing.includes(numValue)) {
     
        error("This partner has already been selected.");
        return prev; 
      }

      const updated = [...existing];
      updated[index] = numValue;

      return { ...safePrev, companyIds: updated };
    });
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
     [name]: finalValue,
    studioId: id,
  }));
};


const [variationInp,setVariationInp]=useState(null)

 const handleVariation = (e) => {
  
        let { name, value } = e.target;
        setVariationInp((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }


const buildFinalRtpData = () => {
  if (!variationInp || typeof variationInp !== "object") return { rtp: {}, rtpUsa: {} };

  const rtp = {};
  const rtpUsa = {};

  const variationKeys = Object.keys(variationInp).filter(
    (key) => key.startsWith("Variation ") && !key.includes("USA")
  );

  const variationUsaKeys = Object.keys(variationInp).filter(
    (key) => key.startsWith("Variation ") && key.includes("USA")
  );

  variationKeys.forEach((variationKey, i) => {
    const variationValue = variationInp[variationKey];
    const rtpKey = `RTP ${i + 1}`;
    const rtpValue = variationInp[rtpKey];

    if (variationValue?.trim() && rtpValue?.trim()) {
      rtp[variationValue] = rtpValue;
    }
  });

  variationUsaKeys.forEach((variationKey, i) => {
    const variationValue = variationInp[variationKey];
    const rtpUsaKey = `RTP ${i + 1} USA`;
    const rtpUsaValue = variationInp[rtpUsaKey];

    if (variationValue?.trim() && rtpUsaValue?.trim()) {
      rtpUsa[variationValue] = rtpUsaValue;
    }
  });

  return { rtp, rtpUsa };
};
const buildVariationInpFromRtpData = (rtpData) => {
  const variationInp = {};

  const { rtp = {}, rtpUsa = {} } = rtpData;

  // Handle RTP (non-USA)
  const rtpEntries = Object.entries(rtp);
  rtpEntries.forEach(([variationValue, rtpValue], i) => {
    variationInp[`Variation ${i + 1}`] = variationValue;
    variationInp[`RTP ${i + 1}`] = rtpValue;
  });

  // Handle RTP USA
  const rtpUsaEntries = Object.entries(rtpUsa);
  rtpUsaEntries.forEach(([variationValue, rtpUsaValue], i) => {
    variationInp[`Variation ${i + 1} USA`] = variationValue;
    variationInp[`RTP ${i + 1} USA`] = rtpUsaValue;
  });

  return variationInp;
};


useEffect(() => {
  if(!formData?.rtpVersions )return
 const data= buildVariationInpFromRtpData(formData?.rtpVersions)
debugger
  
  setVariationInp(data); 
}, [formData]);


console.log(variationInp);




const handleFileUpload = (e) => {
  const { name, files, multiple } = e.target;
  if (!files || files.length === 0) return;

  if (multiple) {

    setFormData((prev) => ({
      ...prev,
      [name]: [...(prev?.[name] || []), ...files], 

    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  }
};


  const handleNextClick = async (e) => {
    e.preventDefault();
    try {
      const result = await handleSubmit(e, gameId ? formData?.status : "draft");
      console.log(result);
      const data = result?.successData

      console.log(data);
      if (data) {
        navigate(`/dashboard/games/files/${data?.id}?name=publish&studioId=${id}`);
      }
    } catch (error) {
      console.log(error)
    }


  };


  const handleSubmit = async (e, status) => {


    e.preventDefault()

    
const { rtp, rtpUsa } = buildFinalRtpData();


    try {
      const finalData = {
        ...formData,
       rtpVersions:{rtp,rtpUsa},
        status,
      };
      let resp = null
      if (gameId) {
        const { data } = await apiHandler.patch(`/game/${gameId}`, finalData)
        resp = data
      }
      else {
        const { data } = await apiHandler.post(`/games`, finalData)
        resp = data

      }
      success(resp?.message)
      setFormData(null)
      setGameId(resp?.data?.id)
      return { successData: resp.data };
      // //console.log(data);

      // setRender(!render)
    } catch (err) {
      error(err.message)
      return { success: false };
    }
  }

  const handleCategories = (e, type) => {

// console.log(e);

    if (e.type === "clearAll") {
      setFormData((prev => ({ ...prev, categoryIds: [] })))
      return
    }


    const data = [...formData?.categoryIds || []]
    const value = e.target.value
console.log(value);

    if (data.includes(value)) {
      data?.filter((q) => {
        return q !== value
      })
    } else {
      data.push(value)
    }
    console.log(data);

    setFormData((prev => ({ ...prev, categoryIds: data })))
  }


  const handleSubStudio = (e, type) => {


    if (type === "clearAll") {
      setFormData((prev => ({ ...prev, subStudioIds: [] })))
      return
    }
    const data = [...formData?.subStudioIds || []]

    const value = e.target.value
    console.log(value);

    if (data.includes(value)) {

      data?.filter((q) => {

        return q !== value
      })
    } else {
      data.push(value)
    }
    console.log(data);

    setFormData((prev => ({ ...prev, subStudioIds: data })))
  }


  const [categoryFormData, setCategoryFormData] = useState(null)

  const handleCreate = (event) => {
    console.log(event);

    setCategoryFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })

  }


  const createCategory = async (data) => {

    const payload = {
      title: categoryFormData?.title,
      type: data?.type,
      value: data?.id


    }


    try {

      const { data } = await apiHandler.post("/categories", payload)
      console.log(data);
      if (data) {
        fetchTypes()

      }
      success(data?.message)

      return { successData: data.data };

    } catch (err) {
      error(err.message)
      return { success: false };
    }
  }

  const handleAllCheckbox = (e) => {
    
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      companyIds: isChecked ? [] : null
    }));
  };
  console.log(formData);

  const [variationColumns, setVariationColumns] = useState([
    { id: '1', name: 'Variation 1' },
    { id: '2', name: 'Variation 2' },
    { id: '3', name: 'Variation 3' },
    { id: '4', name: 'Variation 4' },
    { id: '5', name: 'Variation 1 USA' },
    { id: '6', name: 'Variation 2 USA' },
    { id: '7', name: 'Variation 3 USA' },
    { id: '8', name: 'Variation 4 USA' }
  ]);

  const [rtpColumns, setRtpColumns] = useState([
    { id: '1', name: 'RTP 1' },
    { id: '2', name: 'RTP 2' },
    { id: '3', name: 'RTP 3' },
    { id: '4', name: 'RTP 4' },
    { id: '5', name: 'RTP 1 USA' },
    { id: '6', name: 'RTP 2 USA' },
    { id: '7', name: 'RTP 3 USA' },
    { id: '8', name: 'RTP 4 USA' }
  ]);



  const handleAddMore = () => {
    const nextIndex = extraRows.length + 5;
    setExtraRows(prev => [...prev, nextIndex]);
  };

    const [showFilterModal, setShowFilterModal] = useState(false);


const removeScreenshot = (indexToRemove) => {
  setFormData((prev) => {
    const updatedScreenshots = prev?.screenshots?.filter((_, index) => index !== indexToRemove);

    if (updatedScreenshots.length === 0) {
      setShowFilterModal(false);
    }

    return {
      ...prev,
      screenshots: updatedScreenshots,
    };
  });
};



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
                value={formData?.title}
              />

            </div>

            <div className="w-1/4 mt-7">
              {/* <Studio className="w-full"  options={subStudios}   onChange={handleSubStudio} name="subStudioId"  id='subStudioId' label='Sub Studio'/> */}

              <InputField type="select" options={subStudios} handleInputChange={getIpData} id='subStudioId' name='subStudioId' value={formData?.subStudioId} />
              {/* <Studio className="w-full" label='Studio' showBtn={false} options={subStudios} getInputData={getIpData} name="SubStudio"/> */}
            </div>
          </div>


          {!direct && <div className="flex gap-2 justify-between items-start">

            <div className="w-2/4">
              <label className="block mt-6 mb-2 text-sm font-semibold  leading-[24px] text-[#000000]">Game Description Here</label>
              <textarea
                className="w-full border-[1px] border-gray-300 rounded-[10px] px-4 py-2 min-h-[200px]  text-[#A8A8A8]"
                placeholder="Enter the Game Key"
                onChange={getIpData}
                name="description"
                value={formData?.description}
              />
            </div>


            <div className="grid  gap-6 mt-12">
              {[
                {
                  label: "Thumbnail Game page",
                  placeholder: "Upload Thumbnail Game Page",
                  name: "thumbnail",
                },
                {
                  label: "Thumbnail",
                  placeholder: "Upload Thumbnail Portrait",
                  name: "portrait",
                },
                {
                  label: "Logo",
                  placeholder: "Upload Logo Icon",
                  name: "logo",
                },

              ].map((item, idx) => {
                const name = item.name;
                return (
                  <div key={idx} className="w-full">
                    <input
                      type="file"
                      id={item?.name}
                      name={item?.name}
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}


                    />
                    <div className="w-full bg-[#94FF80] hover:bg-black flex items-center justify-between gap-2  hover:text-white text-black text-base font-medium  rounded-[10px]  cursor-pointer">
                      <label className="py-2 px-4 w-full flex items-center whitespace-nowrap justify-between" htmlFor={item.name}
                      >
                        <span className="truncate w-48">
                          <span className="capitalize">{formData?.[name]?.name && `${name}: `}</span>
                        {formData?.[name]?.name || item?.placeholder}
                        </span>
                        <span className="ml-2"><Upload size={20} /></span>
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
            <div>
              <div className="w-full mt-12">
                <input
                  type="file"
                  id={"screenshots"}
                  name={"screenshots"}
                  accept="image/*"
                  className="hidden"
                  multiple
                  onChange={handleFileUpload}

                />
                
                <div className="w-full bg-[#94FF80] hover:bg-black flex items-center justify-between gap-2  hover:text-white text-black text-base font-medium  rounded-[10px]  cursor-pointer">

                  <label className="py-2 px-4  w-full flex items-center whitespace-nowrap justify-between" htmlFor={"screenshots"}

                  >
                    Upload Screenshots
                    <span className="ml-2"><Upload size={20} /></span>

                  </label>




                </div>
             


              </div>

            

             <div className="w-full text-black grid gap-2 mt-2 text-base font-medium rounded-[10px] cursor-pointer overflow-y-auto max-h-40 ">

          {
             formData?.screenshots?.length >0 && <div className='flex gap-10'>
                    <div
                        onClick={() => setShowFilterModal(true)}
                        className='cursor-pointer font-semibold text-primary-dark flex gap-3.5 items-center bg-white-v2 rounded-xl px-5 py-2.5'
                    >
                        <p>View Selected Screenshots</p>
                        <img className='h-4 w-4' src='/logos/filterArrow.png' alt='' />
                    </div>

                   
                </div>
          }   


  { showFilterModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div
                        className="bg-white rounded-[15px] shadow-lg p-6 w-[25%] h-[60vh] transform transition-all duration-300 translate-y-10 opacity-0 animate-popup"
                    >
                        <div className='flex items-baseline justify-end mb-5'>
                            <X
                                size={20}
                                className="text-black cursor-pointer hover:text-black"
                                onClick={() => setShowFilterModal(false)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-3 max-h-[400px] overflow-y-auto">

                            { formData?.screenshots?.map((file, i) => {
                             

                                return (
                                    <div key={i} className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
                                        <p className='text-sm text-black-v3'>{file?.name}</p>
                                         <button onClick={() => removeScreenshot(i)} ><X size={20} className="text-black-v3 cursor-pointer"/></button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}


</div>


            </div>
          </div>}
        </div>

        {!direct && <div className="mt-8">
          <label className="block  mb-2 text-sm font-semibold  leading-[24px] text-[#000000]">Game Demo Link</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            name="demoLink"
            onChange={getIpData}
            value={formData?.demoLink}


          />
        </div>}
        {!direct &&
          <div>
            {/* Labels + Inputs for Variations */}
            <div className="grid grid-cols-2 md:grid-cols-8 gap-4 text-center text-sm font-semibold mb-2 mt-10">
              {variationColumns.map((val,i) => {
                // const id = `variation_${index + 1}`;
                return (
                  <InputField
                    key={i}
                    id={val?.name}
                    type="text"
                    label={val?.name}
                    handleInputChange={handleVariation}
                    value={variationInp?.[val.name]}
                  />
                );
              })}

              {rtpColumns.map((val, i) => {

                // const id = `variation_${index + 1}`;
                return (
                  <InputField
                    key={i}
                    id={val?.name}
                    type="text"
                    label={val?.name}
                    handleInputChange={handleVariation}
                    value={variationInp?.[val.name]}


                  />
                );
              })}

            </div>

            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm font-semibold mb-2 mt-10">

               <div  className="grid grid-cols-4 gap-5">

                {
                  extraRows.map((rowNum, i)=>{
                    return(
                      <div key={rowNum} className="flex flex-col space-y-1">

                       <InputField
                      key={rowNum}
                      id={`Variation ${rowNum}`}
                      type="text"
                      label={`Variation ${rowNum}`}
                      handleInputChange={handleVariation}

                    />
                    <InputField
                      key={i}
                      id={`RTP ${rowNum}`}
                      type="text"
                      label={`RTP ${rowNum}`}
                      handleInputChange={handleVariation}
                    />
                      </div>
                    )
                  })
                }
                   
                  </div>

                   <div  className="grid grid-cols-4 gap-5 space-y-1">

                {
                  extraRows.map((rowNum, i)=>{
                    return(
                      <div key={rowNum} className="flex flex-col space-y-1">

                       <InputField
                      key={rowNum}
                      id={ `Variation ${rowNum} USA` }
                      type="text"
                      label={ `Variation ${rowNum} USA` }
                      handleInputChange={handleVariation}

                    />
                    <InputField
                      key={i}
                      id={ `RTP ${rowNum} USA`}
                      type="text"
                      label={ `RTP ${rowNum} USA`}
                      handleInputChange={handleVariation}
                    />
                      </div>
                    )
                  })
                }
                   
                  </div>

           
            
            </div>

            {/* Labels + Inputs for RTPs */}


            {/* Add More Button */}
            <div className="mt-10 flex justify-center">
              <button
                className="flex items-center space-x-2 text-black text-sm font-medium cursor-pointer"
                onClick={handleAddMore}
              >
                <span>Add More</span>
                <Plus size={35} className="border rounded-[5px]" />
              </button>
            </div>
          </div>
        }
      </div>
      {!direct &&
        <div className="flex justify-between gap-2 mt-10">

          <Studio className="w-full" label='Features' options={feature} preSelected={formData?.categoryIds} showBtn={true} onChange={handleCategories} name="Feature" handleCreate={handleCreate} createCategory={createCategory} />

          <Studio className="w-full" label='Game Type' preSelected={formData?.categoryIds} showBtn={true} options={gameType} onChange={handleCategories} name="GametypeId" handleCreate={handleCreate} createCategory={createCategory} />
          <Studio className="w-full" label='Theme' preSelected={formData?.categoryIds} showBtn={true} options={theme} onChange={handleCategories} name="ThemeId" handleCreate={handleCreate} createCategory={createCategory} />
          <Studio className="w-full" label='Family ' preSelected={formData?.categoryIds} showBtn={true} options={familyType} onChange={handleCategories} name="FamilyId" handleCreate={handleCreate} createCategory={createCategory} />

        </div>
      }
      {!direct &&
        <div className="grid grid-cols-4 gap-4 mt-10  items-center ">
          <Studio className="w-full" label="Volatility" preSelected={formData?.categoryIds} showBtn={true} options={volatility} onChange={handleCategories} name="VolatilityId" handleCreate={handleCreate} createCategory={createCategory} />
          <Studio className="w-full" label="Jackpots" preSelected={formData?.categoryIds} showBtn={true} options={jackpot} onChange={handleCategories} name="JackpotsId" handleCreate={handleCreate} createCategory={createCategory} />

          

            <InputField 
            label="Free Spins"
            type="switch"
            id="freeSpins"
            handleInputChange={getIpData}
            value={formData?.freeSpins}
            className="flex justify-start gap-5 item-center"
            />




         
 

          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 text-black">Bet Values</label>
            <div className="border border-gray-300 rounded-md p-2 text-sm flex flex-col gap-2 focus-within:ring-2 focus-within:ring-emerald-400 h-[100]px">
              <input
                type="number"
                placeholder="Min -"
                className="w-full border-none outline-none focus:ring-0 text-sm"
                onChange={getIpData}
                name="min"
                value={formData?.min}

              />
              <input
                type="number"
                placeholder="Max -"
                className="w-full border-none outline-none focus:ring-0 text-sm"
                onChange={getIpData}
                name="max"
                value={formData?.max}

              />
            </div>
          </div>
          <InputField

            type="text"
            label='Line/Ways'
            handleInputChange={getIpData}
            id='livesWays'
            name='livesWays'
            value={formData?.livesWays}
          />
          <InputField

            type="text"
            label='Real Type'
            handleInputChange={getIpData}
            id='realType'
            value={formData?.realType}

          />
          <InputField
            id="maxExposure"

            type="number"
            label='Max Exposure'
            handleInputChange={getIpData}
            value={formData?.maxExposure}

          />

        </div>
      }
      {!direct &&
        <div className="w-full bg-[#F4F4F4] p-6 rounded-[10px] mt-10">

          <div className="w-full">
            <label className="block text-2xl font-semibold leading-[24px] mt-6 mb-4 ">Game Key</label>
            <textarea
              className="w-full border-[1px] bg-white border-gray-300  rounded-[10px] text-[#A8A8A8] px-4 py-2 min-h-[150px]"
              placeholder="Game Key Here"
              onChange={getIpData}
              name="gameKey"
              value={formData?.gameKey}

            />
          </div>

        </div>
      }
      {!direct &&
        <div className="w-full bg-[#F4F4F4] p-10 rounded-[10px] mt-5 container">
          <h2 className="text-2xl font-semibold px-4 leading-[24px] mb-4">Release Date</h2>

          <div className="flex items-center p-4 justify-between mb-4 border-b-1 pb-5  border-gray-300 me-19">
            <span className="font-semibold leading-[24px] text-xl text-[#6F6F6F]">General</span>
            <input
              type="date"
              className="border border-gray-300 rounded-[10px] px-2 py-1 bg-[#00B290] text-white hover:bg-[black] custom-date"
              value={dateFormat(formData?.releaseDate)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  releaseDate: e.target.value,
                }))
              }
            />



          </div>

          {dates.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-1 p-4">
              <div className="relative w-3/4   rounded-[10px] ">
                <select
                  className="appearance-none text-base font-semibold w-full bg-[#FAFAFA] border border-gray-300 text-black py-2 px-4 pr-10 rounded-[10px] focus:outline-none"
                  value={item.country}
                  onChange={(e) => handleChange(index, "id", e.target.value)}
                >
                  <option value="">Choose Country</option>
                  {countries.map((country) => {
                    
                    
                    return(
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  )})}
                </select>

                {/* Custom Dropdown Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-black">
                  <svg
                    className="w-5 h-5 text-[#A8A8A8]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.25 7.75L10 12.5l4.75-4.75" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
              </div>

              <input
                type="date"
                className="border  rounded-[10px] px-2 py-1 bg-[#00B290] text-white hover:bg-[black] custom-date"
                value={item.date}
                onChange={(e) => handleChange(index, "date", e.target.value)}
              />


              <X
                size={24}
                className="text-black cursor-pointer hover:text-black "
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
      }
      {!direct &&
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
              : <InputField type="checkbox" label="All" className='bg-white flex gap-4 p-4 rounded-[10px]'   value={formData?.companyIds?.length ===0 || true} handleInputChange={handleAllCheckbox}
              />
          }


         {availablefor && (
  <>
    {partners.map((item, index) => (
      <div key={index} className="flex items-center justify-evenly space-x-4 mb-3 ">
        <InputField
          type="select"
          placeholder="Choose Partner/Operator"
          options={companyList}
          handleInputChange={(e) => getIpData(e, index)} 
          className="bg-white"
          id="companyId"
          value={formData?.companyIds?.[index] || ''}
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
)}





        </div>
      }
      <p className="text-[#6F6F6F] text-2xl font-['OT_Sono'] font-semibold mt-10 mb-10 text-center">
        Publish, Save draft  <span className="text-[#6F6F6F] text-xl font-['OT_Sono'] font-normal">or click</span>  Next <span className="text-[#6F6F6F] text-xl font-['OT_Sono'] font-normal">to go to the drive and follow the steps</span>
      </p>
      <div className="flex w-full justify-between gap-2 mt-10 mb-10 ">
        <button className="flex-grow bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-4 px-6 rounded-[10px] cursor-pointer flex justify-center items-center gap-2" onClick={(e) => { handleSubmit(e, "published") }}>
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
        <button className=" hover:text-[#00B290] text-xl  font-medium  rounded-[10px] cursor-pointer flex justify-center items-center gap-2" onClick={handleNextClick}>




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

export default GameForm;