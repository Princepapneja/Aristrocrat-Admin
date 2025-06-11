import { Link } from "react-router-dom";

export const DropdownMenu = ({ listItems, className }) => {
    return (
        <div className={`z-[2] absolute max-w-52 w-full bg-white p-3 top-[60px] right-3 before:bg-white before:absolute before:top-[-7px] before:right-6 before:w-[12px] before:h-[12px] before:rotate-45 before:border-t-2 before:border-l-2 border shadow-md rounded-md md:top-[68px] md:right-4 md:before:right-7 ${className}`}>
            <ul className="space-y-4 p-2">
                {listItems?.map((list, listIndex) => (
                    <li key={listIndex} className={`${list?.textColor && `text-${list?.textColor}`} capitalize`}>
                        <Link
                            onClick={list?.onClick}
                            to={list?.path || "#"}
                            className="flex gap-2 items-center">
                            <span className={`${list?.textColor ? `text-${list?.textColor}` : "text-primary"}`}>{list?.icon && list?.icon}</span>
                            {list?.title && list?.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
