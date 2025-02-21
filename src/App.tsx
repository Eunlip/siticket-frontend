import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Toaster } from 'react-hot-toast';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ProtectedLayout from './components/ProtectedLayout';

import { DefaultLayout, SignIn, LandingPage, LandingPageTicket } from './pages';
import Complaint from './pages/Ticket/Complaint';
import AdminDashboard from './pages/Dashboard/si-ticket/Admin';
import PeminjamanBarang from './pages/LandingPage/PeminjamanBarang/Lend';
import Tc from './pages/Dashboard/si-pinjam/Tc';
import Product from './pages/PeminjamanBarang/Product';
import Peminjaman from './pages/PeminjamanBarang/Peminjaman';
import Users from './pages/Ticket/User';
import NotFound from './pages/NotFound';
import Esr from './pages/LandingPage/ESR-UT';
import ESRCorner from './pages/ESR/ESRCorner';
import HealthCorner from './pages/ESR/HealthCorner';
import Azam from './pages/ESR/AZAM';
import Report from './pages/ESR/Report';
import Logs from './pages/PeminjamanBarang/Logs';
import QuestioningDashboard from './pages/ESR/Questioning';
import GreenCardForm from './pages/ESR/Questioning/GreenCard/Form';
import SafetyTalkForm from './pages/ESR/Questioning/SafetyTalk/Form';
import LogTicket from './pages/Ticket/Log';
import ListProduct from './pages/LandingPage/PeminjamanBarang/ListProduct';

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [role, setRole] = useState<string | undefined>(undefined);
	const token = Cookies.get('access_token');
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);

		if (token) {
			const role = Cookies.get('role');
			setIsAuthenticated(true);
			setRole(role);
		}
	}, [token]);

	return (
		<div>
			<Toaster />
			{loading && <Loader />}
			{!token ? (
				<>
					<Routes>
						<Route
							index
							element={
								<>
									<PageTitle title='Si-Tompel' />
									<LandingPage />
								</>
							}
						/>
						<Route
							path='/si-ticket'
							element={
								<>
									<PageTitle title='Si-Ticket' />
									<LandingPageTicket />
								</>
							}
						/>
						<Route
							path='/peminjaman-barang'
							element={
								<>
									<PageTitle title='Peminjaman Barang' />
									<PeminjamanBarang />
								</>
							}
						/>
						<Route
							path='/peminjaman-barang/daftar-barang'
							element={
								<>
									<PageTitle title='Peminjaman Barang' />
									<ListProduct />
								</>
							}
						/>
						<Route
							path='/auth/signin'
							element={
								<>
									<PageTitle title='Login' />
									<SignIn />
								</>
							}
						/>
						<Route
							path='*'
							element={
								<>
									<PageTitle title='Page Not Found' />
									<NotFound />
								</>
							}
						/>
					</Routes>
				</>
			) : (
				<>
					{role === 'esr' && pathname === '/esr-ut' ? (
						<Routes>
							<Route
								path='/esr-ut'
								element={
									<>
										<PageTitle title='ESR-UT' />
										<Esr />
									</>
								}
							/>
						</Routes>
					) : (
						<DefaultLayout>
							<Routes>
								{/* Route yang dilindungi */}
								<Route
									element={<ProtectedLayout isAuthenticated={isAuthenticated} path={pathname} />}
								>
									{role === 'admin' && (
										<>
											<Route
												path='/ticket/admin-dashboard'
												element={
													<>
														<PageTitle title='Dashboard | Ticket' />
														<AdminDashboard />
													</>
												}
											/>
											<Route
												path='/ticket/complaint'
												element={
													<>
														<PageTitle title='Complaint | Ticket' />
														<Complaint />
													</>
												}
											/>
											<Route
												path='/ticket/users'
												element={
													<>
														<PageTitle title='Data Users | Ticket' />
														<Users />
													</>
												}
											/>
											<Route
												path='/ticket/logs'
												element={
													<>
														<PageTitle title='Logs | Ticket' />
														<LogTicket />
													</>
												}
											/>
										</>
									)}
									{role === 'guest' && (
										<>
											<Route
												path='/ticket/my-complaint'
												element={
													<>
														<PageTitle title='My Complaint | Ticket' />
														<Complaint />
													</>
												}
											/>
											<Route
												path='/ticket/logs'
												element={
													<>
														<PageTitle title='Logs | Ticket' />
														<LogTicket />
													</>
												}
											/>
										</>
									)}
									{role === 'tc' && (
										<>
											<Route
												path='/peminjaman-barang/tc-dashboard'
												element={
													<>
														<PageTitle title='Dashboard | Peminjaman Barang' />
														<Tc />
													</>
												}
											/>
											<Route
												path='/peminjaman-barang/produk'
												element={
													<>
														<PageTitle title='Produk | Peminjaman Barang' />
														<Product />
													</>
												}
											/>
											<Route
												path='/peminjaman-barang/peminjaman'
												element={
													<>
														<PageTitle title='Peminjaman | Peminjaman Barang' />
														<Peminjaman />
													</>
												}
											/>
											<Route
												path='/peminjaman-barang/logs'
												element={
													<>
														<PageTitle title='Logs | Peminjaman Barang' />
														<Logs />
													</>
												}
											/>
										</>
									)}
									{role === 'esr' && (
										<>
											{/* Questioning Section */}
											<Route
												path='/esr-ut/questioning/dashboard'
												element={
													<>
														<PageTitle title='Questioning | ESR-UT' />
														<QuestioningDashboard />
													</>
												}
											/>
											<Route
												path='/esr-ut/questioning/green-card'
												element={
													<>
														<PageTitle title='Questioning | ESR-UT' />
														<GreenCardForm />
													</>
												}
											/>
											<Route
												path='/esr-ut/questioning/safety-talk-form'
												element={
													<>
														<PageTitle title='Questioning | ESR-UT' />
														<SafetyTalkForm />
													</>
												}
											/>
											{/* Questioning Section */}
											<Route
												path='/esr-ut/esr-corner/dashboard'
												element={
													<>
														<PageTitle title='ESR Corner | ESR-UT' />
														<ESRCorner />
													</>
												}
											/>
											<Route
												path='/esr-ut/health-corner/dashboard'
												element={
													<>
														<PageTitle title='Health Corner | ESR-UT' />
														<HealthCorner />
													</>
												}
											/>
											<Route
												path='/esr-ut/report/dashboard'
												element={
													<>
														<PageTitle title='Report | ESR-UT' />
														<Report />
													</>
												}
											/>
											<Route
												path='/esr-ut/azam/dashboard'
												element={
													<>
														<PageTitle title='AZAM | ESR-UT' />
														<Azam />
													</>
												}
											/>
										</>
									)}
								</Route>
								<Route
									path='*'
									element={
										<>
											<PageTitle title='404 - Page Not Found' />
											<NotFound />
										</>
									}
								/>
							</Routes>
						</DefaultLayout>
					)}
				</>
			)}
		</div>
	);
}

export default App;
