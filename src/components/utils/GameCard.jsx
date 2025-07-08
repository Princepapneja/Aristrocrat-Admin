import React from 'react'
import { Link } from 'react-router-dom'
import pencil from '../../assets/adminAssets/pencil--change-edit-modify-pencil-write-writing.png'
import Modal from './Modal'
import apiHandler from '../../functions/apiHandler'
import useGlobal from '../../hooks/useGlobal'

function GameCard({game,setHoveredCardIndex,hoveredCardIndex,index,handleGameDelete}) {
  const dateFormater = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
    })
  }
  console.log(game);
 
  
  return (
     <div key={game.id} className="max-w-[280px] rounded-xl  shadow bg-white relative">
            <div className="relative">
              {
                game?.thumbnail ? 
                <img
                src={game?.thumbnail||""}
                alt="Game Poster"
                className="w-full h-[300px] object-cover rounded-t-xl"
              />
                : <div className='h-[300px] bg-[url(/logos/defaultCard.png)] grid place-items-center'>
                  <h4 className='text-white-v1 text-xl font-bold'>{game?.studio?.name}</h4>
                </div>
              }
             
              <div
                className="absolute top-3 left-3 text-black px-3 py-2 text-xs font-semibold rounded-[10px]"
                style={{
                  background: "linear-gradient(86.08deg, #66FFCC 0%, #94FF80 100%)",
                }}
              >
                {dateFormater(game?.releaseDate)}
              </div>

              {hoveredCardIndex === index && (
                <div className="absolute top-[-30px] right-0 z-10">
                  <div className="bg-black text-white text-xs rounded px-2 py-1 shadow">
                    Saved for Draft Review
                  </div>
                </div>
              )}

              {game?.status === "draft" ?
                <div>
                  <div className="absolute top-3 right-3  bg-[#F4405A] p-1.5 rounded-full shadow text-white">
                    <span className='w-[15px] h-[15px] px-1 py-2' onMouseEnter={() => setHoveredCardIndex(index)}
                      onMouseLeave={() => setHoveredCardIndex(null)}>PP</span>

                  </div>
                </div> :
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
                <Link to={`/dashboard/games/game-form?name=${game?.studio?.name}&studioId=${game?.studio?.id}&gameId=${game.id}&direct=${game?.studio?.direct}`} className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-1.5 px-10 rounded-[10px] cursor-pointer">
                  Edit
                </Link>
                <div  className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold  rounded-[10px] cursor-pointer">
                <Modal firstCtaText={"Cancel"} secondCtaText={"Delete"} handleSecondCta={()=>handleGameDelete(game?.id)} openCTA={<div className='py-1.5 px-10'>
                  Delete
                </div>}>
                <p className='text-center font-bold'>

Are you sure to delete this Game.
                </p>
              </Modal>
                </div>
             
              </div>
            </div>
          </div>
  )
}

export default GameCard