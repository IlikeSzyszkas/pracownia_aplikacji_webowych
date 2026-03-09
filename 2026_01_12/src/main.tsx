import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from './Layout.tsx'
import { StronaGlowna } from "./Home/StronaGlowna";
import { Wpisy } from "./Posts/Wpisy";
import { Kategorie } from "./Category/Kategorie";
import "./main.scss";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<StronaGlowna />} />
                <Route path="wpisy">
                    <Route index element={<Wpisy />} />
                    <Route path=":id" element={<Wpisy />} />
                </Route>
                <Route path="kategorie">
                    <Route index element={<Kategorie />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>,
)