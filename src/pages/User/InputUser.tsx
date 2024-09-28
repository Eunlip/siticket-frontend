import React, { useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const InputUser: React.FC = () => {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/admin/user/store', formData);

      if (response.status === 200) {
        toast.success('Horaii!, User has been added👏', {
          style: { fontWeight: 500 },
        });
        navigate('/users/data-users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form User" />

      <form onSubmit={handleSubmit}>
        {/* <!-- Input Fields --> */}
        <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Input Data User
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <SelectGroupTwo
              value={formData.role}
              setValue={(value) => setFormData({ ...formData, role: value })}
            />
            <div>
              <label className="space-y-3 block text-black dark:text-white font-medium">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Example"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder-zinc-500 placeholder-opacity-50"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="space-y-3 block text-black dark:text-white font-medium">
                <span>Username</span>
                <input
                  type="text"
                  name="username"
                  placeholder="Example"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder-zinc-500 placeholder-opacity-50"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="space-y-3 block text-black dark:text-white font-medium">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@example.com"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder-zinc-500 placeholder-opacity-50"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="space-y-3 block text-black dark:text-white font-medium">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder-zinc-500 placeholder-opacity-50"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button
                className="w-25 rounded-md bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default InputUser;
