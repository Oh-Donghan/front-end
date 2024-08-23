import top from '../../../assets/image/common/top.png';

export default function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 스크롤을 부드럽게 이동하도록 설정
    });
  };

  return (
    <div className="cursor-pointer fixed bottom-[106px] right-7 z-[100]" onClick={scrollToTop}>
      <img src={top} alt="TOP 버튼 아이콘" className={'w-[46px] h-[46px]'} draggable={false} />
    </div>
  );
}
