import React, { Suspense } from "react"
import HomePage from "./pages/Home"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import axios from 'axios'
import apiConfig from "./config/api.config";
import api from "./api";

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

const accessToken = "1476836f1c448bd0991ecd9c88f452e08ae7496d4e0f23ee879ae701ba2616e1"
axios.defaults.baseURL = apiConfig.basepath
axios.defaults.headers.common["Authorization"] = accessToken
function App() {


  React.useEffect(() => {
    // api.user.login("testing123@gmail.com", "test123")
    // api.other.industryByKeyword({
    //   type: "industry_id",
    //   industry_id: 8,
    //   keyword: "modern luxury interior design, contemporary luxury interior design, living room luxury interior design, luxury interior design bedroom, luxury interior design living room",
    //   filter: false
    // }).then((res) => {
    //   console.log(res.data)
    // })
    api.other.generate().then(res => {
      console.log(res.data)
    })
  }, [])

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



