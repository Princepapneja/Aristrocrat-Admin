import { Link, useLocation } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);


    // console.log(location);
    
     const searchParams = new URLSearchParams(location.search);
    // console.log(searchParams);
  
    const id = searchParams.get("studioId");
  // const context = useGlobal()
  // const { studio } = context;
  
// console.log(studio);

  if (location.pathname === "/dashboard") return null;

  let breadcrumbPath = "";

  const formattedSegments = pathnames
    .filter((segment) => isNaN(segment)) 
    .map((segment) =>
      segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    );

  const filteredPathnames = pathnames.filter((segment) => isNaN(segment));
  

  return (
  <div className="mt-20">
      <p className="text-gray-400 font-ot-sono font-normal text-[20px] leading-[24px] tracking-[-0.015em] flex flex-wrap gap-5">
        {formattedSegments.map((segment, index) => {
          breadcrumbPath += `/${filteredPathnames[index]}`;
          const isLast = index === filteredPathnames.length - 1;

          // Add ?studioId=... only if studioId exists
          const linkWithQuery = id
            ? `${breadcrumbPath}?studioId=${id}`
            : breadcrumbPath;

          return (
            <span key={linkWithQuery} className="flex items-center gap-5">
              {isLast ? (
                <span className="text-black font-medium">{segment}</span>
              ) : (
                <Link
                  to={linkWithQuery}
                  className="text-gray-400 hover:text-black transition duration-200"
                >
                  {segment}
                </Link>
              )}
              {!isLast && <span className="text-gray-400">&gt;</span>}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default BreadCrumb;
