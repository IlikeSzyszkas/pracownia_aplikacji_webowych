import {Navbar} from "./Navbar/Navbar";
import {Outlet} from "react-router";

export function Layout(): React.ReactElement {
    return (
        <main>
            <Navbar/>
            <Outlet/>
        </main>
    )
}