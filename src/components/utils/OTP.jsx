import React, { useState } from 'react';

const OtpInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ''); // Ensure only digits are allowed
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < length - 1) {
        element.nextSibling.focus();
      }
      onChange(newOtp.join(''));
    }
  };

  const handleBackspace = (element, index) => {
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index ] = '';
        setOtp(newOtp);
        element.previousSibling.focus();
      }
      onChange(otp.join(''));
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text').split('').slice(0, length);
    const newOtp = [...otp];
    pasteData.forEach((char, index) => {
      if (/^\d$/.test(char)) { // Ensure only digits are allowed
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join(''));
  };

  return (
    <div className="flex space-x-2" onPaste={handlePaste}>
      {otp.map((data, index) => (
        <input
          className="w-12 h-12 border-2 border-gray-300 rounded text-center focus:outline-none focus:border-primary"
          type="text"
          maxLength="1"
          key={index}
          value={data}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => e.key === 'Backspace' ? handleBackspace(e.target, index) : null}
        />
      ))}
    </div>
  );
};

export default OtpInput;
