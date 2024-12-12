import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import IconZoom from "./Icons/IconZoom";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params;
  });

  const [query, setQuery] = useState(searchParams.get("query") || "");

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(window.location.search);
    params.set("page", "1");

    if (term) {
      console.log("called");
      params.set("query", term);
    } else {
      params.delete("query");
    }

    setSearchParams(params);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, 300);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("query") !== query) {
      setQuery(params.get("query") || "");
    }
  }, [searchParams]);
  // const data = await fetchFilteredPodcasts(query, currentPage);

  return (
    <div className="relative">
      <label className="search relative text-gray-400 focus-within:text-gray-600 block ask md:max-w-none">
        <input
          type="text"
          placeholder="Vyhľadávanie..."
          value={query}
          onChange={handleInputChange}
          className="form-input !rounded-[48px] border !border-gray-900 !p-8 !px-4 !bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block !pl-14 focus:outline-none"
        />
        <div className="">
          <IconZoom />
        </div>
      </label>
      {query && (
        <div className="absolute  mt-2 flex flex-col bg-white drop-shadow-md rounded-[16px] w-[300px] z-[3100]">
          {" "}
          <p className="">{query}</p>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
