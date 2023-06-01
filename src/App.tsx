import CalendarPage from "./pages/Calendar"
import DraftsPage from "./pages/Drafts"
import GenerateContentPage from "./pages/GenerateContent"
import HomePage from "./pages/Home"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/generate",
    element: <GenerateContentPage />
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
    <div className="bg-primary-image-mobile lg:bg-primary-image bg-no-repeat overflow-hidden h-auto min-h-screen relative">
      <div className="hidden xl:block absolute top-0 left-0 -translate-x-5 -translate-y-5">
        <img src="/images/moon.png" className="w-[270px] h-auto" alt="" />
      </div>
      <RouterProvider router={router} />
    </div>
  )
}





export default App



