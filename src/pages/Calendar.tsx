import PostViewSection from "../components/postview-section";
import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import CalendarView from "../components/calendar/calendar-view";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { changeImageUrl, sortScheduledContents } from '@/lib/utils'

import {
  useLoaderData,
} from 'react-router-dom'

import {
  twitterUserContext,
  profileContext,
  scheduledContentsContext,
} from '@/App'

import {
  contentReadApiClient,
} from '@/api.env'

import { calendarViewModes } from '@/components/calendar/defaults';



export default function CalendarPage() {
    const [post, setPost] = useState(false);
    const pageData: any = useLoaderData();
    // const [scheduleList, setScheduleList] = useState<any[]>(pageData.scheduledContents);
    const [scheduleMap, setScheduleMap] = useState<any>(sortScheduledContents(pageData.scheduledContents));
    const [deleteNumber, setDeleteNumber] = useState<number>(0);
    const [content, setContent] = useState<any>(null);
    const [calendarMode, setCalendarMode] = useState(calendarViewModes[0]);

    useEffect(() => {
        async function startFetching() {
          // setContentResult(null);
          let result = null;
          // result = await contentApiClient.contentsScheduled().then((r) => {
          result = await contentReadApiClient.contentsReadScheduled().then((r) => {
            // console.log(r);
            // return r;
            return r;
          }).catch((e) => {
            console.log(e);
          });

          if (!ignore) {
            if (result) {
              switch (calendarMode) {
                  case calendarViewModes[1]:  // WeekCalendarView
                      // useOnlyHour = true
                      setScheduleMap(sortScheduledContents(result, false, true));
                      console.log('WeekCalendarView');
                      console.log(sortScheduledContents(result, false, true));
                      break;
                  case calendarViewModes[2]: // DayCalendarView
                      setScheduleMap(sortScheduledContents(result));
                      break;
                  case calendarViewModes[0]:  // MonthCalendarView
                  default:
                      setScheduleMap(sortScheduledContents(result));
              }
              // setScheduleMap(sortScheduledContents(result));
              // console.log(`Sorted scheduled contents:`);
              // console.log(sortScheduledContents(result));

              // get the newest content after changing
              if (content) {
                let flag = false;
                for (let e of result) {
                  if (e.id === content.id) {
                    setContent(e);
                    flag = true;
                    break
                  }
                }
                if (! flag) {
                  setContent(null); // cannot find it, maybe because it was deleted
                }
              }

            }
          }
        }

      let ignore = false;
      startFetching();
      return () => {
        ignore = true;
      }
    }, [deleteNumber, calendarMode]);

    return (
        <scheduledContentsContext.Provider value={{scheduleMap, setScheduleMap, deleteNumber, setDeleteNumber, setContent}}>
        <profileContext.Provider value={pageData.profile}>
        <twitterUserContext.Provider value={pageData.twitterUsersList}>
        <MainLayout heading="Calendar" user={pageData.user}>
            <h2 className="text-[32px] leading-9 text-white font-nebula font-normal mb-4 text-center lg:text-start xl:hidden">
                Calendar
            </h2>
            <div className="pb-5 flex flex-col lg:flex-row gap-5 h-full">
                <GrBorderBox className="w-full p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                    <div className="h-full min-h-[500px] bg-gr-purple-light rounded-20 relative overflow-hidden">
                        <CalendarView onPostSelect={() => setPost(true)} calendarMode={calendarMode} setCalendarMode={setCalendarMode} />
                    </div>
                </GrBorderBox>
                <PostViewSection
                    className={cn(
                        "w-full lg:w-2/5 xl:w-1/3",
                        (post && window.innerWidth <= 1000) ? "fixed backdrop-blur-3xl max-h-full top-0 left-0 z-[55] rounded-none h-full overflow-y-auto" : "hidden lg:block"
                    )}
                    contentClassName={cn(
                        "px-4 pt-8 pb-5",
                        post && window.innerWidth <= 1000 && "rounded-none min-h-screen"
                    )}
                    heading={
                        <div className="flex items-center justify-between">
                            <h5 className="rounded-full h-12 inline-flex items-center gap-3 px-5 bg-white/10 text-base text-white font-jakarta font-semibold">
                                <FontAwesomeIcon icon={faTwitter} />
                                Twitter Post
                            </h5>
                            {/*
                            <button type="button" onClick={() => setPost(false)}
                                className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                              <FontAwesomeIcon icon={faXmark} />
                            </button>
                              */}
                        </div>
                    }
                  deleteNumber={deleteNumber}
                  setDeleteNumber={setDeleteNumber}
                  content={content}
                  tips={'Please select one draft'}
                />
            </div>
        </MainLayout>
        </twitterUserContext.Provider>
        </profileContext.Provider>
        </scheduledContentsContext.Provider>
    );
}


