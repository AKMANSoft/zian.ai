import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { cn } from "../lib/utils";
import { PrimaryWithNeon } from "../components/ui/buttons";
import PostViewSection from "../components/postview-section";
import { InputEl } from "../components/ui/input";
import SparkleButton from "@/components/ui/sparkle-btn";
import { useState } from "react";




const Topics = [
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
]




export default function GenerateContentPage() {
    const [selTopic, setSelTop] = useState(0);
    const [post, setPost] = useState(false);

    return (
        <MainLayout heading="Generate Content">
            <div className="pb-5 flex flex-col lg:flex-row gap-5 min-h-[calc(100vh_-_130px)]">
                <GrBorderBox className="w-full p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                    <div className="h-full min-h-[500px] bg-gr-purple-light backdrop-blur-[10px] opacity-90 rounded-20 relative overflow-hidden">
                        {/* Main Content  */}
                        <div className="flex flex-wrap w-full h-full">
                            <div className="w-full lg:w-[35%] xl:w-[30%] border-b-[5px] border-r border-primary px-5 py-3 lg:py-4 max-h-[70px] flex items-center">
                                <h3 className="text-white text-xl leading-8 font-normal font-nebula">
                                    Select Topic
                                </h3>
                            </div>
                            <div className="hidden lg:flex lg:w-[65%] xl:w-[70%] border-b-4 border-primary px-5 py-4 max-h-[70px] items-center">
                                <p className="font-jakarta text-sm font-normal leading-7 text-white/70">
                                    Please answer these questions lorem ipsum dolor imit
                                </p>
                            </div>
                            <div className="w-full lg:w-[35%] xl:w-[30%] border-r border-primary lg:h-full lg:max-h-[calc(100%_-_70px)] overflow-y-auto">
                                <div className="w-full px-3 lg:px-5 py-4 gap-3 flex flex-row lg:flex-col max-w-full overflow-x-auto lg:overflow-hidden no-scrollbar">
                                    {
                                        Topics.map((topic, index) => (
                                            <PrimaryWithNeon onClick={() => setSelTop(index)} active={selTopic === index}
                                                className="w-full min-w-max lg:min-w-0 block text-[15px] leading-6 font-medium overflow-hidden text-start text-ellipsis max-w-full whitespace-nowrap ">
                                                {topic}
                                            </PrimaryWithNeon>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-full lg:w-[65%] xl:w-[70%] lg:h-full pb-3 lg:pb-10 gap-5 max-h-[calc(100%_-_70px)] overflow-y-auto">
                                <div>
                                    <div className="p-3 lg:p-5 lg:pt-8 space-y-4">
                                        <InputEl label="Question 1" placeholder="Write your answer here" />
                                        <InputEl label="Question 2" placeholder="Write your answer here" />
                                        <InputEl label="Question 3" placeholder="Write your answer here" />
                                        <InputEl label="Question 4" placeholder="Write your answer here" />
                                    </div>
                                </div>
                                <div className="flex justify-end p-3 lg:p-6">
                                    <SparkleButton onClick={() => setPost(true)} className="px-10 h-12">
                                        Generate
                                    </SparkleButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </GrBorderBox>
                <PostViewSection
                    className="w-full lg:w-1/3 min-h-[700px]"
                    contentClassName="px-4 pt-10 pb-5"
                    heading={
                        <h5 className="text-xl text-white font-nebula font-normal leading-8">
                            Result
                        </h5>
                    }
                    scheduled={false}
                    customContent={post ? null : <EmptyPostContent />}
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



