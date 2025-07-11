import { Link, useLocation, useParams } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();
  const params=useParams()
  const pathnames = location.pathname.split("/").filter((x) => x);

  const searchParams = new URLSearchParams(location.search);
// console.log(params);

  
  const studioId = searchParams.get("studioId");
  const nameParam = searchParams.get("name");
  const decodedName = nameParam ? decodeURIComponent(nameParam) : "";

  if (location.pathname === "/dashboard") return null;

  let breadcrumbPath = "";

  const filteredPathnames = pathnames.filter((segment) => isNaN(segment));

  const formattedSegments = filteredPathnames.map((segment) => {
    if (segment === "files" && decodedName || segment === "game-form" && decodedName) {
      return decodedName;
    }

    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  });

  const hasNumericSegment = pathnames.some((segment) => !isNaN(segment));
  if (decodedName && hasNumericSegment) {
    formattedSegments.push(`${decodedName} Publish`);
    filteredPathnames.push(pathnames[pathnames.length - 1]); 
  }

  return (
    <div className="mt-20">
      <p className="text-gray-400 font-ot-sono font-normal text-[20px] leading-[24px] tracking-[-0.015em] flex flex-wrap gap-5">
        {formattedSegments.map((segment, index) => {
          breadcrumbPath += `/${filteredPathnames[index]}`;
          const isLast = index === formattedSegments.length - 1;

          const isFilesSegment =
            filteredPathnames[index] === "files" && decodedName;

          const linkWithQuery = isFilesSegment
            ? `/dashboard/games/game-form?name=${encodeURIComponent(decodedName)}&studioId=${studioId}&gameId=${params?.id}`
            : studioId
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
