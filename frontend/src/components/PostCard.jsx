import { Link } from 'react-router-dom';
import coverImage from '../assets/cover.jpg';

function PostCard() {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={coverImage} alt="cover" className='block w-full h-36 object-cover' />
      <div className='p-6'>
        <Link><h3 className="text-lg font-semibold mb-3 text-gray-600 hover:text-purple-600 transition ease-out duration-300">عنوان پست اول این است!</h3></Link>
        <p className="text-justify text-gray-500">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که.</p>
        <div className='text-sm text-gray-400 pt-2 flex items-center'>
          <div className='w-5'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
              <path d="M16 3v4"></path>
              <path d="M8 3v4"></path>
              <path d="M4 11h16"></path>
              <path d="M11 15h1"></path>
              <path d="M12 15v3"></path>
            </svg>
          </div>
          <div className='mr-1'>۱۳ فروردین ۱۳۹۰</div>
          <div className='w-5 mr-2'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
              <path d="M12 7v5l3 3"></path>
            </svg>
          </div>
          <div className='mr-1'>مطالعه در ۱۵ دقیقه</div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
