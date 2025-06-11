import React, { useState } from 'react';
import Modal from '../../utils/Modal';
import { Check, Hourglass, CheckCircle, XCircle, Repeat, Trash2 } from 'lucide-react'; // Importing Check icon for completed status
import useGlobal from '../../../hooks/useGlobal';
import InputField from '../../utils/InputFields';
import apiHandler from '../../../functions/apiHandler';
 
const AppointmentActions = ({ properties }) => {
    const { success, render, setRender, error } = useGlobal();
    const { status } = properties
    const [reason, setReason] = useState('');
 
    const handleUpdateStatus = async (newStatus) => {
        try {
            const { data } = await apiHandler.put(`appointment/${properties._id}`, { status: newStatus, reason });
            setRender(!render);
            success(data.message);
            setReason(''); // Reset reason field after successful update
        } catch (err) {
            error(err.message);
        }
    };
    const handleDelete = async () => {
        try {
            const url = `delete-entry/appointment/${properties._id}`;
            const { data } = await apiHandler.delete(url);
            setRender(!render);
            success(data.message);
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <>
            {status !== "confirmed" && (
                <Modal
                    openCTA={
                        <span title='Confirm'>
                            <CheckCircle className='w-5 text-green-500' />
                        </span>
                    }
                    secondCtaText="Confirm"
                    firstCtaText="Cancel"
                    handleSecondCta={() => handleUpdateStatus("confirmed")}
                    className="grid place-items-center !md:max-w-[unset] !w-[unset]"
                >
                    <p className='max-w-80 whitespace-normal text-center mb-2'>Do you want to confirm the appointment?</p>
                    <InputField placeholder='Enter the reason' value={reason} handleInputChange={(e) => setReason(e.target.value)} />
                </Modal>
            )}
 
            {status !== "pending" && (
                <Modal
                    openCTA={
                        <span title='Pending'>
                            <Hourglass className='w-5 text-yellow-500' />
                        </span>
                    }
                    secondCtaText="Confirm"
                    firstCtaText="Cancel"
                    handleSecondCta={() => handleUpdateStatus("pending")}
                    className="grid place-items-center !md:max-w-[unset] !w-[unset]"
                >
                    <p className='max-w-80 whitespace-normal text-center mb-2'>Do you want to mark the appointment as pending?</p>
                    <InputField placeholder='Enter the reason' value={reason} handleInputChange={(e) => setReason(e.target.value)} />
                </Modal>
            )}
 
            {status !== "cancelled" && (
                <Modal
                    openCTA={
                        <span title='Cancel'>
                            <XCircle className='w-5 text-secondary' />
 
                        </span>
                    }
                    secondCtaText="Yes"
                    firstCtaText="No"
                    handleSecondCta={() => handleUpdateStatus("cancelled")}
                    className="grid place-items-center !md:max-w-[unset] !w-[unset]"
                >
                    <p className='max-w-80 whitespace-normal text-center mb-2'>Do you want to cancel the appointment?</p>
                    <InputField placeholder='Enter the reason' value={reason} handleInputChange={(e) => setReason(e.target.value)} />
                </Modal>
            )}
 
            {status !== "completed" && (
                <Modal
                    openCTA={
                        <span title='Completed '>
                            <Check className='w-5 text-blue-500' />
 
 
                        </span>
 
                    }
                    secondCtaText="Confirm"
                    firstCtaText="Cancel"
                    handleSecondCta={() => handleUpdateStatus("completed")}
                    className="grid place-items-center !md:max-w-[unset] !w-[unset]"
                >
                    <p className='max-w-80 whitespace-normal text-center mb-2'>Do you want to mark the appointment as completed?</p>
                    <InputField placeholder='Enter the reason' value={reason} handleInputChange={(e) => setReason(e.target.value)} />
                </Modal>
            )}
            {status !== "ongoing" && (
                <Modal
                    openCTA={
                        <span title='On-going '>
                            <Repeat className='w-5 text-[#1E90FF]' />
 
 
                        </span>
 
                    }
                    secondCtaText="Confirm"
                    firstCtaText="Cancel"
                    handleSecondCta={() => handleUpdateStatus("ongoing")}
                    className="grid place-items-center !md:max-w-[unset] !w-[unset]"
                >
                    <p className='max-w-80 whitespace-normal text-center mb-2'>Do you want to mark the appointment as ongoing?</p>
                    <InputField placeholder='Enter the reason' value={reason} handleInputChange={(e) => setReason(e.target.value)} />
                </Modal>
            )}
            <Modal openCTA={
                <span title="Delete">
                    <Trash2 className='w-5 text-red-500' />
                </span>
            }
                secondCtaText="Delete"
                firstCtaText="Cancel"
                handleSecondCta={handleDelete}
                className={`grid place-items-center md:!max-w-[unset] !w-[unset]`}
            >
                <p className='normal-case text-lg text-center font-bold max-w-80 whitespace-normal'>Do you want to delete the appointment?</p>
            </Modal>
        </>
    );
};
 
export default AppointmentActions;