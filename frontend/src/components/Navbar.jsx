import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [hideMenu, setHideMenu] = useState(true);

  const toggleMenu = () => {
    setHideMenu(!hideMenu);
  };

  return (
    <div>
      <nav className="bg-white">
        <div className="flex justify-center">
          <div className="max-w-5xl w-full flex flex-col sm:flex-row justify-between items-center py-10 px-6 sm:px-16">
            <div className="w-full sm:w-auto flex justify-between items-center">
              <Link to={''}><h1 className="font-bold text-3xl text-gray-700 hover:text-gray-800 transition ease-out duration-300">ایندیناویر</h1></Link>
              <div className="block sm:hidden w-6 cursor-pointer" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 6l16 0"></path>
                  <path d="M4 12l16 0"></path>
                  <path d="M4 18l16 0"></path>
                </svg>
              </div>
            </div>
            <div className={`sm:flex flex-col sm:flex-row text-center items-center text-gray-600 ${hideMenu ? "hidden" : "flex"}`}>
              <ul className="flex flex-col sm:flex-row">
                <Link to={''}><li className="font-semibold text-purple-600 hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300 mt-4 sm:mt-0">صفحه اصلی</li></Link>
                <Link to={'page/about'}><li className="sm:mr-10 hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300 mt-4 sm:mt-0">درباره من</li></Link>
                <Link to={'contact'}><li className="sm:mr-10 hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300 mt-4 sm:mt-0">تماس با من</li></Link>
              </ul>
              <div className="w-6 sm:mr-10 hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300 cursor-pointer mt-4 sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                  <path d="M21 21l-6 -6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
