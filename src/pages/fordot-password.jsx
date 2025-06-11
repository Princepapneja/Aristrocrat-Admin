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

const resetPass = [

  {
    id: "newPassword",
    label: "password",
    type: "password",
    placeholder: "Enter new password",
  },
];

const Login = ({ type }) => {
  const navigate = useNavigate()
  const { success, error, setUser, setMainLoader, disable, setDisable } = useGlobal();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    emailForReset: "",
    newPassword: "",
    otp: ""
  });
  const [items, setItems] = useState([])
  const [otpBlock, setOtpBlock] = useState(false)
  const [page, setPage] = useState(type)
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
    if (type === "login") {
      setItems(loginInput)
      setPage("login")
    } else {
      setPage("resetPass")
      setItems(resetPass);
    }
    const token = localStorage.getItem('token')
    token && navigate("/dashboard");
    setMainLoader(false)

  }, [type])

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


  const handleOtpVerify = async () => {
    setDisable(true)
    try {
      if (!inputValues || !inputValues.emailForReset || !inputValues.otp) {
        throw new Error("Email and Otp is required to reset the password");
      }
      const { data } = await apiHandler.post("otp-verify", { email: inputValues?.emailForReset, otp: inputValues?.otp })
      success(data.message);
      setForgotToken(data?.data)


    } catch (err) {
      console.error("Error during password reset:", err);
      error(err.message || "An error occurred during password reset");
    }
    setDisable(false)

  };
  const handleResetPassword = async () => {
    setDisable(true)
    try {
      if (!inputValues || !inputValues.emailForReset) {
        throw new Error("Email is required to reset the password");
      }

      const { data } = await apiHandler.post("/otp", { email: inputValues.emailForReset, type: "forgot" });
      success(data.message);
      setOtpBlock(true)

    } catch (err) {
      console.error("Error during password reset:", err);
      error(err.response?.data?.message || err.message || "An error occurred during password reset");
    }
    setDisable(false)

  };
  const handlePassword = async () => {
    const finalTemp = {
      password: inputValues?.newPassword,
      email: inputValues?.emailForReset
    }

    try {
      if (!finalTemp || !finalTemp.email || !finalTemp.password) {
        throw new Error("Email is required to reset the password");
      }

      const { data } = await apiHandler.put("forgot-password", finalTemp, {
        headers: {
          'x-token': forgotToken,

        }
      })


      success(data.message);
      setForgotToken("")
      navigate("/")

    } catch (err) {
      console.error("Error during password reset:", err);
      error(err.response?.data?.message || err.message || "An error occurred during password reset");
    }
    setDisable(false)

  }




  return (
    <>
      <div className={` h-screen  justify-center   `}>
        <div className="flex  ">
          <div className="w-full bg-[url(/Images/login-back.png)] h-screen p-12 ">
            <img className="w-[431px] h-[348px]" src="/logos/logo-black.png" alt="" />
            <h1
              class="text-black-v1 font-medium text-[56px] not-italic leading-none font-ot-sono pl-9 max-w-[544px] w-full">
              Log in to
              Aristocrat Interactive
              Client Area
            </h1>

          </div>
          <div className="w-full grid place-items-center ">
            <div className={`p-4 max-w-xl w-full`}




             >

                <h3 className='font-semibold text-2xl not-italic  mb-2'>Log in to Our Client Area</h3>

             


              {(type === "login" || forgotToken) ?
                <>

                  <div className="py-4 space-y-4">
                    {
                      items?.map((ele, index) => {
                        return <InputField key={index} handleInputChange={handleInput} id={ele?.id} label={ele.label} type={ele.type} value={inputValues?.[ele.id]} placeholder={ele.placeholder} />
                      })
                    }
                    <div>
                      <Buttons spinner={false} onClick={type === "login" ? handleLogin : handlePassword} big={true} className={"w-full"}>{type === "login" ? "Sign in" : "Update"}</Buttons>
                      
                    </div>
                  </div>
                  {
                    !forgotToken && <div className="flex justify-center">
                      <Link to="/forgot-password" className="capitalize underline block cursor-pointer">
                        forgot password
                      </Link>

                    </div>
                  }

                </>
                :
                <div className="space-y-2">

                  <InputField placeholder="Enter your mail here" label="Email" value={inputValues?.emailForReset} id="emailForReset" type="email" handleInputChange={handleInput} />
                  <button onClick={handleResetPassword} disabled=
                    {disable} className={`text-sm cursor-pointer text-primary font-bold underline mr=-0  block ml-auto`}>{otpBlock ? "Re-send OTP" : "Send OTP"}</button>
                  {
                    otpBlock && <div className="grid place-items-center gap-4">
                      <OtpInput length={6} onChange={(otp) => setInputValues((prev) => ({ ...prev, otp }))} />
                      <Buttons className={"w-full py-2"} onClick={handleOtpVerify}>
                        Verify OTP
                      </Buttons>
                    </div>
                  }
                </div>
              }
            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default Login
