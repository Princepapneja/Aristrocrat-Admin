import React, { useState } from 'react'
import GameCard from '../utils/GameCard'
import InputField from '../utils/InputFields'
import ActiveButtons from '../utils/ActiveButtons'
import DashboardHeader from '../header-footer/dashBoardHeader'
function Roadmaps() {
    const [activeStudio,setActiveStudio]= useState(0)
    const [activeYear,setActiveYear]= useState(0)
    const [regions,setRegions]  = useState([
        {
            name:"Region",
            selected:true,
            disable:true
        },
        
    ])

        const[gameAssets, setGameAssets]=useState(
            [
                {
                    value:"Game Assets",
                    selected: true,
                    name:"Game Assets"
                }
            ]
        )
 
    const [months,setMonths] = useState([
        {
            name:'All',
        },
        {
            name:'Jan'
        },
        {
            name:'Feb'
        },
        {
            name:'Mar'
        },
        {
            name:'Apr'
        },
        {
            name:'May'
        },
        {
            name:'Jun'
        },
        {
            name:'Jul'
        },
        {
            name:'Aug'
        },
        {
            name:'Sep'
        },
        {
            name:'Oct'
        },
        {
            name:'Nov'
        },
        {
            name:'Dec'
        }
    ])
 
    const [games,setGames] = useState([
        {
image: "/Images/game.png",
title:"Wolf Riches Hold N Spin",
by:"Studio Name",
date:"05 January"
        },
        {
            image:"/Images/game.png",
            title:"Chicken Burst",
            by:"Studio Name",
            date:"13 February"
                    },
        {
image: "/Images/game.png",
title:"Fortune Tree Of Wealth",
by:"Studio Name",
date:"04 March"
        },
    
        {
image: "/Images/game.png",
title:"Cards Fortune",
by:"Studio Name",
date:"17 April"
        },
    ])

    const [activeButtons,setActiveButtons]= useState([
        {
            name:'Aristocrat Interactive'
        },
        {
            name:'Ignite Sudios'
        },
        {
            name:'All Roadmap Downloads'
        }
    ])
  return (
   
   <>
   <div className='container'>
   <div>
<div className='space-y-11'>

<h1 className='text-5xl font-medium'>Roadmaps</h1>


    <div className=' mb-8 '>
    <ActiveButtons active={activeStudio} className={"grid grid-cols-3 gap-4"} setActive={setActiveStudio} buttons={activeButtons} />
    </div>

    </div>

   <div className='flex justify-between items-center mb-5'>
<div className='flex gap-3.5 items-center'>
<img src={"/Images/uk.jpg"} className='h-12 w-12 rounded-full' alt="" />
<p className='text-3xl font-medium'>United Kingdom</p>
</div>
<div>
    <InputField type='select' options={regions}/>
</div>
</div>
 
<div className='mb-14'>
    <ActiveButtons active={activeYear} setActive={setActiveYear} type="secondary" buttons={months} />
</div>
<div className='grid grid-cols-4 gap-8'>
{games.map((item)=>{
    return(
        <GameCard game={item} />
    )
})}
</div>
</div>
</div>
   </>
  )
}
 
export default Roadmaps