import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import heroImg from '../images/logo/HP3.png';

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = false;
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="container px-0 pt-5 mx-auto 2xl:px-32 min-h-screen">
      <Navbar />
      <div className="container flex justify-between mt-10">
        <div className="py-32 flex flex-col gap-10">
          <div className="space-y-7">
            <h1 className="text-5xl font-bold text-slate-100">
              Aplikasi Pelaporan Ticket
            </h1>
            <p className="text-xl leading-normal text-slate-300">
              Solusi yang dapat diakses melalui browser web,
              <br /> sehingga memudahkan akses pelaporan kerusakan barang.
            </p>
          </div>
          <Link
            to={isAuthenticated ? '/' : '/auth/signin'}
            className="py-3 hover:bg-[#f0c545] px-10 w-fit rounded-md font-semibold bg-[#ffc107] text-neutral-600"
          >
            Buat Laporan
          </Link>
        </div>
        <img src={heroImg} width={500} alt="hero hp img" className="" />
      </div>
    </div>
  );
};

export default LandingPage;
