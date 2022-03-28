import React, { useMemo, useState } from "react";

type PaginationProps = {
  totalPage: number;
  initPage?: number;
  onPageChange?: (page: number) => void;
  numberOfPage?: number;
};

const Pagination = ({
  numberOfPage = 7,
  totalPage,
  initPage = 1,
  onPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageData = useMemo(() => {
    if (totalPage < numberOfPage) {
      return new Array(totalPage).fill({}).map((_, index) => index + 1);
    }
    if (currentPage > totalPage - numberOfPage) {
      return new Array(numberOfPage)
        .fill({})
        .map((_, index) => totalPage - numberOfPage + index + 1);
    }
    const posMiddle = Math.floor(numberOfPage / 2);
    const res = [];
    for (let i = 0; i < numberOfPage; i++) {
      if (i < posMiddle) res.push(currentPage + i);
      if (i === posMiddle) res.push(-1);
      if (i > posMiddle) res.push(totalPage + i - numberOfPage + 1);
    }
    return res;
  }, [totalPage, numberOfPage, currentPage]);
  const renderPage = (page: number, index: number) => {
    const isSelected = currentPage === page;

    return (
      <div
        className={`normal-button page-item ${isSelected && "selected"}`}
        onClick={onChange(page)}
        key={page}
      >
        <span>{page === -1 ? "..." : page}</span>
      </div>
    );
  };
  const onChange = (page: number) => (e: any) => {
    if (page <= 0 || page > totalPage) return;
    setCurrentPage(page);
    onChange?.(page);
  };
  const isDisabledFirst = useMemo(() => currentPage === 1, [currentPage]);
  const isDisabledLast = useMemo(
    () => currentPage === totalPage,
    [currentPage, totalPage]
  );
  return (
    <div className="sc-pagination__container">
      <div
        className={`page-icon ${
          isDisabledFirst ? "disabled" : "normal-button"
        }`}
        onClick={isDisabledFirst ? undefined : onChange(currentPage - 1)}
      >
        <i className="material-icons-outlined">keyboard_arrow_left</i>
      </div>
      {pageData.map(renderPage)}
      <div
        className={`page-icon ${isDisabledLast ? "disabled" : "normal-button"}`}
        onClick={isDisabledLast ? undefined : onChange(currentPage + 1)}
      >
        <i className="material-icons-outlined">keyboard_arrow_right</i>
      </div>
    </div>
  );
};

export default Pagination;
