import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Remarkable } from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';

function EditPost({ type, method, slug }) {
  const [postTitle, setPostTitle] = useState('')
  const [postSlug, setPostSlug] = useState('')
  const [postBody, setPostBody] = useState('مطلب شما');
  const [preview, setPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  const md = new Remarkable();
  md.renderer = new RemarkableReactRenderer();

  useEffect(() => {
    if (method === 'PATCH') {
      const fetchEditPost = async () => {
        const response = await fetch(`http://localhost:3000/api/${type}/${slug}`);
        const json = await response.json();
  
        if(response.ok) {
          setPostTitle(json.title);
          setPostBody(json.body);
          setPostSlug(json.slug);
        }
      }
  
      fetchEditPost();
    }
  }, [ method, slug, type ]);

  const handleSubmit = async () => {
    if (isLoading) return;
  
    setIsLoading(true);

    const response = await fetch(`http://localhost:3000/api/${type}/${slug}`, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: postTitle,
          slug: postSlug,
          body: postBody,
          token: localStorage.getItem('token'),
        }),
      });

      if(response.ok) {
        setIsLoading(false);
        setRedirect(true);
      } else {
        const json = await response.json();
        setError(json);
      }

    setIsLoading(false);
  }

  const bodyChange = (evt) => {
    setPostBody(evt.target.value);
  }

  const togglePreview = () => {
    setPreview(!preview);
  }

  return (
    <div className="flex-grow flex justify-center">
      <main className="max-w-5xl w-full px-6 sm:px-16 pt-16 pb-10">
        {redirect ? <Navigate to={'/'} /> : null}
        <div>
          <form>
            <input onChange={(t) => setPostTitle(t.target.value)} className="block px-4 py-2 text-2xl rounded focus:outline-none w-full bg-gray-100 mb-4 text-gray-700" type="text" placeholder="عنوان مطلب" value={postTitle} />
            <input onChange={(s) => setPostSlug(s.target.value)} dir="ltr" className="block px-4 py-2 text-2xl rounded focus:outline-none w-full bg-gray-100 text-left mb-1 text-gray-700" type="text" placeholder="slug" value={postSlug} />
            <div className="flex justify-between items-center font-semibold text-2xl pb-2 mb-1 text-gray-600">
              <h2></h2>
                <div className="flex">
                  <div onClick={togglePreview} className="w-5 cursor-pointer hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                    </svg>
                  </div>
                  <div onClick={handleSubmit} className="w-5 cursor-pointer hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-floppy" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                      <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                      <path d="M14 4l0 4l-6 0l0 -4"></path>
                    </svg>
                  </div>
                </div>
            </div>
            <div className={!preview ? 'mt-6' : 'hidden mt-6'}>
              <textarea className='w-full bg-gray-100 focus:outline-none p-4' value={postBody} onChange={bodyChange} onBlur={bodyChange} />
            </div>
            <div className={preview ? '' : 'hidden'}>
              <div className="prose lg:prose-xl prose-pre:text-left prose-h1:text-purple-600 prose-h2:text-purple-600 prose-h3:text-purple-600 prose-h4:text-purple-600 prose-h5:text-purple-600 prose-h6:text-purple-600 max-w-none text-justify">{md.render(postBody)}</div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditPost;
