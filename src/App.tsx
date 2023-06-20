// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

import React, { Suspense } from "react"
import HomePage from "./pages/Home"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { changeImageUrl } from '@/lib/utils'

const GenerateContentPage = React.lazy(() => import("./pages/GenerateContent"));
const CalendarPage = React.lazy(() => import("./pages/Calendar"));
const DraftsPage = React.lazy(() => import("./pages/Drafts"));




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
  }
])



function App() {
  const imgUrl = new URL('/images/moon.png', import.meta.url).href;
    console.log(imgUrl);

  return (
    <div className="bg-primary-image-mobile lg:bg-primary-image bg-no-repeat overflow-hidden h-auto min-h-screen relative">
      <div className="hidden xl:block absolute top-0 left-0 -translate-x-5 -translate-y-5">
	<img src={changeImageUrl("/images/moon.png")} className="w-[270px] h-auto" alt="" />
      </div>
      <RouterProvider router={router} />
    </div>
  )
}





export default App



