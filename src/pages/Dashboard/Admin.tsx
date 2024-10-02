import React, { useEffect } from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import { PiEnvelopeOpenDuotone, PiEnvelopeDuotone } from 'react-icons/pi';
import axiosInstance from '../../utils/axiosConfig';
import { LiaMailBulkSolid } from 'react-icons/lia';
import CardDataStats from '../../components/CardDataStats';

export interface IStats {
  open: number;
  closed: number;
  total: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = React.useState<IStats>({
    open: 0,
    closed: 0,
    total: 0,
  });

  const getStats = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/tickets/all');
      const data = response.data;
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats
          title="Ticket Open"
          total={stats.open}
          rate="0.43%"
          levelUp
        >
          <PiEnvelopeOpenDuotone className="text-2xl text-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats
          title="Ticket Close"
          total={stats.closed}
          rate="2.59%"
          levelUp
        >
          <PiEnvelopeDuotone className="text-2xl text-primary dark:fill-white" />
        </CardDataStats>
        <CardDataStats
          title="Total Ticket"
          total={stats.total}
          rate="0.95%"
          levelDown
        >
          <LiaMailBulkSolid className="text-3xl text-primary dark:fill-white"/>
        </CardDataStats>
      </div>
      {/*grid grid-cols-2 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5*/}
      <div className="mt-4">
        <ChartOne />
      </div>
    </>
  );
};

export default AdminDashboard;
