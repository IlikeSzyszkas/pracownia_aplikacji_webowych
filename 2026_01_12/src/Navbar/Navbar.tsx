import { NavLink } from "react-router";
import "./Navbar.scss";

export function Navbar() {
    return (
        <nav className="navbar">
            <NavLink className="navbar-element" to="/">Strona Główna</NavLink>
            <NavLink className="navbar-element" to="/wpisy">Wpisy</NavLink>
            <NavLink className="navbar-element" to="/kategorie">Kategorie</NavLink>
        </nav>
    )
}