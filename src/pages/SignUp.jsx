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
import SucessLogReg from "../components/utils/SucessLogReg";

const loginInput = [
    {
        label: "Email Address",
        id: "email",
        type: "text",
        placeholder: "Email Addressl"
    },
    {
        label: "Company",
        id: "company",
        type: "select",
        placeholder: "Company",
    },
    {
        label: "Role",
        id: "role",
        type: "text",
        placeholder: "Role",
    },
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
];

const SignUp = () => {
    const navigate = useNavigate()
    const { success, error, setUser, setMainLoader, disable, setDisable } = useGlobal();
    const [inputValues, setInputValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        ConfirmPassword: "",
        role: "",
        company: ""

    });
    const [items, setItems] = useState([])
    const [otpBlock, setOtpBlock] = useState(false)
    const [forgotToken, setForgotToken] = useState("")
    const [companyList, setCompanyList] = useState([])
const [registrationSuccess, setRegistrationSuccess] = useState(false);

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

const data= {
    head:"Your registration was successful!",
    content:"Your account is currently under review. Once approved, you'll receive an email confirming your access."

}

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


    console.log(companyList);

    const fetchCompany = async () => {
        try {
            const { data } = await apiHandler.get(`/companies`);

            console.log(data);

            setCompanyList(data.data)


        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    };
    useEffect(() => {
        fetchCompany();
    }, []);



    const handleRegister = async () => {


        const {
            email,
            company,
            password,
            Confirmpassword,
            firstName,
            lastName,
        } = inputValues;

        //   if (!email || !company ||  !password || !Confirmpassword ||   firstName ||  lastName) {
        //     error("Please fill in all required fields.");
        //     return;
        //   }

        //   if (!validateEmail(email)) {
        //     error("Please enter a valid email address.");
        //     return;
        //   }

        //   if (Createpassword !== Confirmpassword) {
        //     error("Password and Confirm Password do not match.");
        //     return;
        //   }
        const payload = {
            firstName: inputValues?.firstName,
            lastName: inputValues?.lastName,
            email: inputValues?.email,
            companyId: Number(inputValues?.company),
            role: inputValues?.role,
            password: inputValues?.password,
        };




        try {
            setMainLoader(true);
            const { data } = await apiHandler.post("/register", payload);
            console.log(data);

            success(data.message);
            success(data.message);

            setInputValues({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                ConfirmPassword: "",
                role: "",
                company: ""
            });

            setRegistrationSuccess(true);



        } catch (err) {
            console.error("Registration error:", err);
            error(err.message || "Failed to register.");
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
                            className="text-black-v1 font-medium text-[56px] not-italic leading-none font-ot-sono pl-9 max-w-[600px] w-full">
                            Weclome to the Aristocrat Interactive Client Area
                        </h1>

                    </div>
                    <div className="w-full grid place-items-center ">

                        {registrationSuccess ? <SucessLogReg data={data} /> :
                            <div className={`p-4 max-w-xl w-full`}




                            >

                                <h3 className='font-semibold text-2xl not-italic  mb-2'>Create an account</h3>





                                <div className="py-4 space-y-4">

                                    <div className="flex gap-4">
                                        <InputField
                                            handleInputChange={handleInput}
                                            id="firstName"
                                            type="text"
                                            value={inputValues.firstName}
                                            placeholder="Enter your first name"
                                        />
                                        <InputField
                                            handleInputChange={handleInput}
                                            id="lastName"
                                            type="text"
                                            value={inputValues.lastName}
                                            placeholder="Enter your last name"
                                        />
                                    </div>

                                    {
                                        items?.map((ele, index) => {
                                            return <InputField key={index} handleInputChange={handleInput} id={ele?.id} options={companyList} type={ele.type} value={inputValues?.[ele.id]} placeholder={ele.placeholder} />
                                        })
                                    }

                                    <div className="space-y-4 text-sm text-gray-700 leading-[24px] ">
                                        <label className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                name="consent"
                                                className="mt-1 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
        checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
        checked:after:flex checked:after:justify-center checked:after:items-center"
                                            />
                                            <span>
                                                I consent to the processing of my personal data for the purpose <br />of entering the Client Area as described in the{' '}
                                                <a href="#" className="underline font-medium text-gray-900">
                                                    Privacy Policy.
                                                </a>
                                            </span>
                                        </label>

                                        <label className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                name="marketing"
                                                className="mt-1 border border-[#A8A8A8] w-5 h-5 bg-white checked:bg-[#00B290] appearance-none
        checked:after:content-['✓'] checked:after:text-white checked:after:text-sm checked:after:font-bold
        checked:after:flex checked:after:justify-center checked:after:items-center"
                                            />
                                            <div className="space-y-1">
                                                <p>I consent to receive marketing communications.</p>
                                                <p className="font-semibold">Opt-out is available anytime.</p>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="space-y-6">
                                        <Buttons spinner={false} onClick={
                                            handleRegister
                                        } big={true} className={"w-full hover:bg-[black]"}>{"Register"}</Buttons>
                                        {/* <Buttons spinner={false} onClick={ handleLogin } big={true} type="border" className={"w-full"}>{ "Create an Account" }</Buttons> */}

                                    </div>
                                    <p className="flex items-center gap-2"><span>Already have an account?</span>  <Link to="/" className="capitalize  underline block cursor-pointer">
                                        Login
                                    </Link></p>


                                </div>




                            </div>}

                    </div>

                </div>


            </div>
        </>
    )
}

export default SignUp
