// import React, { useState } from 'react';
import './App.css';
// import BillingTable from './components/billing_table';
// import PokemonDetails from './components/topics_table/Topics';


// function App() {

//   return (
//     <div className="container">
//       < BillingTable />
//       <PokemonDetails />
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { useGetTopicsQuery } from './services/githubAPI';
import { HeaderRow } from './components/topics_table/HeaderRow';
import { TableRow } from './components/topics_table/TableRow';
import { ColState } from './components/topics_table/types';
var _ = require('lodash');

interface Topic {
  id: string;
  name: string;
}

function App() {
  const [page, setPage] = useState(1);
  const [topics, setTopics] = useState<ColState[]>([]);
  const { data, isLoading, isError } = useGetTopicsQuery({ q: 'javascript-applications', per_page: 20, page });

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const CloumnArray = (data) ? _.keys(data.items[0]).map((d: string) => d.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')) : undefined;

  useEffect(() => {
    if (data) {
      setTopics((prevTopics) => [...prevTopics, ...data.items])
    }
  }, [data])

  if (isLoading) return <div className='loader'>Loading...</div>;

  if (isError) return <div>Error: Unable to fetch topics.</div>;

  return (
    <div>
      <h1>Git Topics</h1>
      <div className="container">
        <table>
          <HeaderRow headers={CloumnArray} />
          <TableRow records={topics} />
        </table>
      </div>
      {data && data.total_count > page * 20 && (
        <button className='button' onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}

export default App;
