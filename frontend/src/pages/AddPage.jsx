import EditPost from "../components/EditPost";

function AddPage() {
  return (
    <div>
      <EditPost type="pages" method="POST" slug="" />
    </div>
  );
}

export default AddPage;
