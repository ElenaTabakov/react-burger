import LayoutStyle from "./Layout.module.css";
import AppHeader from "../header/AppHeader";
import { Outlet } from "react-router-dom";

const Layout = ({className} : {className?:string}) => {
  return (
    <div>
      <AppHeader />
      <main className={`${className} ${LayoutStyle.container}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
