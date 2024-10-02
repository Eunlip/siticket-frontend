import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import heroImg from '../images/HP3.png';

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = false;
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

return (
    <div className="sm:container px-0 pt-5 mx-auto 2xl:px-20 md:px-10 min-h-screen">
      <Navbar />
      <div className="container px-4 flex justify-between md:items-center lg:items-start mt-0 sm:mt-10 flex-col sm:flex-row">
        <div className="py-20 sm:py-32 flex flex-col gap-10">
          <div className="space-y-7">
            <h1 className="text-5xl sm:text-5xl md:text-4xl xl:text-5xl sm:leading-snug text-center sm:text-left leading-snug font-bold text-slate-100">
              Aplikasi Pelaporan Ticket
            </h1>
            <p className="text-sm sm:text-base xl:text-lg text-center sm:text-start leading-relaxed text-slate-300">
              Solusi yang dapat diakses melalui browser web,
              <br /> sehingga memudahkan akses pelaporan kerusakan barang.
            </p>
          </div>
          <Link
            to={isAuthenticated ? '/' : '/auth/signin'}
            className="py-3 mx-auto sm:mx-0 hover:bg-[#f0c545] px-10 w-fit rounded-md font-semibold bg-[#ffc107] text-neutral-600"
          >
            Buat Laporan
          </Link>
        </div>
        <img src={heroImg} alt="hero hp img" className="w-[500px] md:w-[350px] xl:w-[500px] 2xl:w-[500px] h-auto object-cover" />
      </div>
    </div>
  );
};

export default LandingPage;
