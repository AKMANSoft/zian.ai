import React, { Suspense, useEffect } from "react"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import axios from "axios";
import apiConfig from "./config/api.config";
import useAuthUserStore from "./lib/zustand/authUserStore";
import ApiIntegrationPage from "./pages/ApiIntegration";
import ShadcnProviders from "./components/ui/shadcn-providers";
import LoadingSparkle from "./components/LoadingSparkle";


const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const BillingPage = React.lazy(() => import("./pages/BillingPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUp"));
const LoginPage = React.lazy(() => import("./pages/Login"));
const ForgotPasswordPage = React.lazy(() => import("./pages/ForgotPassword"));
const NewPasswordPage = React.lazy(() => import("./pages/NewPassword"));
const ForgotPasswordSuccessPage = React.lazy(() => import("./pages/ForgotPasswordSuccess"));
const NewPasswordSuccessPage = React.lazy(() => import("./pages/NewPasswordSuccess"));
const CustomizePage = React.lazy(() => import("./components/popups/CustomizePopup"));
const TermsPage = React.lazy(() => import("./pages/Terms"));
const PrivacyPage = React.lazy(() => import("./pages/Privacy"));




const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <Dashboard />
      </Suspense>
    )
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <SignUpPage />
      </Suspense>
    )
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <LoginPage />
      </Suspense>
    )
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <ForgotPasswordPage />
      </Suspense>
    )
  },
  {
    path: "/forgot-password/success",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <ForgotPasswordSuccessPage />
      </Suspense>
    )
  },
  {
    path: "/new-password",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <NewPasswordPage />
      </Suspense>
    )
  },
  {
    path: "/new-password/success",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <NewPasswordSuccessPage />
      </Suspense>
    )
  },
  {
    path: "/integrate",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <ApiIntegrationPage />
      </Suspense>
    )
  },
  {
    path: "/customize",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <CustomizePage />
      </Suspense>
    )
  },
  {
    path: "/billing",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <BillingPage />
      </Suspense>
    )
  },
  {
    path: "/terms",
    element: (
      <Suspense>
        <TermsPage />
      </Suspense>
    )
  },
  {
    path: "/privacy",
    element: (
      <Suspense>
        <PrivacyPage />
      </Suspense>
    )
  }
])


axios.defaults.baseURL = apiConfig.basepath
function App() {
  const { authUser } = useAuthUserStore()

  console.log(authUser)

  useEffect(() => {
    if (authUser?.token) {
      axios.defaults.headers.common["Authorization"] = authUser.token
    }
  }, [authUser])

  return (
    <div className="bg-primary-image-mobile lg:bg-primary-image bg-no-repeat overflow-hidden h-screen max-h-screen relative">
      <div className="hidden xl:block absolute top-0 left-0 -translate-x-5 -translate-y-5">
        <img src="/images/moon.png" className="w-[270px] h-auto" alt="" />
      </div>
      <RouterProvider router={router} />
      <ShadcnProviders />
    </div>
  )
}





export default App



