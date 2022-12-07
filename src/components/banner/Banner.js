import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../config/config';
import { Swiper, SwiperSlide } from 'swiper/react';
const Banner = () => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=67649f3aeae7c3a2d82504a13ab67bf3`,
    fetcher
  );
  const movies = data?.results || [];
  console.log(movies);
  return (
    <section className='banner h-[500px]  mb-10 page-container'>
      <Swiper grabCursor='true' slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { title, vote_average, release_date, poster_path } = item;
  return (
    <div className='w-full h-full rounded-lg relative'>
      <div className='overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg'></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=''
        className='h-full w-full object-cover rounded-lg'
      />
      <div className='absolute left-5 bottom-5 w-full text-white'>
        <h2 className='font-bold text-3xl mb-3 '>{title}</h2>
        <div className='flex items-center gap-x-3 mb-8'>
          <span className='py-2 px-4 border border-white rounded-md'>
            Adventure
          </span>
          <span className='py-2 px-4 border border-white rounded-md'>
            Adventure
          </span>
          <span className='py-2 px-4 border border-white rounded-md'>
            Adventure
          </span>
        </div>
        <button className='py-3 px-6 rounded-lg bg-primary text-white font-medium'>
          Watch Now
        </button>
      </div>
    </div>
  );
}
export default Banner;
