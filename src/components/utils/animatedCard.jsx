import React, { useState, useEffect } from 'react';

const AnimatedCard = ({ index, value, icon, title }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let counter = 0;
    const incrementValue = () => {
      if (counter < value) { 
        setDisplayValue(counter);
        counter += Math.ceil(value/10);
        setTimeout(incrementValue, 80);
      } else {
        setDisplayValue(value); 
      }
    };
    incrementValue();
  }, [value]);

  let formattedValue;
  if (displayValue < 10) {
    formattedValue = `0${displayValue}`;
  } else {
    formattedValue = displayValue;
  }

  return (
    <div
      className={`py-8 px-6 flex gap-4 items-center rounded-lg w-full text-white ${
        index === 1
          ? 'bg-secondary'
          : index === 0
          ? 'bg-primary'
          : index === 2
          ? 'bg-fourth'
          : 'bg-tertiary'
      }`}
    >
      {icon}
      <div className="grid">
        <span>{title}</span>
        <span className="font-extrabold text-xl">{formattedValue||"00"}</span>
      </div>
    </div>
  );
};

export default AnimatedCard;
