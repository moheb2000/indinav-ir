import PostCard from "../components/PostCard";

function Home() {
  return (
    <div className="flex-grow flex justify-center">
      <main className="max-w-5xl w-full px-6 sm:px-16 pt-16 pb-10">
        <div>
          <h2 className="font-semibold text-xl border-b-2 border-gray-200 pb-2 mb-6 text-gray-600">مطالب منتشر شده</h2>
          <div className="grid sm:grid-cols-2 gap-10">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
