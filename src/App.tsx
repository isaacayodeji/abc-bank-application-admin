import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Login } from "./pages/auth/login";
import PageLayout from "./layout/page-layout";
import { ToastContainer } from "react-toastify";
import Overview from "./pages/admin/overview";
import Account from "./pages/admin/account";
import Transaction from "./pages/admin/transaction";
import { PageNotFound } from "./page-not-found";
import { ProtectedRoutes } from "./protected-route";
import Approval from "./pages/admin/approvals";
import { AuthLayout } from "./layout/auth-layout";
import Register from "./pages/auth/register";
import { Suspense } from "react";

import { UserOverview, UserTransaction } from "./pages/user/index";
import UserPageLayout from "./layout/userLayout/user-page-layout";
import UserLogin from "./pages/auth/user-login";

function App() {
  return (
    <Suspense
      fallback={<div className="flex items-center h-[100vh]">Loading...</div>}
    >
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<UserLogin />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/admin/login" element={<Login />} />
          </Route>
          {/* Admin */}
          <Route
            element={
              <ProtectedRoutes>
                <PageLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/admin/overview" element={<Overview />} />
            <Route path="/admin/account" element={<Account />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/approval" element={<Approval />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          {/* Users */}
          <Route
            element={
              <ProtectedRoutes>
                <UserPageLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/user/overview" element={<UserOverview />} />
            <Route path="/user/transaction" element={<UserTransaction />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
