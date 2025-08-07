import React from "react";
type FilterProps = {
  type: string; year: string;
  setType: (v: string) => void; setYear: (v: string) => void;
}
const Filters: React.FC<FilterProps> = ({type, year, setType, setYear}) => (
  <div className="flex gap-2 mb-4">
    <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded">
      <option value="">All</option>
      <option value="movie">Movie</option>
      <option value="series">Series</option>
    </select>
    <input
      className="border p-2 rounded"
      placeholder="Year"
      value={year}
      onChange={e => setYear(e.target.value.replace(/[^0-9]/g, ""))}
      maxLength={4}
      style={{width: '80px'}}
    />
  </div>
);
export default Filters;
