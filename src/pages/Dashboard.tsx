import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import {  PrimaryBtnNeon } from "../components/ui/buttons";
import { GenerateApiResponse } from "@/types/response.types";
import useUiState from "@/components/hooks/useUiState";
import LoadingSparkle from "@/components/LoadingSparkle";
import api from "@/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import CustomTooltip from "@/components/custom-tooltip";


export default function Dashboard() {
    const { uiState, setUiData, setProcessing } = useUiState<GenerateApiResponse>()


    const handleGenerateExample = async () => {
        setProcessing(true)
        const response = await api.other.generate()
        setUiData(response)
        setProcessing(false)
    }

    return (
        <MainLayout >
            <GrBorderBox className="p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)] " type="lg">
                <div className="px-3 md:px-5 pt-[30px] pb-20 h-full w-full flex flex-col backdrop-blur-[10px] bg-gr-purple-light opacity-90 rounded-20">
                    <div className="flex md:h-screen w-full justify-center items-center">
                        <div className="flex flex-col text-center justify-center items-center max-w-2xl">
                            <div className="">
                                <h1 className="font-nebula text-2xl md:text-[32px] font-normal text-white">
                                    Welcome, Mike
                                </h1>
                                <h2 className="font-jakarta text-base md:text-2xl font-normal text-white">
                                    To get started, click "GENERATE EXAMPLE" below!
                                </h2>
                                <p className="font-jakarta text-sm md:text-base font-normal text-white/80 py-5">
                                    If no examples are available yet, please wait for our team to notify you that your account is ready, and in the meantime view Integration to connect the system with your site. Reach out to hello@zian.ai if you need support
                                </p>
                            </div>
                            <div className="flex flex-row flex-wrap items-center justify-center my-5 gap-3">
                                {/* <PrimaryBtn disabled={uiState?.processing} className=" w-full max-w-[80%] md:w-auto">
                                    Upgrade
                                </PrimaryBtn> */}
                                <CustomTooltip
                                    title="Upgrade"
                                    content={
                                        <>
                                            To change your plan or increase your weekly quota, please email hello@zian.ai
                                        </>
                                    } />
                                <PrimaryBtnNeon
                                    onClick={handleGenerateExample}
                                    disabled={uiState?.processing}
                                    className="w-full max-w-[80%] md:w-auto">
                                    {
                                        uiState?.processing ?
                                            <LoadingSparkle variant="tiny" spark={true} />
                                            :
                                            uiState?.state?.success && uiState.state.data ?
                                                <span>Refresh</span>
                                                :
                                                <span>Generate Example</span>
                                    }
                                </PrimaryBtnNeon>
                            </div>
                            <div className="text-start mt-5">
                                {
                                    uiState?.state?.success ?
                                        <p className="text-sm font-medium flex items-start gap-3">
                                            <FontAwesomeIcon icon={faCircleCheck} className="text-th-green mt-1" />
                                            Success! We&apos;re crafting your examples. Check back in 2-5 mins for the results.
                                        </p>
                                        :
                                        (
                                            uiState?.state?.message &&
                                            <p className="text-sm font-medium flex items-start gap-3">
                                                <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 mt-1" />
                                                {uiState?.state?.message}
                                            </p>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </GrBorderBox>
        </MainLayout>
    );
}







