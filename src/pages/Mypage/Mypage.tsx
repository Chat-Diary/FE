import BottomNav from '../../components/common/BottomNav/BottomNav';
import ChangeHeader from '../../components/common/Header/ChangeHeader/ChangeHeader';

const Mypage = () => {
  return (
    <div>
      <ChangeHeader isMypage={true}>마이페이지</ChangeHeader>
      <BottomNav page={3} />
    </div>
  );
};

export default Mypage;
