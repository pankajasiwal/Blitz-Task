import React from 'react';

function Table({ data, totalUniversity, loading, startingIndex, lastIndex }) {
  return (
    <section>
      <h2 className='py-2 text-lg font-bold'>Total University : {totalUniversity}</h2>
      <hr />
      <div className='py-2'>
        {loading ? (
          <p className='text-center font-extrabold'>
            Loading.... <br /> Please wait
          </p>
        ) : (
          <table className='w-full'>
            <thead className='text-left'>
              <tr>
                <th colSpan={1}>University Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(startingIndex, lastIndex).map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.country}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Table;
