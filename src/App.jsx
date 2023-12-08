import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import Pages from './components/Pages';

function App() {
  const [allUniversity, setAllUniversity] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [stats, setStats] = useState({
    countryWithMostUniversity: { country: undefined, university: undefined },
    countryWithLeastUniversity: { country: undefined, university: undefined },
  });

  async function fetchAllUniversity() {
    setIsLoading(true);
    const response = await fetch('http://universities.hipolabs.com/search?name=');
    const data = await response.json();
    setAllUniversity(data);
    setIsLoading(false);

    const universityCounts = {};
    data.forEach((university) => {
      const country = university.country;
      if (universityCounts[country]) {
        universityCounts[country]++;
      } else {
        universityCounts[country] = 1;
      }
    });

    const countries = Object.keys(universityCounts);
    const countryWithMostUniversities = countries.reduce(
      (a, b) => (universityCounts[a] > universityCounts[b] ? a : b),
      [],
    );
    const countryWithLeastUniversities = countries.reduce(
      (a, b) => (universityCounts[a] < universityCounts[b] ? a : b),
      [],
    );

    setStats(() => {
      return {
        countryWithMostUniversity: {
          country: countryWithMostUniversities,
          university: universityCounts[countryWithMostUniversities],
        },
        countryWithLeastUniversity: {
          country: countryWithLeastUniversities,
          university: universityCounts[countryWithLeastUniversities],
        },
      };
    });
  }
  async function fetchByCountryName(country) {
    setIsLoading(true);
    const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
    const data = await response.json();
    setAllUniversity(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchAllUniversity();
  }, []);

  const totalUniversity = allUniversity.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  console.log(stats);

  return (
    <>
      <div className='bg-zinc-800 h-screen relative'>
        <div className='w-full bg-zinc-800 text-zinc-50 px-8 py-4 md:px-16'>
          <SearchBar fetchByCountryName={fetchByCountryName} stats={stats} />
          <Table
            data={allUniversity}
            totalUniversity={totalUniversity}
            loading={loading}
            startingIndex={indexOfFirstItem}
            lastIndex={indexOfLastItem}
          />
          {!loading && (
            <Pages
              data={allUniversity}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
