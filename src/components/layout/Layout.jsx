import LayoutStyle from "./Layout.module.css";
import AppHeader from "../header/AppHeader";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

const Layout = ({ className }) => {
  return (
    <div>
      <AppHeader />
      <main className={`${className} ${LayoutStyle.container}`}>
        <Outlet />
      </main>
    </div>
  );
};
Layout.propTypes = {
  className: PropTypes.string,
};
export default Layout;
