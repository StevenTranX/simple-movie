import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../config/config';
import MovieCard from './MovieCard';
const MovieList = ({ type = 'now_playing' }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const movies = data?.results || [];
  return (
    <div className='movie-list'>
      <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
        {/* grabCursor để bật có kéo được hay không */}

        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
