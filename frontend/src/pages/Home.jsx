import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

function Home() {
  const [ posts, setPosts ] = useState([]);
  const [page, setPage] = useState(1);
  const [isLouding, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    // Remove all of ignore for production
    let ignore = false;

    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/posts?page=${page}`);
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

  const loadMorePosts = () => {
    if (!isLouding) {
      setPage(page + 1);
    }
  }

  return (
    <div className="flex-grow flex justify-center">
      <main className="max-w-5xl w-full px-6 sm:px-16 pt-16 pb-10">
        <div>
          <h2 className="font-semibold text-xl border-b-2 border-gray-200 pb-2 mb-6 text-gray-600">مطالب منتشر شده</h2>
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
