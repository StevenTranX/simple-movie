import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import { fetcher } from '../config/config';
import useDebounce from '../hooks/useDebounce';
import MovieCard from '../movies/MovieCard';
import MovieList from '../movies/MovieList';
const pageCount = 5;
const itemsPerPage = 20;
// 20 phim / 1 trang
const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [filter, setFilter] = useState('');
  const [url, setUrl] = useState(
    'https://api.themoviedb.org/3/movie/popular?api_key=67649f3aeae7c3a2d82504a13ab67bf3'
  );
  const [nextPage, setNextPage] = useState('');
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const { data, error } = useSWR(url, fetcher);
  console.log(data);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=67649f3aeae7c3a2d82504a13ab67bf3&query=${filterDebounce}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=67649f3aeae7c3a2d82504a13ab67bf3&page=${nextPage}`
      );
    }
  }, [filterDebounce, nextPage]);
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [itemOffset, data]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  if (!data) return null;
  const movies = data?.results || [];
  const loading = !data && !error;

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
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </button>
      </div>
      {loading && !error ? (
        <div className='w-10 h-10 border-4 border-primary rounded-full border-t-transparent mx-auto border-t-4 animate-spin'></div>
      ) : (
        <div className='grid grid-cols-4 gap-10'>
          {movies.length > 0 &&
            movies.map((item) => (
              <MovieCard key={item.id} item={item}></MovieCard>
            ))}
        </div>
      )}
      <div className='mt-10'>
        <ReactPaginate
          breakLabel='...'
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel='< previous'
          renderOnZeroPageCount={null}
          className='pagination'
        />
      </div>

      <div className=' hidden items-center justify-center mt-10 gap-x-5 cursor-pointer'>
        <span
          onClick={() => {
            setNextPage(nextPage - 1);
          }}
          className='leading-none text-white font-semibold text-xl'
        >
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
              d='M15.75 19.5L8.25 12l7.5-7.5'
            />
          </svg>
        </span>
        {new Array(pageCount).fill().map((item, index) => (
          <span
            onClick={() => {
              setNextPage(index + 1);
            }}
            key={index}
            className=' cursor-pointer font-semibold bg-white inline-block rounded text-slate-900 py-2 px-4'
          >
            {index + 1}
          </span>
        ))}
        <span
          onClick={() => {
            setNextPage(nextPage + 1);
          }}
          className='leading-none text-white font-semibold text-2xl cursor-pointer '
        >
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
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
