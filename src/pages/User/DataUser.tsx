import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import UserTable from '../../components/Tables/UsersTable';

const DataUser: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Data Users" />
      <UserTable />
    </>
  );
};

export default DataUser;
