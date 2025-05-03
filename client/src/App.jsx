import { useState,useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';

import authReq from './functionComponent/apiAuth'

import Header from './components/Header/Header'
import Form from './components/FormRegistration/Form'
import BooksPage from './components/pages/BooksPage'
import BookPage from './components/pages/BookPage'
import MyBookPage from './components/pages/MyBookPage'
import FavouritesPage from './components/pages/FavouritesPage'
import Footer from './components/Footer/Footer';

function App() {
  const [userData,setUserData] = useState(null)
  const [isAuth,setAuth] = useState(false)

  const fetchUserData = async () => {
    try{
      const data = await authReq()
      setAuth(true)
      setUserData(data.user)
    }catch{
      setAuth(false)
    }
  }

  const logout = () => {
    setAuth(false);
    setUserData(null);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Header user={userData} isAuth={isAuth} onLogout={logout}/>
      <main>
      <Routes>
        <Route path='/auth' element={
          isAuth ? (
            <Navigate to='/books' replace/>
          ):(
            <Form setAuth={setAuth} setUserData={setUserData}/>
          )
        }/>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path='/books' element={<BooksPage user={userData} isAuth={isAuth}/>}/>
        <Route path='/book/:id' element={<BookPage user={userData}/>}/>
        <Route path='/mybook' element={<MyBookPage user={userData}/>}/>
        <Route path='/favourites' element={<FavouritesPage user={userData}/>}/>
      </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
