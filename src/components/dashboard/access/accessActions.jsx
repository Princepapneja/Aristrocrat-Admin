import React from 'react';
import Modal from '../../utils/Modal';
import { BadgeCheck, Ban, ShieldAlert } from 'lucide-react';
import useGlobal from '../../../hooks/useGlobal';
import apiHandler from '../../../functions/apiHandler';

const AccessActions = ({ properties,type }) => {
    const { success, render, setRender, error } = useGlobal();
    const { access, healthID, _id, fullName } = properties;

    const handleAccess = async (newAccess) => {
        let url = '';
        try {
            if (type === "clinician"|| type === "admin") {
                url = `user/${type}/${_id}`;
                const { data } = await apiHandler.put(url, { access: newAccess });
                success(data.message);
            } else if (type === "patient") {
                url = "verify-health-id";
             
                const { data } = await apiHandler.put(url, { healthID, access: newAccess });
                success(data.message);
            } 
            setRender(!render);
        } catch (err) {
            error(err.message);
        }
    };

    return (
        <div className='flex gap-2'>
            {access !== "full" && (
                <Modal 
                    openCTA={<span title="Verify"><BadgeCheck className='w-5 text-green-500' /></span>} 
                    secondCtaText={"Verify"} 
                    firstCtaText={"Cancel"} 
                    handleSecondCta={() => { handleAccess("full") }} 
                    className={`grid place-items-center !md:max-w-[unset] !w-[unset]`}
                >
                    <p className='max-w-80 whitespace-normal text-center normal-case'>
                        Do you want to verify the user <span className="text-text font-bold">{fullName}</span>?
                    </p>
                    <span className='block text-yellow-500 text-xs max-w-80 text-center mt-2 normal-case'>
                        This will grant full access to the app.
                    </span>
                </Modal>
            )}
            {type!=="clinician"  && type!=="admin" && access !== "restricted" &&  (
                <Modal 
                    openCTA={<span title="Limited access"><ShieldAlert className='w-5 text-yellow-500' /></span>} 
                    secondCtaText={"Confirm"} 
                    firstCtaText={"Cancel"} 
                    handleSecondCta={() => { handleAccess("restricted") }} 
                    className={`grid place-items-center !md:max-w-[unset] !w-[unset]`}
                >
                    <p className='max-w-80 text-center whitespace-normal normal-case'>
                        Do you want to give limited access to the Health ID of <span className="text-text font-bold">{fullName}</span>?
                    </p>
                    <span className='block text-yellow-500 text-xs max-w-80 text-center mt-2 normal-case'>
                        This will grant limited access to the app.
                    </span>
                </Modal>
            )}
            {access !== "blocked" && (
                <Modal 
                    openCTA={<span title="Block"><Ban className='w-5 text-red-500' /></span>} 
                    secondCtaText={"Block"} 
                    firstCtaText={"Cancel"} 
                    handleSecondCta={() => { handleAccess("blocked") }} 
                    className={`grid place-items-center !md:max-w-[unset] !w-[unset]`}
                >
                    <p className='max-w-80 whitespace-normal text-center normal-case'>
                        Do you want to block the user <span className="text-text font-bold">{fullName}</span>?
                    </p>
                    <span className='block text-yellow-500 text-xs max-w-80 text-center mt-2 normal-case'>
                        This will not grant any access to the app.
                    </span>
                </Modal>
            )}
        </div>
    );
};

export default AccessActions;
