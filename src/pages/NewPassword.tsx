import { cn } from "@/lib/utils";
import MainLayout from "../components/layout";
import { InputEl } from "@/components/ui/input";
import GrBorderBox from "@/components/ui/gr-border-box";
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
                        <div className="px-8 pt-[30px] pb-[50px] max-h-[calc(100vh_-_200px)] rounded-20 bg-gr-purple-dark">
                            {/* content */}
                            <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                className={cn(
                                    "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                    "block"
                                )}
                                alt="" />
                            <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                CREATE NEW PASSWORD
                            </div>
                            <div className="p-3 lg:p-5 lg:pt-8 space-y-4 md:mx-6 md:text-sm text-xs">
                                <InputEl label="New Password" placeholder="" />
                                <InputEl label="Retype New Passowrd" placeholder="" />
                            </div>
                            <div className="flex justify-between md:mx-11 mx-3">
                                <div>
                                </div>
                                <div className="">
                                    <PrimaryBtn className=" h-full w-full md:w-auto px-6 py-3"
                                        onClick={() => navigate("/new-password/success")}>
                                        Submit
                                    </PrimaryBtn>                                </div>
                            </div>
                        </div>
                    </div>
                </GrBorderBox>
            </div>
        </MainLayout>
    );
}

