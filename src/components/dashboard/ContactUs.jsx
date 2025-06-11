import React, { useState } from 'react'
import InputField from '../utils/InputFields'
import Buttons from '../utils/buttons'
import DashboardHeader from '../header-footer/dashBoardHeader'

function ContactUs() {
    const [inputDetails, setInputDetails] = useState({})
    const [gameAssets, setGameAssets] = useState(
        [
            {
                value: "Game Assets",
                selected: true,
                name: "Game Assets"
            }
        ]
    )

    const handleInputs = (e) => {
        let a = {
            ...inputDetails,
            [e.target.id]: e.target.value
        }
        setInputDetails(a)
        console.log(a)
    }

    const [inputs, setInputs] = useState(
        [
            {
                type: "text",
                placeholder: "First Name",
                id: "first_name",
            },
            {
                type: "email",
                placeholder: "Email",
                id: "email"
            },
            {
                type: "text",
                placeholder: "Last Name",
                id: "last_name"
            },
            {
                type: "select",
                id: "company",
                options: [
                    {
                        value: "Company",
                        selected: true,
                        name: "Company"
                    }
                ]
            }, {
                type: "textarea",
                id: "comment",
                placeholder: "comment"
            }


        ]
    )
    return (
        <>
            <div className='container'>
                <div className=''>
                    <div className='space-y-7'>
                        <p className='font-medium text-5xl'>Support </p>
                        <div className='space-y-5'>

                        <p className=' text-black-v3 '>Dear</p>
                        <p className=' text-black-v3 '>If you are encountering any difficulties with our products, are unable to locate a specific document or asset, or would like further information about a particular game, please contact us at   <a href="mailto:support@aristocratinteractive.com" className=' font-semibold'>support@aristocratinteractive.com</a> . A member of our team will respond to your inquiry as promptly as possible.</p>
                        <p className=' text-black-v3 '>Thank you</p>
                        <p className=' text-black-v3 '>Use the button below for a quicker way to reach us!</p>
                        </div>

                        <Buttons  className={"flex items-center gap-2"} >
                            <span className=' font-semibold'>support@aristocratinteractive.com</span>
                            <img src={'/logos/email.svg'} alt="" />
                        </Buttons>

                    </div>
                    {/* <div>
                        <div className='space-y-6 mb-10'>
                            {inputs?.map((item) => {
                                return (
                                    <InputField type={item?.type} placeholder={item?.placeholder} id={item?.id} options={item?.options} handleInputChange={handleInputs} />
                                )
                            })}
                        </div>
                        <Buttons big={true}>Send</Buttons>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ContactUs