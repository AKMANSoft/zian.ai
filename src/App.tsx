// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

import React, { Suspense } from "react"
// import { Cookies } from "react-cookie";
// import { CookiesProvider } from "react-cookie";
import HomePage from "./pages/Home"
import ErrorPage from "./pages/Error"
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import { changeImageUrl } from '@/lib/utils'
import {
  Configuration,
  UsersApi,
  ContentsApi,
  TwitterUsersApi,
} from './api/index'

const GenerateContentPage = React.lazy(() => import("./pages/GenerateContent"));
const CalendarPage = React.lazy(() => import("./pages/Calendar"));
const DraftsPage = React.lazy(() => import("./pages/Drafts"));




// let cookies = new Cookies(document.cookie);
// const cookies = new Cookies();
const apiConf = new Configuration({
  basePath: 'http://127.0.0.1:8000/api',
  // headers: {
  //   // 'X-CSRFToken': cookies.get('csrftoken'),
  //   'Cookie': document.cookie,
  // }
})

export const userApiClient = new UsersApi(apiConf);
export const ContentApiClient = new ContentsApi(apiConf);
export const twitterUserApiClient = new TwitterUsersApi(apiConf);

// console.log(cookies.get('csrftoken'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: async () => {
      let homeData: any = {};

      let lastResult = null;
      await userApiClient.usersList().then((result) => {
        lastResult = result.results;
        console.log(result.results);
      });

      if (lastResult) {
        // return lastResult[0];
        homeData.user = lastResult[0];
      } else {
        // return null;
        homeData.user = null;
      }

      const latestContents = await ContentApiClient.contentsScheduled().then((r) => {
        // console.log(r.results);
        return r.results;
      });
      homeData.latestContents = latestContents;

      homeData.page = 'home';

      return homeData;
    },
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



