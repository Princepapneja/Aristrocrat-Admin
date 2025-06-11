import { useEffect, useState } from 'react'
import useGlobal from '../hooks/useGlobal'
import { Outlet, useLocation } from 'react-router-dom';
import apiHandler from '../functions/apiHandler';
import SideBar from '../components/header-footer/SideBar';
import DashBoardHeader from '../components/header-footer/dashBoardHeader';
import ChangePass from '../components/auth/ChangePass';
import { useNavigate } from 'react-router-dom';
const DashboardLayout = () => {
  const context = useGlobal()
  const navigate = useNavigate()
  const { height, sideBarOpen, user, setUser, setCounts, token, render } = context


  const fetchDetails = async () => {
    const { data } = await apiHandler.get("me")
    //console.log(data);
    
    if (data?.data?.access === "blocked") {
      localStorage.removeItem("token")
      navigate("/")
    }
    setUser(data.data)
    // navigate("/dashboard")
  }

  const automation = async () => {
    const { data } = await apiHandler.patch("/automation")
  }

  const fetchCounts = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const { data } = await apiHandler.get(`counts/${currentYear}`);
      setCounts(data.data);
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  }

  useEffect(() => {
    automation()
  }, [])

  useEffect(() => {
    if (!token) return;
    fetchDetails()
    fetchCounts()
  }, [token, render])


  const location = useLocation();
  //console.log(location);
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const formattedSegments = pathSegments.map((segment) =>
    segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );

  

const handleNavigate = (index) => {


  const pathTo = "/" + pathSegments.slice(0, index + 1).join("/");
    
    navigate(pathTo);
  };

  return (
    <>
      <div className='flex  bg-background'>
        {/* <SideBar /> */}
        {user?.systemGeneratedPass &&
          <ChangePass initialValue={user?.systemGeneratedPass} />
        }

        <div className='  flex-grow' >
          <DashBoardHeader />

          {/* <div className={`main   space-y-8  overflow-y-auto ${sideBarOpen ? "blur":""} duration-500 `} style={{ height: `calc(100vh - ${174}px)` }}> */}
          <div className='container  '>
            {
              location.pathname === "/dashboard" ? "" : <div className="  mt-20">
                <p className="text-gray-400 font-ot-sono font-normal text-[20px] leading-[24px] tracking-[-0.015em] flex flex-wrap gap-5">
          {formattedSegments.map((segment, index) => (
            <span key={index} className="flex items-center gap-5">
              <span
              onClick={() => {
                    if (index !== formattedSegments.length - 1) {
                      handleNavigate(index);
                    }
                  }}
                className={`${
                  index === formattedSegments.length - 1
                    ? 'text-black font-medium'
                    : 'text-gray-400 cursor-pointer'
                }`}
              >
                {segment}
              </span>
              {index !== formattedSegments.length - 1 && <span className="text-gray-400">&gt;</span>}
            </span>
          ))}
        </p>
              </div>
            }

            <Outlet context={context} />
            {/* </div> */}
          </div>
        </div>
      </div>

    </>
  )
}

export default DashboardLayout