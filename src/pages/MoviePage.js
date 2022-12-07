import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../config/config';
import useDebounce from '../hooks/useDebounce';
import MovieCard from '../movies/MovieCard';
import MovieList from '../movies/MovieList';

const MoviePage = () => {
  const [filter, setFilter] = useState('');
  const [url, setUrl] = useState(
    'https://api.themoviedb.org/3/movie/popular?api_key=67649f3aeae7c3a2d82504a13ab67bf3'
  );
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const { data, error } = useSWR(url, fetcher);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=67649f3aeae7c3a2d82504a13ab67bf3&query=${filterDebounce}`
      );
    } else {
      setUrl(
        'https://api.themoviedb.org/3/movie/popular?api_key=67649f3aeae7c3a2d82504a13ab67bf3'
      );
    }
  }, [filterDebounce]);
  const movies = data?.results || [];
  return (
    <div className='py-10 page-container'>
      <div className='flex mb-10'>
        <div className='flex-1 '>
          <input
            type='text'
            className='w-full p-4  outline-none bg-slate-800 text-white'
            placeholder='Type here to search...'
            onChange={handleFilterChange}
          />
        </div>
        <button className=' p-4  bg-primary text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </button>
      </div>
      <div className='grid grid-cols-4 gap-10'>
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
    </div>
  );
};

export default MoviePage;
