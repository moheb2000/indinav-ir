import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
