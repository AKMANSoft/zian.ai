import React, { Suspense } from "react"
import HomePage from "./pages/Home"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const GenerateContentPage = React.lazy(() => import("./pages/GenerateContent"));
const CalendarPage = React.lazy(() => import("./pages/Calendar"));
const DraftsPage = React.lazy(() => import("./pages/Drafts"));
const DashboardFirstTime = React.lazy(() => import("./pages/DashboardFirstTime"));
const DashboardArticleLoaded = React.lazy(() => import("./pages/DashboardArticleLoaded"));




const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
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
        <DashboardFirstTime />
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
  }
])



function App() {

  return (
    <div className="bg-primary-image-mobile lg:bg-primary-image bg-no-repeat overflow-hidden h-auto min-h-screen relative">
      <div className="hidden xl:block absolute top-0 left-0 -translate-x-5 -translate-y-5">
        <img src="/images/moon.png" className="w-[270px] h-auto" alt="" />
      </div>
      <RouterProvider router={router} />
    </div>
  )
}





export default App



