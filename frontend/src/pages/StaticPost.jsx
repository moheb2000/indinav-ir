import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Post from '../components/Post';

function StaticPost() {
  const [ post, setPost ] = useState(null);
  const [isLouding, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Remove all of ignore for production
    let ignore = false;

    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/posts/${location.pathname.split('/')[location.pathname.split('/').length - 1]}`);
      const json = await response.json();

      if(response.ok && !ignore) {
        setPost(json);
        setIsLoading(false);
      }
    }

    fetchPosts();

    return () => {
      ignore = true;
    }
  }, [ location ]);

  return (
    <div>
      {!isLouding ? (<Post post={post} type="posts" />) : (
        <div className="flex justify-center mt-6">
          <div className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full border-2 border-purple-600">لطفا صبر کنید...</div>
        </div>
      )}
    </div>
  );
}

export default StaticPost;
