import { useLocation } from "react-router-dom";
import EditPost from "../components/EditPost";

function ModifyPost() {
  const location = useLocation();
  return (
    <div>
      <EditPost type="posts" method="PATCH" slug={location.pathname.split('/')[2]} />
    </div>
  );
}

export default ModifyPost;
