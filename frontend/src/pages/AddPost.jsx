import EditPost from "../components/EditPost";

function AddPost() {
  return (
    <div>
      <EditPost type="posts" method="POST" slug="" />
    </div>
  );
}

export default AddPost;
