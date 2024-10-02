import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { TUserData } from '../../types/user';
import axiosInstance from '../../utils/axiosConfig';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import toast from 'react-hot-toast';
import { LiaEdit, LiaTrashAlt } from 'react-icons/lia';

DataTable.use(DT);

const DataUser: React.FC = () => {
  const [tableData, setTableData] = useState<TUserData[]>([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get('/api/admin/users');
      const data = response.data.data;
      setTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    const ok = window.confirm('Are you sure you want to delete this user?');

    if (!ok) {
      return;
    }

    axiosInstance
      .delete(`/api/admin/user/delete/${id}`)
      .then(() => {
        toast.success('User has been deleted 😞', {
          style: { fontWeight: 500, fontSize: '14px' },
        });
        getAllUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      title: 'No',
      data: null,
      render: (data: any, type: any, row: any, meta: { row: number }) =>
        meta.row + 1,
    },
    { title: 'Username', data: 'username' },
    { title: 'Email', data: 'email' },
    { title: 'Role', data: 'role' },
    { title: 'Actions', data: null },
  ];

  return (
    <>
      <Breadcrumb pageName="Data Users" />
      <div className="sm:container mx-auto dark:bg-boxdark overflow-x-scroll sm:overflow-hidden shadow bg-neutral-50 shadow-neutral-300 dark:shadow-neutral-700 rounded-md p-5">
        <div className="overflow-x-scroll sm:overflow-hidden">
          <DataTable
            data={tableData}
            columns={columns}
            options={{
              searching: true,
              paging: true,
              autoWidth: true,
              lengthMenu: [
                [10, 15, 20, 50, -1],
                [10, 15, 20, 50, 'All'],
              ],
            }}
            className="display p-5 border dark:border-graydark border-neutral-200 shadow-sm overflow-x-scroll"
            slots={{
              3: (data: any, row: any) => (
                <button
                  className={`text-xs capitalize font-semibold py-1 px-5 rounded-full ${
                    row.role === 'admin'
                      ? 'bg-emerald-200 text-emerald-700 dark:text-indigo-800"'
                      : 'bg-indigo-200 text-indigo-800 hover:bg:blue-500'
                  }`}
                >
                  {row.role}
                </button>
              ),
              4: (data: any, row: any) => (
                <div className="flex items-center space-x-3.5">
                  <a
                    href={`/users/edit-user/${row.id}`}
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    <LiaEdit className="text-2xl" />
                  </a>
                  <button
                    type="button"
                    data-id={row.id}
                    onClick={() => handleDelete(row.id)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    <LiaTrashAlt className="text-2xl" />
                  </button>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DataUser;
