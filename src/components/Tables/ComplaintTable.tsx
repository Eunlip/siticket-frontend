import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import Cookies from 'js-cookie';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import toast from 'react-hot-toast';

DataTable.use(DT);
interface IDataRow {
  id: number;
  nama_pelapor: string;
  email_pelapor: string;
  sektor: string;
  keluhan: string;
  keterangan: string;
}

const ComplaintTable = () => {
  const [tableData, setTableData] = useState<IDataRow[]>([]);
  const role = Cookies.get('role');

  const getAllUsers = async () => {
    try {
      if (role === 'admin') {
        const response = await axiosInstance.get('/api/admin/tickets');
        const data = response.data.data;
        setTableData(data);
      } else if (role === 'guest') {
        const response = await axiosInstance.get('/api/guest/tickets');
        const data = response.data.data;
        setTableData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    const ok = window.confirm('Are you sure you want to delete this user?');

    if (!ok) {
      return;
    }

    if (role === 'guest') {
      axiosInstance
        .delete(`api/guest/ticket/delete/${id}`)
        .then(() => {
          toast.success('User has been deleted 😞', {
            style: { fontWeight: 500, fontSize: '14px' },
          });
          getAllUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (role === 'admin') {
      axiosInstance
        .delete(`api/admin/ticket/delete/${id}`)
        .then(() => {
          toast.success('User has been deleted 😞', {
            style: { fontWeight: 500, fontSize: '14px' },
          });
          getAllUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const checkIsCompleted = (id: number) => {
    const ok = window.confirm(
      'Are you sure you want to mark this complaint as completed?',
    );

    if (!ok) {
      return;
    }

    if (role === 'guest') {
      axiosInstance
        .put(`api/guest/ticket/update/${id}`, {
          keterangan: 'closed',
        })
        .then(() => {
          toast.success('Complaint has been marked as completed 😞', {
            style: { fontWeight: 500, fontSize: '12px' },
          });
          getAllUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (role === 'admin') {
      axiosInstance
        .put(`api/admin/ticket/update/${id}`, {
          keterangan: 'closed',
        })
        .then(() => {
          toast.success('Complaint has been marked as completed 😞', {
            style: { fontWeight: 500, fontSize: '10px' },
          });
          getAllUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Fungsi untuk menambahkan kolom Actions jika role === 'admin'
  const baseColumns = [
    {
      title: 'No',
      data: null,
      render: (_data: any, _type: any, _row: any, meta: { row: number }) =>
        meta.row + 1,
    },
    { title: 'Name', data: 'nama_pelapor' },
    { title: 'Email', data: 'email_pelapor' },
    { title: 'Sektor', data: 'sektor' },
    { title: 'Keluhan', data: 'keluhan', width: '30%' },
    {
      title: 'Keterangan',
      data: 'keterangan',
      render: (data: any, _type: any, _row: any) => {
        return `<span class="text-xs capitalize font-semibold py-2 px-5 rounded-full ${
          data === 'open'
            ? 'bg-emerald-200 text-emerald-700 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
        }">${data}</span>`;
      },
    },
    ...(role === 'admin'
      ? [
          {
            title: 'Actions',
            data: null,
          },
        ]
      : []),
  ];

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="overflow-x-scroll sm:overflow-hidden dark:bg-boxdark">
      {role === 'admin' ? (
        <DataTable
          data={tableData}
          columns={baseColumns.filter((column) => column !== undefined)}
          options={{
            searching: true,
            paging: true,
            autoWidth: true,
            lengthMenu: [
              [10, 15, 20, 50, -1],
              [10, 15, 20, 50, 'All'],
            ],
          }}
          className="display table overflow border border-neutral-200 dark:border-graydark shadow-sm w-full"
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
      ) : (
        <DataTable
          data={tableData}
          columns={baseColumns.filter((column) => column !== undefined)}
          options={{
            searching: true,
            paging: true,
            autoWidth: true,
            lengthMenu: [
              [10, 15, 20, 50, -1],
              [10, 15, 20, 50, 'All'],
            ],
          }}
          className="display overflow dark:border-graydark border border-neutral-200 shadow-sm w-full"
        />
      )}
    </div>
  );
};

export default ComplaintTable;
