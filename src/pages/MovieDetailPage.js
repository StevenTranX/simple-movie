import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../config/config';
import { apiKey } from '../config/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '../movies/MovieCard';
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  if (!data) return null;
  const { title, backdrop_path, poster_path, genres, overview } = data;
  console.log(data);
  return (
    <div className='py-10'>
      <div className='w-full h-[600px]  relative'>
        <div className='overlay absolute inset-0 bg-black bg-opacity-70'></div>
        <div
          className='w-full h-full bg-cover bg-no-repeat'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className='w-full h-[300px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10'>
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=''
          className='w-full h-full object-cover rounded-xl'
        />
      </div>
      <h1 className='text-center text-white mb-10 font-bold text-3xl'>
        {title}
      </h1>
      {genres.length > 0 && (
        <div className='flex items-center justify-center gap-x-5 mb-10'>
          {genres.map((item) => (
            <span
              key={item.id}
              className='py-2 px-4 border  border-primary rounded-lg text-primary'
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className='text-center leading relaxed max-w-[600px] mx-auto mb-10'></p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
function MovieCredits() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, 'credits'),
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  console.log(data);
  return (
    <>
      <h2 className='text-center text-2xl mb-10 text-white'>Casts</h2>
      <div className='grid grid-cols-4 gap-5'>
        {cast.slice(0, 4).map((item) => (
          <div className='cast-item'>
            <img
              className='w-full h-[350px] object-cover rounded-lg'
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=''
            />
            <h3 className='text-center text-white text-2xl font-medium'>
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
function MovieVideos() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, 'videos'),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results && results.length <= 0) return null;
  return (
    <div className='py-10'>
      <div className='flex flex-col gap-10'>
        {results.slice(0, 2).map((item) => (
          <div key={item.id} className=''>
            <h3 className='mb-5 text-xl text-white font-medium p-3 bg-secondary inline-block'>
              {item.name}
            </h3>
            <div className='w-full aspect-video' key={item.id}>
              <iframe
                width='715'
                height='402'
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.name}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className='w-full h-full'
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, 'similar'),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  return (
    <div className='movie-list'>
      <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
        {/* grabCursor để bật có kéo được hay không */}
        {results.length > 0 &&
          results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
export default MovieDetailPage;
