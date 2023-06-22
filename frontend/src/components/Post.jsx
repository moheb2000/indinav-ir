import persianDate from "persian-date";
import { Remarkable } from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import PropTypes from "prop-types";

function Post({ post }) {
  const md = new Remarkable();
  md.renderer = new RemarkableReactRenderer();

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
            <h2 className="font-semibold text-2xl pb-2 mb-1 text-gray-600">{post && post.title}</h2>
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
            <div className="prose lg:prose-xl prose-pre:text-left prose-h1:text-purple-600 prose-h2:text-purple-600 prose-h3:text-purple-600 prose-h4:text-purple-600 prose-h5:text-purple-600 prose-h6:text-purple-600">{post && md.render(post.body)}</div>
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
