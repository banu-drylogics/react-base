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

interface Topic {
  id: string;
  name: string;
}

function App() {
  const [page, setPage] = useState(1);
  const [topics, setTopics] = useState<Topic[]>([]);
  const { data, isLoading, isError } = useGetTopicsQuery({ q: 'js', per_page: 25, page });

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      setTopics((prevTopics) => [...prevTopics, ...data.items])
    }
  }, [data])

  if (isLoading) return <div className='loader'>Loading...</div>

  if (isError) return <div>Error: Unable to fetch topics.</div>;
  return (
    <div>
      <h1>Git Topics</h1>
      <ul>
        {topics.map((topic: Topic) => (
          <li key={topic.id}>{topic.name}</li>
        ))}
      </ul>
      {data && data.total_count > page * 25 && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}

export default App;
