import React from "react";
import { Search } from "lucide-react";

export const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <Search size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search jobs..."
      />
    </div>
  );
};
