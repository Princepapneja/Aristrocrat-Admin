import React from "react";
import { Minus ,Check} from "lucide-react";
import UserImg from '../../assets/adminAssets/Kami Scerri.png'

const UserListingCard = ({ user,handleSubmit }) => {
  
    
  return (
    <div className="mx-auto bg-[#F4F4F4] rounded-[20px] p-4 flex items-center justify-between shadow-sm w-full max-w-7xl mb-5">
      <div className="flex items-center gap-5">
        <img
          src={UserImg}
          alt={user?.firstName}
          className="w-[100px] h-[100px] object-contain rounded-[10px] shadow-sm"
        />

        <div className="text-sm">
          <div className="mb-1 flex">
            <span className="text-gray-500 w-[80px] font-medium">Name:</span>
            <span className="text-black font-bold">{user?.firstName+" " + user?.lastName}</span>
          </div>
          <div className="mb-1 flex">
            <span className="text-gray-500 w-[80px] font-medium">Company:</span>
            <span className="text-black font-bold">{user?.company?.name}</span>
          </div>
          <div className="mb-1 flex">
            <span className="text-gray-500 w-[80px] font-medium">Position:</span>
            <span className="text-black font-bold">{user?.role}</span>
          </div>
          <div className="flex">
            <span className="text-gray-500 w-[80px] font-medium">Email:</span>
            <span className="text-black font-bold">{user?.email}</span>
          </div>
        </div>
      </div>

      <div className="text-center border-2 border-[#F4405A] text-[#F4405A] rounded-[20px] py-6 px-4 flex items-center justify-center gap-5 text-sm">
        <span className="bg-[#F4405A] rounded-full  flex items-center justify-center">
          <Minus className="text-white" size={40}/>
        </span>
        <span className="leading-tight text-sm font-semibold text-left">
          Consent to receive <br />
          marketing communications.
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <button className="bg-[#00B290]  text-white text-sm font-medium py-2 px-5 rounded-[10px] hover:bg-black cursor-pointer"  onClick={() => handleSubmit(user?.id, "approved")}>
          {user?.access === "approved"? "Edit":"Approve"}
        </button>
        <button className="bg-[#EF4444] text-white text-sm font-medium py-2 px-3 rounded-[10px] hover:text-[black] hover:bg-[#F6ADCD] cursor-pointer"  onClick={() => handleSubmit(user?.id,`${user?.access === "approved" ? "blocked":"rejected"}`)}>
          {user?.access === "approved" ? "Delete Account":"Deny"}
        </button>
      </div>
    </div>
  );
};

export default UserListingCard;
