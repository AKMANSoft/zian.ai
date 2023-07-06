import { Cookies } from "react-cookie";
import {
  Configuration,
  UsersApi,
  ContentsApi,
  TwitterUsersApi,
  TopicsApi,
  ProfilesApi,
  TimezonesApi,
  SchedulesApi,
  ImagesApi,
  ContentsReadApi,
  // ProjectStatusListApi,
} from './api/index'


// let cookies = new Cookies(document.cookie);
const cookies = new Cookies();
const apiConf = new Configuration({
  // basePath: 'http://127.0.0.1:8000/api',
  basePath: '/api',
  headers: {
    'X-CSRFToken': cookies.get('csrftoken'),
    // 'Cookie': document.cookie,
  }
})

export const userApiClient = new UsersApi(apiConf);
export const contentApiClient = new ContentsApi(apiConf);
export const contentReadApiClient = new ContentsReadApi(apiConf);
export const twitterUserApiClient = new TwitterUsersApi(apiConf);
export const topicApiClient = new TopicsApi(apiConf);
export const profileApiClient = new ProfilesApi(apiConf);
export const timezoneApiClient = new TimezonesApi(apiConf);
export const scheduleApiClient = new SchedulesApi(apiConf);
export const imageApiClient = new ImagesApi(apiConf);
// export const projectStatusListApiClient = new ProjectStatusListApi(apiConf);

// console.log(cookies.get('csrftoken'));
