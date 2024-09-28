import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableDashboard from '../components/Tables/UsersTable';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableDashboard />
      </div>
    </>
  );
};

export default Tables;
