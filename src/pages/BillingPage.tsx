import GrBorderBox from "../components/ui/gr-border-box";
import MainLayout from "../components/layout";
import { PrimaryBtn, PrimaryBtnNeon } from "@/components/ui/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCreditCard, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import {Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function BillingPage() {
    return (
        <MainLayout heading="Billing & plan">
            <div className="flex space-x-5 pb-8">
                <div className="p-7 space-y-10 border border-primary bg-gr-purple-dark rounded-[20px] w-[60%]">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-jakarta font-bold text-white">
                            Basic Plan
                        </h1>
                        <p className="text-base font-normal font-jakarta text-white">
                            $30
                            <span className="text-white/70">
                                per week
                            </span>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <p className="text-sm font-normal font-jakarta text-white/70">
                                Weekly quota: 6 / 10
                            </p>
                        </div>
                        <div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <PrimaryBtn>
                                            Upgrade
                                        </PrimaryBtn>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-base font-normal bg-gr-purple font-jakarta">
                                            To change your plan or increase your weekly quota, please email hello@zian.ai
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>



                </div>
                <div className="p-7 space-y-6 border border-primary rounded-[20px] w-[40%] bg-gr-purple-dark">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-jakarta font-bold text-white">
                            Payment method
                        </h1>
                        <p className="text-base font-normal font-jakarta text-primary">
                            +Add New
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-sm font-jakarta font-bold text-white">
                            <FontAwesomeIcon icon={faCreditCard} />
                            <span className="pl-1">
                                Visa ending in 1234
                            </span>
                        </h1>
                        <p className="bg-transparent">
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-sm font-jakarta font-bold text-white">
                            <FontAwesomeIcon icon={faCreditCard} />
                            <span className="pl-1">
                                Mastercard ending in 1234
                            </span>
                        </h1>
                        <p className="bg-transparent">
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </p>
                    </div>



                </div>

            </div>


            <GrBorderBox className="w-full p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                <div className="h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    {/* Drafts Table  */}
                    <div className="w-full h-full rounded-20 flex flex-col ">
                        <div className="border-b-[5px] text-xs font-semibold px-4 w-full hidden px-auto lg:flex  items-center py-5 border-primary z-[1] gap-x-10">
                            <span className="block text-start xl:w-[58%] lg:w-[48%]">Invoice</span>
                            <span className="block text-start min-w-[100px]">Billing Date</span>
                            <span className="block text-start  min-w-[100px]">Amount</span>
                            <span className="block text-start  min-w-[100px]">Plan</span>
                        </div>
                        <div >
                            <SingleBiillingRow />
                            <SingleBiillingRow />
                        </div>


                    </div>
                </div>
            </GrBorderBox>
        </MainLayout>
    );
}



function SingleBiillingRow() {
    return (
        <div className="flex flex-wrap xl:justify-between lg:flex-nowrap lg:gap-3 items-center w-full" >
            <span className="hidden lg:block text-sm py-3 min-h-[50px] text-start overflow-hidden lg:ps-4 lg:w-[56%]">
                Invoice #007 - May 2023
            </span>
            <span className="block py-3 lg:min-h-[50px] text-start overflow-hidden md:min-w-[100px] px-2">
                <p className="w-full line-clamp-4 text-xs md:text-sm">
                    May 1, 2023
                </p>
            </span>
            <span className="block py-3 lg:min-h-[50px] text-start  overflow-hidden md:min-w-[100px] px-2">
                <p className="w-full line-clamp-4 text-xs md:text-sm">
                    $30.00
                </p>
            </span>
            <span className="hidden lg:block py-3 lg:min-h-[50px] text-start  overflow-hidden min-w-[100px] px-2">
                <p className="w-full line-clamp-2 text-xs md:text-sm">
                    Basic Plan
                </p>
            </span>
            <span className="block text-white py-1 lg:py-3 lg:min-h-[50px] text-start  lg:w-[150px] overflow-hidden lg:pr-4">
                <div className="flex items-center justify-end lg:justify-start">
                    <PrimaryBtnNeon className=" py-3 h-10 px-10 font-medium text-[15px] inline-flex items-center justify-center w-full">
                        Download
                    </PrimaryBtnNeon>
                </div>
            </span>
        </div>
    );
}




