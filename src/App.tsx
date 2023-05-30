import SideBar from "./components/sidebar"
import CalendarPage from "./pages/Calendar"
import DraftsPage from "./pages/Drafts"
import HomePage from "./pages/Home"
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/calendar",
    element: <CalendarPage />
  },
  {
    path: "/drafts",
    element: <DraftsPage />
  }
])



function App() {

  return (
    <div className="bg-primary-image bg-no-repeat overflow-x-hidden h-full min-h-screen relative">
      <div className="absolute top-0 left-0 -translate-x-5 -translate-y-5">
        <img src="/images/moon.png" className="w-[270px] h-auto" alt="" />
      </div>
      <RouterProvider router={router} />
    </div>
  )
}





export default App



