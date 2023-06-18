function Navbar() {
  return (
    <div>
      <nav className="bg-white">
        <div className="flex justify-center">
          <div className="max-w-5xl w-full flex justify-between items-center py-10 px-6 sm:px-16">
            <h1 className="font-bold text-3xl text-gray-700">ایندیناویر</h1>
            <div className="block sm:hidden w-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 6l16 0"></path>
                <path d="M4 12l16 0"></path>
                <path d="M4 18l16 0"></path>
              </svg>
            </div>
            <div className="hidden sm:flex items-center">
              <ul className="flex">
                <li className="font-semibold border-black border-b-2">صفحه اصلی</li>
                <li className="mr-10">درباره من</li>
                <li className="mr-10">تماس با من</li>
              </ul>
              <div className="w-6 mr-10">
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
