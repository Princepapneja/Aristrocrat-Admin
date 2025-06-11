import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import bgImg from '../../assets/adminAssets/Mask group.png';
import logo from '../../assets/adminAssets/Aristocrat-Interactive-Black-RGB-Logo 1.png';

function DashBoardHeader() {
  const location = useLocation();

 const tabs = [
    { label: 'Games', path: '/dashboard/games' },
    { label: 'Assets & Documents', path: '/dashboard/assets-documents' },
    { label: 'Users', path: '/dashboard/users' },
  ];

  const shouldShowTabs = location.pathname.startsWith("/dashboard") && location.pathname !== "/dashboard";


  return (
    <header
      className="w-full relative bg-cover bg-center header"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="flex justify-center items-center w-full p-12">
        <img
          src={logo}
          alt="Logo"
          className="object-contain"
        />
      </div>

      {shouldShowTabs && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full px-4">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-2 ">
            {tabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `w-full md:w-[400px] text-center font-semibold py-2 rounded-t-md  ${
                    isActive ? 'bg-white text-black' : 'bg-black text-white'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default DashBoardHeader;