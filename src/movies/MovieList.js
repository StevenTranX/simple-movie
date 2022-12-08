import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../config/config';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import PropTypes from 'prop-types'
const MovieList = ({ type = 'now_playing' }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className='movie-list'>
    {loading &&  <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
        {/* grabCursor để bật có kéo được hay không */}

        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCardSkeleton item={item}></MovieCardSkeleton>
            </SwiperSlide>
          ))}
      </Swiper> }
      {!loading &&<Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
        {/* grabCursor để bật có kéo được hay không */}

        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>}
    </div>
  );
};
MovieList.propTypes = {
  type : PropTypes.string.isRequired
}
export default MovieList;
