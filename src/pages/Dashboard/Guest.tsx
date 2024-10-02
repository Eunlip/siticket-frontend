import React from 'react';
import ComplaintTable from '../../components/Tables/ComplaintTable';

const Guest: React.FC = () => {
  return (
    <>
      <div className="dark:bg-boxdark flex flex-col gap-5 bg-zinc-50 border border-slate-200 dark:border-slate-600 rounded-md px-5 py-8 shadow-sm">
        <div className="flex gap-5">
          <span className="text-3xl mt-1">👋</span>
          <div className="space-y-1">
            <h1 className="text-slate-600 font-semibold text-xl w-full dark:text-bodydark1">
              Welcome to Our Website.
            </h1>
            <p className="text-slate-400 text-sm sm:text-base dark:text-bodydark">
              This website is your place to complain about the problems you are
              facing.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 space-y-5 dark:bg-boxdark sm:container mx-auto shadow bg-neutral-50 shadow-neutral-300 dark:shadow-neutral-700 rounded-md px-5 py-10">
        <h1 className="text-boxdark text-center sm:text-start dark:text-bodydark1 text-2xl font-semibold">
          List All of Complaints
        </h1>
        <ComplaintTable />
      </div>
    </>
  );
};

export default Guest;
