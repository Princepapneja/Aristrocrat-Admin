import React from 'react';

const styleMap = {
  primary: {
    active: 'bg-[#00B290] text-white-v1 ',
    inactive: 'bg-white-v1 text-black-v1 ',
    common:"p-3 rounded-xl"
  },
  secondary: {
    active: 'bg-[#00B290]',
    inactive: 'text-white-v3',
    common:"p-2"
  },
  danger: {
    active: 'bg-red-600 text-white',
    inactive: 'bg-white text-red-600 border border-red-600',
  },
};

const ActiveButtons = ({ buttons, className, active, setActive, type = 'primary' }) => {
  const { active: activeClass, inactive: nonActiveClass,common } = styleMap[type] || styleMap['primary'];

  return (
    <div className={`${className} flex gap-3 overflow-auto p-2 bg-[#F4F4F4] rounded-2xl`}>
      {buttons?.map((button, index) => (
        <button
          key={index}
          className={`text-base font-semibold ${  
            active === index ? activeClass : nonActiveClass
          }  ${common} w-full duration-300`}
          onClick={() => {
            setActive(index);
            button?.func && button.func();
          }}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default ActiveButtons;
