import Header from "./components/header"
import SideBar from "./components/sidebar"
import HomePage from "./pages/Home"


function App() {

  return (
    <div className="bg-primary-image bg-no-repeat min-h-screen relative">
      <div className="absolute top-0 left-0 -translate-x-5 -translate-y-5">
        <img src="/images/moon.png" className="w-[270px] h-auto" alt="" />
      </div>
      <div className="w-full flex gap-5">
        <SideBar />
        <div className=" flex flex-col w-full px-5">
          <Header />
          <HomePage />
        </div>
      </div>
    </div>
  )
}





export default App



