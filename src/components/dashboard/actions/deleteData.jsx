import  { useState } from 'react';
import Modal from '../../utils/Modal';
import { BadgeCheck, Ban, ShieldAlert, Trash,  Clock, CheckCircle, XCircle } from 'lucide-react';
import useGlobal from '../../../hooks/useGlobal';
import InputField from '../../utils/InputFields';
import apiHandler from '../../../functions/apiHandler';

const DeleteData = ({ properties, type }) => {
  const { success, error, render, setRender } = useGlobal();
  const [reason, setReason] = useState("");

  const handleDelete = async () => {
    try {
      let url = "";
      let resp = "";

    if (type === "appointment") {
        url = `appointment/${properties._id}`;
        const newStatus = properties?.status === "cancelled" ? "confirmed" : "cancelled"; // You can add logic for other statuses here
        const { data } = await apiHandler.put(url, { status: newStatus, comment: reason });
        resp = data;
      } else {
        url = `delete-entry/${type}/${properties._id}`;
        const { data } = await apiHandler.delete(url);
        resp = data;
      }

      success(resp.message);
      setRender(!render);
    } catch (err) {
      error(err.message);
    }
  };

  const renderIcon = () => {
    if (type === "appointment") {
      switch (properties?.status) {
        case "pending":
          return <Clock className='w-5 text-yellow-500' />;
        case "confirmed":
          return <CheckCircle className='w-5 text-green-500' />;
        case "cancelled":
          return <XCircle className='w-5 text-red-500' />;
        default:
          return <Ban className='w-5 text-red-500' />;
      }
    } else {
      return <span title="Delete"><Trash className='w-5 text-red-500' /></span>;
    }
  };

  const secondCtaText = () => {
    if (type === "appointment") {
      switch (properties?.status) {
        case "pending":
          return "Confirm";
        case "confirmed":
          return "Cancel";
        case "cancelled":
          return "Revert";
        default:
          return "Update";
      }
    } else {
      return "Delete";
    }
  };

  return (
    <>
      <Modal
        openCTA={renderIcon()}
        secondCtaText={secondCtaText()}
        handleSecondCta={handleDelete}
        firstCtaText={"Cancel"}
        className={`grid place-items-center md:!max-w-[unset] !w-[unset]`}
      >
        <p className='normal-case text-lg text-center font-bold max-w-80 whitespace-normal'>
          {type === "appointment"
            ? `This will ${properties?.status === "cancelled" ? "revert" : properties?.status === "confirmed" ? "cancel" : "confirm"} the appointment`
            :  "Are you sure you want to delete this data?"}
        </p>
        {type === "appointment" && (
          <InputField
            placeholder='Enter the reason'
            value={reason}
            handleInputChange={(e) => setReason(e.target.value)}
          />
        )}
      </Modal>
    </>
  );
};

export default DeleteData;
