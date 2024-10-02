import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ComplaintTable from '../../components/Tables/ComplaintTable';
import { RiAddLine } from 'react-icons/ri';

const Complaint = () => {
  return (
    <div>
      <Breadcrumb pageName="Data Complaints" />
      <div className="sm:container mx-auto overflow-x-scroll sm:overflow-hidden shadow bg-neutral-50 shadow-neutral-300 dark:bg-boxdark dark:shadow-neutral-700 rounded-md p-5">
        <Link
          to="/add-complaint"
          className="px-3 w-fit sm:mx-0 py-2 border rounded-md bg-primary text-white dark:border-blue-500 text-sm flex gap-1 hover:bg-blue-600 transition-all font-medium"
        >
          <RiAddLine className="text-lg" />
          Add Complaint
        </Link>
        <ComplaintTable />
      </div>
    </div>
  );
};

export default Complaint;
