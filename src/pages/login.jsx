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

const loginInput = [
  {
    label: "Email Address",
    id: "email",
    type: "text",
    placeholder: "Enter your email"
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    placeholder: "Password",
  }
];

const Login = () => {
  const navigate = useNavigate()
  const { success, error, setUser, setMainLoader, disable, setDisable } = useGlobal();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [items, setItems] = useState([])
  const [otpBlock, setOtpBlock] = useState(false)
  const [forgotToken, setForgotToken] = useState("")

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
      console.log(data);
      
      if (data?.data?.admin?.access === "blocked") {
        navigate("/")
        error("Your account has been blocked. Please contact us for more information.")
        return
      }
      
      localStorage.setItem("token", data.data.accessToken);


      setUser(data?.data.admin);
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





  return (
    <>
      <div className={` h-screen     `}>
        <div className="flex  ">
          <div className="w-full bg-[url(/Images/login-back.png)] h-screen p-12  ">
            <img className="w-[431px] h-[348px]" src="/logos/logo-black.png" alt="" />
            <h1
              className="text-black-v1 font-medium text-[56px] not-italic leading-none font-ot-sono pl-9 max-w-[544px] w-full">
                Log in to
              Aristocrat Interactive
              Admin Area
            </h1>

          </div>
          <div className="w-full grid place-items-center ">
            <div className={`p-4 max-w-xl w-full`}




             >

     <h3 className='font-semibold text-2xl not-italic  mb-2'>Log in to Admin Area</h3>


             



                  <div className="py-4 space-y-4">
                    {
                      items?.map((ele, index) => {
                        return <InputField key={index} handleInputChange={handleInput} id={ele?.id}  type={ele.type} value={inputValues?.[ele.id]} placeholder={ele.placeholder} />
                      })
                    }

                          <label className="flex items-start gap-3 px-5 mt-10 mb-10">
                                            <input
                                                type="checkbox"
                                                name="consent"
                                                className="mt-1 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
        checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
        checked:after:flex checked:after:justify-center checked:after:items-center"
                                            />
                                            <span>
                                               Remember Me
                                            </span>
                                        </label>
                    <div className="space-y-6">
                      <Buttons spinner={false} onClick={ 
                        handleLogin
                      } big={true} className={"w-full hover:bg-[black]"}>{ "Log in" }</Buttons>
                      
                    </div>
                  </div>
                      <Link to="/forgot-password" className="capitalize mt-4 underline block cursor-pointer">
                        forgot your password?
                      </Link>


               
            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default Login
