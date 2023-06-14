import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { cn } from "../lib/utils";
import { PrimaryBtn } from "../components/ui/buttons";
import PostViewSection from "../components/postview-section";
import SelectEl from "../components/ui/selectel";
import { InputEl } from "../components/ui/input";





export default function GenerateContentPage() {
    return (
        <MainLayout heading="Generate Content">
            <div className="pb-5 flex gap-5 min-h-[calc(100vh_-_130px)]">
                <GrBorderBox className="w-full p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                    <div className="h-full min-h-[500px] bg-gr-purple-light backdrop-blur-[10px] opacity-90 rounded-20 relative overflow-hidden">
                        {/* Main Content  */}
                        <div className="h-full flex flex-col justify-between gap-5 max-h-full overflow-y-auto">
                            <div>
                                <div className="p-5  pb-[30px] border-b-[5px] border-primary">
                                    <SelectEl
                                        label="Select Topic"
                                        options={[
                                            {
                                                text: "Giveaways",
                                                value: "giveaways",
                                                disabled: false,
                                            },
                                            {
                                                text: "Other topic",
                                                value: "other_topic",
                                                disabled: false,
                                            },
                                        ]} />
                                </div>
                                <div className="p-5 pt-8 space-y-4">
                                    <InputEl label="Question 1" placeholder="Write your answer here" />
                                    <InputEl label="Question 2" placeholder="Write your answer here" />
                                    <InputEl label="Question 3" placeholder="Write your answer here" />
                                    <InputEl label="Question 4" placeholder="Write your answer here" />
                                </div>
                            </div>
                            <div className="flex justify-end p-6 pb-7">
                                <PrimaryBtn className="px-10 h-12">
                                    Generate
                                </PrimaryBtn>
                            </div>
                        </div>
                    </div>
                </GrBorderBox>
                <PostViewSection
                    className="w-1/3"
                    contentClassName="px-4 pt-10 pb-5"
                    customContent={<EmptyPostContent />}
                />
            </div>
        </MainLayout>
    );
}






function EmptyPostContent() {
    return (
        <div className="h-full flex flex-col">
            <h5 className="text-xl text-white font-nebula font-normal leading-8 text-shadow">
                Result
            </h5>
            <div className={cn(
                "rounded-20 w-full h-full bg-white/5 backdrop-blur-[10px]",
                "flex flex-col items-center justify-center px-8 text-center mt-3"
            )}>
                <img src="/images/file-round-with-boder.svg" loading="lazy" width={70} height={70}
                    className="w-[70px] h-auto aspect-square"
                    alt="" />
                <h4 className="text-xl leading-7 font-semibold font-jakarta mt-[10px] text-white">
                    Your content will be shown here
                </h4>
                <p className="text-sm font-normal font-jakarta text-white/70 mt-2">
                    Sed consectetur imperdiet facilisis. Nulla maa.
                </p>
            </div>
        </div>
    );
}



