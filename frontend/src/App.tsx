import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import HeaderCenter from './components/layout/Header/HeaderCenter/HeaderCenter'
import HeaderLeft from './components/layout/Header/HeaderLeft/HeaderLeft'
import HeaderRight from './components/layout/Header/HeaderRight/HeaderRight'
import SignModal from './components/modals/SignModal/SignModal'
import { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'

const App = () => {
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <>
      <Header>
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
      </Header>
      <SignModal />
      <div ref={parent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App