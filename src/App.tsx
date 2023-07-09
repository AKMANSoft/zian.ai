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
import { changeImageUrl, sortScheduledContents, sortQuestions, sortAnswers } from '@/lib/utils'
import {
  Configuration,
  UsersApi,
  ContentsApi,
  TwitterUsersApi,
} from './api/index'

import {
  userApiClient,
  twitterUserApiClient,
  contentApiClient,
  contentReadApiClient,
  topicApiClient,
  profileApiClient,
  timezoneApiClient,
  questionApiClient,
  answerApiClient,
  // projectStatusListApiClient,
} from '@/api.env'
import { createContext, useContext } from 'react';



const GenerateContentPage = React.lazy(() => import("./pages/GenerateContent"));
const CalendarPage = React.lazy(() => import("./pages/Calendar"));
const DraftsPage = React.lazy(() => import("./pages/Drafts"));

import {
  noTopicString,
  allTopicString,
} from '@/pages/Drafts'

import {
  basicTopicString,
} from '@/pages/GenerateContent'


export const UserContext = createContext(null);
export const twitterUserContext = createContext(null);
export const profileContext = createContext(null);
export const scheduledContentsContext = createContext({});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage /> ,
    errorElement: <ErrorPage />,
    loader: async () => {
      let pageData: any = {};

      let lastResult = null;
      await userApiClient.usersList().then((result) => {
        lastResult = result.results;
        console.log(result.results);
      });

      if (lastResult) {
        // return lastResult[0];
        pageData.user = lastResult[0];
      } else {
        // return null;
        pageData.user = null;
      }

      // get Twitter account
      const twitterUsersList = await twitterUserApiClient.twitterUsersList().then((r) => {
        console.log(r);
        return r;
      });
      pageData.twitterUsersList = twitterUsersList;

      // get profile
      const profile = await profileApiClient.profilesList().then((r) => {
        console.log(r);
        return r.results[0];
      });
      pageData.profile = profile;

      // const latestContents = await contentApiClient.contentsScheduled().then((r) => {
      const latestContents = await contentReadApiClient.contentsReadScheduled().then((r) => {
        // console.log(r.results);
        return r;
      });
      pageData.latestContents = latestContents;

      const r = sortScheduledContents(latestContents);
      console.log(r);

      pageData.page = 'home';

      return pageData;
    },
  },
  {
    path: "/generate",
    element: (
      <Suspense>
        <GenerateContentPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    loader: async () => {
      let pageData: any = {};

      // get user
      let lastResult = null;
      await userApiClient.usersList().then((result) => {
        lastResult = result.results;
        console.log(result.results);
      });

      if (lastResult) {
        // return lastResult[0];
        pageData.user = lastResult[0];
      } else {
        // return null;
        pageData.user = null;
      }

      // get topics
      const topicsList = await topicApiClient.topicsList().then((r) => {
        console.log(r);
        return r;
      });
      const lastTopicsList = [{text: basicTopicString}, ...topicsList]
      pageData.topicsList = lastTopicsList;

      // get Twitter account
      const twitterUsersList = await twitterUserApiClient.twitterUsersList().then((r) => {
        console.log(r);
        return r;
      });
      pageData.twitterUsersList = twitterUsersList;

      // get profile
      const profile = await profileApiClient.profilesList().then((r) => {
        console.log(r);
        return r.results[0];
      });
      pageData.profile = profile;

      // get questions
      const questions = await questionApiClient.questionsAll().then((r) => {
        console.log(r);

        let questions = sortQuestions(r);
        console.log('questions:', questions);
        return questions;
      });
      pageData.questions = questions;

      // get answers
      const answers = await answerApiClient.answersCurrentProject().then((r) => {
        console.log(r);

        let answers = sortAnswers(r);
        console.log('answers:' , answers);
        return answers;
      });
      pageData.answers = answers;

      return pageData;
    }
  },
  {
    path: "/calendar",
    element: (
      <Suspense>
        <CalendarPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    loader: async () => {
      let pageData: any = {};

      // get user
      let lastResult = null;
      await userApiClient.usersList().then((result) => {
        lastResult = result.results;
        console.log(result.results);
      });

      if (lastResult) {
        // return lastResult[0];
        pageData.user = lastResult[0];
      } else {
        // return null;
        pageData.user = null;
      }

      // get topics
      // const topicsList = await topicApiClient.topicsList().then((r) => {
      //   console.log(r);
      //   return r;
      // });
      // if (topicsList) {
      //   topicsList.push({text: noTopicString});
      //   topicsList.push({text: allTopicString});
      // }
      // pageData.topicsList = topicsList;

      // get Twitter account
      const twitterUsersList = await twitterUserApiClient.twitterUsersList().then((r) => {
        console.log(r);
        return r;
      });
      pageData.twitterUsersList = twitterUsersList;

      // get profile
      const profile = await profileApiClient.profilesList().then((r) => {
        console.log(r);
        return r.results[0];
      });
      pageData.profile = profile;

      // const contentsList = await contentApiClient.contentsList({topic: topicsList[0].text}).then((r) => {
      //   // console.log('Contents list');
      //   // console.log(r.results);
      //   // return r.results;
      //
      //   // console.log(r);
      //   return r;
      // });
      // pageData.contentsList = contentsList;

      // const statusList = await contentApiClient.contentsStatus({id: '360'}).then((r) => {
      // // const statusList = await projectStatusListApiClient.projectStatusListList().then((r) => {
      //   console.log(r);
      //   // console.log(r.results);
      //   return r;
      // });
      //
      const scheduledContents = await contentReadApiClient.contentsReadScheduled().then((r) => {
        console.log('scheduledContents:');
        console.log(r);
        // return r;
        return r;
      }).catch((e) => {
        console.log(e);
        throw e;
      });
      pageData.scheduledContents = scheduledContents;

      return pageData;
    }
  },
  {
    path: "/drafts",
    element: (
        <Suspense>
          <DraftsPage />
        </Suspense>
    ),
    errorElement: <ErrorPage />,
    loader: async () => {
      let pageData: any = {};

      // get user
      let lastResult = null;
      await userApiClient.usersList().then((result) => {
        lastResult = result.results;
        console.log(result.results);
      });

      if (lastResult) {
        // return lastResult[0];
        pageData.user = lastResult[0];
      } else {
        // return null;
        pageData.user = null;
      }

      // get topics
      const topicsList = await topicApiClient.topicsList().then((r) => {
        console.log(r);
        return r;
      });
      if (topicsList) {
        topicsList.push({text: noTopicString});
        topicsList.push({text: allTopicString});
      }
      pageData.topicsList = topicsList;

      // get Twitter account
      const twitterUsersList = await twitterUserApiClient.twitterUsersList().then((r) => {
        console.log(r);
        return r;
      });
      pageData.twitterUsersList = twitterUsersList;

      // get profile
      const profile = await profileApiClient.profilesList().then((r) => {
        console.log(r);
        return r.results[0];
      });
      pageData.profile = profile;

      const contentsList = await contentApiClient.contentsList({topic: topicsList[0].text}).then((r) => {
        // console.log('Contents list');
        // console.log(r.results);
        // return r.results;

        // console.log(r);
        return r;
      });
      pageData.contentsList = contentsList;

      // const statusList = await contentApiClient.contentsStatus({id: '360'}).then((r) => {
      // // const statusList = await projectStatusListApiClient.projectStatusListList().then((r) => {
      //   console.log(r);
      //   // console.log(r.results);
      //   return r;
      // });

      return pageData;
    }
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



