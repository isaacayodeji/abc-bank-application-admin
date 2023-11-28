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
import Redirect from "./pages/Redirect";
import { AuthLayout } from "./layout/auth-layout";
import Register from "./pages/auth/register";
import { Suspense } from "react";

function App() {
  return (
    <Suspense
      fallback={<div className="flex items-center h-[100vh]">Loading...</div>}
    >
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route element={<AuthLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            element={
              <ProtectedRoutes>
                <PageLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/overview" element={<Overview />} />
            <Route path="account" element={<Account />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="approval" element={<Approval />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
