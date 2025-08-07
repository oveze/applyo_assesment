import React from "react";
type PaginationProps = { current: number; total: number; onPage: (page: number) => void; }
const Pagination: React.FC<PaginationProps> = ({ current, total, onPage }) => (
  <div className="flex gap-2 mt-4 justify-center">
    <button disabled={current === 1} onClick={() => onPage(current - 1)}>&lt; Prev</button>
    <span>Page {current} / {total}</span>
    <button disabled={current === total} onClick={() => onPage(current + 1)}>Next &gt;</button>
  </div>
);
export default Pagination;
