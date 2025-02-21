import { Outlet, Navigate } from 'react-router-dom';

interface ProtectedLayoutProps {
	isAuthenticated: boolean;
	path: string;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ isAuthenticated, path }) => {
	// Jika pengguna belum login, redirect ke halaman login
	if (!isAuthenticated) {
		return <Navigate to={path} />;
	}

	// Jika sudah login, render halaman yang di dalam Outlet
	return <Outlet />;
};

export default ProtectedLayout;
