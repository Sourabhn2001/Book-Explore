import { useState } from 'react'
import './App.css'
import BooksCard from './components/BooksCard'
import Header from './components/Header'
import { Route, Router, Routes } from 'react-router'
import { Suspense, lazy } from 'react';
import ProtectedRoute  from './protected-route/protected'
const HomeLazy = lazy(() => import('./components/Home'));
const LoginLazy = lazy(() => import('./components/Login'));
const FavoriteBooks = lazy(() => import('./components/Favorate'));

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [bookData, setBookData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSetCard = async (data: any[]) => {
    setBookData(data)
  }


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
          </Route>
        </Routes>
      </Suspense>
      {/* </Router> */}
    </>
  )
}

export default App
