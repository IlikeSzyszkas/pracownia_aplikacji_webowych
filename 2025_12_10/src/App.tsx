import { Routes, Route, Link } from 'react-router-dom'
import Podstrona1 from './pages/Podstrona1.tsx'
import Podstrona2 from './pages/Podstrona2.tsx'
import Podstrona3 from './pages/Podstrona3.tsx'
import StronaGlowna from "./pages/StronaGlowna.tsx";


function App() {
    return (
        <div>
            <nav>
                <Link to="/">Strona główna</Link> |
                <Link to="/podstrona1"> Podstrona 1</Link> |
                <Link to="/podstrona2"> Podstrona 2</Link> |
                <Link to="/podstrona3"> Podstrona 3</Link> |
            </nav>

            <Routes>
                <Route path="/" element={<StronaGlowna />} />
                <Route path="/podstrona1" element={<Podstrona1 />} />
                <Route path="/podstrona2" element={<Podstrona2 />} />
                <Route path="/podstrona3" element={<Podstrona3 />} />
            </Routes>
        </div>
    )
}

export default App
