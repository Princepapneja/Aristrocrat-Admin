import { Eye, EyeOff, Trash } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import convertTimeSlot from "../../functions/TimeFormatConverter";
import { dateFormat } from "../../../constants";

const InputField = ({
  label,
  className,
  isDisable,
  min,
  options,
  deleteCta,
  type = "text",
  id,
  value,
  max,
  handleInputChange,
  handleEditorChange,
  required = false,
  placeholder = "",
  checked,
  prefix = false,
}) => {
  const [showPass, setShowPass] = useState(false);
  const ref = useRef(null);

  const handleChange = (e) => {
    const { type, value } = e.target;
    if (type === "tel") {
      const numericValue = value.replace(/[^0-9]/g, "");
      e.target.value = numericValue;
    }
    handleInputChange && handleInputChange(e);
  };

  useEffect(() => {
    if (!value && type === "file") {
      ref.current.value = null;
    } else {
      return;
    }
  }, [value]);

  return (
    <>
      <div
        className={`${className} ${
          type === "textarea" || type === "textEditor"
            ? "md:col-span-2 xl:col-span-3"
            : type === "checkbox"
            ? "flex items-center gap-2"
            : "space-y-2 w-full"
        } normal-case`}
      >
        {/* Label above input for non-checkbox */}
        {label && type !== "checkbox" && (
          <div className="flex gap-1 items-center">
            <label
              className="capitalize font-medium block whitespace-nowrap"
              htmlFor={id}
            >
              {label}
            </label>
            {required && <span className="text-red-500 text-sm">*</span>}
          </div>
        )}

        {type === "select" ? (
          <select
            value={value}
            onChange={handleInputChange}
            name={id}
            id={id}
            className="block w-full bg-transparent p-[0.6rem] border-2 border-gray-200 placeholder:font-light focus:outline-primary-dark rounded-xl text-desc"
          >
            {options?.map((option, key) => {
              return (
                <option
                  key={key}
                  disabled={option?.disable}
                  selected={option?.selected}
                  value={option?.value}
                >
                  {option?.name}
                </option>
              );
            })}
          </select>
        ) : type === "textarea" ? (
          <textarea
            id={id}
            name={id}
            value={value}
            placeholder={placeholder}
            onChange={handleInputChange && handleInputChange}
            className="bg-transparent p-3 text-desc   placeholder:font-light border-2 border-gray-200 focus:outline-primary-dark rounded-xl w-full   "
          ></textarea>
        ) : type === "switch" ? (
          <label className="flex justify-end  cursor-pointer text-right">
            <input
              type="checkbox"
              name={id}
              id={id}
              onChange={handleInputChange}
              checked={value}
              className="sr-only peer"
            />
            <div className="relative text-desc  w-11 h-6 bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border-2 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-dark" />
          </label>
        ) : type === "textEditor" ? (
          <JoditEditor value={value} onChange={handleEditorChange} />
        ) :
         type === "checkbox" ? (
          <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id={id}
              name={id}
              checked={checked}
              onChange={handleInputChange}
              className="w-4 h-4 bg-red"
              disabled={isDisable}
            />
            <span className="text-desc">
              {label} {required && <span className="text-red-500">*</span>}
            </span>
          </label>
        ) : (
          <div className="flex items-center border border-black-v4 rounded-xl outline-none ">
            {prefix && prefix()}
            <input
              id={id}
              type={type === "password" ? (showPass ? "text" : "password") : type}
              name={id}
              ref={ref}
              value={
                type === "file"
                  ? undefined
                  : type === "date"
                  ? moment(value)?.format("YYYY-MM-DD")
                  : type === "time"
                  ? convertTimeSlot(value, "24h")
                  : value
              }
              placeholder={placeholder}
              checked={checked}
              maxLength={type === "tel" ? max : undefined}
              max={max}
              min={min}
              pattern={type === "tel" ? "[0-9]*" : undefined}
              inputMode={type === "tel" ? "numeric" : undefined}
              accept={type === "file" ? "image/*" : undefined}
              onChange={handleChange}
              className={`bg-white-v1  accent-primary-dark text-desc bg-transparent leading-0 p-1 sm:p-2 w-full placeholder:font-light placeholder:text-sm focus:outline-none  disabled:bg-gray-200 ${
                type !== "password" ? "rounded-xl" : "rounded-l-xl"
              }`}
              disabled={isDisable}
            />

            {deleteCta && (
              <div
                onClick={deleteCta}
                className=" cursor-pointer bg-red-500 p-2 rounded-r-xl text-white"
              >
                <Trash />
              </div>
            )}
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="bg-primary-dark text-white cursor-pointer p-2 rounded-r-lg"
              >
                {showPass ? <Eye /> : <EyeOff />}
              </button>
            )}
          </div>
        )} 
      </div>
    </>
  );
};

export default InputField;
