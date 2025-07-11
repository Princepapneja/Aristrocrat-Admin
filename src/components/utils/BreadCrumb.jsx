import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const searchParams = new URLSearchParams(location.search);
  const studioId = searchParams.get("studioId");
  const nameParam = searchParams.get("name");

  if (location.pathname === "/dashboard") return null;

  let breadcrumbPath = "";

  const filteredPathnames = pathnames.filter((segment) => isNaN(segment));

  const formattedSegments = filteredPathnames.map((segment) => {
    if (segment === "game-form" && nameParam) {
      return decodeURIComponent(nameParam); // Show the 'name' from search params
    }
    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  });

  return (
    <div className="mt-20">
      <p className="text-gray-400 font-ot-sono font-normal text-[20px] leading-[24px] tracking-[-0.015em] flex flex-wrap gap-5">
        {formattedSegments.map((segment, index) => {
          breadcrumbPath += `/${filteredPathnames[index]}`;
          const isLast = index === filteredPathnames.length - 1;

          const linkWithQuery = studioId
            ? `${breadcrumbPath}?studioId=${studioId}`
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
