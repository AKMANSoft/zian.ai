import { cn } from "../lib/utils";
import GrBorderBox from "../components/ui/gr-border-box";
import MainLayout from "../components/layout";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { changeImageUrl } from '@/lib/utils'
import { useEffect, useRef, useState  } from 'react'
import { PrimaryBtnNeon } from "../components/ui/buttons";

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


export default function SocialAccountsPage() {
  const pageData: any = useLoaderData();

  function onClickAuthorizeBtn() {
    window.location.href = '/user/authorize-twitter/'
  }

    return (
        <profileContext.Provider value={pageData.profile}>
        <twitterUserContext.Provider value={pageData.twitterUsersList}>
        <MainLayout heading={`Social Accounts` } user={pageData.user}>
            <GrBorderBox className="h-full p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
              {/*
                <div className="text-white place-content-center p-3 md:p-5 h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                  <table className="table-fixed m-6 md:m-12 lg:m-20 border-spacing-2 divide-y divide-emerald-700">
                    <thead>
                      <tr className="divide-x divide-emerald-700">
                        <th scope="col" className="text-left ps-8">Username on Website</th>
                        <th scope="col" className="text-left ps-8">Twitter Username</th>
                        <th scope="col" className="text-left ps-8">Authorized to access Twitter?</th>
                      </tr>
                    </thead>
                    <tbody className="py-10">
                      <tr className="divide-x divide-emerald-700">
                        <td className="text-left ps-8">{pageData.user.username}</td>
                        <td className="text-left ps-8">{pageData.twitterUsersList.results?.length > 0 && pageData.twitterUsersList.results[0].username}</td>
                        <td className="text-left ps-8"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                */}
                <div className="text-white place-content-center p-3 md:p-5 h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                <div className="m-6 md:m-12 lg:m-20 flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light bg-[#664f8e] lg:bg-transparent ">
                          <thead
                            className="border-b bg-[#664f8e] font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                              <th scope="col" className="px-6 py-4">Username on Website</th>
                              <th scope="col" className="px-6 py-4">Twitter Username</th>
                              <th scope="col" className="px-6 py-4">Authorized to access Twitter?</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              className="border-b bg-[#664f8e] dark:border-neutral-500 dark:bg-neutral-700">
                              <td className="whitespace-nowrap px-6 py-4">{pageData.user.username}</td>
                              <td className="whitespace-nowrap px-6 py-4">{pageData.twitterUsersList.results?.length > 0 && pageData.twitterUsersList.results[0].username}</td>
                              <td className="whitespace-nowrap px-6 py-4">{pageData.twitterUsersList.results?.length > 0 ? 'Yes' :
                                <PrimaryBtnNeon className="max-w-[400px] py-3 h-10 px-3 font-medium text-[15px] inline-flex items-center justify-center w-full lg:w-auto"
                                  onClick={onClickAuthorizeBtn}
                                >
                                  Authorize to access Twitter
                                </PrimaryBtnNeon> }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GrBorderBox>
        </MainLayout>
        </twitterUserContext.Provider>
        </profileContext.Provider>
    );
}
