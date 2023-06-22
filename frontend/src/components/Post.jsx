import persianDate from "persian-date";
import { Remarkable } from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Post({ post }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const md = new Remarkable();
  md.renderer = new RemarkableReactRenderer();

  useEffect(() => {
    const fetchIsLoggedIn = async () => {
      const response = await fetch(`http://localhost:3000/api/authers/checklogin`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      const json = await response.json();

      if(response.ok) {
        setIsLoggedIn(json.verify || false);
      }
    }

    fetchIsLoggedIn();
  }, []);

  function readingTime(text) {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    const persianTime = time.toString().split('').map(n => persianNumbers[n]).join('');
    return persianTime;
  }

  return (
    <div className="flex-grow flex justify-center">
      <main className="max-w-5xl w-full px-6 sm:px-16 pt-16 pb-10">
        <div>
          <article>
            <div className="flex justify-between items-center font-semibold text-2xl pb-2 mb-1 text-gray-600">
              <h2>{post && post.title}</h2>
              <div className={isLoggedIn ? "" : "hidden"}>
                <div className="flex">
                  <div className="w-5 cursor-pointer hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                      <path d="M16 5l3 3"></path>
                    </svg>
                  </div>
                  <div className="w-5 cursor-pointer hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M4 7l16 0"></path>
                      <path d="M10 11l0 6"></path>
                      <path d="M14 11l0 6"></path>
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-sm text-gray-400 pt-2 flex items-center mb-6'>
              <div className='w-5'>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                </svg>
              </div>
              <div className='mr-1'>{post && post.auther.displayName}</div>
              <div className='w-5 mr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
                  <path d="M16 3v4"></path>
                  <path d="M8 3v4"></path>
                  <path d="M4 11h16"></path>
                  <path d="M11 15h1"></path>
                  <path d="M12 15v3"></path>
                </svg>
              </div>
              <div className='mr-1'>{post && new persianDate(post.createdAt).format('DD MMMM YYYY')}</div>
              <div className='w-5 mr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clock" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                  <path d="M12 7v5l3 3"></path>
                </svg>
              </div>
              <div className='mr-1'>مطالعه در {post && readingTime(post.body)} دقیقه</div>
            </div>
            <div className="prose lg:prose-xl prose-pre:text-left prose-h1:text-purple-600 prose-h2:text-purple-600 prose-h3:text-purple-600 prose-h4:text-purple-600 prose-h5:text-purple-600 prose-h6:text-purple-600 max-w-none text-justify">{post && md.render(post.body)}</div>
          </article>
        </div>
      </main>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.any,
};

export default Post;
