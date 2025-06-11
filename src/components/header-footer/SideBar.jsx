import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useGlobal from '../../hooks/useGlobal';
import { 
    Home, 
    CalendarCheck, 
    BadgeCheck, 
    ListOrdered, 
    Map, 
    Puzzle, 
    Phone, 
    LogOut, 
    ChevronDown 
} from "lucide-react";

const SideBar = () => {
    const [open, setOpen] = useState(null); 
    const { sideBarOpen, setSideBarOpen, height, navigate } = useGlobal();
    const location = useLocation(); 

    const menu = [
        {
            name: "Home",
            icon: <Home />,
            href: "/dashboard"
        },
        {
            name: "Games",
            icon: <CalendarCheck />,
            href: "/dashboard/games"
        },
        {
            name: "Certificates",
            icon: <BadgeCheck />,
            href: "/dashboard/certificates"
        },
        {
            name: "Master Game List",
            icon: <ListOrdered />,
            href: "/dashboard/master-game-list"
        },
        {
            name: "Roadmaps",
            icon: <Map />,
            href: "/dashboard/roadmaps"
        },
        {
            name: "Engagement Tools",
            icon: <Puzzle />,
            href: "/dashboard/engagement-tools"
        },
        {
            name: "Support",
            icon: <Phone />,
            href: "/dashboard/support"
        },
        {
            name: "Logout",
            icon: <LogOut />,
            type: "button"
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <>
            <aside
                style={{ top: `${height}px`, height: `calc(100vh - ${height}px)`, minWidth: '230px' }}
                className={`fixed ${sideBarOpen ? "left-0" : "-left-full"} bg-[url(/Images/sidebar.png)] z-10 duration-500 md:static md:!h-screen grid items-stretch bg-white p-4 shadow-lg`}
            >
                <div>
                    <div className='grid place-items-center'>
                        <img src={"/logos/logo-black.png"} alt="Logo" className='w-36' />
                    </div>

                    <div className='mt-4 md:mt-8 overflow-y-auto h-[calc(100vh-140px)] space-y-2'>
                        {menu.map((item, index) => {
                            const isActive = location.pathname === item.href;

                            if (item.type === "button") {
                                return (
                                    <button
                                        key={index}
                                        onClick={handleLogout}
                                        className={`capitalize w-full text-left whitespace-nowrap duration-300 ${isActive ? 'text-white-v1 bg-black' : 'text-black'} rounded-xl font-semibold hover:text-white-v1 hover:bg-black p-4 flex items-center gap-2`}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </button>
                                );
                            }

                            return (
                                <div key={index}>
                                    <Link
                                        to={item.href}
                                        onClick={() => { 
                                            setOpen(open === index ? null : index); 
                                            setSideBarOpen(false); 
                                        }}
                                        className={`capitalize block no-underline whitespace-nowrap duration-300 ${isActive ? 'text-white-v1 bg-black' : 'text-black'} rounded-xl font-semibold hover:text-white-v1 hover:bg-black p-4`}
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div className='flex gap-2 items-center'>
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </div>
                                            {item.subMenu && (
                                                <ChevronDown
                                                    className={`w-5 duration-300 ${open === index ? 'rotate-0' : '-rotate-90'}`}
                                                />
                                            )}
                                        </div>
                                    </Link>

                                    {item.subMenu && open === index && (
                                        <div className='grid mt-2'>
                                            {item.subMenu.map((sub, i) => (
                                                <Link
                                                    to={sub.href}
                                                    onClick={() => setSideBarOpen(false)}
                                                    key={i}
                                                    className={`capitalize no-underline rounded-lg py-3 px-2 flex gap-2 pl-5 items-center ${location.pathname === sub.href ? 'hover:text-white-v1 hover:bg-black' : 'text-desc'}`}
                                                >
                                                    {sub.icon}
                                                    <span className='whitespace-nowrap'>{sub.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
