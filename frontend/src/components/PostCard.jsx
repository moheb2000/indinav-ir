import coverImage from '../assets/cover.jpg';

function PostCard() {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={coverImage} alt="cover" className='block w-full h-36 object-cover' />
      <div className='p-6'>
        <h3 className="text-lg font-semibold mb-3">عنوان پست اول این است!</h3>
        <p className="text-justify">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که.</p>
        <div className='text-sm font-light text-gray-500 pt-2'>
          <span>۱۳ فروردین ۱۳۹۰</span>
          <span className='mr-2'>مطالعه در ۱۵ دقیقه</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
