import GrBorderBox from "../components/ui/gr-border-box";
import MainLayout from "../components/layout";
import { PrimaryBtn } from "@/components/ui/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCreditCard, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

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
                        <div className="bg-white w-full h-1">
                            <div className="bg-primary w-[60%] h-full">
                            </div>
                        </div>
                    </div>

                    <div>
                        <PrimaryBtn>
                            Upgrade
                        </PrimaryBtn>
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
                {/* other content */}
            </GrBorderBox>
        </MainLayout>
    );
}



