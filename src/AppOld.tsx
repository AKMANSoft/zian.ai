import React, { Suspense, useEffect } from "react"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import axios from "axios";
import apiConfig from "./config/api.config";
import useAuthUserStore from "./lib/zustand/authUserStore";
import { Toaster } from "./components/ui/toaster";
import ApiIntegrationPage from "./pages/ApiIntegration";


const GenerateContentPage = React.lazy(() => import("./pages/GenerateContent"));
const CalendarPage = React.lazy(() => import("./pages/Calendar"));
const DraftsPage = React.lazy(() => import("./pages/Drafts"));
const DashboardFirstTime = React.lazy(() => import("./pages/Dashboard"));
const DashboardArticleLoaded = React.lazy(() => import("./pages/DashboardArticleLoaded"));
const SignUpPage = React.lazy(() => import("./pages/SignUp"));
const LoginPage = React.lazy(() => import("./pages/Login"));




const router = createBrowserRouter([
 
  {
    path: "/",
    element: (
      <Suspense>
        <DashboardFirstTime />
      </Suspense>
    )
  },
  {
    path: "/generate",
    element: (
      <Suspense>
        <GenerateContentPage />
      </Suspense>
    )
  },
  {
    path: "/calendar",
    element: (
      <Suspense>
        <CalendarPage />
      </Suspense>
    )
  },
  {
    path: "/drafts",
    element: (
      <Suspense>
        <DraftsPage />
      </Suspense>
    )
  },
  {
    path: "/dashboard",
    element: (
      <Suspense>
        <DashboardArticleLoaded />
      </Suspense>
    )
  },
  {
    path: "/article",
    element: (
      <Suspense>
        <DashboardArticleLoaded />
      </Suspense>
    )
  },
  {
    path: "/signup",
    element: (
      <Suspense>
        <SignUpPage />
      </Suspense>
    )
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    )
  },
  {
    path: "/integeration",
    element: (
      <Suspense>
        <ApiIntegrationPage />
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
      <Toaster />
    </div>
  )
}





export default App



