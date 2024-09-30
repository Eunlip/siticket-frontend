import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ComplaintTable from '../../components/Tables/ComplaintTable';

const Complaint = () => {
  return (
    <div>
      <Breadcrumb pageName="Data Complaints" />

      <ComplaintTable />
    </div>
  );
};

export default Complaint;
