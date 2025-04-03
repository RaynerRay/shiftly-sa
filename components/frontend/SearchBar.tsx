"use client";

import { ChevronDown, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
// import Select from "react-select";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
// import { locations } from './../../lib/locations';

interface OptionType {
  value: string;
  label: string;
}

export default function SearchBar() {
  const router = useRouter(); // Initialize router
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [profession, setProfession] = useState<string>("careWorker"); // State for profession
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const professions = [
    { value: "careWorker", label: "Care Worker" },
    { value: "nurse", label: "Nurse" },
    { value: "adultSocialWorker", label: "Adult Social Worker" },
    { value: "childrenSocialWorker", label: "Chidren Social Worker" },
  ];

  // const filteredOptions = locations.filter((option) =>
  //   option.label.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm(""); // Clear search after selection
  };

  // Handle form submission and navigation
  const handleSearch = () => {
    if (selectedOption) {
      router.push(`/search?city=${selectedOption.value}&profession=${profession}`);
    } else {
      // alert("Please select a location");
    }
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-r from-sky-600 to-sky-700">
    <div className="flex flex-col md:flex-row items-center justify-between z-10 relative bg-gray-500/40 p-8 rounded-lg mx-1">
  <div ref={dropdownRef} className="relative w-full md:w-5/12 mx-4 mb-4 md:mb-0 text-gray-900">
    <div
      className="flex items-center bg-white border border-slate-300 gap-4 rounded py-2 px-3 cursor-pointer text-gray-900"
      onClick={() => setIsOpen(!isOpen)}
    >
      <input
        type="text"
        placeholder={selectedOption ? selectedOption.label : "Select location..."}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        className="w-full outline-none border border-slate-100 text-gray-900 rounded-sm"
      />
      <ChevronDown className="ml-2 h-5 w-5 text-gray-500" />
    </div>

    {/* {isOpen && (
      <ul className="absolute z-10 w-full bg-gray-100 border border-slate-300 rounded mt-1 max-h-60 overflow-y-auto">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer p-2 hover:bg-slate-100 text-gray-900"
            >
              {option.label}
            </li>
          ))
        ) : (
          <li className="p-2 text-slate-900">No results found</li>
        )}
      </ul>
    )} */}
  </div>

  <select
    className="w-full md:w-5/12 mb-2 md:mb-0 mr-0 md:mr-2 py-4 rounded border border-slate-300 text-gray-900"
    value={profession}
    onChange={(e) => setProfession(e.target.value)}
  >
    <option value="" disabled>Select a profession</option>
    {professions.map((prof) => (
      <option key={prof.value} value={prof.value}>
        {prof.label}
      </option>
    ))}
  </select>

  <button
    className="bg-sky-500/40 text-white w-full md:w-2/12 rounded flex items-center px-2 justify-center py-4 hover:bg-sky-500 hover:text-white transition"
    onClick={handleSearch}
  >
    <Search className="mr-2" />
    Search
  </button>
</div>

    
    </div>
  );
}
