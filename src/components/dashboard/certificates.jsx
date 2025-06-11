import React, { useState } from 'react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import DashboardHeader from '../header-footer/dashBoardHeader'

function Certificates() {
    const [filters,setFilters]= useState(null)

const[certificateSelect, setCertificateSelect]  =useState([
    {
        value: "Certificates",
        selected: true,
        name: "Certificates"
    }
])  

const[studioOption, setStudioOption]= useState(
    [
        {
            value: "Studios",
            selected: true,
            name: "Studios"
        }
    ]
)    

const[regionOption, setRegionOption]= useState(
    [
        {
            value: "Region",
            selected: true,
            name: "Region"
        }
    ]
)

const[gameTitleOption, setGameTitleOption]= useState(
    [
        {
            value: "GameTitle",
            selected: true,
            name: "Game Title"
        }
    ]
)   
 
const[certificatesOption, setCertificatesOption]= useState(
    [
        {
            value: "Certificates",
            selected: true,
            name: "Certificates"
        }
    ]

)


const[chosenFilters, setChosenFilter]= useState(
    [
        {
            name: "Aristocrat Interactive",
        },
        {
            name: "Germany",
        },
        {
            name: "Medium",
        },
        {
            name: "Video Slot",
        },
    ]
)

const[gamesList, setGameLists]=useState(
    [
        {
            icon:'/logos/gameIcon.png',
            title: "Amun Ra King Of The Gods...",
            by: "Studio Name"
        },
        {
            icon:'/logos/gameIcon.png',
            title: "Amun Ra King Of The Gods...",
            by: "Studio Name"
        },
        {
            icon:'/logos/gameIcon.png',
            title: "Amun Ra King Of The Gods...",
            by: "Studio Name"
        }
    ]
)


    return (
        <>



            <div className='container'>


                {/*  section */}
                <div className='flex justify-between mb-14'>
                    <h1 className='text-5xl font-medium'>Certificates</h1>
                    <div className='flex gap-2.5 py-2.5 px-4  border-2 border-black-v4 rounded-xl'>
                        <p className='text-center font-medium'>Go to Game Assets</p>
                        <img className='h-5 w-5' src={'/logos/rightArrow.png'} alt="" />
                    </div>
                </div>
                {/*  section */}


                {/* section */}
                <div className='flex gap-10 mb-11'>
                    <InputField type='select' id="studios" options={studioOption} />
                    <InputField type='select' id="studios" options={regionOption} />
                    <InputField type='select' id="studios" options={certificatesOption} />
                    <InputField type='select' id="studios" options={gameTitleOption} />
                </div>
                {/* section */}

                {/*  section */}
                <div className='flex justify-between items-center mb-14'>
                    <div className='flex gap-5'>
                        {filters && Object.values(filters)?.map((filter) => {
                            return (
                                <div className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
                                    <p className='text-sm text-black-v3'>{filter}</p>
                                    <button onClick={()=>{clearFilter(filter)}}>

                                    <img className='w-2 h-2' src={'/logos/cross.png'} alt="" />
                                    </button>

                                </div>
                            )
                        })}
                    </div>
                    <div className='flex gap-10'>
                        <div className='font-semibold text-primary-dark flex gap-3.5 items-center bg-white-v2 rounded-xl px-5 py-2.5'>
                            <p>View All Chosen Filters</p>
                            <img className='h-4 w-4' src={'/logos/filterArrow.png'} alt="" />
                        </div>
                        <button onClick={()=>{setFilters(null)}} className='font-semibold text-black-v4'>
                            Clear All
                        </button>
                    </div>
                </div>
                {/*  section */}

                {/*  cards */}
                <div className='bg-white-v2 px-7 pt-8 pb-1 space-y-8 rounded-t-3xl '>

                    {/*  button */}
                    <div className='flex justify-end '>
                    <Buttons type='download' name='Download All'></Buttons>
                    </div>
                    {/*  button */}

                    <div>
                        {gamesList?.map((game) => {
                            return (
                                <div className='flex justify-between items-center bg-white-v1 px-8 pb-8  mb-9  rounded-lg'>
                                    <div className='flex gap-14 items-center'>
                                        <InputField type='checkbox' />
                                        <img className='w-44 h-28' src={game.icon} alt="" />
                                        <div>
                                            <div className='bg-black-v2 text-white-v1 px-3 py-1.5 rounded-b-xl mb-7 max-w-56'>
                                                <p>United Kingdom Certificate</p>
                                            </div>
                                            <p className='text-3xl font-medium pb-1'>{game.title}</p>
                                            <p className=''>By: {game.by}</p>
                                        </div>
                                    </div>
                                    <Buttons type='download' name='Download'></Buttons>

                                </div>
                            )
                        })}
                    </div>

                </div>
                {/*  cards */}

            </div>
        </>
    )
}

export default Certificates