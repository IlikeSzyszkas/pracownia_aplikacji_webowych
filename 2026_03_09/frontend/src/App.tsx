import Navbar from './components/Navbar/Navbar.tsx'
import { Route, Routes } from 'react-router'
import Home from './scenes/Home'
import Posts from './scenes/Posts'
import Post from './scenes/Post'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wpisy" element={<Posts />} />
        <Route path="/wpisy/:id" element={<Post />} />
      </Routes>
    </>
  )
}

export default App
