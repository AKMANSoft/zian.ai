import { cn } from "@/lib/utils";
import MainLayout from "../components/layout";
import { InputEl } from "@/components/ui/input";
import GrBorderBox from "@/components/ui/gr-border-box";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { PrimaryBtn } from "@/components/ui/buttons";


export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    return (
        <MainLayout secure={false}>
            <div className="flex flex-col items-center justify-center py-20">
                <GrBorderBox className="p-[2px] rounded-20 w-full max-w-[500px] shadow-xl">
                    <div className={cn(
                        "transform overflow-hidden rounded-20 bg-gr-purple-dark",
                        "relative"
                    )}>
                        <div className="w-full flex flex-row  items-center justify-between px-5 pt-5 ">
                            <button type="button" onClick={() => window.history.back()}
                                className="text-white block text-2xl !m-0 aspect-square px-2 font-semibold outline-none cursor-pointer">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <div></div>
                        </div>
                        <div className="px-5 pb-10  md:px-8 md:pb-[50px] ">
                            {/* content */}
                            <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                className={cn(
                                    "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                    "block"
                                )}
                                alt="" />
                            <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                Forgot Password?
                            </div>
                            <div>
                                <p className="md:text-sm text-xs font-normal font-jakarta text-white/70 text-center mt-4">
                                    We got this. Please enter your registered email below and we will send instructions to reset your password
                                </p>
                            </div>
                            <div className="lg:p-5 lg:pt-8 space-y-4 md:text-sm text-xs pt-4 lg:px-0 px-1">
                                <InputEl label="Email" placeholder="" />
                            </div>
                            <div className="flex justify-between md:px-0 px-1 lg:pt-0 pt-5">
                                <div></div>
                                <div>
                                    <PrimaryBtn onClick={() => navigate("/forgot-password/success")} className=" h-full w-full md:w-auto px-8 py-3" >
                                        Submit
                                    </PrimaryBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </GrBorderBox>
            </div>
        </MainLayout>
    );
}

