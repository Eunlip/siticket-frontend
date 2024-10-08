import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Toaster } from 'react-hot-toast';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ProtectedLayout from './components/ProtectedLayout';

import {
  Alerts,
  Buttons,
  Chart,
  DefaultLayout,
  LandingPage,
  Settings,
  SignIn,
  SignUp,
  Tables,
} from './pages';
import InputUser from './pages/User/InputUser';
import DataUser from './pages/User/DataUser';
import Complaint from './pages/Complaint';
import Guest from './pages/Dashboard/Guest';
import EditUser from './pages/User/EditUser';
import MyComplaint from './pages/Complaint/MyComplaint';
import InputComplaint from './pages/Complaint/InputComplaint';
import EditComplaint from './pages/Complaint/EditComplaint';
import AdminDashboard from './pages/Dashboard/Admin';

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
      setIsAuthenticated(true);
    }

    if (token) {
      const role = Cookies.get('role');
      setRole(role);
    }
  }, [token]);

  return (
    <div className="bg-neutral-800">
      <Toaster />
      {loading && <Loader />}
      {!token ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Si-Ticket" />
                <LandingPage />
              </>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Sign In | Si-Ticket" />
                <SignIn />
              </>
            }
          />
        </Routes>
      ) : (
        <DefaultLayout>
          <Routes>
            {/* Route yang dilindungi */}
            <Route
              element={
                <ProtectedLayout
                  isAuthenticated={isAuthenticated}
                  path={pathname}
                />
              }
            >
              {role === 'admin' ? (
                <Route>
                  <Route
                    path="/admin-dashboard"
                    element={
                      <>
                        <PageTitle title="Dashboard | Si-Ticket" />
                        <AdminDashboard />
                      </>
                    }
                  />
                  <Route
                    path="/complaint"
                    element={
                      <>
                        <PageTitle title="Complaint | Si-Ticket" />
                        <Complaint />
                      </>
                    }
                  />
                  <Route
                    path="/add-complaint"
                    element={
                      <>
                        <PageTitle title="Add Complaint | Si-Ticket" />
                        <InputComplaint />
                      </>
                    }
                  />
                  <Route
                    path="/edit-complaint/:id"
                    element={
                      <>
                        <PageTitle title="Add Complaint | Si-Ticket" />
                        <EditComplaint />
                      </>
                    }
                  />
                  <Route
                    path="/users/input-user"
                    element={
                      <>
                        <PageTitle title="Input User | Si-Ticket" />
                        <InputUser />
                      </>
                    }
                  />
                  <Route
                    path="/users/data-users"
                    element={
                      <>
                        <PageTitle title="Data Users | Si-Ticket" />
                        <DataUser />
                      </>
                    }
                  />
                  <Route
                    path="/users/edit-user/:id"
                    element={
                      <>
                        <PageTitle title="Edit Data Users | Si-Ticket" />
                        <EditUser />
                      </>
                    }
                  />
                </Route>
              ) : (
                <>
                  <Route
                    path="/guest-dashboard"
                    element={
                      <>
                        <PageTitle title="Dashboard | Si-Ticket" />
                        <Guest />
                      </>
                    }
                  />
                  <Route
                    path="/add-complaint"
                    element={
                      <>
                        <PageTitle title="Add Complaint | Si-Ticket" />
                        <InputComplaint />
                      </>
                    }
                  />
                  <Route
                    path="/edit-complaint/:id"
                    element={
                      <>
                        <PageTitle title="Add Complaint | Si-Ticket" />
                        <EditComplaint />
                      </>
                    }
                  />
                  <Route
                    path="/my-complaint"
                    element={
                      <>
                        <PageTitle title="My Complaint | Si-Ticket" />
                        <MyComplaint />
                      </>
                    }
                  />
                </>
              )}
            </Route>
          </Routes>
        </DefaultLayout>
      )}
    </div>
  );
}

export default App;
