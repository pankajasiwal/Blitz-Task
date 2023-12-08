import React, { useState } from 'react';

function Pages({ data, itemsPerPage, setCurrentPage, currentPage }) {
  const [pageNumberLimit, setPageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  function handleNext() {
    setCurrentPage((prevPage) => prevPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }
  function handlePrev() {
    setCurrentPage((prevPage) => prevPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className={`px-2 border cursor-pointer hover:bg-zinc-600 `} onClick={handleNext}>
        &hellip;
      </li>
    );
  }

  return (
    <div className='mt-5'>
      <ul className='list-none flex'>
        <li className={`px-2 border cursor-pointer hover:bg-zinc-600 `}>
          <button onClick={handlePrev} disabled={currentPage == pages[0] ? true : false}>
            Prev
          </button>
        </li>

        {pages.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li
                key={number}
                id={number}
                className={`px-2 border cursor-pointer ${currentPage == number && `bg-zinc-200 text-zinc-800`}`}
                onClick={(e) => setCurrentPage(() => e.target.id)}
              >
                {number}
              </li>
            );
          } else {
            return null;
          }
        })}
        {pageIncrementBtn}
        <li className={`px-2 border cursor-pointer hover:bg-zinc-600`}>
          <button onClick={handleNext} disabled={currentPage == pages[pages.length - 1] ? true : false}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pages;
