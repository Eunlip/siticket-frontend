import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import axiosInstance from '../../utils/axiosConfig';
import Cookies from 'js-cookie';

interface IDataRow {
  nama_pelapor: string;
  email_pelapor: string;
  sektor: string;
  keluhan: string;
  keterangan: string;
}

const columns: TableColumn<IDataRow>[] = [
  {
    name: 'Name',
    selector: (row) => row.nama_pelapor,
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row) => row.email_pelapor,
    sortable: true,
  },
  {
    name: 'Sektor',
    selector: (row) => row.sektor,
    sortable: true,
  },
  {
    name: 'Keluhan',
    selector: (row) => row.keluhan,
    sortable: true,
  },
  {
    name: 'Keterangan',
    selector: (row) => row.keterangan,
    sortable: true,
  },
];

const ComplaintTable = () => {
  const [users, setUsers] = useState<IDataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const role = Cookies.get('role');

  const customStyles = {
    rows: {
      style: {
        backgroundColor: '#f9fafb',
        color: '#000000',
      },
    },
    headCells: {
      style: {
        paddingLeft: '24px',
        paddingRight: '0px',
        fontSize: '16px',
        fontWeight: '700',
        backgroundColor: '#f9fafb',
        color: '#000000',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        paddingLeft: '24px',
        paddingRight: '0px',
        color: '#000000',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f9fafb',
        color: '#000000',
      },
    },
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      if (role === 'admin') {
        const response = await axiosInstance.get('/api/admin/tickets');
        const data = response.data.data;
        setUsers(data);
      } else if (role === 'guest') {
        const response = await axiosInstance.get('/api/guest/tickets');
        const data = response.data.data;
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container mx-auto shadow-md rounded-md">
      <DataTable
        columns={columns}
        data={users}
        customStyles={customStyles}
        progressPending={loading}
        pagination
      />
    </div>
  );
};

export default ComplaintTable;
