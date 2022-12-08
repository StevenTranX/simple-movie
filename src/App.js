import { Fragment, lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import 'swiper/scss';
import './App.css';
import Banner from './components/banner/Banner';
import Main from './components/layout/Main';
import MovieList from './movies/MovieList';

// https://api.themoviedb.org/3/movie/now_playing?api_key=67649f3aeae7c3a2d82504a13ab67bf3
const HomePage = lazy(() => import('./pages/HomePage'))
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'))
const MoviePage = lazy(() => import('./pages/MoviePage'))

function App() {
  // ! Bài tập lần này có sử dụng thư viện swr, swr là thư viện gọi API rất mạnh mẽ,
  // ! Bình thường mình sẽ tự useEffect rồi dùng axios, còn swr có sẵn cho mình
  return (

    <Fragment>
    <Suspense fallback = {<></>}>
    {/* fallback này giống như loading  */}
    <Routes>
        <Route element={<Main></Main>}>
          {/* muốn trang nào cũng xuất hiện header thì ko để path */}
          <Route
            path='/'
            element={
              <>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path='/movies' element={<MoviePage></MoviePage>}></Route>
          <Route
            path='/movie/:movieId'
            element={<MovieDetailPage></MovieDetailPage>}
          ></Route>
        </Route>
      </Routes>
    </Suspense>
    
    </Fragment>
  );
}

export default App;
