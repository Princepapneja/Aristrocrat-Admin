import React, { useEffect, useState } from 'react'
import InputField from '../utils/InputFields'
import ActiveButtons from '../utils/ActiveButtons'

import UserListingCard from '../utils/UserListingCard'
import apiHandler from '../../functions/apiHandler'
import useGlobal from '../../hooks/useGlobal'
let debounce=null
function Users() {
    const { error, success } = useGlobal()

    const [active,setActive]= useState(0)
    const [filter,setFilter]= useState(null)
    const [activeButtons,setActiveButtons]= useState([
        {
            name:'Approved Customer'
        },
      
        {
            name:'Customer Requests'
        }
    ])


  const [companies, setCompanies] = useState([]);
const [users,setUsers]= useState([])

const fetchUsers= async ()=>{

  let  url=`users?access=${active===0 ?"approved" : "pending"}`
if(filter?.companyId){
  url+= `&companyId=${filter?.companyId}`
}
if(filter?.search){
  url+= `&search=${filter?.search}`
}
  const {data}= await apiHandler.get(url)
  console.log(data);
  
setUsers(data?.data?.resp)
}
  const fetchCompanies = async () => {
    try {
      const { data } = await apiHandler.get(`companies`);

      const companies =
        data?.data?.map((e) => {
          return {
            name: e?.name,
            value: e?.id,
          };
        }) || [];
      // //console.log(newSubstudio);

      setCompanies([
        {
          name: "Select a company",
          value: "",
        },
        ...companies,
      ]);

      // setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      // setHasMore((filters.skip + filters.limit) < data.data.total);
      // setTotalGames(data.data.total);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
     debounce = setTimeout(() => {
      fetchCompanies();
      fetchUsers();
    }, 300);
  
    return () => clearTimeout(debounce);
  }, [active, filter]);
  
const handleFilterChange = async (e)=>{
  setFilter((prev)=>({...prev, [e.target?.name]: e.target.value}))

}

const handleSubmit =async(id,access)=>{

 
  try {
     

      const { data } = await apiHandler.patch(`/users/${id}`, {access:access} );
     console.log(data);
     
      success(data?.message)
      fetchUsers()
      



      
    } catch (err) {
      error(err.message);
    }

}

  return (
   
   <>
 <div className="space-y-11">
            <div className=" mb-8 mt-10">
              <ActiveButtons
                active={active}
                className={"grid grid-cols-2 gap-4"}
                setActive={setActive}
                buttons={activeButtons}
              />
            </div>
          </div>

          {
            active === 0 &&(

              <>
                <div className="flex gap-6 justify-between items-center mb-6">
        <div className="w-1/4">
          <InputField
            type="select"
            options={companies}
            value={filter?.companyId}
            id="companyId"
            name="companyId"
            handleInputChange={handleFilterChange}

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
            value={filter?.search}
            name="search"
            onChange={handleFilterChange}
          />
        </div>
      </div>
              
{users?.map((item)=>{
  return(
 <UserListingCard user={item} key={item.id} handleSubmit={handleSubmit}/>

  )
  
})}
              
              </>
            )
          }

           


           {
            active === 1 &&(

              <>

              
{users.map((item)=>{
  return(
 <UserListingCard user={item} key={item.id} handleSubmit={handleSubmit}/>

  )
  
})}
              
              </>
            )
          }
   </>
  )
}
 
export default Users