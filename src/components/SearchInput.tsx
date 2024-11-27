"use client";
import IconZoom from "./Icons/IconZoom";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  //   const searchParams = useSearchParams();
  //   const pathname = usePathname();
  //   const { replace } = useRouter();

  //   const handleSearch = useDebouncedCallback((term) => {
  //     console.log(`Searching... ${term}`);

  //     const params = new URLSearchParams(searchParams);
  //     params.set("page", "1");
  //     if (term) {
  //       params.set("query", term);
  //     } else {
  //       params.delete("query");
  //     }
  //     replace(`${pathname}?${params.toString()}`);
  //   }, 300);
  return (
    <label className="relative text-gray-400 focus-within:text-gray-600 block ask  md:max-w-none   ">
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Vyhľadávanie..."
        // onChange={(e) => {
        //   handleSearch(e.target.value);
        // }}
        className="form-input !rounded-[48px] border  !border-gray-900 !p-8 !px-4 !bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block !pl-14 focus:outline-none"
        // defaultValue={searchParams.get("query")?.toString()}
      />
      <div className="">
        <IconZoom />
      </div>
    </label>
  );
};

export default SearchInput;
