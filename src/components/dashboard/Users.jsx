import React, { useEffect, useState } from 'react'
import GameCard from '../utils/GameCard'
import InputField from '../utils/InputFields'
import ActiveButtons from '../utils/ActiveButtons'
import DashboardHeader from '../header-footer/dashBoardHeader'
import { Minus } from "lucide-react";

import UserListingCard from '../utils/UserListingCard'
function Users() {
    const [activeStudio,setActiveStudio]= useState(0)
    


 
   

    const [activeButtons,setActiveButtons]= useState([
        {
            name:'Approved Customer'
        },
        {
            name:'Admin Users'
        },
        {
            name:'Customer Requests'
        }
    ])


  const [subStudios, setSubStudios] = useState([]);

  const fetchSubStudios = async () => {
    try {
      const { data } = await apiHandler.get(`sub-studios/${param?.id}`);

      const newSubstudio =
        data?.data?.map((e) => {
          return {
            name: e?.name,
            value: e?.id,
          };
        }) || [];
      // console.log(newSubstudio);

      setSubStudios([
        {
          name: "Select Sub Studio",
          value: "",
        },
        ...newSubstudio,
      ]);

      // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      // setHasMore((filters.skip + filters.limit) < data.data.total);
      // setTotalGames(data.data.total);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    fetchSubStudios();
  }, []);

 const usersData = [
  {
    id: 1,
    name: "Kami Scerri",
    company: "Aristocrat Interactive",
    position: "Marketing Specialist",
    email: "Kami.Scerri@aristocrat.com",
    userType:"Approved"
  },
  {
    id: 2,
    name: "Alex Johnson",
    company: "Meta",
    position: "UI/UX Designer",
    email: "alex.johnson@meta.com",
    userType:"Approved"

  },
  {
    id: 3,
    name: "Alex",
    company: "Meta",
    position: "UI/UX Designer",
    email: "alex.johnson@meta.com",
    userType:"Approved"

  }
];
 const usersData2 = [
  {
    id: 1,
    name: "Kami Scerri",
    company: "Aristocrat Interactive",
    position: "Marketing Specialist",
    email: "Kami.Scerri@aristocrat.com",
    userType:"Admin"
  },
  {
    id: 2,
    name: "Alex Johnson",
    company: "Meta",
    position: "UI/UX Designer",
    email: "alex.johnson@meta.com",
    userType:"Admin"

  },
  
];

 const usersData3 = [
  {
    id: 1,
    name: "Kami Scerri",
    company: "Aristocrat Interactive",
    position: "Marketing Specialist",
    email: "Kami.Scerri@aristocrat.com",
    userType:"Request"
  },
  
];

  return (
   
   <>
 <div className="space-y-11">
            <div className=" mb-8 mt-10">
              <ActiveButtons
                active={activeStudio}
                className={"grid grid-cols-3 gap-4"}
                setActive={setActiveStudio}
                buttons={activeButtons}
              />
            </div>
          </div>

          {
            activeStudio === 0 &&(

              <>
                <div className="flex gap-6 justify-between items-center mb-6">
        <div className="w-1/4">
          <InputField
            type="select"
            options={subStudios}
            id="subStudioId"
            name="subStudioId"
          />
        </div>

        <div className="flex gap-2 grow items-center rounded-[10px] border-2 border-gray-200 py-2 px-4">
          <img
            className="h-3.5 w-3.5"
            src="/logos/Search.png"
            alt="Search"
          />
          <input
            type="text"
            className="outline-none bg-transparent text-[#A8A8A8] text-[16px]"
            placeholder="Keyword"
          />
        </div>
      </div>
              
{usersData.map((item)=>{
  return(
 <UserListingCard user={item} key={item.id} />

  )
  
})}
              
              </>
            )
          }

           {
            activeStudio === 1 &&(

              <>
                <div className="flex gap-6 justify-between items-center mb-6">
        <div className="w-1/4">
          <InputField
            type="select"
            options={subStudios}
            id="subStudioId"
            name="subStudioId"
          />
        </div>

        <div className="flex gap-2 grow items-center rounded-[10px] border-2 border-gray-200 py-2 px-4">
          <img
            className="h-3.5 w-3.5"
            src="/logos/Search.png"
            alt="Search"
          />
          <input
            type="text"
            className="outline-none bg-transparent text-[#A8A8A8] text-[16px]"
            placeholder="Keyword"
          />
        </div>
      </div>
              
{usersData2.map((item)=>{
  return(
 <UserListingCard user={item} key={item.id} />

  )
  
})}
              
              </>
            )
          }



           {
            activeStudio === 2 &&(

              <>

              
{usersData3.map((item)=>{
  return(
 <UserListingCard user={item} key={item.id} />

  )
  
})}
              
              </>
            )
          }
   </>
  )
}
 
export default Users