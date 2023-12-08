import React, { useRef, useState } from 'react';

function SearchBar({ fetchByCountryName, stats }) {
  const [showStats, setShowStats] = useState(false);

  const countryName = useRef('');
  function searchHandler(country) {
    console.log(country);
    fetchByCountryName(country);
    countryName.current.value = '';
  }

  return (
    <div className='relative'>
      <fieldset className='space-x-6 py-4'>
        <input
          ref={countryName}
          type='text'
          placeholder='Search by Country Name'
          className='px-1 py-1 text-zinc-900 outline-none rounded-sm capitalize'
        />
        <button
          className='border-2 border-zinc-100 rounded-md px-4 py-1 hover:bg-zinc-700'
          onClick={() => searchHandler(countryName.current.value)}
        >
          Search
        </button>
      </fieldset>
      <div>
        <button
          className='border-2 border-zinc-100 rounded-md px-4 py-1 hover:bg-zinc-700'
          onClick={() => setShowStats((prev) => !prev)}
        >
          Stats
        </button>
        {showStats && (
          <>
            <p>
              Country with Most Number of Universities : {stats.countryWithMostUniversity.country}{' '}
              <span>({stats.countryWithMostUniversity.university})</span>
            </p>
            <p>
              Country with least Number of Universities : {stats.countryWithLeastUniversity.country}{' '}
              <span>({stats.countryWithLeastUniversity.university})</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
