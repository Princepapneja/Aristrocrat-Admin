import moment from "moment";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { dateFormat } from "../../../constants";
import Buttons from "./buttons";

function GameCard({ game }) {
  const navigation= useNavigate()
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      id={game?.id}
      className="relative bg-white-v2 hover:shadow-xl flex flex-col duration-300 rounded-2xl max-w-72 w-full transform transition-transform hover:scale-105 group"
    >
      {/* Game Image and Date */}
      <div className="relative">
        <img
          className="h-96 rounded-3xl object-cover w-full"
          src={game.image || "/Images/game.png"}
          alt=""
        />
        {game?.createdAt && (
          <p className="absolute top-3 left-3 font-semibold px-3.5 py-2.5 primary-gradient rounded-xl">
            {moment(game.createdAt).format("D MMMM YYYY")}
          </p>
        )}
      </div>

      {/* Game Info + Buttons */}
      <div className="p-7 flex flex-col grow justify-between group-hover:bg-white transition-colors duration-300">
        <p className="text-2xl font-medium mb-3">{game.title}</p>
        <p className="mb-4">By: {game?.studio?.name}</p>

        {/* Buttons on Hover */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-300 flex gap-2">
          <Buttons onClick = {()=>{navigation(`/dashboard/detail-game/${game.id}`)}}className="!py-1.5 !px-4" >
            Details
          </Buttons>
          <Buttons className="!py-1.5 !px-4">Play Demo</Buttons>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
