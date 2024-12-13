import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import IconZoom from "./Icons/IconZoom";
import { SearchData } from "../lib/interface";
import { Link } from "react-router-dom";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params;
  });

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [results, setResults] = useState<SearchData[]>([]);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
      setCheck(true);
    } else {
      params.delete("query");
      setResults([]);
    }

    setSearchParams(params);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        console.log(query);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/search/searchdata`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              query: searchParams.get("query") || "",
              currentPage: Number(searchParams.get("page") || "1"),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const responseData = await response.json();

        console.log("Search results:", responseData);
        setResults(responseData);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
        setCheck(false);
      }
    };

    if (check) {
      fetchSearchResults();
    }
  }, [check]);

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
          {isLoading && <p>Loading...</p>}
          {!isLoading && results.length > 0 && (
            <ul className="!m-0">
              {results.map((object, index) => (
                <Link to={object.link} key={index} reloadDocument>
                  <li key={index} className="hover:underline">
                    <h6 className="line-clamp-1"> {object.nazov}</h6>
                    <div
                      className="content line-clamp-1"
                      dangerouslySetInnerHTML={{ __html: object.najdeny_text }}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          )}
          {/* {results.length === 0 && query && <p>No results found.</p>} */}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
