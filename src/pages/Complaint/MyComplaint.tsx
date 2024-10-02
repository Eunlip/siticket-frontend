import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import { TUserData } from '../../types/user';
import toast from 'react-hot-toast';
import { LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { RiAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

DataTable.use(DT);

interface IDataRow {
  nama_pelapor: string;
  email_pelapor: string;
  sektor: string;
  keluhan: string;
  keterangan: string;
}

const MyComplaint: React.FC = () => {
  const [tableData, setTableData] = useState<TUserData[]>([]);

  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get('/api/guest/mytickets');
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
      .delete(`api/guest/ticket/delete/${id}`)
      .then(() => {
        toast.success('User has been deleted 😞', {
          style: { fontWeight: 500, fontSize: '14px' },
        });
        getCurrentUser();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkIsCompleted = (id: number) => {
    const ok = window.confirm(
      'Are you sure you want to mark this complaint as completed?',
    );

    if (!ok) {
      return;
    }

    axiosInstance
      .put(`api/guest/ticket/update/${id}`, {
        keterangan: 'closed',
      })
      .then(() => {
        toast.success('Complaint has been marked as completed 😞', {
          style: { fontWeight: 500, fontSize: '14px' },
        });
        getCurrentUser();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const columns = [
    {
      title: 'No',
      data: null,
      render: (data: any, type: any, row: any, meta: { row: number }) =>
        meta.row + 1,
    },
    { title: 'Name', data: 'nama_pelapor' },
    { title: 'Email', data: 'email_pelapor' },
    { title: 'Sektor', data: 'sektor' },
    { title: 'Keluhan', data: 'keluhan', width: '30%' },
    {
      title: 'Keterangan',
      data: 'keterangan',
      render: (data: any, type: any, row: any) => {
        return `<span class="text-xs capitalize font-semibold py-2 px-5 rounded-full ${
          data === 'open'
            ? 'bg-emerald-200 text-emerald-700 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
        }">${data}</span>`;
      },
    },
    { title: 'Actions', data: null },
  ];

  console.log(tableData);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="sm:container dark:bg-boxdark mx-auto overflow-x-scroll sm:overflow-hidden shadow bg-neutral-50 shadow-neutral-300 dark:shadow-neutral-700 rounded-md px-5 py-10">
      <div className="mb-10 flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-2">
        <h1 className="text-2xl font-semibold text-boxdark text-center sm:text-start sm:font-medium dark:text-bodydark1">
          My Complaint
        </h1>
        <Link
          to="/add-complaint"
          className="px-3 mx-auto sm:mx-0 py-2 border rounded-md bg-primary text-white dark:border-blue-500 text-sm flex items-center gap-1 hover:bg-blue-600 transition-all font-medium"
        >
          <RiAddLine className="text-lg" />
          Add Complaint
        </Link>
      </div>
      <div className="overflow-x-scroll sm:overflow-hidden">
        <DataTable
          data={tableData}
          columns={columns}
          options={{
            searching: true,
            paging: true,
          }}
          className="display overflow dark:border-graydark border border-neutral-200 shadow-sm w-full"
          slots={{
            6: (data: any, row: any) => (
              <div className="flex items-center space-x-3.5">
                <button
                  type="button"
                  data-id={row.id}
                  onClick={() => checkIsCompleted(row.id)}
                  className={`text-blue-600 ${
                    row.keterangan === 'closed'
                      ? 'hidden'
                      : 'hover:text-blue-400'
                  }`}
                  disabled={row.keterangan === 'closed'}
                >
                  <IoMdCheckmarkCircleOutline className="text-2xl" />
                </button>
                <a
                  href={`/edit-complaint/${row.id}`}
                  className={`text-yellow-500 ${
                    row.keterangan === 'closed'
                      ? 'hidden'
                      : 'hover:text-yellow-400'
                  }`}
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
  );
};

export default MyComplaint;
