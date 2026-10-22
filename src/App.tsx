import { useCallback, useEffect, useState } from 'react'
import './App.css'
import BooksCard from './components/BooksCard'
import Header from './components/Header'
import { Route, Router, Routes } from 'react-router'
import { Suspense, lazy } from 'react';
import ProtectedRoute from './protected-route/protected'
import { useDispatch } from 'react-redux'
const HomeLazy = lazy(() => import('./components/Home'));
const LoginLazy = lazy(() => import('./components/Login'));
const FavoriteBooks = lazy(() => import('./components/Favorate'));
const Account = lazy(() => import('./components/Account'));
import { loginSuccess } from './redux/slice/loginSlice';

function App() {
  const [bookData, setBookData] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSetCard = async (data: any[]) => {
    setBookData(data);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token")
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("user") || '{}');
      dispatch(loginSuccess(user));
    }
  }, [dispatch]);


  return (
    <>
      <Header />
      {/* <Router> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomeLazy handleSetCard={handleSetCard} setLoading={setLoading} bookData={bookData} loading={loading} />} />
          <Route path='/login' element={<LoginLazy />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/favorite-books' element={<FavoriteBooks />} />
            <Route path='/auth/me' element={<Account />} />
          </Route>
        </Routes>
      </Suspense>
      {/* </Router> */}
    </>
  )
}

export default App
