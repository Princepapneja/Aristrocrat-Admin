import React, { useState } from 'react'
import DashboardHeader from '../header-footer/dashBoardHeader'
import ActiveButtons from '../utils/ActiveButtons'
function EngagementTools() {
    const [gameAssets, setGameAssets] = useState(
        [
            {
                value: "Game Assets",
                selected: true,
                name: "Game Assets"
            }
        ]
    )

    const [activeButtons, setActiveButtons] = useState([
        {
          name: 'Tournaments',
          description1: "Summon your players for enticing competitions! Set up tournaments effortlessly, selecting players, games, timing, conditions, and rewards with total flexibility.",
          description2: "Leaderboards are displayed in-game, providing another edge, as players can track their progress as they battle their way to the top.",
          icon: "/Images/trophy.png",
          image: "/Images/screen.png"
        },
        {
          name: 'Free Spins',
          description1: "Engage users with free spin opportunities. Configure spin frequency, outcomes, and rewards to increase player excitement.",
          description2: "A proven tool to boost retention and keep the gameplay thrilling for every participant.",
          icon: "/Images/trophy.png",
          image: "/Images/screen.png"
        },
        {
          name: 'Spin That Wheel™',
          description1: "Add an element of surprise with our customizable spinning wheel feature.",
          description2: "Players can spin to win rewards, creating anticipation and frequent engagement.",
          icon: "/Images/trophy.png",
          image: "/Images/screen.png"
        },
        {
          name: 'Raffle Rocket',
          description1: "Launch raffle campaigns to excite users with prize draws.",
          description2: "Encourage participation through ticket collections and scheduled raffles.",
          icon: "/Images/trophy.png",
          image: "/Images/screen.png"
        },
        {
          name: 'Tool 5',
          description1: "Tool 5 description goes here.",
          description2: "Additional Tool 5 details or benefits go here.",
          icon: "/Images/trophy.png",
          image: "/Images/screen.png"
        },
        {
          name: 'Tool 6',
          description1: "Tool 6 description goes here.",
          description2: "Additional Tool 6 details or benefits go here.",
          icon: "/Images/trophy.png",
          image: "/Images/screen.png"
        },
      ]);
    const [active, setActive] = useState(0)
    return (
        <>
            <div className='container '>
                <div className='space-y-12'>
                    <h1 className='text-5xl font-medium'>Engagement Tools</h1>
                    <div className='space-y-5'>
                        <p className='text-lg text-black-v3 max-w-[1111px]'>
                            We are committed to delivering the highest performance results for our partners, combining endless entertainment with the most effective
                            data-driven features.
                        </p>
                        <p className='text-lg text-black-v3 max-w-[1159px]'>
                            That is why, along with our attractive set of games, we provide a variety of powerful engagement tools, specifically designed for seamless use and integration, to maximize your attraction and retention rates.
                        </p>
                    </div>
                    <div className='flex rounded-3xl bg-white-v2 gap-10 justify-between p-10 items-center mb-8'>
                        <ActiveButtons active={active} setActive={setActive} className="flex-col max-w-[275px] !w-full " buttons={activeButtons} type='activePage' />

                        <div className="bg-white-v2 rounded-3xl p-6 md:p-10">
                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-20 mb-6">
                                <img
                                    src={
                                        activeButtons?.[active]?.icon
                                    }
                                    alt="Trophy"
                                    className="h-28 w-auto object-contain"
                                />
                                <img
                                    src={
                                        activeButtons?.[active]?.image
                                    }
                                    alt="Screen"
                                    className="h-50 w-auto object-contain"
                                />
                            </div>

                            <div className="space-y-4 text-black-v3">
                                <p className="text-lg max-w-xl">
                                    {
                                        activeButtons?.[active]?.description1
                                    }
                                </p>
                                <p className="text-lg">
                                    {
                                        activeButtons?.[active]?.description2
                                    }
                                </p>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default EngagementTools