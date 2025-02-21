import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export const linkToSocmed = [
  {
    link: 'https://www.facebook.com/ptunitedtractorstbk',
    icon: (
      <FaFacebookSquare
        size={20}
        className='hover:text-opacity-80 text-white hover:-translate-y-1 transition-all duration-300'
      />
    ),
  },
  {
    link: 'https://www.instagram.com/obor_tanjung/',
    icon: (
      <RiInstagramFill
        size={20}
        className='text-white hover:text-opacity-80 hover:-translate-y-1 transition-all duration-300'
      />
    ),
  },
  {
    link: 'https://www.youtube.com/@unitedtractors',
    icon: (
      <FaYoutube
        size={24}
        className='text-white hover:text-opacity-80 hover:-translate-y-1 transition-all duration-300'
      />
    ),
  },
];