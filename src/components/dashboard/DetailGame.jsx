import React, { useEffect, useRef, useState } from 'react'
import Buttons from '../utils/buttons'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import DashBoardHeader from '../header-footer/dashBoardHeader';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import apiHandler from '../../functions/apiHandler';
import moment from 'moment';
import { dateFormat } from '../../../constants';
import ActiveButtons from '../utils/ActiveButtons';

function DetailGame() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [active, setActive] = useState(0)
    const [volatility,setVolatility]= useState([])
    const [theme,setTheme]= useState([])
    const swiperRef = useRef(null)
    const [dateOption, setDateOption] = useState(
        [
            {
                value: "Date",
                selected: true,
                name: "Date"
            }
        ]
    )

    const [sliderData, setSliderData] = useState([
        {
            img: "/Images/gameimg.png"
        },
        {
            img: "/Images/gameimg.png"
        },
        {
            img: "/Images/gameimg.png"
        },
    ])
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(false);
    const [features,setFeatures]= useState([])

    useEffect(() => {
        fetchGame();
    }, [id]);

    const fetchGame = async () => {
        setLoading(true);
        try {
            const { data } = await apiHandler.get(`/game/${id}`);
            setGame(data?.data);
            debugger
            setVolatility(data?.data?.categories?.filter(q=>q.type==="volatility"))
            setTheme(data?.data?.categories?.filter(q=>q.type==="theme"))
            setFeatures(data?.data?.categories?.filter(q=>q.type==="feature"))

        } catch (error) {
            console.error('Failed to fetch game:', error);
        } finally {
            setLoading(false);
        }
    };

    const buttons= [

        {
            name:"Media Pack"
        },
        {
            name:"Game Sheet"
        },
        {
            name:"Game Rules"
        },
        {
            name:"Certificates"
        },
    ]

    return (
        <>
            <div className=' pt-16'>
                <div className='mt-10'>
                    <div className='flex gap-9'>
                        <div>

                            <h1 className='text-4xl font-medium'>{game?.title}</h1>
                            <p className='mt-2 mb-4'>By: {game?.studio?.name}</p>

                            <div className='space-y-6'>
                                <p className='text-lg text-black-v3 max-w-[650px] w-full'>{game?.description}
                                </p>


                            </div>
                        </div>

                        <div>
                            <div className='relative'>
                                <img src={"/Images/templateDetailpage.png"} alt="" className=' w-[626px] h-[440px]' />
                                <Swiper
                                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                    modules={[Pagination, Autoplay]}
                                    loop={true}
                                    autoplay
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    className='h-[384px] w-[540px] absolute top-[-413px] left-0'
                                >
                                    {sliderData.map((slide) => {
                                        return (
                                            <SwiperSlide>
                                                <img src={slide.img} className='h-full w-full object-cover' />
                                            </SwiperSlide>
                                        )
                                    })}

                                </Swiper>
                                <div className="flex justify-center space-x-2 mt-4 absolute top-[377px] left-[250px] z-10">
                                    {sliderData.map((_, index) => {
                                        return (

                                            <button
                                                key={index}
                                                onClick={() => swiperRef.current?.slideToLoop(index)}
                                                className={`w-2.5 h-2.5 rounded-full ${activeIndex === index ? 'w-20 h-2.5 rounded-xl bg-primary-dark' : 'bg-black-v4'
                                                    }`}
                                            ></button>
                                        )
                                    })}
                                </div>
                                <img src={"/Images/frog.png"} alt="" className='absolute w-[170px] h-[164px] top-[297px] right-[-43px] z-50 ' />
                                <div className=''>
                                    <Buttons>Play Game</Buttons>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>



                <div className='mt-14'>
                    <div className='bg-black rounded-3xl'>
                        <div className='flex pt-11 pb-9 ml-12 gap-20 max-w-[1354px] w-full'>
                            <div>
                                <p className='font-semibold text-3xl text-white mb-1.5'>{game?.categories?.find(q=>q.type==="gameType")?.title}</p>
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Game Type</p></div>

                            <div>
                                <p className='font-semibold text-3xl text-white mb-1.5'>{game?.paylines} Paylines</p>
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Lines / Ways</p>
                            </div>

                            <div>
                                <p className='font-semibold text-3xl text-white mb-1.5'>{game?.reelType}</p>
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Reel Type</p>
                            </div>

                            <div>
                                <div className='border-2 text-white p-4 border-black-v3 rounded-lg' >
                                    <h6>Release Date</h6>
                                    {moment(game?.releaseDate).format(dateFormat)}
                                </div>
                            </div>

                            <div>
                                <img src={"/Images/platform.png"} alt="" className='w-32 h-10 mb-1.5' />
                                <p className='font-semibold text-xl text-black-v4 leading-[36px]'>Platform</p>
                            </div>

                        </div>


                    </div>
                </div>


                <div className='mt-20'>
                    <div className='grid grid-cols-4'>
                        <div>
                            <p className='text-xl text-black-v3 mb-5'>Bet Values</p>
                            <p className='text-xl font-semibold'>Min – € {game?.min}</p>
                            <p className='text-xl font-semibold'>Max – €  {game?.max}</p>
                            <p className='mt-20 text-xl text-black-v3 '>Max Exposure</p>
                            <p className='text-xl font-semibold mt-5'>{game?.maxExposure}</p>
                            <p className='text-xl text-black-v3 mt-20 mb-5 '>Free Spins Symbols</p>
                            <p className='text-xl font-semibold'>
                                {
                                    game?.freeSpins ? "YES": "NO"
                                }
                                </p>
                        </div>
                        <div>
                            <div>
                            <p className='text-xl text-black-v3 mb-5'>Volatility:</p>
                            {
                                volatility?.map((e)=>{
                            return <p key={e.id} className='text-xl font-semibold'>{e.title}</p>

                                })
                            }
                            
                            </div>
                            <div>

                            <p className='mt-20 text-xl text-black-v3 '>Game Theme</p>
                            <p className="text-xl mt-5 mb-20 font-semibold">
  {theme?.map((e) => e.title).join(', ')}
</p>

                            </div>

                            <div className='font-semibold text-black flex gap-3.5 items-center bg-primary rounded-xl px-5 py-2.5 max-w-[147px] w-full'>
                                <p>Game Key</p>
                                <img className='h-4 w-4 ' src={"/logos/filterarrowBlack.png"} alt="" />
                            </div>

                        </div>


                        <div>
                            <p className='text-xl text-black-v3 mb-5'>RTP</p>
                            <p className='text-xl font-semibold'>Var_99     96.66%</p>
                            <p className='text-xl font-semibold'>Var_99     96.66%</p>
                            <p className='text-xl font-semibold'>Var_99     96.66%</p>
                            <p className='text-xl font-semibold'>Var_99     96.66%</p>
                            <p className='text-xl text-black-v3 mt-20 mb-6'>RTP  USA</p>
                            <p className='text-xl font-semibold'>Var_99     96.66%</p>
                            <p className='text-xl font-semibold'>Var_99     96.66%</p>
                            <p className='text-xl font-semibold'>Var_99     96.66%</p>
                            <p className='text-xl font-semibold'>Var_99     96.66%</p>
                        </div>

                        <div>
                        <p className='text-xl text-black-v3 mb-4'>Special Features</p>

                            {
                                features?.map((feature)=>{
                                    return (
                                        <p key={feature.id} className='text-xl font-semibold'>{feature?.title}</p>
                                    )

                                })
                            }
                          

                        </div>

                    </div>
                </div>


                <div className='bg-white-v2 rounded-3xl mt-24 space-y-7 py-12 px-8'>
                    <h1 className='font-medium text-4xl  text-center'>Download all necessary assets and certificates below</h1>
                    <div className=''>

                    {
                        <ActiveButtons active={active} setActive={setActive} buttons={buttons} />
                    }
                      
                    </div>

                        <div className='flex justify-end gap-7 bg-white  rounded-lg  py-10'>
                            <Buttons type='download' name='Download Selected'></Buttons>
                            <Buttons type='download' name='Download All'></Buttons>
                        </div>
                        {

                        }
                </div>
            </div>

        </>
    )
}

export default DetailGame