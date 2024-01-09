import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from '../api/tvmaza';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';

// const reducerFn = (currentCounter, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return currentCounter + 1;
//     case 'DECREMENT':
//       return currentCounter - 1;
//     case 'RESET':
//       return 0;
//     case 'SET_VALUE':
//       return action.newCounterValue;
//   }

//   return 0;
// };

const Home = () => {
  const [filter, setFilter] = useState(null);

  // const [counter, dispatch] = useReducer(reducerFn, 0);

  // const onIncrement = () => {
  //   dispatch({ type: 'INCREMENT' });
  // };

  // const onDecrement = () => {
  //   dispatch({ type: 'DECREMENT' });
  // };

  // const onReset = () => {
  //   dispatch({ type: 'RESET' });
  // };

  // const onSetToValue = () => {
  //   dispatch({ type: 'SET_VALUE', newCounterValue: 500 });
  // };

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),
    // ⬇️ disabled as long as the filter is empty
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  // const [apiData, setApiData] = useState(null);
  // const [apiDataError, setApiDataError] = useState(null);

  const onSearch = async ({ q, searchOption }) => {
    setFilter({ q, searchOption });

    // try {
    //   setApiDataError(null);

    //   let result;

    //   if (searchOption === 'shows') {
    //     result = await searchForShows(q);
    //   } else {
    //     result = await searchForPeople(q);
    //   }

    //   setApiData(result);
    // } catch (error) {
    //   setApiDataError(error);
    // }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>An error occurred: {apiDataError.message}</div>;
    }

    if (apiData?.length === 0) {
      return <div>No results found</div>;
    }

    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }

    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />

      {/* <div>Counter: {counter}</div>
      <button type="button" onClick={onIncrement}>
        Increment
      </button>
      <button type="button" onClick={onDecrement}>
        Decrement
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>

      <button type="button" onClick={onSetToValue}>
        Set 500
      </button> */}

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;

// apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)

// apiData.map(data => (
//   <div key={data.person.id}>{data.person.name}</div>
// ))
