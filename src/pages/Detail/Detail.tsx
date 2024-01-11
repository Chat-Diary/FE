import { useNavigate } from 'react-router-dom';
import DetailHeader from '../../components/Headers/DetailHeader';

const Detail = () => {
  const navigate = useNavigate();

  const onChangeEdit = () => {
    // navigate('/');
    console.log('편집 버튼 클릭');
  };

  return <DetailHeader onClick={onChangeEdit}>땡월땡일</DetailHeader>;
};

export default Detail;
