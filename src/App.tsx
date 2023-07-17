import React, { Suspense, useEffect } from "react"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import axios from "axios";
import apiConfig from "./config/api.config";
import useAuthUserStore from "./lib/zustand/authUserStore";
import ApiIntegrationPage from "./pages/ApiIntegration";
import ShadcnProviders from "./components/ui/shadcn-providers";
import LoadingSparkle from "./components/LoadingSparkle";
import TermsPage from "./pages/Terms";


const GenerateContentPage = React.lazy(() => import("./pages/GenerateContent"));
const CalendarPage = React.lazy(() => import("./pages/Calendar"));
const DraftsPage = React.lazy(() => import("./pages/Drafts"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const DashboardArticleLoaded = React.lazy(() => import("./pages/DashboardArticleLoaded"));
const BillingPage = React.lazy(() => import("./pages/BillingPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUp"));
const LoginPage = React.lazy(() => import("./pages/Login"));
const CustomizePage = React.lazy(() => import("./components/popups/CustomizePopup"));
const PopupPage = React.lazy(() => import("./pages/PopupPage"));
// const TermsPage = React.lazy(() => import("./pages/TermsPage"));




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
    path: "/generate",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <GenerateContentPage />
      </Suspense>
    )
  },
  {
    path: "/calendar",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <CalendarPage />
      </Suspense>
    )
  },
  {
    path: "/drafts",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <DraftsPage />
      </Suspense>
    )
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <DashboardArticleLoaded />
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
    path: "/popup",
    element: (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSparkle spark variant="large" />
        </div>
      }>
        <PopupPage />
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
        <TermsPage />
      </Suspense>
    )
  }
])


axios.defaults.baseURL = apiConfig.basepath
function App() {
  const { authUser } = useAuthUserStore()



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



