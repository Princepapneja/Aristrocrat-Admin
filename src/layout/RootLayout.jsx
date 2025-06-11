
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar';
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/utils/loader';
const RootLayout = () => {
  const navigate = useNavigate()
  const [height, setHeight] = useState(0);
  const [token, setToken] = useState(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [counts, setCounts] = useState()
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [disable, setDisable] = useState(false)
  const [render, setRender] = useState(false)
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [mainLoader, setMainLoader] = useState(false)
  const success = (msg) => toast.success(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
  const error = (msg) => toast.error(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  useEffect(() => {

    const locToken = localStorage.getItem('token')
    if (!locToken) {
      return
    }
    setToken(locToken)

    
  }, [mainLoader]);

  
  const navElement = document.querySelector(".nav");
  const fetchNavHeight = () => {
    if (navElement) {
      setHeight(navElement.scrollHeight);
    }

  };
 useEffect(()=>{
  fetchNavHeight()
 },[navElement])

  return (
    <>
      {/* <Header/> */}
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce />
      <LoadingBar
        color="#007bff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {
        mainLoader &&
        <Loader />
      }
      <main className="">
        <Outlet context={{ disable, setDisable, availableQuestions, setAvailableQuestions, mainLoader, setMainLoader, user, counts, setCounts, navigate, token, setToken, setUser, render, setRender, height, success, error, progress, setProgress, sideBarOpen, setSideBarOpen }} />
      </main>
      {/* <Footer/> */}
    </>
  )
}

export default RootLayout;