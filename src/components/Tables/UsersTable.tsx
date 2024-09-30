import { useEffect, useState } from 'react';
import { TUserData } from '../../types/user';
import axiosInstance from '../../utils/axiosConfig';
import { LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import { Link } from 'react-router-dom';

const UserTable = () => {
  const [users, setUsers] = useState<TUserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/admin/users');
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
    <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto rounded-md">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left rounded-xl dark:bg-meta-4">
              <th className="py-4 px-4 font-semibold text-black dark:text-white">
                No
              </th>
              <th className="min-w-[220px] py-4 px-4 font-semibold text-black dark:text-white xl:pl-11">
                Username
              </th>
              <th className="min-w-[220px] py-4 px-4 font-semibold text-black dark:text-white xl:pl-11">
                Email
              </th>
              <th className="min-w-[150px] py-4 px-4 font-semibold text-black dark:text-white">
                Role
              </th>
              <th className="py-4 px-4 font-semibold text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>
                {loading && (
                  <div className="flex justify-center items-center my-10">
                    <p className="text-center text-lg font-medium text-bodydark">
                      Please Wait!
                    </p>
                  </div>
                )}
              </td>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.username}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.email}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`badge border-none badge-lg h-10 w-20 text-white cursor-default font-normal ${
                      user.role === 'admin'
                        ? 'bg-primary'
                        : 'bg-orange-500'
                    }`}
                  >
                    {user.role}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link to='/users/edit-user' className="text-yellow-500 hover:text-yellow-400">
                      <LiaEdit className="text-2xl" />
                    </Link>
                    <button className="text-red-500 hover:text-red-400">
                      <LiaTrashAlt className="text-2xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
