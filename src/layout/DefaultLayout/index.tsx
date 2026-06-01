import { Outlet } from "react-router-dom";
import {Header} from "../../components/Header";

export function DefaultLayout() {
    return (
        <div className="flex w-full rounded-xl">
            <Header />
            <Outlet />
        </div>
    )
}