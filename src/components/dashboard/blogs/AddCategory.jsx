import React, { useState } from 'react'
import Modal from '../../utils/Modal';
import { Edit } from 'lucide-react';
import InputField from '../../utils/InputFields';
import useGlobal from '../../../hooks/useGlobal';
import { uploadFile } from '../../../services/s3Bucket';
import apiHandler from '../../../functions/apiHandler';

const AddCategory = ({ text }) => {
  const [inputItems, setInputItems] = useState({
    title: "",
    image: "",
  })
  const { success, error, render, setRender } = useGlobal()
  function handleInput(event, setState) {
    const { name, type, value, files } = event.target;
    setState((prevItems) => {
      if (type === 'file') {
        if (files.length > 0) {
          const file = files[0];
          return {
            ...prevItems,
            [name]: file,
          };
        } else {
          return {
            ...prevItems,
            [name]: null,
          };
        }
      } else {
        return {
          ...prevItems,
          [name]: value,
        };
      }
    });
  }
  const handleSubmit = async () => {
    try {
      const img_url = inputItems && inputItems.image ? await uploadFile(inputItems.image, "categories") : "";
      const finalTemp = {
        title: inputItems.title,
        image: img_url
      };
      const { data } = await apiHandler.post("/categories", finalTemp)
      success(data?.message)
      setRender(!render)
    } catch (err) {
      error(err.message)
    }
  }
  return (
    <>
      <div className="flex justify-between w-full font-normal " >
        <span className="font-bold text-xl">{text}</span>
        <Modal openCTA={<span className='rounded  text-sm py-1 px-4  bg-primary text-white'>Add new Category</span>} firstCtaText="Cancel" handleFirstCta={() => { setInputItems({}) }} heading="Add category" handleSecondCta={handleSubmit} secondCtaText={"Save"} >
          <div className='flex justify-center'>
            <span className='relative'>
              <input
                type='file'
                className='hidden'
                name='image'
                id='image'
                onChange={(e) => { handleInput(e, setInputItems) }}
                accept="image/*"
                value={inputItems?.image?.fileName || ""}
              />
              <label htmlFor='image' className='bg-background w-32 block'>
                <img
                  className='w-32 h-32 object-contain'
                  src={
                    !inputItems?.image ? "/logos/TCFWC.png" : URL.createObjectURL(inputItems?.image)

                  }
                  alt=''
                />
                <div className='absolute top-0 right-0 p-1'>
                  <div className='absolute top-0 right-0 w-5 bg-white backdrop-blur-3xl  '>
                    <Edit className='w-5 text-black' />
                  </div>
                </div>
              </label>
            </span>
          </div>
          <InputField required={true} id={"title"} value={inputItems?.title || ""} label={"Category"} handleInputChange={(e) => { handleInput(e, setInputItems) }} placeholder={"Enter the category"} />

        </Modal>

      </div>

    </>
  )
}

export default AddCategory