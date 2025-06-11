import Modal from '../utils/Modal';
import Buttons from '../utils/buttons';
import InputField from '../utils/InputFields';
import { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import useGlobal from '../../hooks/useGlobal';
import apiHandler from '../../functions/apiHandler';

const changePasswordInput = [
    {
        label: "Password",
        id: "password",
        type: "password",
        placeholder: "Enter your password",
        required:true
    },
    {
        label: "New Password",
        id: "newPassword",
        type: "password",
        placeholder: "Enter new password",
        required:true

    }
];

const ChangePass = ({ initialValue }) => {
    const { error, success } = useGlobal()
    const [newPassword, setNewPassword] = useState({});

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setNewPassword((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitNewPass = async () => {
        const validatePassword = (password) => {
            const minLength = 8;
            return password && password?.length >= minLength;
        };

        if (!validatePassword(newPassword.newPassword)) {
            throw new Error("The new password must be at least 8 characters long.");
        }

        if (newPassword?.newPassword === newPassword?.password) {
            setNewPassword(null)
            throw new Error("The new password cannot be the same as the old password.")
        }
        let url = "/reset-password";
        const { data } = await apiHandler.put(url, newPassword);
        url = "/update"
        let finalTemp = { systemGeneratedPass: false };
        await apiHandler.put(url, finalTemp);
        success(data?.message);
        setNewPassword({});
    };

    return (
        <div>
            <Modal disableCTA={(!newPassword) && "secondCta"} openCTA={<Buttons className={`${initialValue && "hidden"}`} type="border" ><span className="md:inline hidden">Change Password</span> <LockKeyhole className="md:hidden inline" /> </Buttons>} heading="Change Password" firstCtaText={`${initialValue ? "" : "Cancel"}`} handleFirstCta={() => { setNewPassword({}); }} secondCtaText="Save" handleSecondCta={handleSubmitNewPass} initialValue={initialValue}>
                <div className="space-y-4">
                    {
                        changePasswordInput?.map((ele, index) => {
                            return <InputField key={index} handleInputChange={handlePasswordChange} id={ele?.id} label={ele?.label} type={ele?.type} value={newPassword?.[ele?.id] || ""} placeholder={ele?.placeholder} required={ele?.required} />
                        })
                    }
                </div>
            </Modal>
        </div>
    )
}

export default ChangePass