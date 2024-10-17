import LogoUT from '../../assets/images/logoUT.png';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { NavLink,Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8FAFC] mt-28">
      <div className="sm:container px-5 md:px-10 lg:px-0 pt-1 pb-10 mx-auto">
        <div className="relative bottom-0 left-0 right-0">
          <div className="container text-[#0A142F] xl:px-20 3xl:px-80 mt-0 sm:mt-15 font-openSans">
            <div className="flex justify-between items-center">
              <div className="flex font-openSans uppercase gap-10 font-semibold">
                <NavLink to={''}>Beranda</NavLink>
                <NavLink to={''}>Tentang</NavLink>
                <NavLink to={''}>Layanan</NavLink>
              </div>
              <div className="space-y-2">
                <p className="text-[#75778B] font-medium font-openSans text-end">
                  Ikuti kami di :
                </p>
                <div className="flex items-center gap-5">
                  <Link to={'https://facebook.com'} target='_blank'>
                    <FaFacebookSquare
                      size={30}
                      className="hover:text-opacity-80 text-[#2F2E41]"
                    />
                  </Link>
                  <Link to={'https://youtube.com'} target='_blank'>
                    <FaYoutube
                      size={35}
                      className="text-[#2F2E41] hover:text-opacity-80"
                    />
                  </Link>
                  <Link to={'https://instagram.com'} target='_blank'>
                    <RiInstagramFill
                      size={30}
                      className="text-[#2F2E41] hover:text-opacity-80"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <hr className="my-10 text-bodydark1" />
            <div className="flex justify-between items-center">
              <img src={LogoUT} width={200} alt="logo ut" />
              <p className="text-[#75778B]">
                © 2024 Si-Ticket. All rights reserved.
              </p>
              <div className="flex items-center gap-5 text-[#75778B]">
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
