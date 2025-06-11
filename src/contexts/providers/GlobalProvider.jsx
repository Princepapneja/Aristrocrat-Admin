import { useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import LoadingBar from 'react-top-loading-bar';
// import { useHistory } from 'react-router-dom';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiHandler from "../../utils/apiHandler";
const GlobalProvider = ({ children }) => {
  const [height, setHeight] = useState(0);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [questionsData, setQuestionsData] = useState([])
  const [blogsData, setBlogsData] = useState([])
  const [massHealthData, setMassHealthData] = useState([])
  const [metricSurveyData, setMetricSurveyData] = useState([])
  const [moodSurveyData, setMoodSurveyData] = useState([])
  const [doctors, setDoctors] = useState([])
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({});
  const success = (msg) => toast.success(msg, {
    position: "bottom-right",
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
    position: "bottom-right",
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
    const fetchNavHeight = () => {
      const navElement = document.querySelector(".nav");
      if (navElement) {
        setHeight(navElement.scrollHeight);
      }

    };
    fetchNavHeight();
    fetchUsers()
  }, []);

  const fetchUsers = (async () => {
    const { data } = await apiHandler.get("admin/all-users")
    setAllUsers(data?.data)
    setPatients(data?.data?.filter((user) => (user?.role === "patient")))
    setDoctors(data?.data?.filter((user) => (user?.role === "doctor")))
    setAppointments(data?.data?.filter((user) => (user?.role === "appointment")))
    setQuestionsData(data?.data?.filter((user) => (user?.role === "question")))
    setBlogsData(data?.data?.filter((user) => (user?.role === "blog")))
    setMassHealthData(data?.data?.filter((user) => (user?.role === "mass health")))
    setMetricSurveyData(data?.data?.filter((user) => (user?.role === "metric survey")))
    setMoodSurveyData(data?.data?.filter((user) => (user?.role === "mood survey")))
  })



  return (
    <>
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
      <GlobalContext.Provider value={{user, setUser, height,allUsers,doctors,patients,appointments,questionsData,blogsData,massHealthData,metricSurveyData,moodSurveyData, success, error, progress, setProgress, sideBarOpen, setSideBarOpen }}>
        {children}
      </GlobalContext.Provider>
    </>
  );
};

export default GlobalProvider;
