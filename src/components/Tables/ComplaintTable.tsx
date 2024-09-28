import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import axiosInstance from '../../utils/axiosConfig';

interface DataRow {
  nama_pelapor: string;
  email_pelapor: string;
  sektor: string;
  keluhan: string;
  keterangan: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: 'Nama',
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

const customStyles = {
  table: {
    style: {
      backgroundColor: '#000',
      borderRadius: '0.5rem'
    },
  },
  rows: {
    style: {
      minHeight: '72px',
    },
  },
  headCells: {
    style: {
      paddingLeft: '24px',
      paddingRight: '0px',
      fontSize: '14px',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
      paddingLeft: '24px',
      paddingRight: '0px',
    },
  },
};

const ComplaintTable = () => {
  const [users, setUsers] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/admin/tickets');
      const data = response.data.data;
      setUsers(data);
      setLoading(false);
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
    <div className="container mx-auto shadow-lg rounded-md">
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
