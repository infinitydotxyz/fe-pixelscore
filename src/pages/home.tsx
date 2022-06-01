import { Button, PageBox } from 'components/common';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <PageBox>
      <div className="w-3/4 mx-auto mt-10">
        <div className="text-2xl">How we rank NFTs</div>
        <div className="mb-12">---</div>
        <div className="text-2xl">FAQ</div>
        <div className="mb-12">---</div>
        <div className="text-2xl">Benefits</div>
        <div className="mb-12">---</div>

        <Button onClick={() => navigate('dashboard')}>Dashboard</Button>
      </div>
    </PageBox>
  );
};
