import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Card from "../components/utils/card"
import apiHandler from "../functions/apiHandler";
import { ArrowLeft } from "lucide-react";
import InputField from "../components/utils/InputFields";
import Buttons from "../components/utils/buttons";
import OtpInput from "../components/utils/OTP";
import useGlobal from "../hooks/useGlobal";
import { validateEmail } from "../functions/emailValidator";
import SucessLogReg  from "../components/utils/SucessLogReg";

const loginInput = [
  {
    label: "Email Address",
    id: "email",
    type: "text",
    placeholder: "Enter your email"
  },
  

];

const newPassField=[
  {
        label: "Create Password",
        id: "password",
        type: "password",
        placeholder: "Create Password",
    },
    {
        label: "Confirm Password",
        id: "ConfirmPassword",
        type: "password",
        placeholder: "Confirm Password",
    }
]

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { success, error, setUser, setMainLoader, disable, setDisable } = useGlobal();
  const [inputValues, setInputValues] = useState(null);
  const [items, setItems] = useState([])
  const [otpBlock, setOtpBlock] = useState(false)
  const [forgotToken, setForgotToken] = useState("")
const [newPassword,setNewPassword]=useState(true)
const [resend, setResend] = useState(false);
const [showBtn,setShowBtn]=useState(false)
  function handleInput(event) {

    setInputValues((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }

  useEffect(() => {
    setMainLoader(true)
    setItems(loginInput)
    const token = localStorage.getItem('token')
    token && navigate("/dashboard");
    setMainLoader(false)

  }, [])

  const handleLogin = async () => {

    const { email, password } = inputValues;

    if (!email || !password) {
      error("Both email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      error("Please enter a valid email address.");
      return;
    }

    try {
      setMainLoader(true);

      const { data } = await apiHandler.post("/login", inputValues);
      if (data?.data?.access === "blocked") {
        navigate("/")
        error("Your account has been blocked. Please contact us for more information.")
        return
      }
      localStorage.setItem("token", data.data.accessToken);


      setUser(data.admin);
      setInputValues(null)
      success(data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during login:", err);
      error(err.message);
    } finally {
      setMainLoader(false);
    }
  };


const data= {
    head:"Your password reset request has been received. Please check your inbox for instructions to reset your password. ",
    content:"Haven't recevied an email yet?"

}


  return (
    <>
      <div className={` h-screen     `}>
        <div className="flex  ">
          <div className="w-full bg-[url(/Images/login-back.png)] h-screen p-12  ">
            <img className="w-[431px] h-[348px]" src="/logos/logo-black.png" alt="" />
            <h1
              className="text-black-v1 font-medium text-[56px] not-italic leading-none font-ot-sono pl-9 max-w-[544px] w-full">
            {newPassword && resend ? "Enter Your Username or Email Address": newPassword?"Change Password":"Reset Your Password"} 
            </h1>

          </div>
          <div className="w-full grid place-items-center ">
             {resend ? <SucessLogReg data={data} resend={resend} showBtn={showBtn}/> :
                             <div className={`p-4 max-w-xl w-full`}




            >
              

              <h3 className='font-semibold text-2xl not-italic  mb-3'>{newPassword?"Create New Password" :"Forgot Your Password?"}</h3>
              <p className="text-lg text-gray-600 mb-6 font-normal">
         {!newPassword? "Please enter your email address. You will receive an email with instructions on how to reset your password.":""} 
        </p>





              <div className="py-4 space-y-4">
                {
                 newPassword && newPassField?.map((ele, index) => {
                    return <InputField key={index} handleInputChange={handleInput} id={ele?.id} type={ele.type} value={inputValues?.[ele.id]} placeholder={ele.placeholder} />
                  })
                }
                {
                 !newPassword && items?.map((ele, index) => {
                    return <InputField key={index} handleInputChange={handleInput} id={ele?.id} type={ele.type} value={inputValues?.[ele.id]} placeholder={ele.placeholder} />
                  })
                }


                <div className="space-y-6">
                  <Buttons spinner={false} onClick={
                    handleLogin
                  } big={true} className={"w-full mt-6 hover:bg-[black]"}>{newPassword?"Change Password":"Get New Password"}</Buttons>

                </div>
              </div>

              {/* <div className="mt-6 mb-6 flex justify-start text-base text-gray-500 space-x-4">
                <Link to="/" className=" cursor-pointer">Login</Link>
                <span>|</span>
                <Link to="/sign-up" className=" cursor-pointer">Register</Link>

              </div> */}

              <Link
                to="/"
                className=" text-sm text-gray-600 w-full hover:underline cursor-pointer"
              >
                <span className="mr-1">←</span> Back to Aristocrat Interactive
              </Link>



            </div>}
          </div>

        </div>


      </div>
    </>
  )
}

export default ForgotPassword
