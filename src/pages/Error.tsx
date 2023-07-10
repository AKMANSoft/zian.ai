import MainLayout from "../components/layout";
import { useRouteError } from "react-router-dom";

import {
  useLoaderData,
} from 'react-router-dom'



export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);
    const pageData: any = useLoaderData();

    return (
        <MainLayout heading="Error" user={pageData.user}>
            <div  className="pb-5 flex text-white flex-col lg:flex-row gap-5 h-full">
                <div id="error-page">
                  <h1>Oops!</h1>
                  <p>Sorry, an unexpected error has occurred.</p>
                  <p>
                    <i>{error.statusText || error.message}</i>
                  </p>
              </div>
            </div>
        </MainLayout>
    );
}

