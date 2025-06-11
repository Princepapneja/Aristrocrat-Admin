import { useEffect, useMemo, useState } from 'react'
import useGlobal from '../../hooks/useGlobal'
import AllTables from './AllTables'
import {  UserPlus } from 'lucide-react'
import timeZone from '../../json/timezone.json'
import clinicianFields from "./cols-json/doctorCols"
import patientInputFieldArr from "./cols-json/patientCols"
import profile from "./cols-json/profileCols"
import {blogs} from "./cols-json/blogs"
import { uploadFile } from '../../services/s3Bucket'
import apiHandler from '../../functions/apiHandler'
import Card from '../utils/card'
import Modal from '../utils/Modal'
import Buttons from '../utils/buttons'
import AddCategory from './blogs/AddCategory'
import ChangePass from '../auth/ChangePass'
import CommonForm from './CommonForm'

const AddForm = ({ type, text }) => {
    const [inputItems, setInputItems] = useState({
        firstName: "",
        dob: "",
        lastName: "",
        email: "",
        licNumber: "",
        gender: "",
        bio: "",

    });
    const { error, success, render, user, setRender } = useGlobal()
    const [disableCta, setDisableCta] = useState(true);
    const [items, setItems] = useState([]);
    const [newAdmin, setNewAdmin] = useState({
        firstName: "",
        dob: "",
        lastName: "",
        email: "",
        gender: "",
        bio: "",

    });


    useEffect(() => {

        setInputItems(null)

        fieldSetUp()
    }, [type, render, user]);


    const fieldSetUp = async () => {
        if (type === "blog") {
            fetchCategories()


        } else if (type === "profile") {
            setItems(profile);
            setInputItems(user)
        } else if (type === "patient") {
            fetchTimeZones();

        }

        else if (type === "clinician") {
            fetchTimeZones();

        }
    }

    function handleInput(event, flag) {

        const { name, type, value, files } = event.target;
        setDisableCta(false);
        if (flag === "admin") {
            setNewAdmin((prevItems) => {
                if (type === 'file') {

                    return {
                        ...prevItems,
                        [name]: files.length > 0 ? files[0] : null,
                    };
                } else {
                    return {
                        ...prevItems,
                        [name]: value,
                    };
                }
            })
            return
        }
        setInputItems((prevItems) => {
            if (type === 'file') {

                return {
                    ...prevItems,
                    [name]: files.length > 0 ? files[0] : null,
                };
            } else {
                return {
                    ...prevItems,
                    [name]: value,
                };
            }
        })
    }

    const handleSubmit = async (e) => {
        setDisableCta(true);
        e.preventDefault();
        let url = "";
        let finalTemp = {};
        let img_url = "";
        let requiredFields
        img_url = inputItems && inputItems.image ? await uploadFile(inputItems.image, type) : "";

        if (type === "blog") {
            requiredFields = ['name', 'description', 'category'];
            if (requiredFields.some(field => !inputItems || !inputItems[field])) {
                error("Please fill all fields");
                return;
            }
            url = "create-blog";

            finalTemp = {
                name: inputItems.name,
                category: inputItems.category,
                description: inputItems.description,
                image: img_url,
                published: inputItems?.published
            };
        } else if (type === "profile") {
            url = "/update"
            finalTemp = { ...inputItems, image: img_url };
            const { data } = await apiHandler.put(url, finalTemp)
            success(data.message);
            return
        }
        else {
            url = "/add-user";
            finalTemp = { ...inputItems, role: type, isVerified: true, image: img_url, access: "full" };
            if (type === "clinician") {
                requiredFields = ['firstName', 'lastName', 'email', 'shiftStart', "shiftEnd"];

                
            } else {
            requiredFields = ['firstName', 'lastName', 'email', "healthID"];
                if (inputItems?.healthID?.length < 12) {
                    error("Health ID must be of 12 characters")
                    return
                }
            }
        }


        try {
            if (requiredFields.some(field => !inputItems || !inputItems[field])) {
                error("Please fill all fields");
                return;
            }
            if(finalTemp?.phone && finalTemp?.phone?.length !== 10) {
                throw new Error("Phone number must be 10 characters");
            }
            const { data } = await apiHandler.post(url, finalTemp);

            success(data.message);
            setInputItems(null);
        } catch (err) {
            error(err.response?.data?.message || err.message || "An error occurred");
        }
    };

    const handleSubmitAdmin = async () => {

            if ( !newAdmin) {
                throw new Error("Please fill the required fields");
            }
            if ( newAdmin?.phone?.length !=10 ) {
                throw new Error("Phone number must be 10 characters");
            }
            const img_url = newAdmin.image ? await uploadFile(newAdmin.image, "admin") : "";

            const newAdminData = {
                ...newAdmin,
                image: img_url
            };

            const { data } = await apiHandler.post("register", newAdminData);

            success(data?.message);

            setRender(!render);
            setItems(profile);
            setNewAdmin(null)
    };

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
        const fields = type==="clinician"? clinicianFields : patientInputFieldArr
        const updatedTimezones = fields?.map(field => {
            if (field.key === "timezone") {
                return {
                    ...field,
                    options: [defaultOption, ...formattedOptions.sort((a, b) => a.gmt.localeCompare(b.gmt))]
                };
            }
            return field;
        });
        setItems(updatedTimezones);
    }

    const fetchCategories = async () => {
        try {
            const { data } = await apiHandler.get("categories");
           

            const formattedCategories = data?.data.map(category => ({
                name: category.title,
                value: category._id
            })) || [];

        const defaultOption = {
                name: "Select one",
                value: "",
                isDisable: true
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
            setItems(updatedBlogs);

        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };


    const handleEditorChange = (event) => {
        setDisableCta(false);

        setInputItems((prevItems) => ({
            ...prevItems,
            description: event,
        }));
    };
const handleFields= ()=>{
    const cols= profile.map(e => {
        if (e.addDisable) {
            return { ...e, addDisable: false };
        }
        return e;
    })
    setItems(cols)
}
    return (
        <>

            <Card title={(type === "profile"
            )

                ? <div className="flex justify-between w-full text-base font-normal" >
                    <span className="font-bold text-xl">{text}</span>
                    {user?.role === "super-admin" ?
                        <div className="flex gap-2">
                            <ChangePass />
                            <Modal openCTA={<Buttons onClick={handleFields} > <span className="md:inline hidden">Add Admin</span> <UserPlus className="md:hidden inline" /> </Buttons>} firstCtaText="Cancel" heading="Add Admin" handleCross={() => { setItems(profile); }} secondCtaText={"Save"} handleSecondCta={handleSubmitAdmin} handleFirstCta={() => { setItems(profile); setNewAdmin(null); }}>
                                <CommonForm className={`special_col flex-col`} inputItems={newAdmin} type={"special_col"} items={items} handleInput={(e) => { handleInput(e, "admin") }} cta={false} />
                            </Modal>
                        </div>
                        :
                        <ChangePass />
                    }
                </div> :
                type === "blog" ?

                    <AddCategory text={text} />
                    :

                    text}>

                <CommonForm className={`${(type==="profile") && "special_col"}`} type={type} items={items} handleEditorChange={handleEditorChange} handleInput={(e) => handleInput(e, "items")} inputItems={inputItems} onSubmit={handleSubmit} ctaDisable={disableCta} />
            </Card>
            <div className='mt-8'>
                {
                    (type === "profile" && user?.role === "super-admin") ? <AllTables type={"admins"} /> : type === "blog" && <AllTables type={"categories"} />
                }
            </div>

        </>
    )
}

export default AddForm
