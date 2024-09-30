import React from 'react';
import ComplaintTable from '../../components/Tables/ComplaintTable';
import { Link } from 'react-router-dom';
import { RiAddLine } from 'react-icons/ri';

const Guest: React.FC = () => {
  return (
    <>
      <div className="dark:bg-boxdark flex flex-col gap-5 bg-zinc-50 border border-slate-200 dark:border-slate-600 rounded-md px-5 py-8 shadow-sm">
        <div className="flex gap-5">
          <span className="text-3xl mt-1">👋</span>
          <div className="space-y-1">
            <h1 className="text-slate-600 font-semibold text-2xl w-full dark:text-bodydark1">
              Welcome to Our Website.
            </h1>
            <p className="text-slate-400 dark:text-bodydark">
              This website is your place to complain about the problems you are
              facing.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-5">
        <div className='flex justify-between items-center'>
          <h1 className="text-boxdark dark:text-bodydark1 text-2xl font-semibold">
            Data Complaints
          </h1>
          <div className="my-2 flex gap-2">
            <Link
              to="/add-complaint"
              className="px-3 py-2 border rounded-md bg-primary text-white dark:border-blue-500 text-sm flex items-center gap-1 hover:bg-blue-600 transition-all font-medium"
            >
              <RiAddLine className="text-lg" />
              Add Complaint
            </Link>
          </div>
        </div>
        <ComplaintTable />
      </div>
    </>
  );
};

export default Guest;
