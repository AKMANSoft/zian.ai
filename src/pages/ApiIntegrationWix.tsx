import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { Input } from "@/components/ui/input";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthUserStore from "@/lib/zustand/authUserStore";
import { PrimaryBtn, PrimaryBtnNeon } from "@/components/ui/buttons";
import WixSteps from "@/components/WixStepsComponent";
import { Link } from "react-router-dom";





export default function ApiIntegrationWix() {
  const { authUser } = useAuthUserStore();

  return (
    <MainLayout heading="INTEGRATE API ">
      <GrBorderBox
        className="p-px md:p-[2px]   rounded-20   lg:max-h-[calc(100vh_-_130px)]  "
        type="lg"
      >
        <div className="py-3 md:py-[30px]   h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
          <div className="max-h-full px-3 w-full  space-y-2 md:px-[30px] md:space-y-7 overflow-x-hidden ">
            <div className="">
              <h1 className="text-xl font-bold text-white font-jakarta ">
                API Key
              </h1>
              <div className="relative mt-[10px]">
                <Input className="pr-24" readOnly value={authUser?.authorization} />
                <button className="absolute text-sm font-semibold -translate-y-1/2 font-jakarta top-1/2 right-5">
                  <FontAwesomeIcon className="pr-2" icon={faCopy} /> Copy
                </button>
              </div>
              <div className="mt-3 md:mt-5  mb-[15px]">
                <p className="text-base font-bold text-white lg:text-xl font-jakarta">
                  Select your Integration:
                </p>
                <div className="mt-3 md:mt-5  flex md:flex-row flex-col gap-[10px]   mb-[15px]">
                  <Link to="/integrate">
                    <PrimaryBtnNeon className="font-normal text-[15px] py-[8px] w-full md:w-auto">
                      Wordpress Integration
                    </PrimaryBtnNeon>
                  </Link>
                  <Link to="/shopify">
                    <PrimaryBtnNeon className="font-normal text-[15px] py-[8px] w-full md:w-auto">
                      Shopify Integration Via Zapier
                    </PrimaryBtnNeon>
                  </Link>
                  <Link to="/wix">
                    <PrimaryBtn className="font-normal text-[15px] w-full md:w-auto">
                      Wix Integration Via Zapier
                    </PrimaryBtn>
                  </Link>
                </div>
              </div>
              <hr className="border-2 border-primary " />
              <div className="">
                <h2 className="md:text-[32px] text-base font-bold font-jakarta text-white my-4 md:my-[30px] tracking-wider">
                  How To Connect Zian AI SEO to Wix Via Zapier
                </h2>
                <hr className="border border-white/10" />
                <h2 className="mt-3 md:mt-5  mb-[5px] text-base lg:text-xl font-bold font-jakarta">
                  Tools Needed:
                </h2>
                <ol className="text-sm font-normal list-decimal text-white/70 md:text-base font-jakarta px-[18px]">
                  <li className="">
                    <span className="ps-1">
                      Your Zian SEO API Key:{" "}
                      <a
                        target="_blank"
                        href=" https://seo.zian.ai/integrate"
                        className="underline text-primary ps-1"
                      >
                        {" "}
                        https://seo.zian.ai/integrate
                      </a>{" "}
                    </span>
                  </li>
                  <li className="">
                    <span className="md:flex items-center ps-1">
                      Zapier:{" "}
                      <a
                        target="_blank"
                        href="https://zapier.com/ "
                        className="underline text-primary ps-1"
                      >
                        {" "}
                        https://zapier.com/
                      </a>
                    </span>
                  </li>
                  <li className="">
                    <span className="md:flex items-center ps-1 ">
                      UUID Generator:{" "}
                      <a
                        target="_blank"
                        href="https://www.uuidgenerator.net/version4"
                        className="underline text-primary ps-1"
                      >
                        https://www.uuidgenerator.net/version4
                      </a>
                    </span>
                  </li>
                  <li className="">
                    <span className="md:flex items-center md:ps-1 ">
                      Your Wix API Key:{" "}
                      <a
                        target="_blank"
                        href=" https://manage.wix.com/account/api-keys"
                        className="underline text-primary md:ps-1"
                      >
                        {" "}
                        https://manage.wix.com/account/api-keys
                      </a>
                    </span>
                  </li>
                </ol>
                {/* steps for wix from zapier */}
                <WixSteps/>
              
              </div>
            </div>
          </div>
        </div>
      </GrBorderBox>
    </MainLayout >
  );
}




 