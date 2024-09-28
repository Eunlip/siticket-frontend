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
  Calendar,
  Chart,
  AdminDashboard,
  DefaultLayout,
  FormElements,
  FormLayout,
  LandingPage,
  Settings,
  SignIn,
  SignUp,
  Tables,
} from './pages';
import InputUser from './pages/User/InputUser';
import DataUser from './pages/User/DataUser';
import Complaint from './pages/Complaint';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const token = Cookies.get('access_token');
  console.log('Token: ', token)
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);
  console.log(role);

  return (
    <div className="h-screen" data-theme="halloween">
      <Toaster />
      {loading && <Loader />}
      {!token ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Si-ticket" />
                <LandingPage />
              </>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | Si-ticket" />
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
                <>
                  <Route
                    path="/admin-dashboard"
                    element={
                      <>
                        <PageTitle title="Dashboard | Si-ticket" />
                        <AdminDashboard />
                      </>
                    }
                  />
                  <Route
                    path="/calendar"
                    element={
                      <>
                        <PageTitle title="Calendar | Si-ticket" />
                        <Calendar />
                      </>
                    }
                  />
                  <Route
                    path="/complaint"
                    element={
                      <>
                        <PageTitle title="Complaint | Si-ticket" />
                        <Complaint />
                      </>
                    }
                  />
                  <Route
                    path="/users/input-user"
                    element={
                      <>
                        <PageTitle title="Input User | Si-ticket" />
                        <InputUser />
                      </>
                    }
                  />
                  <Route
                    path="/users/data-users"
                    element={
                      <>
                        <PageTitle title="Data Users | Si-ticket" />
                        <DataUser />
                      </>
                    }
                  />
                  <Route
                    path="/forms/form-elements"
                    element={
                      <>
                        <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <FormElements />
                      </>
                    }
                  />
                  <Route
                    path="/forms/form-layout"
                    element={
                      <>
                        <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <FormLayout />
                      </>
                    }
                  />
                  <Route
                    path="/tables"
                    element={
                      <>
                        <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <Tables />
                      </>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <>
                        <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <Settings />
                      </>
                    }
                  />
                  <Route
                    path="/chart"
                    element={
                      <>
                        <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <Chart />
                      </>
                    }
                  />
                  <Route
                    path="/ui/alerts"
                    element={
                      <>
                        <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <Alerts />
                      </>
                    }
                  />
                  <Route
                    path="/ui/buttons"
                    element={
                      <>
                        <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <Buttons />
                      </>
                    }
                  />
                  <Route
                    path="/auth/signup"
                    element={
                      <>
                        <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <SignUp />
                      </>
                    }
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/admin-dashboard"
                    element={
                      <>
                        <PageTitle title="Dashboard | Si-ticket" />
                        <AdminDashboard />
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
