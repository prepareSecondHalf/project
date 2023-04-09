import Footer from 'components/Footer';
import Header from 'components/Header';
import { NextPage } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Apis } from 'utils/api';

const ReactQueryTest: NextPage = () => {
  const [data, setData] = useState('');

  const { error, status, isLoading } = useQuery(
    'data',
    () => Apis.get('/hello'),
    {
      onSuccess: (res) => setData(res.name),
    },
  );

  console.log('error:::', error);
  console.log('isLoading:::', isLoading);
  console.log('status:::', status);

  return (
    <div className="w-full min-w-[1200px]">
      <Header />
      <div className="w-full">{data}</div>
      <Footer />
    </div>
  );
};

export default ReactQueryTest;
