import React, { useEffect, useState } from "react";
import ActiveButtons from "../utils/ActiveButtons";
import ListingTabel from "../utils/ListingTabel";
import apiHandler from "../../functions/apiHandler";
import StudioDropdown from "../utils/studio";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../utils/multiselect";
import useGlobal from "../../hooks/useGlobal";
let debounce = null

function AssestsDocs() {
  const [activeStudio, setActiveStudio] = useState(0);

  const [masterList, setMasterList] = useState([])
  const { companyList } = useGlobal()

  const navigate = useNavigate()

  const fetchMasterList = async () => {
    try {

      const { data } = await apiHandler.get(`/master-game-list`);
      console.log(data);

      setMasterList(data?.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchMasterList()
  }, []);

  const handleRowClick = (game) => {
    console.log(game);
    navigate()

    // alert(`Clicked on: ${game.name}`);
  };
  const folders = [
    { name: 'Background' },
    { name: 'Thumbnails' },
    { name: 'Banners' },
    { name: 'Symbols' },

  ];

  const [activeButtons, setActiveButtons] = useState([
    {
      name: "Game File & Certificates",
    },
    {
      name: "Master Game List",
    },
  ]);


  const [files, setFiles] = useState([]);
  const [filters, setFilters] = useState({ skip: 0, limit: 5 });
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);



  console.log(filters);


  const fetchFiles = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const { data } = await apiHandler.get(`/games?${query}`);
      console.log(data);
      const newFiles = data?.data?.games || [];
      setFiles((prev) => (filters.skip === 0 ? newFiles : [...prev, ...newFiles]));
      setHasMore((filters.skip + filters.limit) < data?.data?.total);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (debounce) {
      clearTimeout(debounce)
    }
    debounce = setTimeout(() => {
      fetchFiles();

    }, 300)
  }, [filters]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setFilters(prev => ({ ...prev, skip: prev.skip + prev.limit }));
    }
  };

  return (
    <>
      <div className="">
        <div>
          <div className="space-y-11">
            <div className=" mb-8 mt-10">
              <ActiveButtons
                active={activeStudio}
                className={"grid grid-cols-2 gap-4 bg-[#F4F4F4]"}
                setActive={setActiveStudio}
                buttons={activeButtons}
              />
            </div>
          </div>

          <div className="">
            {activeStudio === 0 && (

              <>
                <div className="flex gap-6 justify-between items-center mb-6">
                  <div className="w-1/4">
                    <MultiSelect title={<div className='flex gap-2 items-center text-[#6F6F6F] font-semibold text-base capitalize'>
                      <h2>Studios</h2> {filters?.companyIds?.length > 0 && <span className="ml-2 bg-[#94FF80] px-2 py-0.5 rounded text-xs text-black">{filters?.companyIds?.length}</span>}
                    </div>} selected={filters?.companyIds} options={companyList} onApply={(name, ids) => { setFilters((prev) => ({ ...prev, companyIds: ids })) }} onClear={(name, ids) => { setFilters((prev) => ({ ...prev, companyIds: [] })) }} />

                  </div>

                  <div className="flex gap-2 grow items-center rounded-[10px] border-2 border-gray-200 py-2 px-4">
                    <img
                      className="h-3.5 w-3.5"
                      src="/logos/Search.png"
                      alt="Search"
                    />
                    <input
                      type="text"
                      className="outline-none bg-transparent text-[#A8A8A8] text-[16px]"
                      placeholder="Keyword"
                      value={filters?.search}
                      onChange={(e) => { setFilters((prev) => ({ ...prev, search: e.target.value })) }}
                    />
                  </div>
                </div>

                <div className="bg-white ">
                  <ListingTabel
                    files={files}
                    companyList={companyList}
                    handleRowClick={handleRowClick}
                    handleLoadMore={handleLoadMore}
                    hasMore={hasMore}
                    loading={loading}
                  />

                </div>


              </>

            )}
            {
              activeStudio === 1 && (
                <div className="mt-5">
                  <table className="w-full text-left border-collapse">
                    <thead className="text-[#A8A8A8] text-base font-normal border-b border-gray-200 ">
                      <tr>
                        <th className="py-5">Studio</th>
                        <th className="py-5">File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {masterList?.map((file, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(file?.id)}
                          className="group cursor-pointer text-xl border-b border-gray-200 transition"
                        >
                          <td className="py-5 text-base font-medium text-[#6F6F6F] group-hover:text-black ">
                            {file?.studioDetail?.name || "Others"}
                          </td>




                          <td className="py-5  text-base font-medium text-[#6F6F6F] group-hover:text-black">
                            <a href={file?.file}>{file?.file}</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Load More Button */}

                </div>
              )

            }
          </div>
        </div>
      </div>


    </>
  );
}

export default AssestsDocs;
