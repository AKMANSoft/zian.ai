import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VerticalSeperator } from "../components/ui/seperator";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import GrBorderBox from "../components/ui/gr-border-box";
import MainLayout from "../components/layout";
import PostViewSection, { ScheduleListItem } from "../components/postview-section";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { changeImageUrl, sortScheduledContents } from '@/lib/utils'
import { useEffect, useRef, useState  } from 'react'

import {
  useLoaderData,
} from 'react-router-dom'

import {
  Configuration,
  UsersApi,
} from '@/api/index'
import { createContext, useContext } from 'react';

import {
  twitterUserContext,
  profileContext,
} from '@/App'

import {
  userApiClient,
  twitterUserApiClient,
  contentApiClient,
  contentReadApiClient,
  imageApiClient,
} from '@/api.env'


export async function action() {
  let result = await userApiClient.usersList().then((result) => {
    const lastResult = result.results;
    console.log(result.results);
    return lastResult;
  });

  if (result) {
    return result[0];
  } else {
    return null;
  }
}

// export const UserContext = createContext(null);

export default function HomePage() {
  const pageData: any = useLoaderData();
  const [scheduleList, setScheduleList] = useState<any[]>(pageData.latestContents);
  const [deleteNumber, setDeleteNumber] = useState<number>(0);

  // const usernameRef = useRef('');
  // const [username, setUsername] = useState('');
  // console.log(`user: ${user.username}`);

  // useEffect(() => {
  //   apiClient.usersList().then((result) => {
  //     const lastResult = result.results;
  //     console.log(result.results);
  //     if (lastResult) {
  //       // usernameRef.current = lastResult[0].username;
  //       // console.log(`usernameRef.current: ${usernameRef.current}`)
  //       //
  //       setUsername(lastResult[0].username);
  //     }
  //   });
  // }, []);
  // console.log('home page');
  // const user = pageData.user;
  // console.log({user});

  useEffect(() => {
      async function startFetching() {
        // setContentResult(null);
        let result = null;
        // result = await contentApiClient.contentsScheduled().then((r) => {
        result = await contentReadApiClient.contentsReadScheduled().then((r) => {
          console.log(r);
          // return r;
          return r;
        }).catch((e) => {
          console.log(e);
        });

        if (!ignore) {
          if (result) {
            setScheduleList(result);
            console.log(`setScheduleList, latest content`);
            console.log(result[0]);
          }
        }
      }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  }, [deleteNumber]);

    return (
        <profileContext.Provider value={pageData.profile}>
        <twitterUserContext.Provider value={pageData.twitterUsersList}>
        <MainLayout heading={`Welcome,  ${pageData.user?.username}` } user={pageData.user}>
            <h2 className="text-[32px] leading-9 text-white font-nebula font-normal mb-4 text-center lg:text-start xl:hidden">
              {`Welcome, ${pageData.user?.username}`}
            </h2>
            <div className="flex flex-col lg:flex-row gap-5 pb-5 min-h-[calc(100vh_-_100px)]">
                <PostViewSection className="w-full h-full lg:w-2/5" heading={
                    <h5 className="text-xl text-white font-nebula font-normal text-shadow">
                      {/*Today&apos;s Post*/}
                      Latest Post
                    </h5>
                  }
                  content={scheduleList.length > 0 && scheduleList[0]}
                  deleteNumber={deleteNumber}
                  setDeleteNumber={setDeleteNumber}
                />
                <GrBorderBox className="w-full p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                    <div className="pb-10 h-full min-h-[500px] bg-gr-purple-light opacity-90 rounded-20 relative">
                        {/* Bottom Right Corner Design  */}
                        <div className="absolute -bottom-[27px] -right-[19px] w-[150px] h-[150px]">
                            <img src={changeImageUrl("/images/bottom-right-corner.svg")} loading="lazy" className="h-full w-full" alt="" />
                        </div>
                        {/* Main Content  */}
                        <div className="py-[38px] h-full overflow-hidden">
                            <div className="px-5 pb-11 md:px-[30px] w-full inline-flex justify-between items-center">
                                <h5 className="text-xl text-white font-nebula font-normal text-shadow">
                                    My Schedule
                                </h5>
                                <a href="/calendar" className="hidden md:inline-flex text-base text-white font-normal items-center gap-3">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    View Calendar
                                </a>
                            </div>
                            <div className="max-h-full overflow-y-auto">
                                {
                                  // pageData?.latestContents ? <ScheduleList scheduledContents={pageData?.latestContents} /> :
                                  scheduleList ? <ScheduleList scheduledContents={scheduleList} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber} /> :
                                    <>
                                      <div className="md:px-[30px]">
                                          <h6 className="px-5 md:px-0 text-sm font-normal text-white">Today</h6>
                                          <div className="mt-4 flex flex-col gap-1 md:gap-3">
                                              <HScheduleListItem active />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <VerticalSeperator className="h-[25px] mt-[10px]" />
                                          </div>
                                      </div>
                                      <div className="mt-5 md:px-[30px]">
                                          <h6 className="px-5 md:px-0 text-sm font-normal text-white">Yesterday</h6>
                                          <div className="mt-4 flex flex-col gap-1 md:gap-3">
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                              <HScheduleListItem />
                                          </div>
                                      </div>
                                  </>
                              }
                            </div>
                        </div>
                    </div>
                </GrBorderBox>
            </div>
        </MainLayout>
        </twitterUserContext.Provider>
        </profileContext.Provider>
    );
}


type HScheduleListItemProps = {
    active?: boolean;
    time?: string;
    items?: Array<any>;
    deleteNumber?: number
    setDeleteNumber?: (n: number) => void
}

function HScheduleListItem({ active, time, items, deleteNumber, setDeleteNumber }: HScheduleListItemProps) {
    // const [isActive, setIsActive] = useState<boolean>(active === undefined? false: active);

    return (
        <ScheduleListItem
            leading={
                <p className="inline-flex w-full min-w-max items-center gap-2 font-jakarta text-sm text-white font-normal mr-[10px] max-w-[120px] overflow-x-hidden">
                   {/*
                    <span className="w-4 h-4 aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={cn(active ? "fill-th-green-3" : "fill-white/30")}>
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                    </span>
                     */}
                    {time || '9:30 AM'}
                </p>
            }
          items={items}
          deleteNumber={deleteNumber}
          setDeleteNumber={setDeleteNumber}
        />
    )
}

type ScheduleListProps = {
    scheduledContents: any;
    deleteNumber?: number
    setDeleteNumber?: (n: number) => void
}

function ScheduleList({ scheduledContents, deleteNumber, setDeleteNumber }: ScheduleListProps) {
  const m = sortScheduledContents(scheduledContents);
  console.log(m);

  let dateTimeScheduleList = [];
  let first = true;
  let classNames;
  for(let [dk, dv] of m) {
    let hsScheduleList = [];
    for(let [tk, tv] of dv) {
      let items = [];
      for (let content of tv) {
        items.push({
          // text: content.text,
          text: content.twitterUsername,
          icon: faTwitter,
          content: content,
        });
      }
      hsScheduleList.push(
        <HScheduleListItem key={tk} items={items} time={tk} deleteNumber={deleteNumber} setDeleteNumber={setDeleteNumber}/>
      );
    }

    if (first) {
      classNames = "md:px-[30px]";
      first = false;
    } else {
      classNames = "mt-5 md:px-[30px]";
    }

    if (dateTimeScheduleList.length < m.size - 1) {
      dateTimeScheduleList.push(
        <div className={classNames} key={dk}>
            <h6 className="px-5 md:px-0 text-sm font-normal text-white">{dk}</h6>
            <div className="mt-4 flex flex-col gap-1 md:gap-3">
                {hsScheduleList}
                <VerticalSeperator className="h-[25px] mt-[10px]" />
            </div>
        </div>
      );
    } else {
      dateTimeScheduleList.push(
        <div className={classNames} key={dk}>
            <h6 className="px-5 md:px-0 text-sm font-normal text-white">{dk}</h6>
            <div className="mt-4 flex flex-col gap-1 md:gap-3">
                {hsScheduleList}
            </div>
        </div>
      );
    }
  }

  return (
    <>
      {dateTimeScheduleList}
    </>
  )
}
