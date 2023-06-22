import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

function Home() {
  const [ posts, setPosts ] = useState([]);
  const [page, setPage] = useState(1);
  const [isLouding, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Remove all of ignore for production
    let ignore = false;

    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/posts?page=${page}`);
      const json = await response.json();

      if(response.ok && !ignore) {
        setPosts(p => [...p, ...json.rows]);
        setIsLastPage(json.count / (6 * page) <= 1);
        setIsLoading(false);
      }
    }

    fetchPosts();

    return () => {
      ignore = true;
    }
  }, [ page ]);

  useEffect(() => {
    const fetchIsLoggedIn = async () => {
      const response = await fetch(`/api/authers/checklogin`, {
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

  const loadMorePosts = () => {
    if (!isLouding) {
      setPage(page + 1);
    }
  }

  return (
    <div className="flex-grow flex justify-center">
      <main className="max-w-5xl w-full px-6 sm:px-16 pt-16 pb-10">
        <div>
          <div className="flex justify-between items-center font-semibold text-xl border-b-2 border-gray-200 pb-2 mb-6 text-gray-600">
            <h2>مطالب منتشر شده</h2>
            <div className={isLoggedIn ? "" : "hidden"}>
              <Link to={'/post/add'}>
                <div className="w-5 cursor-pointer hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-rounded-plus" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 12h6"></path>
                    <path d="M12 9v6"></path>
                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-10">
            {posts && posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className={isLastPage ? "hidden" : ""}>
            <div className="flex justify-center mt-6">
              <div className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-purple-600 border-2 border-purple-600 transform hover:scale-125 transition ease-out duration-300" onClick={loadMorePosts}>{isLouding ? 'لطفا صبر کنید...' : 'مطالب بیشتر'}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
