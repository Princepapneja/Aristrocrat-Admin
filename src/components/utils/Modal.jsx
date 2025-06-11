import React, { useEffect, useState } from 'react'
import Buttons from './buttons';
import { toast } from 'react-toastify';
import useGlobal from '../../hooks/useGlobal';

const Modal = ({
  openCTA,
  disableCTA,
  children,
  heading,
  cross,
  handleFirstCta,
  firstCtaText,
  handleSecondCta,
  secondCtaText,
  handleCross,
  initialValue = false,
  className }) => {

  const [popUp, setPopUp] = useState(initialValue);
  const {error}= useGlobal()
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !initialValue) {
        setPopUp(false);
        handleCross && handleCross();
      }
    };

    if (popUp) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [popUp, handleCross]);
  return (
    <div>
      <div className='cursor-pointer'
        onClick={() => {
          setPopUp(true);
        }}
      >
        {openCTA}
      </div>
      <div
        className={`${popUp ? "grid" : "hidden"
          } z-10 md:place-items-center items-end md:p-4 cursor-default backdrop-blur font-normal text-base w-full h-full fixed top-0 left-0 text-black`}
      >
        <div className={`bg-white p-4 md:h-[unset] md:p-8 md:rounded-lg md:border-2 md:max-w-[500px] w-full border-[#ddd] ${className}`}>
          <div className={`${heading ? "flex" : "hidden"} gap-4 justify-between mb-4 border-b pb-2`}>
            <span className="text-primary capitalize text-xl font-bold flex gap-1 justify-between">{heading}</span>
            {cross && (
              <span onClick={() => { setPopUp(false); handleCross && handleCross() }} className="cursor-pointer ">
                &#10060;
              </span>
            )}
          </div>

          <div className="overflow-y-auto">
            {children}
          </div>

          <div className="flex gap-4 justify-center md:mt-5 w-full left-0 p-2 md:p-0 static bottom-0">
            {firstCtaText && (
              <Buttons
                disabled={disableCTA === "firstCta" ? true : false}
                type='border'
                spinner={false}

                className={"w-full md:w-[unset]"}
                onClick={async (e) => {
                  try {
                    handleFirstCta && await handleFirstCta(e)
                    setPopUp(false);

                  } catch (err) {
                    error(err?.message || "internal error");

                  }
                }}
              >
                {firstCtaText}
              </Buttons>
            )}
            {secondCtaText && (
              <Buttons
                disabled={disableCTA === "secondCta" ? true : false}
                spinner={false}
                className={"w-full md:w-[unset]"}
                type={secondCtaText === "Delete" || secondCtaText === "Block" || secondCtaText === "Yes" ? "danger" : "primary"}
                onClick={async () => {
                  try {
                    handleSecondCta && await handleSecondCta()
                    setPopUp(false);
                  } catch (err) { 
                    error(err?.message || "internal error");
                  }
                }}
              >
                {secondCtaText}
              </Buttons>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal