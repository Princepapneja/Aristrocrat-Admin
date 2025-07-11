import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronDown as ExpandIcon,
  Search,
} from "lucide-react";

export default function MultiSelect({
  title = "Filter",
  options = [], // [{ id, name }] or [{ id, name, children: [{ id, name }] }]
  selected,
  onApply,
  onClear,
  name,
}) {
    console.log(options)
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const ref = useRef(null)

  useEffect(() => {
    setSelectedItems([]);

    if (!selected) return;
    setSelectedItems(selected);
  }, [selected]);

  const isGrouped = options?.[0]?.children;
  const toggleOption = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleGroup = (id) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleApply = () => {
    onApply(name, selectedItems);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedItems([]);
    onClear?.(name);
  };

  const filterFn = (name) =>
    name.toLowerCase().includes(search.toLowerCase());


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="relative w-full " ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-2 w-full border-gray-200 rounded-md p-2 cursor-pointer flex items-center justify-between bg-[#F4F4F4]"
      >
        <span className="capitalize font-medium block whitespace-nowrap">{title}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="shadow-lg rounded-md border border-gray-200 p-4 absolute z-10 mt-1 w-full bg-white space-y-2 overflow-y-auto">
          <div className="flex items-center gap-1 border rounded-lg border-gray-200 pl-2">
            <Search className="w-4" />
            <input
              type="text"
              placeholder="Keyword"
              className="w-full focus:outline-none rounded px-3 py-2 focus:ring focus:border-blue-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {!isGrouped
              ? options
                .filter((opt) => filterFn(opt.name))
                .map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(opt.value)}
                      onChange={() => toggleOption(opt.value)}
                      className="accent-green-600"
                    />
                    <span className="text-sm">{opt.name}</span>
                  </label>
                ))
              : options.map((group) => {
                const filteredChildren = group.children.filter((c) =>
                  filterFn(c.name)
                );

                if (!filterFn(group.name) && filteredChildren.length === 0)
                  return null;

                const allChecked = group.children.every((c) =>
                  selectedItems.includes(c.value)
                );

                return (
                  <div key={group.value} className="px-3">
                    <div
                      className="flex items-center justify-between gap-2 cursor-pointer"
                      onClick={() => toggleGroup(group.value)}
                    >
                      <div className="flex items-center space-x-2">
                        <button type="button">
                          {console.log(expandedGroups[group.value])}

                          {expandedGroups[group.value] ? (
                            <ChevronUp size={14} className={`font-semibold text-base ${expandedGroups[group.value] ? 'text-black' : 'text-[#6F6F6F]'}`} />
                          ) : (
                            <ChevronDown size={14} className={`font-semibold text-base ${expandedGroups[group.value] ? 'text-black' : 'text-[#6F6F6F]'}`} />
                          )}
                        </button>

                        <span className={`font-semibold text-base ${expandedGroups[group.value] ? 'text-black' : 'text-[#6F6F6F]'
                          }`}>
                          {group.name}
                        </span>
                      </div>

                      <input
                        type="checkbox"

                        checked={allChecked}
                        onChange={() => {
                          const childValues = group.children.map(
                            (c) => c.value
                          );
                          const areAllSelected = childValues.every((val) =>
                            selectedItems.includes(val)
                          );

                          setSelectedItems((prev) => {
                            if (areAllSelected) {
                              return prev.filter(
                                (val) => !childValues.includes(val)
                              );
                            } else {
                              return [...new Set([...prev, ...childValues])];
                            }
                          });
                        }}
                        className="accent-[#00B290]"
                      />
                    </div>


                    {expandedGroups[group.value] && (
                      <div className="pl-4 space-y-1 mt-1">
                        {filteredChildren.map((child) => (
                          <label
                            key={child.value}
                           className="flex items-center gap-5 text-base text-[#6F6F6F] font-normal"
                          >
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(child.value)}
                              onChange={() => toggleOption(child.value)}
                              className="accent-[#00B290]"
                            />
                            <span className="">{child.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          <div className="flex justify-between items-center px-3 py-2">
            <button
              onClick={handleApply}
              className="cursor-pointer bg-[#00B290] hover:bg-black text-white px-4 py-1 rounded-md text-sm"
            >
              Add Filters
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1 text-sm border rounded-md bg-white hover:text-black hover:border-black border-[#A8A8A8] text-gray-700"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
