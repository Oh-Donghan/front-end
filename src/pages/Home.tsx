import Input from '../components/main/input/input';
import Banner from '../components/main/banner/Banner';
import Categories from '../components/main/categories/Categories';
import { FaPlus } from 'react-icons/fa6';
import ItemList from '../components/main/item/ItemList';
import hot from '../assets/image/main/hot.png';
import { IoChatbubbleEllipses } from 'react-icons/io5';

export default function Home() {
  return (
    <div className="relative">
      <div className="fixed bottom-8 right-6 z-[100] cursor-pointer">
        <IoChatbubbleEllipses size={50} />
      </div>
      <Banner />
      <Input />
      <Categories />
      <section className="px-8 mt-12 sm:mt-[112px]">
        <div className="flex items-center mb-4 sm:mb-5">
          <span className="font-bold ml-0 text-xl sm:text-2xl sm:ml-3">지금 핫한 경매</span>
          <img src={hot} alt="" className="w-6 h-6 ml-2" />
        </div>
        <ItemList type={'hot'} />
      </section>
      <section className="px-10 mb-12 sm:mb-20 mt-12 sm:mt-20 ">
        <div className="flex items-end justify-between mb-4 sm:mb-5">
          <span className="font-bold ml-0 text-xl sm:text-2xl sm:ml-3">전체 경매</span>
          <div className="flex items-center cursor-pointer mr-3 text-gray-500">
            <FaPlus color="rgba(160,160,160,1)" className="mr-1" size={13} />
            <span className="text-sm pt-0.5">더보기</span>
          </div>
        </div>
        <ItemList />
      </section>
    </div>
  );
}
