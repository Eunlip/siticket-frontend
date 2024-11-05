import LogoUT from '../../assets/images/logoUT.png';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { NavLink,Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8FAFC] mt-28">
      <div className="sm:container px-5 md:px-10 lg:px-0 pb-10 mx-auto">
        <div className="relative bottom-0 left-0 right-0">
          <div className="container text-[#0A142F] xl:px-20 3xl:px-80 mt-0 sm:mt-15 font-openSans">
            {/*<div className="flex flex-col sm:flex-row gap-4 sm:gap-0 mt-5 sm:mt-0 sm:justify-between items-center">*/}
              {/*<div className="flex font-openSans uppercase gap-10 font-semibold">*/}
                {/*<NavLink to={''}>Beranda</NavLink>
                <NavLink to={''}>Tentang</NavLink>
                <NavLink to={''}>Layanan</NavLink>*/}
                {/*<Link to={'/auth/signin'}>Login</Link>*/}
              {/*</div>*/}
              {/*<div className="space-y-2">
                <p className="text-[#75778B] font-medium font-openSans text-center sm:text-end">
                  Ikuti kami di :
                </p>
                <div className="flex items-center gap-5">
                  <Link to={'https://facebook.com'} target='_blank' referrerPolicy='no-referrer'>
                    <FaFacebookSquare
                      size={30}
                      className="hover:text-opacity-80 text-[#2F2E41]"
                    />
                  </Link>
                  <Link to={'https://youtube.com'} target='_blank' referrerPolicy='no-referrer'>
                    <FaYoutube
                      size={35}
                      className="text-[#2F2E41] hover:text-opacity-80"
                    />
                  </Link>
                  <Link to={'https://instagram.com'} target='_blank' referrerPolicy='no-referrer'>
                    <RiInstagramFill
                      size={30}
                      className="text-[#2F2E41] hover:text-opacity-80"
                    />
                  </Link>
                </div>
              </div>*/}
            {/*</div>*/}
            <hr className="my-5 sm:my-10 text-[#F8FAFC]" />
            <div className="flex justify-between items-center font-openSans">
              <img src={LogoUT} width={200} alt="logo ut" className='hidden sm:block'/>
              <p className="text-[#75778B] text-xs sm:text-sm">
                © 2024 Si-Ticket. All rights reserved.
              </p>
              <div className="flex sm:text-base items-center gap-5 text-[#75778B]">
                <p className='text-xs'>Terms of Service</p>
                <p className='text-xs'>Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
