import { useLocation } from "react-router-dom";
import EditPost from "../components/EditPost";

function ModifyPage() {
  const location = useLocation();
  return (
    <div>
      <EditPost type="pages" method="PATCH" slug={location.pathname.split('/')[2]} />
    </div>
  );
}

export default ModifyPage;
