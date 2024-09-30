import React, { useState } from 'react';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { PiMapPin } from 'react-icons/pi';
import { useLocation } from 'react-router-dom';

interface SelectGroupTwoProps {
  value: string;
  title: string;
  placeholder: string;
  setValue: (value: string) => void;
}

const Role = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'guest',
    label: 'Guest',
  },
];

const sektor = [
  {
    value: 'MIA4',
    label: 'MIA4',
  },
  {
    value: 'PPA',
    label: 'PPA',
  },
  {
    value: 'BUMA MAIN SHOP',
    label: 'BUMA MAIN SHOP',
  },
  {
    value: 'PASAR PANAS',
    label: 'PASAR PANAS',
  },
  {
    value: 'RISA',
    label: 'RISA',
  },
  {
    value: 'TRAINING CENTER',
    label: 'TRAINING CENTER',
  },
];

const SelectGroupTwo: React.FC<SelectGroupTwoProps> = ({
  value,
  setValue,
  title,
  placeholder,
}) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const pathname = useLocation();

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className=" block text-black dark:text-white font-medium">
        {title}
        <div className="relative z-20 bg-white dark:bg-form-input mt-3">
          <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
            {pathname.pathname === '/add-complaint' ? (
              <PiMapPin className="text-neutral-500 text-xl dark:text-bodydark" />
            ) : (
              <MdOutlineAdminPanelSettings className="text-neutral-500 text-xl dark:text-bodydark" />
            )}
          </span>

          <select
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              changeTextColor();
            }}
            className={`relative font-normal z-20 w-full appearance-none border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input rounded-lg ${
              isOptionSelected ? 'text-black dark:text-white' : ''
            }`}
          >
            <option
              value=""
              disabled
              className="text-bodydark dark:text-bodydark"
            >
              {placeholder}
            </option>
            {pathname.pathname === '/users/input-user' && '/users/edit-user'
              ? Role.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))
              : sektor.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
          </select>

          <span className="absolute top-1/2 right-4 z-999999 -translate-y-1/2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill="#637381"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </label>
    </div>
  );
};

export default SelectGroupTwo;
