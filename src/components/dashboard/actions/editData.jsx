import { useEffect, useState } from 'react';
import Modal from '../../utils/Modal';
import { Edit, Pencil } from 'lucide-react';
import InputField from '../../utils/InputFields';
// import blogs from './cols-json/blogsCols.json';
import clinician from '../cols-json/doctorCols';
import patient from '../cols-json/patientCols';
import useGlobal from '../../../hooks/useGlobal';
import { appointment } from '../cols-json/appointmentsCols';
import categories from '../cols-json/categories.json'
import profile from '../cols-json/profileCols'
import timeZone from "../../../json/timezone.json"
import { blogs } from '../cols-json/blogs';
import apiHandler from '../../../functions/apiHandler';
import { uploadFile } from '../../../services/s3Bucket';

const EditData = ({ type, data }) => {
    const [inputItems, setInputItems] = useState(data);
    const [isCtaDisable, setIsCtaDisable] = useState(true);
    const { success, error, render, setRender } = useGlobal();
    const [columns, setColumns] = useState([])
    function handleEditInput(event) {
        const { name, type, value, files, checked } = event.target;
        setInputItems((prevItems) => {
            let newValue;

            if (type === 'file') {
                newValue = files.length > 0 ? files[0] : null;
            } else if (type === 'checkbox') {
                newValue = checked;
            } else {
                newValue = value;
            }

            return {
                ...prevItems,
                [name]: newValue,
            };
        });

        setIsCtaDisable(false);
    }

    const handleSubmit = async () => {
        let url = "";
        let finalTemp = { ...inputItems };
        if (type === "blog") {
            url = `blogs/${inputItems?._id}`;
        }
        else if(type==="categories"){
            url = `categories/${inputItems?._id}`;
        }
        else {
            url = `user/${type}/${inputItems?._id}`;
        }

        // try {
            if(finalTemp?.phone && finalTemp?.phone?.length !== 10 ) {
                throw new Error("Phone number must be 10 characters");
            }
            if(finalTemp?.healthID?.length <12 && type === "patient" ) {
                throw new Error("Health ID at least of 12 characters");
            }

            if (finalTemp?.image && typeof finalTemp.image !== "string") {
                finalTemp.image = await uploadFile(finalTemp.image, type);
            }
            // if (type === "clinician") {
            //     finalTemp["shiftStart"] = convertTimeSlot(finalTemp?.shiftStart);
            //     finalTemp["shiftEnd"] = convertTimeSlot(finalTemp?.shiftEnd);
            // }
          
            const { data } = await apiHandler.put(url, finalTemp);
            setRender(!render);
            success(data.message);
            setInputItems({});
        // } catch (err) {
        //     error(err.message);
        // }
    };

    const handleEditorChange = (event) => {
        setInputItems((prevItems) => ({
            ...prevItems,
            description: event,
        }));
        setIsCtaDisable(false);
    };

    //   fetch timezone
    const fetchTimeZones = () => {
        const formattedOptions = timeZone?.map(option => ({
            name: option?.zone + " " + option?.gmt,
            value: option?.zone,
            gmt: option?.gmt
        })) || [];

        const defaultOption = {
            name: "Select one",
            value: "",
            disable: true
        };
        const fields = type==="clinician"? clinician : patient
        const updatedTimezones = fields.map(col => {
            if (col?.key === "timezone") {
                return {
                    ...col,
                    options: [defaultOption, ...formattedOptions.sort((a, b) => a.gmt.localeCompare(b.gmt))]
                };
            }
            return col;
        });
        setColumns(updatedTimezones);
    }
    const fetchCategories = async () => {
        try {
            const { data } = await apiHandler.get("categories");

            const formattedCategories = data?.data?.map(category => ({
                name: category.title,
                value: category._id
            })) || [];

            const defaultOption = {
                name: "Select one",
                value: "",
                disable: true
            };

            const updatedBlogs = blogs.map(blog => {
                if (blog.key === "category") {
                    return {
                        ...blog,
                        options: [defaultOption, ...formattedCategories]
                    };
                }
                return blog;
            });

            setColumns(updatedBlogs);

        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fieldSetup()
    }, [type])


    const fieldSetup = () => {
        if (type === "blog") {
            fetchCategories();
        } else if (type === "clinician") {
            fetchTimeZones();
        } else if (type === "appointment") {
            setColumns(appointment)
        } else if (type === "admin") {
            setColumns(profile)

        } else if (type === "categories") {
            setColumns(categories)

        } else {
            fetchTimeZones();
        }
    }

    return (
        <>
            <Modal
                openCTA={<span title="Edit"><Pencil className='w-5 text-blue-500' /></span>}
                heading={"Edit Details"}
                firstCtaText={"Close"}
                secondCtaText={"Save"}
                handleSecondCta={handleSubmit}
                disableCTA={isCtaDisable ? "secondCta" : ""}
                className={`${type === "blog" && "md:max-w-[70%] "}`}
            >
                <div>
                    <div className={`grid gap-4  ${type==="blog" ? "md:grid-cols-2 xl:grid-cols-3":"md:grid-cols-2 "} grow mt-4 overflow-auto max-h-[400px] }`}>
                        {columns?.map((data, i) => {
                            const { key, key2, heading, hidden, disable, placeholder, options, value } = data
                            if (hidden) {
                                return null;
                            } else if (data?.type === "file") {
                                const id = Date.now()
                                return (
                                    <div className={`${type==="blog"?"md:col-span-2 xl:col-span-3" : "md:col-span-2"} grid place-items-center `} key={i}>
                                        <span className='relative'>
                                            <input
                                                type='file'
                                                className='hidden'
                                                name='image'
                                                id={id}
                                                onChange={handleEditInput}
                                                accept="image/*"
                                            />
                                            <label htmlFor={id} className='bg-background w-32 block'>
                                               
                                                <img
                                                    className='w-32 h-32 object-cover'
                                                    src={inputItems?.image
                                                        ? (typeof inputItems.image === "string"
                                                            ? inputItems.image
                                                            : URL.createObjectURL(inputItems.image))
                                                        : type === "categories"
                                                            ? "/logos/TCFWC.png"
                                                            : "/Images/persona.avif"}

                                                    alt=''

                                                />
                                                <div className='absolute top-0 right-0 w-5 bg-white backdrop-blur-3xl  '>
                                                    <Edit className='w-5 text-black' />
                                                </div>
                                            </label>
                                        </span>
                                    </div>
                                );
                            } else {
                                return (
                                    <InputField
                                        className={`${(data?.type === "textarea" || data?.type === "textEditor") && (type === "blog" ? "" : "xl:!col-span-2")} ${i % 2 !== 0 && "last:col-span-2"}`}
                                        key={i}
                                        value={key2 ? inputItems?.[key]?.[key2] : inputItems?.[key]}
                                        label={heading}
                                        id={key}
                                        checked={inputItems?.[key] === value}
                                        handleInputChange={handleEditInput}
                                        handleEditorChange={handleEditorChange}
                                        isDisable={disable}
                                        type={data?.type}
                                        required={data?.required}
                                        max={data?.max}
                                        min={data?.min}
                                        prefix={data?.prefix}
                                        placeholder={placeholder}
                                        options={options}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditData;
