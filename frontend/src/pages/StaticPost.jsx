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
      const response = await fetch(`http://localhost:3000/api/posts/${location.pathname.split('/')[location.pathname.split('/').length - 1]}`);
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
      <Post post={post} />
    </div>
  );
}

export default StaticPost;
